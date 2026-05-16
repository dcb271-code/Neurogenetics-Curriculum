# Per-Module Notepad — Design

**Date:** 2026-05-16
**Status:** Approved (pending user review of this document)

## Summary

Add a free-form notepad for logged-in users, one note per module. Editable from both the slide presenter (as a drawer) and the module landing page (as an inline card). Notes are merged into the existing per-module groups on the Review Dashboard alongside flagged key points.

## Motivation

The existing review system supports only discrete flagged "key points" lifted from prewritten section content. Residents have no way to record their own thoughts, questions, or synthesis while studying a module. This adds a single durable scratch pad per module that lives next to their flagged items in the Review Dashboard.

## Non-Goals

- No markdown or rich-text formatting (plain text with newlines).
- No version history or multiple timestamped entries per module.
- No flashcard / spaced-review mode for notes (flashcards remain a flag-only feature).
- No sharing, export, or attachments.

## Data Model

New `notes` table:

```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(resident_id, module_id)
);
CREATE INDEX idx_notes_resident ON notes(resident_id);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
```

- One row per (resident, module). `UNIQUE` enforces this.
- `module_title` is denormalized (same pattern as the `flags` table) so the Review Dashboard can render module group headers without joining module JSON.
- `updated_at` is bumped server-side on every upsert.
- RLS enabled but no policies — API routes use the service-role key, matching the rest of the schema.
- An empty/whitespace-only `content` is treated as "no note": the API deletes the row instead of storing it.

The SQL goes in `scripts/setup-supabase.sql` (the canonical schema file) and must be run in the Supabase SQL editor as part of the deploy.

## API

New file: `app/api/notes/route.ts`. Three operations, both guarded by `verifySession()`:

### `GET /api/notes`
Returns all notes for the logged-in user, used by the Review Dashboard.
Response:
```json
{ "notes": [{ "moduleId": "...", "moduleTitle": "...", "content": "...", "updatedAt": 1234567890 }] }
```
Unauthenticated → `{ notes: [] }` with status 401 (mirrors `/api/flags`).

### `GET /api/notes?moduleId=X`
Returns the single note for that module, used by the edit surfaces on first mount.
Response:
```json
{ "note": { "moduleId": "...", "moduleTitle": "...", "content": "...", "updatedAt": 1234567890 } | null }
```

### `PUT /api/notes`
Upsert. Body: `{ moduleId, moduleTitle, content }`.
- If `content.trim() === ""`, delete the row (returns `{ ok: true, note: null }`).
- Otherwise upsert by `(resident_id, module_id)` and return `{ ok: true, note: {...} }`.
- Unauthenticated → 401.

Implementation uses `supabase.from("notes").upsert(..., { onConflict: "resident_id,module_id" })`.

## Client Hooks

New file: `lib/notes.ts`.

### `useNotes()`
Used by the Review Dashboard. Fetches all notes on mount when a user is present. Returns `{ notes, isLoading }`. Shape mirrors `useFlags()`.

### `useModuleNote(moduleId, moduleTitle)`
Used by edit surfaces. Returns `{ content, setContent, status }`:

- On mount, fetches `GET /api/notes?moduleId=X` and seeds `content`.
- `setContent(text)` updates local state immediately and schedules a debounced `PUT` (800 ms after last keystroke).
- `status` is `"idle" | "saving" | "saved"`. After a successful save, status flips to `"saved"` and remains until the next edit, when it returns to `"idle"`.
- Unmount during a pending save: flush immediately (best effort `PUT` in cleanup).
- Not-logged-in: hook returns a no-op (`content: ""`, `setContent` does nothing) — edit surfaces will gate visibility themselves.

## Edit Surfaces

Single shared component: `components/note-editor.tsx`. Renders a `<textarea>` (auto-growing, `whitespace-pre-wrap` on display), a status indicator ("Saving…" / "Saved"), and uses `useModuleNote`. Two host wrappers:

### Slide presenter drawer
Edit `components/slide-presenter.tsx`:
- Add a "Notes" button to the toolbar (icon: `Notebook` or `StickyNote` from lucide-react).
- Clicking opens a right-side drawer over the slide pane. Drawer contains `<NoteEditor moduleId moduleTitle />`.
- The drawer is local to the slide presenter — no global state. Closing the drawer keeps the autosave running until quiet.
- Drawer should not block keyboard navigation when closed; when open, Esc closes it.

### Module landing page card
Edit `app/modules/[moduleId]/page.tsx`:
- Insert a `<ModuleNotePanel>` between the sections list and the quiz CTA.
- Collapsible card. Header shows "My note" with a chevron and (if note exists) a one-line preview. Expanded body renders the same `<NoteEditor>`.
- Default state: collapsed if no existing note, expanded if a note exists.
- Hidden entirely for logged-out users.

## Review Dashboard Integration

Edit `app/review/page.tsx`:

1. Call `useNotes()` alongside `useFlags()`.
2. Build a merged map keyed by `moduleId`:
   ```ts
   { moduleTitle: string; note?: { content, updatedAt }; flags: FlaggedItem[] }
   ```
   This map must include modules that have only a note (current code iterates `byModule` derived from flags only).
3. Module group rendering, top to bottom inside each group:
   - **Note card** (if note exists): soft amber-tinted border to differentiate from flag cards; `whitespace-pre-wrap`; line-clamp to 6 lines with a "Show more" toggle; a small "Updated <relative-time>" stamp; an "Edit" link to `/modules/[moduleId]` that scrolls/expands the note panel.
   - **Flag list**: unchanged from today.
4. Module group header: existing layout. Total count chip changes from "N items" to "N flags · 1 note" when applicable.
5. Empty state copy: update to "No flags or notes yet" and mention both mechanisms.
6. Flashcard Mode button continues to use flags only (notes excluded — explicitly out of scope).

## Behavior Details

- **Autosave debounce:** 800 ms after the last keystroke. Status indicator transitions `idle → saving → saved`.
- **Whitespace-only content:** treated as deletion. The Review Dashboard treats a missing note as absent (no empty card).
- **Concurrent edits:** last writer wins. Acceptable — a single user editing in two tabs is rare and the consequence is small.
- **No optimistic locking, no diffing.** Body is sent as a full string each save.
- **Character limit:** soft cap 20,000 characters enforced client-side (textarea maxLength); no server enforcement needed beyond Postgres TEXT limits.

## Files Touched / Created

**Created:**
- `app/api/notes/route.ts`
- `lib/notes.ts`
- `components/note-editor.tsx`
- `components/module-note-panel.tsx` (the collapsible card wrapper for the module page)

**Edited:**
- `scripts/setup-supabase.sql` — append `notes` table DDL
- `components/slide-presenter.tsx` — toolbar button + drawer
- `app/modules/[moduleId]/page.tsx` — embed `<ModuleNotePanel>`
- `app/review/page.tsx` — merge notes into per-module groups; update empty state

## Testing

- Manual: create a note from the slide presenter, verify it appears on the module page and review dashboard. Edit from the module page, verify drawer reflects the change after reopening. Clear note content, verify the row is deleted and disappears from the dashboard.
- Auth: hit `/api/notes` endpoints without a session, expect 401 / empty.
- Review dashboard: module with only a note (no flags) must still render a group.
- Logged-out user visiting `/modules/[moduleId]/slides`: no Notes button shown.

## Migration / Rollout

1. Run the new DDL in Supabase SQL editor (production database).
2. Deploy code.
3. No data migration: feature is purely additive; existing residents start with zero notes.
