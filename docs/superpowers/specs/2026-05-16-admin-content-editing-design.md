# Admin Inline Content Editing — Design

**Date:** 2026-05-16
**Status:** Approved (pending user review of this document)

## Summary

Allow users with `role = 'admin'` to edit module section content, key points, inline quiz questions, and comprehensive quiz questions directly from the module page. Edits are stored in Supabase as override rows keyed by the module ID and item index. A draft → publish workflow keeps in-progress edits hidden from residents. Reverting an edit deletes the override row, restoring whatever is currently in the static JSON.

Slide editing is explicitly out of scope: slides in this project are pre-rendered JPGs produced by `scripts/gen-{moduleId}.mjs`, not React-rendered HTML, so the override pattern does not apply.

## Motivation

Module content lives in `data/modules/*.json`. Today, fixing a wording, swapping a question, or correcting a wrong answer requires editing the JSON, committing, and redeploying — a multi-step round trip that discourages incremental refinement. Recent work auditing inline-quiz section alignment across 23 modules made the cost of this loop visible. An in-app admin editor lets the curriculum author fix issues in seconds, with no deploy.

## Non-Goals

- Editing slides (different rendering paradigm).
- Adding or deleting sections / quiz questions (structural changes).
- Reordering sections.
- Editing module metadata (title, description, learning objectives, tags, difficulty, duration, color).
- Version history beyond the current override.
- Concurrent-edit conflict resolution (single admin assumed).
- Public-facing change log.

## Architecture

### Render-time merge

Static module data is loaded from `data/modules/*.json` as today (server-side, via `getModuleById()` in `lib/modules.ts`). At render time on the client, the new `useModuleContent()` hook fetches override rows from Supabase and merges them over the static module. Result is a `Module` object of the same shape, plus a sidecar `edits` map describing which items are overridden and their publish status.

- Residents fetch only published overrides; admins fetch published + drafts.
- If Supabase is unreachable or the override table is empty, the static module renders unchanged.
- Reverting a single item deletes its override row.

### Data model

Two new Supabase tables.

```sql
CREATE TABLE section_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id TEXT NOT NULL,
  section_index INTEGER NOT NULL CHECK (section_index >= 0),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_html TEXT,
  key_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_draft BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by UUID REFERENCES residents(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(module_id, section_index)
);

CREATE TABLE quiz_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id TEXT NOT NULL,
  scope TEXT NOT NULL CHECK (scope IN ('inline','comprehensive')),
  question_index INTEGER NOT NULL CHECK (question_index >= 0),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer INTEGER NOT NULL CHECK (answer >= 0),
  explanation TEXT NOT NULL,
  is_draft BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by UUID REFERENCES residents(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(module_id, scope, question_index)
);

CREATE INDEX idx_section_overrides_module ON section_overrides(module_id);
CREATE INDEX idx_quiz_overrides_module ON quiz_overrides(module_id, scope);

ALTER TABLE section_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_overrides ENABLE ROW LEVEL SECURITY;
```

Each override stores the **entire updated item** (whole section, whole question). The merge is "use override if present, else static" — there is no field-level merging. Trade-off: future static edits don't flow through for overridden items. Acceptable for v1 because the admin can revert to pick up new static content.

`key_points` is JSONB (array of strings). `options` is JSONB (array of 4 strings, but stored permissively).

`is_draft` is the publish gate. Public reads filter on `is_draft = false`.

`updated_by` records which admin saved the change. Set to `session.sub` on every upsert.

`UNIQUE` constraints ensure at most one override per (module, section_index) or per (module, scope, question_index).

### Admin role gate

`session.role` already exists in the JWT payload (`role TEXT NOT NULL DEFAULT 'resident'` in the `residents` table, propagated in `createSession`). Add a new helper in `lib/session.ts`:

```ts
export async function verifyAdmin(): Promise<SessionPayload | null> {
  const session = await verifySession();
  if (!session || session.role !== 'admin') return null;
  return session;
}
```

Use this on all new admin API routes. Also retrofit `app/api/admin/residents/route.ts` (and any other `/api/admin/*` endpoints currently using bare `verifySession()`) to use `verifyAdmin()` — this is a real pre-existing gap, in scope for this work since we're adding admin endpoints anyway.

`useAuth()` context (`lib/use-auth.tsx`) already exposes `user`. Extend the user shape to include `role: string` so client components can gate the edit UI on `user.role === 'admin'`. This requires updating the `/api/auth/me` (or equivalent) endpoint to return role, plus the `User` type.

## Merge layer

New file: `lib/module-overrides.ts`.

```ts
export interface SectionOverride {
  moduleId: string;
  sectionIndex: number;
  title: string;
  content: string;
  contentHtml?: string;
  keyPoints: string[];
  isDraft: boolean;
  updatedBy: string | null;
  updatedAt: number;
}

export interface QuizOverride {
  moduleId: string;
  scope: 'inline' | 'comprehensive';
  questionIndex: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  isDraft: boolean;
  updatedBy: string | null;
  updatedAt: number;
}

export type EditStatus = 'original' | 'edited' | 'draft';

export interface MergedEdits {
  sections: EditStatus[];          // one entry per section
  inlineQuiz: EditStatus[];        // one entry per inlineQuiz item
  quiz: EditStatus[];              // one entry per quiz item
}

export interface MergedModule {
  module: Module;
  edits: MergedEdits;
}

export function mergeModule(
  staticModule: Module,
  sectionOverrides: SectionOverride[],
  quizOverrides: QuizOverride[],
): MergedModule { ... }
```

Merge rules:
- For each section index `i`: if a `section_overrides` row exists at `(module_id, i)`, replace the static section. `edits.sections[i] = isDraft ? 'draft' : 'edited'`.
- For each quiz item at `(scope, i)`: if a `quiz_overrides` row exists, replace it. `edits[scope][i] = isDraft ? 'draft' : 'edited'`.
- Otherwise `edits[*][i] = 'original'`.

The hook decides whether to fetch drafts based on the current user's role; the merge function is the same in both cases — it just sees fewer rows for residents.

## Client hook

New file: `lib/use-module-content.ts`.

```ts
export function useModuleContent(
  moduleId: string,
  staticModule: Module,
): {
  module: Module;
  edits: MergedEdits;
  isAdminUser: boolean;
  loading: boolean;
  refresh: () => void;
};
```

- On mount: render static module immediately. Then `fetch('/api/module-overrides/[moduleId]')` (residents) or `fetch('/api/admin/module-overrides/[moduleId]')` (admins). Merge result into state.
- `refresh()` re-runs the fetch. Called by edit modals after a successful save.
- Re-fetches on `user` change (so logging in flips between published-only and full views).
- If the fetch fails: keep showing the static module. Log to console. Do not throw.

`ContentReader` and `QuizComponent` are refactored to read from `useModuleContent` instead of their `module` prop directly. They still accept the static `Module` as a prop (used as the seed for the hook).

## API surface

All routes use `verifyAdmin()` unless noted.

### Public (no admin check; bare `verifySession()` not required either — content is not user-specific)

`GET /api/module-overrides/[moduleId]`
→ Returns `{ sections: SectionOverride[], quiz: QuizOverride[] }` where `is_draft = false`. Used by residents.

### Admin

`GET /api/admin/module-overrides/[moduleId]`
→ Returns the same shape as the public endpoint but includes draft rows. Admin only.

`PUT /api/admin/module-overrides/[moduleId]/section`
→ Body: `{ sectionIndex: number, payload: { title, content, contentHtml?, keyPoints[] }, publish: boolean }`.
→ Upserts on `(module_id, section_index)` with `is_draft = !publish`. Sets `updated_by = session.sub`, `updated_at = now()`.
→ Returns the persisted row.

`PUT /api/admin/module-overrides/[moduleId]/quiz`
→ Body: `{ scope: 'inline'|'comprehensive', questionIndex: number, payload: { question, options[], answer, explanation }, publish: boolean }`.
→ Same upsert pattern keyed by `(module_id, scope, question_index)`.

`POST /api/admin/module-overrides/[moduleId]/publish`
→ Body: one of:
  - `{ kind: 'section', sectionIndex: number }`
  - `{ kind: 'quiz', scope, questionIndex }`
→ Flips `is_draft` to `false` on the matching row. 404 if no row.

`DELETE /api/admin/module-overrides/[moduleId]/section/[index]`
→ Deletes the row. Reverts to static content.

`DELETE /api/admin/module-overrides/[moduleId]/quiz/[scope]/[index]`
→ Same for quiz.

## UI components

All new files under `components/admin/`.

### `<AdminBadge status>`
Small pill rendered inline next to each editable item.
- `status='original'` → no badge.
- `status='edited'` → green "Edited".
- `status='draft'` → amber "Draft".

Hidden entirely for non-admins.

### `<EditPencil onClick title>`
Pencil icon button (lucide `Pencil`), visible only to admins. Positioned beside the item it edits (section title, key-point list header, quiz card header).

### `<SectionEditModal>`
Props: `{ moduleId, sectionIndex, initial: Section, currentStatus: EditStatus, onClose, onSaved }`.

Modal form:
- **Title** — text input.
- **Content** — auto-growing textarea, generous min-height.
- **Key points** — list of rows. Each row: textarea + up/down arrow buttons + delete-row button. "+ Add key point" button at the bottom (allowed — this isn't "structural" since key points belong to the section).
- Footer:
  - "Revert to original" (only shown if `currentStatus !== 'original'`) → calls DELETE endpoint, refreshes.
  - "Cancel" → closes.
  - "Save draft" → PUT with `publish: false`.
  - "Save & publish" → PUT with `publish: true`.
- Esc closes, Cmd/Ctrl+Enter triggers Save draft.
- Shows the "saved" / "publishing" / "error" feedback.

Note: `contentHtml` is preserved if present in the static module but is NOT editable in v1 (it's docx-derived reference HTML; editing safely requires a different UI). The modal shows a note "Reference table is preserved; not editable in this view." On save, the modal includes the static `contentHtml` verbatim in the PUT payload so the override row stores it alongside the edited title/content/keyPoints. The API does not strip or transform `contentHtml`.

### `<QuizEditModal>`
Props: `{ moduleId, scope, questionIndex, initial: QuizQuestion, currentStatus, onClose, onSaved }`.

Modal form:
- **Question** — textarea.
- **Options** — four textareas (A, B, C, D). Radio button next to each to mark correct answer. Reorder controls (up/down) per option.
- **Explanation** — textarea.
- Footer mirrors `SectionEditModal`.

Options array is fixed at length 4 in v1 (matching all existing module data).

### Wiring into existing components

`ContentReader` and `QuizComponent` already accept a `Module` prop. They will:
1. Call `useModuleContent(module.id, module)` and read from the returned merged module.
2. Render `<EditPencil>` next to each section title and each `<InlineQuestion>` card.
3. Render `<AdminBadge>` next to each editable item.
4. Hold local state for which edit modal is open (`editingSection: number | null`, `editingQuiz: { scope, index } | null`).
5. Mount the modals at the bottom of their JSX trees when state is non-null.

`<FlaggableKeyPoint>` is rendered inside the section's key-points list — the existing flag-this-point UI is preserved. The pencil affects the entire section (including the whole key-points list), not individual key points. (Editing one key point in isolation would create cross-array merge complexity we explicitly want to avoid.)

The comprehensive quiz UI (`<QuizComponent>`) renders the questions one at a time during the quiz flow. The pencil for editing a comprehensive quiz question appears on each question card — at a minimum, on the question review screen after submission. (TBD: also during the live quiz? Current decision: only on the post-submission review screen, to avoid visual clutter during taking.)

## Behavior details

### Draft visibility

- Admins fetching `/api/admin/module-overrides/[moduleId]` see all rows.
- Residents (or anonymous) fetching `/api/module-overrides/[moduleId]` see only `is_draft = false`.
- The UI hook decides which endpoint to call based on `useAuth().user?.role`.

### Publish semantics

- "Save draft" upserts with `is_draft = true`. If a published row exists for that (module, index), it is REPLACED — i.e., publishing a draft overwrites the prior published version. There is intentionally no "draft on top of published" two-row state for v1.
- "Save & publish" upserts with `is_draft = false`.
- "Promote draft" (the `POST /publish` endpoint) flips an existing draft to published without modifying the payload.

### Revert semantics

- DELETE the row. The merge layer sees no override; the static JSON value is shown.
- Reverting a draft and reverting a published override are the same operation. There is no "revert to previously published version" — that would require a history table (deferred).

### Empty input

- Empty title or content rejected by the API with 400. Empty key points list allowed (admin may want to remove all bullets but keep the section). Empty options rejected. Single-character question rejected (`< 5` chars).

### Concurrent edits

- Last-write-wins. The `updated_at` and `updated_by` columns make it possible to surface "edited 5 minutes ago by X" warnings if needed, but no soft-locking or optimistic-concurrency check is implemented.

### When the static JSON changes (deploy time)

- Static updates flow through for items WITHOUT an override row.
- Items WITH an override row continue to show the override. If the underlying static section was renumbered (e.g., section 3 was deleted upstream), the override row's `section_index` may now point at a different section — this is a known sharp edge of using array index as the key. Mitigation: any structural change to module JSON should be paired with a manual sweep of override rows for that module. Acceptable for v1 because we explicitly forbid structural editing through the admin UI.

## Files touched / created

**Created:**

- `scripts/setup-supabase.sql` — append `section_overrides` and `quiz_overrides` table DDL.
- `lib/module-overrides.ts` — types + `mergeModule()`.
- `lib/use-module-content.ts` — client hook.
- `app/api/module-overrides/[moduleId]/route.ts` — public GET.
- `app/api/admin/module-overrides/[moduleId]/route.ts` — admin GET (drafts included).
- `app/api/admin/module-overrides/[moduleId]/section/route.ts` — PUT.
- `app/api/admin/module-overrides/[moduleId]/section/[index]/route.ts` — DELETE.
- `app/api/admin/module-overrides/[moduleId]/quiz/route.ts` — PUT.
- `app/api/admin/module-overrides/[moduleId]/quiz/[scope]/[index]/route.ts` — DELETE.
- `app/api/admin/module-overrides/[moduleId]/publish/route.ts` — POST.
- `components/admin/admin-badge.tsx`
- `components/admin/edit-pencil.tsx`
- `components/admin/section-edit-modal.tsx`
- `components/admin/quiz-edit-modal.tsx`

**Modified:**

- `lib/session.ts` — add `verifyAdmin()`.
- `lib/use-auth.tsx` — extend user shape with `role`, refresh role on auth state changes.
- `app/api/auth/me/route.ts` (or wherever current user is returned) — include `role` in response.
- `app/api/admin/residents/route.ts` (and any other admin endpoints using bare `verifySession()`) — switch to `verifyAdmin()`.
- `components/content-reader.tsx` — call `useModuleContent`, render edit affordances for admins.
- `components/quiz-component.tsx` — same.

## Testing

This project has no automated test framework. Verification is manual:

1. **Schema migration**: user runs the new DDL in Supabase SQL editor.
2. **Admin gate**: log in as a non-admin resident → confirm no pencils/badges visible. Log in as admin → pencils visible.
3. **Section edit**: edit a section, save as draft → resident sees original content; admin sees the draft with amber badge. Publish the draft → resident sees the new content.
4. **Quiz edit (inline)**: same flow for an inline question. Confirm rendered in the right section.
5. **Quiz edit (comprehensive)**: same flow for a comprehensive question. Confirm rendered in the post-submission review.
6. **Revert**: edit a section, then revert → resident view returns to static content.
7. **Admin endpoint rejection**: `curl` an admin endpoint without admin session → 401/403.
8. **Static JSON change**: edit a non-overridden section in JSON, redeploy → resident sees update. Edit an overridden section in JSON, redeploy → resident still sees the override.

## Migration / rollout

1. Run the new DDL in Supabase SQL editor.
2. Deploy the code.
3. No data migration: feature is purely additive.
4. Verify by editing one section in production as the admin user.

## Open question for implementation phase

- Should comprehensive-quiz pencil controls also appear during the live quiz, or only on the review screen? Spec defaults to **only the review screen** but the plan can revisit if the UX feels off.
