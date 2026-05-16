# Admin Inline Content Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let admins edit section content/key-points and inline + comprehensive quiz questions live, with a draft → publish workflow. Edits stored in Supabase override tables; merge on render; revert deletes the row.

**Architecture:** Two override tables (`section_overrides`, `quiz_overrides`), each storing the entire updated item keyed by (module_id, index). Static JSON from `data/modules/*.json` loads as today. A new client hook (`useModuleContent`) fetches overrides at render time and merges them over the static module. Admin-gated endpoints handle upsert/publish/delete. UI: pencil buttons + modal editors on the regular module page, visible only when `session.role === 'admin'`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, Supabase (PostgreSQL via `@/lib/supabase`), `jose` JWT session (existing).

**Spec:** `docs/superpowers/specs/2026-05-16-admin-content-editing-design.md`

**Testing convention:** No automated test framework. Each task verifies via `npx tsc --noEmit` for types, `npm run build` at major checkpoints, and `curl` / manual UI for endpoints. The user has stated they will run the SQL migration manually post-deploy, so most live-DB tests are deferred to the final integration task.

**Pre-existing context the engineer should know:**
- `User` type at `lib/use-auth.tsx:5-10` already includes `role: string`; `/api/auth/me` already returns it. Nothing to extend.
- `verifySession()` lives at `lib/session.ts:23-33`. Existing admin endpoints (`app/api/admin/residents/route.ts`) currently only call `verifySession()`, not a role check — that gap is closed in Task 2.
- `getModuleById(id)` from `lib/modules.ts` returns the static `Module` object; static module data lives in `data/modules/*.json`.
- `ContentReader` is the main viewer for sections + inline quiz. `QuizComponent` is the comprehensive quiz. Both receive `module: Module` as a prop today.
- `supabase` proxy is exported from `@/lib/supabase`; service-role key bypasses RLS. Match the pattern used in `app/api/flags/route.ts`.

---

### Task 1: Schema migration for override tables

**Files:**
- Modify: `scripts/setup-supabase.sql`

- [ ] **Step 1: Append override-table DDL**

After the existing `notes` table block (added in a prior feature), append:

```sql
-- Admin override of section content (one row per overridden section)
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

-- Admin override of quiz questions (one row per overridden question, per scope)
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
```

Append to the `-- Indexes` section:

```sql
CREATE INDEX idx_section_overrides_module ON section_overrides(module_id);
CREATE INDEX idx_quiz_overrides_module ON quiz_overrides(module_id, scope);
```

Append to the RLS block:

```sql
ALTER TABLE section_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_overrides ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 2: Commit**

```bash
git add scripts/setup-supabase.sql
git commit -m "feat(schema): add section_overrides and quiz_overrides tables"
```

- [ ] **Step 3: User runs migration in Supabase**

The engineer does NOT execute the DDL. The user runs the new `CREATE TABLE` / `CREATE INDEX` / `ALTER TABLE` statements in the Supabase Dashboard SQL Editor. Live DB checks are deferred to Task 15.

---

### Task 2: Add `verifyAdmin()` helper and retrofit existing admin endpoints

**Files:**
- Modify: `lib/session.ts`
- Modify: `app/api/admin/residents/route.ts`

- [ ] **Step 1: Add helper to `lib/session.ts`**

Append below the existing `verifySession()` function:

```ts
export async function verifyAdmin(): Promise<SessionPayload | null> {
  const session = await verifySession();
  if (!session || session.role !== "admin") return null;
  return session;
}
```

- [ ] **Step 2: Switch the residents admin route to `verifyAdmin()`**

Open `app/api/admin/residents/route.ts`. Change the import line:

```ts
import { verifySession } from "@/lib/session";
```

to:

```ts
import { verifyAdmin } from "@/lib/session";
```

Replace every call to `verifySession()` in that file with `verifyAdmin()` — the function signatures are identical (both return `SessionPayload | null`), so no other code changes are needed.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add lib/session.ts app/api/admin/residents/route.ts
git commit -m "feat(session): add verifyAdmin() helper and require role on admin endpoints"
```

---

### Task 3: Create merge layer types and function

**Files:**
- Create: `lib/module-overrides.ts`

- [ ] **Step 1: Write the file**

Create `lib/module-overrides.ts` with this exact content:

```ts
import { Module, Section, QuizQuestion } from "@/lib/types";

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
  scope: "inline" | "comprehensive";
  questionIndex: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  isDraft: boolean;
  updatedBy: string | null;
  updatedAt: number;
}

export type EditStatus = "original" | "edited" | "draft";

export interface MergedEdits {
  sections: EditStatus[];
  inlineQuiz: EditStatus[];
  quiz: EditStatus[];
}

export interface MergedModule {
  module: Module;
  edits: MergedEdits;
}

function statusFor(override: { isDraft: boolean } | undefined): EditStatus {
  if (!override) return "original";
  return override.isDraft ? "draft" : "edited";
}

export function mergeModule(
  staticModule: Module,
  sectionOverrides: SectionOverride[],
  quizOverrides: QuizOverride[],
): MergedModule {
  const sectionByIdx = new Map<number, SectionOverride>();
  for (const o of sectionOverrides) sectionByIdx.set(o.sectionIndex, o);

  const inlineByIdx = new Map<number, QuizOverride>();
  const compByIdx = new Map<number, QuizOverride>();
  for (const o of quizOverrides) {
    (o.scope === "inline" ? inlineByIdx : compByIdx).set(o.questionIndex, o);
  }

  const sections: Section[] = staticModule.sections.map((s, i) => {
    const o = sectionByIdx.get(i);
    if (!o) return s;
    return {
      title: o.title,
      content: o.content,
      contentHtml: o.contentHtml,
      keyPoints: o.keyPoints,
    };
  });

  const applyQuizOverride = (q: QuizQuestion, o: QuizOverride | undefined): QuizQuestion => {
    if (!o) return q;
    return {
      question: o.question,
      options: o.options,
      answer: o.answer,
      explanation: o.explanation,
    };
  };

  const inlineQuiz = (staticModule.inlineQuiz ?? []).map((q, i) =>
    applyQuizOverride(q, inlineByIdx.get(i)),
  );
  const quiz = staticModule.quiz.map((q, i) =>
    applyQuizOverride(q, compByIdx.get(i)),
  );

  const merged: Module = {
    ...staticModule,
    sections,
    quiz,
    ...(staticModule.inlineQuiz !== undefined ? { inlineQuiz } : {}),
  };

  const edits: MergedEdits = {
    sections: sections.map((_, i) => statusFor(sectionByIdx.get(i))),
    inlineQuiz: (staticModule.inlineQuiz ?? []).map((_, i) => statusFor(inlineByIdx.get(i))),
    quiz: staticModule.quiz.map((_, i) => statusFor(compByIdx.get(i))),
  };

  return { module: merged, edits };
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add lib/module-overrides.ts
git commit -m "feat(lib): add module-overrides types and mergeModule function"
```

---

### Task 4: Public GET endpoint for overrides

**Files:**
- Create: `app/api/module-overrides/[moduleId]/route.ts`

- [ ] **Step 1: Write the route**

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { SectionOverride, QuizOverride } from "@/lib/module-overrides";

interface SectionRow {
  module_id: string;
  section_index: number;
  title: string;
  content: string;
  content_html: string | null;
  key_points: string[];
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

interface QuizRow {
  module_id: string;
  scope: "inline" | "comprehensive";
  question_index: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

function toSection(row: SectionRow): SectionOverride {
  return {
    moduleId: row.module_id,
    sectionIndex: row.section_index,
    title: row.title,
    content: row.content,
    contentHtml: row.content_html ?? undefined,
    keyPoints: row.key_points,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

function toQuiz(row: QuizRow): QuizOverride {
  return {
    moduleId: row.module_id,
    scope: row.scope,
    questionIndex: row.question_index,
    question: row.question,
    options: row.options,
    answer: row.answer,
    explanation: row.explanation,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const { moduleId } = params;

  const [secRes, quizRes] = await Promise.all([
    supabase
      .from("section_overrides")
      .select("*")
      .eq("module_id", moduleId)
      .eq("is_draft", false),
    supabase
      .from("quiz_overrides")
      .select("*")
      .eq("module_id", moduleId)
      .eq("is_draft", false),
  ]);

  if (secRes.error) {
    return NextResponse.json({ error: secRes.error.message }, { status: 500 });
  }
  if (quizRes.error) {
    return NextResponse.json({ error: quizRes.error.message }, { status: 500 });
  }

  return NextResponse.json({
    sections: (secRes.data ?? []).map((r) => toSection(r as SectionRow)),
    quiz: (quizRes.data ?? []).map((r) => toQuiz(r as QuizRow)),
  });
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add app/api/module-overrides/\[moduleId\]/route.ts
git commit -m "feat(api): add public GET /api/module-overrides/[moduleId]"
```

---

### Task 5: Admin GET endpoint for overrides (includes drafts)

**Files:**
- Create: `app/api/admin/module-overrides/[moduleId]/route.ts`

- [ ] **Step 1: Write the route**

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";
import type { SectionOverride, QuizOverride } from "@/lib/module-overrides";

interface SectionRow {
  module_id: string;
  section_index: number;
  title: string;
  content: string;
  content_html: string | null;
  key_points: string[];
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

interface QuizRow {
  module_id: string;
  scope: "inline" | "comprehensive";
  question_index: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

function toSection(row: SectionRow): SectionOverride {
  return {
    moduleId: row.module_id,
    sectionIndex: row.section_index,
    title: row.title,
    content: row.content,
    contentHtml: row.content_html ?? undefined,
    keyPoints: row.key_points,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

function toQuiz(row: QuizRow): QuizOverride {
  return {
    moduleId: row.module_id,
    scope: row.scope,
    questionIndex: row.question_index,
    question: row.question,
    options: row.options,
    answer: row.answer,
    explanation: row.explanation,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { moduleId } = params;

  const [secRes, quizRes] = await Promise.all([
    supabase.from("section_overrides").select("*").eq("module_id", moduleId),
    supabase.from("quiz_overrides").select("*").eq("module_id", moduleId),
  ]);

  if (secRes.error) {
    return NextResponse.json({ error: secRes.error.message }, { status: 500 });
  }
  if (quizRes.error) {
    return NextResponse.json({ error: quizRes.error.message }, { status: 500 });
  }

  return NextResponse.json({
    sections: (secRes.data ?? []).map((r) => toSection(r as SectionRow)),
    quiz: (quizRes.data ?? []).map((r) => toQuiz(r as QuizRow)),
  });
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/module-overrides/\[moduleId\]/route.ts
git commit -m "feat(api): add admin GET /api/admin/module-overrides/[moduleId]"
```

---

### Task 6: Admin section upsert + delete endpoints

**Files:**
- Create: `app/api/admin/module-overrides/[moduleId]/section/route.ts`
- Create: `app/api/admin/module-overrides/[moduleId]/section/[index]/route.ts`

- [ ] **Step 1: Write the PUT endpoint**

`app/api/admin/module-overrides/[moduleId]/section/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

interface PutBody {
  sectionIndex?: number;
  payload?: {
    title?: string;
    content?: string;
    contentHtml?: string;
    keyPoints?: string[];
  };
  publish?: boolean;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body: PutBody = await req.json();
  const { sectionIndex, payload, publish } = body;

  if (typeof sectionIndex !== "number" || sectionIndex < 0) {
    return NextResponse.json({ error: "sectionIndex required" }, { status: 400 });
  }
  if (!payload) {
    return NextResponse.json({ error: "payload required" }, { status: 400 });
  }
  const { title, content, contentHtml, keyPoints } = payload;
  if (typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  if (typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }
  if (!Array.isArray(keyPoints) || keyPoints.some((k) => typeof k !== "string")) {
    return NextResponse.json({ error: "keyPoints must be string[]" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("section_overrides")
    .upsert(
      {
        module_id: params.moduleId,
        section_index: sectionIndex,
        title,
        content,
        content_html: typeof contentHtml === "string" ? contentHtml : null,
        key_points: keyPoints,
        is_draft: publish !== true,
        updated_by: session.sub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "module_id,section_index" },
    )
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}
```

- [ ] **Step 2: Write the DELETE endpoint**

`app/api/admin/module-overrides/[moduleId]/section/[index]/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { moduleId: string; index: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sectionIndex = Number(params.index);
  if (!Number.isInteger(sectionIndex) || sectionIndex < 0) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const { error } = await supabase
    .from("section_overrides")
    .delete()
    .eq("module_id", params.moduleId)
    .eq("section_index", sectionIndex);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/module-overrides/\[moduleId\]/section/
git commit -m "feat(api): add admin section override PUT and DELETE"
```

---

### Task 7: Admin quiz upsert + delete endpoints

**Files:**
- Create: `app/api/admin/module-overrides/[moduleId]/quiz/route.ts`
- Create: `app/api/admin/module-overrides/[moduleId]/quiz/[scope]/[index]/route.ts`

- [ ] **Step 1: Write the PUT endpoint**

`app/api/admin/module-overrides/[moduleId]/quiz/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

interface PutBody {
  scope?: "inline" | "comprehensive";
  questionIndex?: number;
  payload?: {
    question?: string;
    options?: string[];
    answer?: number;
    explanation?: string;
  };
  publish?: boolean;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body: PutBody = await req.json();
  const { scope, questionIndex, payload, publish } = body;

  if (scope !== "inline" && scope !== "comprehensive") {
    return NextResponse.json({ error: "scope must be inline or comprehensive" }, { status: 400 });
  }
  if (typeof questionIndex !== "number" || questionIndex < 0) {
    return NextResponse.json({ error: "questionIndex required" }, { status: 400 });
  }
  if (!payload) {
    return NextResponse.json({ error: "payload required" }, { status: 400 });
  }
  const { question, options, answer, explanation } = payload;
  if (typeof question !== "string" || question.trim().length < 5) {
    return NextResponse.json({ error: "question must be a non-trivial string" }, { status: 400 });
  }
  if (
    !Array.isArray(options) ||
    options.length === 0 ||
    options.some((o) => typeof o !== "string" || o.trim().length === 0)
  ) {
    return NextResponse.json({ error: "options must be a non-empty string[]" }, { status: 400 });
  }
  if (typeof answer !== "number" || answer < 0 || answer >= options.length) {
    return NextResponse.json({ error: "answer must be a valid option index" }, { status: 400 });
  }
  if (typeof explanation !== "string" || explanation.trim().length === 0) {
    return NextResponse.json({ error: "explanation required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quiz_overrides")
    .upsert(
      {
        module_id: params.moduleId,
        scope,
        question_index: questionIndex,
        question,
        options,
        answer,
        explanation,
        is_draft: publish !== true,
        updated_by: session.sub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "module_id,scope,question_index" },
    )
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}
```

- [ ] **Step 2: Write the DELETE endpoint**

`app/api/admin/module-overrides/[moduleId]/quiz/[scope]/[index]/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { moduleId: string; scope: string; index: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (params.scope !== "inline" && params.scope !== "comprehensive") {
    return NextResponse.json({ error: "Invalid scope" }, { status: 400 });
  }
  const questionIndex = Number(params.index);
  if (!Number.isInteger(questionIndex) || questionIndex < 0) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const { error } = await supabase
    .from("quiz_overrides")
    .delete()
    .eq("module_id", params.moduleId)
    .eq("scope", params.scope)
    .eq("question_index", questionIndex);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/module-overrides/\[moduleId\]/quiz/
git commit -m "feat(api): add admin quiz override PUT and DELETE"
```

---

### Task 8: Admin publish endpoint

**Files:**
- Create: `app/api/admin/module-overrides/[moduleId]/publish/route.ts`

- [ ] **Step 1: Write the endpoint**

```ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

type PublishBody =
  | { kind: "section"; sectionIndex: number }
  | { kind: "quiz"; scope: "inline" | "comprehensive"; questionIndex: number };

export async function POST(
  req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as PublishBody;

  if (body.kind === "section") {
    if (typeof body.sectionIndex !== "number" || body.sectionIndex < 0) {
      return NextResponse.json({ error: "sectionIndex required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("section_overrides")
      .update({ is_draft: false, updated_at: new Date().toISOString() })
      .eq("module_id", params.moduleId)
      .eq("section_index", body.sectionIndex)
      .select("*")
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "No draft to publish" }, { status: 404 });
    return NextResponse.json({ ok: true, row: data });
  }

  if (body.kind === "quiz") {
    if (body.scope !== "inline" && body.scope !== "comprehensive") {
      return NextResponse.json({ error: "scope invalid" }, { status: 400 });
    }
    if (typeof body.questionIndex !== "number" || body.questionIndex < 0) {
      return NextResponse.json({ error: "questionIndex required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("quiz_overrides")
      .update({ is_draft: false, updated_at: new Date().toISOString() })
      .eq("module_id", params.moduleId)
      .eq("scope", body.scope)
      .eq("question_index", body.questionIndex)
      .select("*")
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "No draft to publish" }, { status: 404 });
    return NextResponse.json({ ok: true, row: data });
  }

  return NextResponse.json({ error: "kind must be section or quiz" }, { status: 400 });
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/module-overrides/\[moduleId\]/publish/route.ts
git commit -m "feat(api): add admin publish endpoint for overrides"
```

---

### Task 9: Client merge hook

**Files:**
- Create: `lib/use-module-content.ts`

- [ ] **Step 1: Write the hook**

```ts
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Module } from "@/lib/types";
import { useAuth } from "@/lib/use-auth";
import {
  SectionOverride,
  QuizOverride,
  MergedEdits,
  mergeModule,
} from "@/lib/module-overrides";

export function useModuleContent(moduleId: string, staticModule: Module) {
  const { user } = useAuth();
  const isAdminUser = user?.role === "admin";

  const [sectionOverrides, setSectionOverrides] = useState<SectionOverride[]>([]);
  const [quizOverrides, setQuizOverrides] = useState<QuizOverride[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOverrides = useCallback(async () => {
    const url = isAdminUser
      ? `/api/admin/module-overrides/${moduleId}`
      : `/api/module-overrides/${moduleId}`;
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        setSectionOverrides([]);
        setQuizOverrides([]);
        return;
      }
      const data = await res.json();
      setSectionOverrides(data.sections ?? []);
      setQuizOverrides(data.quiz ?? []);
    } catch {
      setSectionOverrides([]);
      setQuizOverrides([]);
    } finally {
      setLoading(false);
    }
  }, [moduleId, isAdminUser]);

  useEffect(() => {
    fetchOverrides();
  }, [fetchOverrides]);

  const { module, edits } = useMemo(
    () => mergeModule(staticModule, sectionOverrides, quizOverrides),
    [staticModule, sectionOverrides, quizOverrides],
  );

  return {
    module,
    edits,
    isAdminUser,
    loading,
    refresh: fetchOverrides,
  } as {
    module: Module;
    edits: MergedEdits;
    isAdminUser: boolean;
    loading: boolean;
    refresh: () => Promise<void>;
  };
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add lib/use-module-content.ts
git commit -m "feat(lib): add useModuleContent merge hook"
```

---

### Task 10: AdminBadge + EditPencil components

**Files:**
- Create: `components/admin/admin-badge.tsx`
- Create: `components/admin/edit-pencil.tsx`

- [ ] **Step 1: Write `admin-badge.tsx`**

```tsx
"use client";

import { EditStatus } from "@/lib/module-overrides";
import { cn } from "@/lib/utils";

export function AdminBadge({
  status,
  className,
}: {
  status: EditStatus;
  className?: string;
}) {
  if (status === "original") return null;
  const isDraft = status === "draft";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        isDraft
          ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
          : "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30",
        className,
      )}
    >
      {isDraft ? "Draft" : "Edited"}
    </span>
  );
}
```

- [ ] **Step 2: Write `edit-pencil.tsx`**

```tsx
"use client";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditPencil({
  onClick,
  title,
  className,
}: {
  onClick: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? "Edit"}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
        className,
      )}
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add components/admin/admin-badge.tsx components/admin/edit-pencil.tsx
git commit -m "feat(ui): add AdminBadge and EditPencil components"
```

---

### Task 11: SectionEditModal

**Files:**
- Create: `components/admin/section-edit-modal.tsx`

- [ ] **Step 1: Write the modal**

```tsx
"use client";

import { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { Section } from "@/lib/types";
import { EditStatus } from "@/lib/module-overrides";
import { Button } from "@/components/ui/button";
import { AdminBadge } from "@/components/admin/admin-badge";

interface Props {
  moduleId: string;
  sectionIndex: number;
  initial: Section;
  currentStatus: EditStatus;
  onClose: () => void;
  onSaved: () => void;
}

export function SectionEditModal({
  moduleId,
  sectionIndex,
  initial,
  currentStatus,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [keyPoints, setKeyPoints] = useState<string[]>(initial.keyPoints ?? []);
  const [saving, setSaving] = useState<"idle" | "draft" | "publish" | "revert" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, title, content, keyPoints]);

  async function save(publish: boolean) {
    setSaving(publish ? "publish" : "draft");
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/module-overrides/${moduleId}/section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionIndex,
          payload: {
            title,
            content,
            contentHtml: initial.contentHtml,
            keyPoints,
          },
          publish,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Save failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
      setSaving("error");
    }
  }

  async function revert() {
    setSaving("revert");
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/admin/module-overrides/${moduleId}/section/${sectionIndex}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Revert failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Revert failed");
      setSaving("error");
    }
  }

  function updateKp(i: number, value: string) {
    setKeyPoints((prev) => prev.map((kp, idx) => (idx === i ? value : kp)));
  }
  function moveKp(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= keyPoints.length) return;
    setKeyPoints((prev) => {
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  }
  function deleteKp(i: number) {
    setKeyPoints((prev) => prev.filter((_, idx) => idx !== i));
  }
  function addKp() {
    setKeyPoints((prev) => [...prev, ""]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        role="dialog"
        aria-label="Edit section"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Edit section</h2>
            <AdminBadge status={currentStatus} />
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            title="Close (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="px-5 py-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full min-h-[200px] rounded-lg border bg-background p-2 text-sm leading-relaxed whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          {initial.contentHtml && (
            <p className="text-[11px] text-muted-foreground italic">
              Reference table from the source document is preserved; not editable in this view.
            </p>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key points</span>
              <button
                type="button"
                onClick={addKp}
                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <textarea
                    value={kp}
                    onChange={(e) => updateKp(i, e.target.value)}
                    rows={2}
                    className="flex-1 rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <button onClick={() => moveKp(i, -1)} disabled={i === 0} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => moveKp(i, 1)} disabled={i === keyPoints.length - 1} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => deleteKp(i)} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {keyPoints.length === 0 && (
                <p className="text-[11px] text-muted-foreground/70 italic">No key points. Click Add to create one.</p>
              )}
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-destructive">{errorMsg}</p>
          )}
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-2 px-5 py-3 border-t bg-background/95 backdrop-blur">
          <div>
            {currentStatus !== "original" && (
              <Button variant="ghost" size="sm" onClick={revert} disabled={saving !== "idle" && saving !== "error"}>
                Revert to original
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "draft" ? "Saving…" : "Save draft"}
            </Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "publish" ? "Publishing…" : "Save & publish"}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add components/admin/section-edit-modal.tsx
git commit -m "feat(ui): add SectionEditModal"
```

---

### Task 12: QuizEditModal

**Files:**
- Create: `components/admin/quiz-edit-modal.tsx`

- [ ] **Step 1: Write the modal**

```tsx
"use client";

import { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";
import { QuizQuestion } from "@/lib/types";
import { EditStatus } from "@/lib/module-overrides";
import { Button } from "@/components/ui/button";
import { AdminBadge } from "@/components/admin/admin-badge";

interface Props {
  moduleId: string;
  scope: "inline" | "comprehensive";
  questionIndex: number;
  initial: QuizQuestion;
  currentStatus: EditStatus;
  onClose: () => void;
  onSaved: () => void;
}

export function QuizEditModal({
  moduleId,
  scope,
  questionIndex,
  initial,
  currentStatus,
  onClose,
  onSaved,
}: Props) {
  const [question, setQuestion] = useState(initial.question);
  const [options, setOptions] = useState<string[]>(initial.options);
  const [answer, setAnswer] = useState<number>(initial.answer);
  const [explanation, setExplanation] = useState(initial.explanation);
  const [saving, setSaving] = useState<"idle" | "draft" | "publish" | "revert" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, question, options, answer, explanation]);

  async function save(publish: boolean) {
    setSaving(publish ? "publish" : "draft");
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/module-overrides/${moduleId}/quiz`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope,
          questionIndex,
          payload: { question, options, answer, explanation },
          publish,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Save failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
      setSaving("error");
    }
  }

  async function revert() {
    setSaving("revert");
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/admin/module-overrides/${moduleId}/quiz/${scope}/${questionIndex}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Revert failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Revert failed");
      setSaving("error");
    }
  }

  function updateOption(i: number, value: string) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? value : o)));
  }
  function moveOption(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= options.length) return;
    setOptions((prev) => {
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
    if (answer === i) setAnswer(target);
    else if (answer === target) setAnswer(i);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        role="dialog"
        aria-label="Edit quiz question"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">
              Edit {scope === "inline" ? "inline" : "comprehensive"} question
            </h2>
            <AdminBadge status={currentStatus} />
          </div>
          <button onClick={onClose} className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Close (Esc)">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="px-5 py-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question</span>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 w-full min-h-[100px] rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Options (select correct answer)</span>
            <div className="mt-1 space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex items-start gap-2">
                  <label className="flex items-center gap-2 pt-2 shrink-0">
                    <input
                      type="radio"
                      name="quiz-answer"
                      checked={answer === i}
                      onChange={() => setAnswer(i)}
                    />
                    <span className="text-xs font-mono opacity-60 w-3">{String.fromCharCode(65 + i)}</span>
                  </label>
                  <textarea
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    rows={2}
                    className="flex-1 rounded-lg border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <button onClick={() => moveOption(i, -1)} disabled={i === 0} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => moveOption(i, 1)} disabled={i === options.length - 1} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explanation</span>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="mt-1 w-full min-h-[120px] rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-2 px-5 py-3 border-t bg-background/95 backdrop-blur">
          <div>
            {currentStatus !== "original" && (
              <Button variant="ghost" size="sm" onClick={revert} disabled={saving !== "idle" && saving !== "error"}>
                Revert to original
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "draft" ? "Saving…" : "Save draft"}
            </Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "publish" ? "Publishing…" : "Save & publish"}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add components/admin/quiz-edit-modal.tsx
git commit -m "feat(ui): add QuizEditModal"
```

---

### Task 13: Wire ContentReader to use the merge hook + render admin affordances

**Files:**
- Modify: `components/content-reader.tsx`

This is the largest modification. The engineer should read the existing file (currently ~770 lines) before editing.

- [ ] **Step 1: Add imports**

At the top of `components/content-reader.tsx`, add (in addition to existing imports):

```tsx
import { useModuleContent } from "@/lib/use-module-content";
import { AdminBadge } from "@/components/admin/admin-badge";
import { EditPencil } from "@/components/admin/edit-pencil";
import { SectionEditModal } from "@/components/admin/section-edit-modal";
import { QuizEditModal } from "@/components/admin/quiz-edit-modal";
```

- [ ] **Step 2: Replace `module` prop reads with the hook output**

In the main `ContentReader` function:
- Locate the line that destructures or reads from the `module` prop and runs `module.sections.map(...)` (around line 574).
- Just before any access to `module.sections` / `module.inlineQuiz`, add:

```tsx
const { module: mergedModule, edits, isAdminUser, refresh } = useModuleContent(module.id, module);
```

- Then update the `module.sections.map(...)` loop to iterate over `mergedModule.sections` instead. Likewise replace the `module.inlineQuiz ?? module.quiz` reference (around line 575) with `mergedModule.inlineQuiz ?? mergedModule.quiz`.
- Anywhere else in the function that reads `module.sections`, `module.inlineQuiz`, `module.quiz`, or `module.title`/`module.duration` for display, route through `mergedModule` instead. (Module metadata like `id` can keep reading from `module` since it's identical.)

- [ ] **Step 3: Add edit-modal state**

Inside the function body, add:

```tsx
const [editingSection, setEditingSection] = useState<number | null>(null);
const [editingQuiz, setEditingQuiz] = useState<{
  scope: "inline" | "comprehensive";
  index: number;
} | null>(null);
```

- [ ] **Step 4: Render edit affordances inside the section map**

In the section heading block (currently rendering `<h2>{section.title}</h2>` around line 599), wrap the section title row to include the pencil + badge for admins:

Find:
```tsx
<h2 className="text-xl font-semibold tracking-tight leading-snug">
  {section.title}
</h2>
```

Change to:
```tsx
<h2 className="text-xl font-semibold tracking-tight leading-snug flex items-center gap-2 flex-wrap">
  {section.title}
  {isAdminUser && (
    <>
      <AdminBadge status={edits.sections[i]} />
      <EditPencil onClick={() => setEditingSection(i)} title="Edit section" />
    </>
  )}
</h2>
```

In the inline quiz block (currently `{inlineQ && <InlineQuestion question={inlineQ} />}` around line 656), change to:

```tsx
{inlineQ && (
  <div className="relative">
    <InlineQuestion question={inlineQ} />
    {isAdminUser && (
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-background/80 backdrop-blur rounded-full px-2 py-0.5">
        <AdminBadge status={edits.inlineQuiz[i] ?? "original"} />
        <EditPencil
          onClick={() => setEditingQuiz({ scope: "inline", index: i })}
          title="Edit question"
        />
      </div>
    )}
  </div>
)}
```

- [ ] **Step 5: Mount modals at the bottom of the JSX tree**

Just before the outermost closing `</div>` of the component's return value, add:

```tsx
{editingSection !== null && (
  <SectionEditModal
    moduleId={module.id}
    sectionIndex={editingSection}
    initial={mergedModule.sections[editingSection]}
    currentStatus={edits.sections[editingSection]}
    onClose={() => setEditingSection(null)}
    onSaved={refresh}
  />
)}
{editingQuiz !== null && (
  <QuizEditModal
    moduleId={module.id}
    scope={editingQuiz.scope}
    questionIndex={editingQuiz.index}
    initial={
      editingQuiz.scope === "inline"
        ? (mergedModule.inlineQuiz ?? mergedModule.quiz)[editingQuiz.index]
        : mergedModule.quiz[editingQuiz.index]
    }
    currentStatus={
      editingQuiz.scope === "inline"
        ? (edits.inlineQuiz[editingQuiz.index] ?? "original")
        : (edits.quiz[editingQuiz.index] ?? "original")
    }
    onClose={() => setEditingQuiz(null)}
    onSaved={refresh}
  />
)}
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 7: Production build sanity check**

Run: `npm run build`
Expected: builds without errors. (No live DB required — overrides simply fetch and fall back to empty if Supabase is down.)

- [ ] **Step 8: Commit**

```bash
git add components/content-reader.tsx
git commit -m "feat(ui): wire ContentReader to override merge hook and admin edit modals"
```

---

### Task 14: Wire QuizComponent review screen to render admin affordances

**Files:**
- Modify: `components/quiz-component.tsx`

- [ ] **Step 1: Read the current file**

Open `components/quiz-component.tsx`. The component is mid-sized (~few hundred lines). Identify:
- The line `const [questions, setQuestions] = useState(module.quiz);` (around line 41).
- The post-submission review render block (rendered when `finished === true`), which iterates over `answerRecords` to show each question, the user's answer, the correct answer, and the explanation.

- [ ] **Step 2: Add imports**

At the top:

```tsx
import { useModuleContent } from "@/lib/use-module-content";
import { AdminBadge } from "@/components/admin/admin-badge";
import { EditPencil } from "@/components/admin/edit-pencil";
import { QuizEditModal } from "@/components/admin/quiz-edit-modal";
```

- [ ] **Step 3: Use the hook**

Inside `QuizComponent`, replace the existing `useState(module.quiz)` initialization. Insert just before that line:

```tsx
const { module: mergedModule, edits, isAdminUser, refresh } = useModuleContent(module.id, module);
```

Change:
```tsx
const [questions, setQuestions] = useState(module.quiz);
```
to:
```tsx
const [questions, setQuestions] = useState(mergedModule.quiz);
```

Add a `useEffect` right below it to re-seed `questions` if the merged quiz changes (which happens when overrides resolve from the network) — but only while the quiz hasn't been started yet:

```tsx
useEffect(() => {
  if (answers.length === 0 && !finished) {
    setQuestions(mergedModule.quiz);
  }
}, [mergedModule.quiz, answers.length, finished]);
```

- [ ] **Step 4: Add modal state**

```tsx
const [editingReviewIdx, setEditingReviewIdx] = useState<number | null>(null);
```

- [ ] **Step 5: Render pencils on the review screen**

In the review-screen JSX (where each `answerRecords` entry is rendered), find the header of each question card (typically a div containing the question number / question text). After the question header, add (admin-only):

```tsx
{isAdminUser && (
  <div className="flex items-center gap-1.5 mt-1">
    <AdminBadge status={edits.quiz[record.questionIndex] ?? "original"} />
    <EditPencil
      onClick={() => setEditingReviewIdx(record.questionIndex)}
      title="Edit question"
    />
  </div>
)}
```

Note: `record.questionIndex` is the index into the *static* `module.quiz` array (already tracked by the component for shuffled quizzes). If the existing code uses a different field name, use that. Engineer should verify by reading the type of `AnswerRecord` near line 30 of the existing file.

- [ ] **Step 6: Mount the modal**

Just before the outermost closing tag of the component's return:

```tsx
{editingReviewIdx !== null && (
  <QuizEditModal
    moduleId={module.id}
    scope="comprehensive"
    questionIndex={editingReviewIdx}
    initial={mergedModule.quiz[editingReviewIdx]}
    currentStatus={edits.quiz[editingReviewIdx] ?? "original"}
    onClose={() => setEditingReviewIdx(null)}
    onSaved={refresh}
  />
)}
```

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 8: Commit**

```bash
git add components/quiz-component.tsx
git commit -m "feat(ui): admin edit affordances on quiz review screen"
```

---

### Task 15: Final integration verification

**Files:** None modified.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: success, all 91 pages render, `/api/module-overrides/[moduleId]` and `/api/admin/module-overrides/[moduleId]` appear as dynamic functions.

- [ ] **Step 2: Local dev sanity test**

`npm run dev`. Test plan (DB migration must be run first by the user; if not yet, this step verifies graceful degradation):

1. Visit `/modules/intro-neurogenetics` as a logged-out user. Sections render. No pencils. No errors in console.
2. Log in as a non-admin user. Visit the same module. No pencils. Console clean.
3. Log in as an admin user (`role = 'admin'` in the residents table). Visit the same module. Pencils appear next to each section title and inline question card.
4. Click a section pencil → modal opens with current content. Edit content. Click "Save draft". Modal closes; section now shows "Draft" badge for the admin; resident-view (incognito) still shows original.
5. Reopen the modal. Click "Save & publish". Modal closes; badge flips to "Edited"; resident view (incognito) now shows the new content.
6. Reopen, click "Revert to original". Modal closes; section returns to static JSON content; badge disappears.
7. Same flow for an inline-question pencil and for a comprehensive-quiz review pencil.
8. As a non-admin, attempt `curl -X PUT http://localhost:3000/api/admin/module-overrides/foo/section -d '{}'` — expect 403.

- [ ] **Step 3: Commit any incidental fixes**

If the smoke test surfaces small fixes (e.g., a missing import, a className typo), commit them on the branch. Otherwise no commit needed.

---

## File Inventory

**Created:**
- `lib/module-overrides.ts` — types + `mergeModule()`
- `lib/use-module-content.ts` — client hook
- `app/api/module-overrides/[moduleId]/route.ts` — public GET
- `app/api/admin/module-overrides/[moduleId]/route.ts` — admin GET
- `app/api/admin/module-overrides/[moduleId]/section/route.ts` — admin PUT
- `app/api/admin/module-overrides/[moduleId]/section/[index]/route.ts` — admin DELETE
- `app/api/admin/module-overrides/[moduleId]/quiz/route.ts` — admin PUT
- `app/api/admin/module-overrides/[moduleId]/quiz/[scope]/[index]/route.ts` — admin DELETE
- `app/api/admin/module-overrides/[moduleId]/publish/route.ts` — admin publish
- `components/admin/admin-badge.tsx`
- `components/admin/edit-pencil.tsx`
- `components/admin/section-edit-modal.tsx`
- `components/admin/quiz-edit-modal.tsx`

**Modified:**
- `scripts/setup-supabase.sql` — append override-table DDL
- `lib/session.ts` — add `verifyAdmin()`
- `app/api/admin/residents/route.ts` — use `verifyAdmin()`
- `components/content-reader.tsx` — merge hook + admin edit affordances
- `components/quiz-component.tsx` — merge hook + admin edit affordances on review screen
