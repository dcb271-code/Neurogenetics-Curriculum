# Per-Module Notepad — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let logged-in users save one free-form text note per module, edit from the slide presenter or module page, and review notes alongside flagged key points on the Review Dashboard.

**Architecture:** New `notes` table mirroring `flags`. New `app/api/notes/route.ts` with GET/PUT (whitespace-only PUT deletes the row). Shared `<NoteEditor>` component used by a drawer in the slide presenter and a new "Notes" tab on the module page. Review Dashboard merges notes into existing per-module groups.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Supabase (`notes` table), `jose` JWT (existing session).

**Spec:** `docs/superpowers/specs/2026-05-16-module-notes-design.md`

**Spec deviation:** The spec describes the module-page edit surface as a collapsible card "between sections and the quiz CTA". The actual module page is tab-based (`Learn | Quiz`), so this plan implements the surface as a new **Notes** tab — same component, cleaner fit with the existing UX. The spec's intent (a dedicated edit surface on the module landing page) is preserved.

**Testing convention:** This project has no automated test framework. Each task uses manual verification: `npm run build` for type-check, `npm run dev` for runtime, `curl` for API checks. Tasks bundle small commits at the end.

---

### Task 1: Add `notes` table to schema

**Files:**
- Modify: `scripts/setup-supabase.sql`

- [ ] **Step 1: Append the table definition**

Open `scripts/setup-supabase.sql` and add the following block just after the `flags` table block (before the indexes section is fine, before the RLS section). Insert immediately after the `flags` `UNIQUE(...)` constraint, keeping the existing file structure:

```sql
-- Free-form per-module notes (one row per resident per module)
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(resident_id, module_id)
);
```

Also add the index next to the existing index block:

```sql
CREATE INDEX idx_notes_resident ON notes(resident_id);
```

And add RLS enable next to the existing `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` block:

```sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 2: Run the new DDL against Supabase**

The user must execute the three `CREATE TABLE notes`, `CREATE INDEX idx_notes_resident`, and `ALTER TABLE notes ENABLE ROW LEVEL SECURITY` statements in the Supabase Dashboard SQL Editor.

Verify in Supabase Table Editor that `notes` appears with columns: `id`, `resident_id`, `module_id`, `module_title`, `content`, `updated_at`.

- [ ] **Step 3: Commit**

```bash
git add scripts/setup-supabase.sql
git commit -m "feat(schema): add notes table for per-module notepad"
```

---

### Task 2: Create the notes API route

**Files:**
- Create: `app/api/notes/route.ts`

- [ ] **Step 1: Write the route handler**

Create `app/api/notes/route.ts` with full content:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

interface NoteRow {
  id: string;
  module_id: string;
  module_title: string;
  content: string;
  updated_at: string;
}

function toClient(row: NoteRow) {
  return {
    moduleId: row.module_id,
    moduleTitle: row.module_title,
    content: row.content,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

/** GET: all notes for logged-in user, or single note when ?moduleId=X. */
export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ notes: [], note: null }, { status: 401 });

  const moduleId = req.nextUrl.searchParams.get("moduleId");

  if (moduleId) {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId)
      .maybeSingle();

    return NextResponse.json({ note: data ? toClient(data as NoteRow) : null });
  }

  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("resident_id", session.sub)
    .order("updated_at", { ascending: false });

  return NextResponse.json({
    notes: (data ?? []).map((row) => toClient(row as NoteRow)),
  });
}

/** PUT: upsert a note. Whitespace-only content deletes the row. */
export async function PUT(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId, moduleTitle, content } = await req.json();

  if (typeof moduleId !== "string" || moduleId.length === 0) {
    return NextResponse.json({ error: "moduleId required" }, { status: 400 });
  }

  const trimmed = typeof content === "string" ? content : "";

  if (trimmed.trim().length === 0) {
    await supabase
      .from("notes")
      .delete()
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId);
    return NextResponse.json({ ok: true, note: null });
  }

  const { data } = await supabase
    .from("notes")
    .upsert(
      {
        resident_id: session.sub,
        module_id: moduleId,
        module_title: typeof moduleTitle === "string" ? moduleTitle : "",
        content: trimmed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "resident_id,module_id" }
    )
    .select("*")
    .single();

  return NextResponse.json({
    ok: true,
    note: data ? toClient(data as NoteRow) : null,
  });
}
```

- [ ] **Step 2: Type-check**

Run: `npm run build` (or `npx tsc --noEmit` if faster).
Expected: builds without errors. If type errors appear in this new file, fix them; if errors appear elsewhere, they are unrelated.

- [ ] **Step 3: Smoke test the API locally**

Start dev server (`npm run dev`). In a separate shell, get a session cookie by logging in via the existing UI flow (or copy `ng-session` cookie value from browser DevTools).

```bash
# Unauthenticated GET
curl -s http://localhost:3000/api/notes
# Expected: {"notes":[],"note":null} with 401 status

# Authenticated PUT (replace COOKIE_VALUE)
curl -s -X PUT http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: ng-session=COOKIE_VALUE" \
  -d '{"moduleId":"intro-neurogenetics","moduleTitle":"Intro","content":"my first note"}'
# Expected: {"ok":true,"note":{"moduleId":"intro-neurogenetics",...}}

# Authenticated GET single
curl -s "http://localhost:3000/api/notes?moduleId=intro-neurogenetics" \
  -H "Cookie: ng-session=COOKIE_VALUE"
# Expected: {"note":{"moduleId":"intro-neurogenetics","content":"my first note",...}}

# PUT with empty content → row deleted
curl -s -X PUT http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: ng-session=COOKIE_VALUE" \
  -d '{"moduleId":"intro-neurogenetics","content":"  "}'
# Expected: {"ok":true,"note":null}

# Confirm deletion
curl -s "http://localhost:3000/api/notes?moduleId=intro-neurogenetics" \
  -H "Cookie: ng-session=COOKIE_VALUE"
# Expected: {"note":null}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/notes/route.ts
git commit -m "feat(api): add /api/notes GET and PUT routes"
```

---

### Task 3: Create the client hooks

**Files:**
- Create: `lib/notes.ts`

- [ ] **Step 1: Write the hooks**

Create `lib/notes.ts` with full content:

```typescript
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/use-auth";

export interface NoteItem {
  moduleId: string;
  moduleTitle: string;
  content: string;
  updatedAt: number;
}

const SAVE_DEBOUNCE_MS = 800;

/** All notes for the logged-in user. Used by the Review Dashboard. */
export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetch("/api/notes")
      .then((r) => (r.ok ? r.json() : { notes: [] }))
      .then((d) => setNotes(d.notes ?? []))
      .catch(() => setNotes([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  return { notes, isLoading };
}

type SaveStatus = "idle" | "saving" | "saved";

/** Single-module note with debounced autosave. Used by edit surfaces. */
export function useModuleNote(moduleId: string, moduleTitle: string) {
  const { user } = useAuth();
  const [content, setContentState] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [loaded, setLoaded] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestContent = useRef("");
  const latestTitle = useRef(moduleTitle);

  // Keep refs current
  useEffect(() => {
    latestTitle.current = moduleTitle;
  }, [moduleTitle]);

  // Load initial content
  useEffect(() => {
    if (!user) {
      setContentState("");
      setLoaded(true);
      return;
    }
    setLoaded(false);
    fetch(`/api/notes?moduleId=${encodeURIComponent(moduleId)}`)
      .then((r) => (r.ok ? r.json() : { note: null }))
      .then((d) => {
        const text: string = d.note?.content ?? "";
        setContentState(text);
        latestContent.current = text;
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user, moduleId]);

  const flush = useCallback(async () => {
    if (!user) return;
    setStatus("saving");
    try {
      await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          moduleTitle: latestTitle.current,
          content: latestContent.current,
        }),
      });
      setStatus("saved");
    } catch {
      setStatus("idle");
    }
  }, [user, moduleId]);

  const setContent = useCallback(
    (text: string) => {
      setContentState(text);
      latestContent.current = text;
      if (!user) return;
      setStatus("idle");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        flush();
      }, SAVE_DEBOUNCE_MS);
    },
    [user, flush]
  );

  // Flush on unmount if a save is pending
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        // Best-effort sync flush via fetch (browsers will usually still send it)
        if (user && latestContent.current !== undefined) {
          fetch("/api/notes", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              moduleId,
              moduleTitle: latestTitle.current,
              content: latestContent.current,
            }),
            keepalive: true,
          }).catch(() => {});
        }
      }
    };
  }, [user, moduleId]);

  return { content, setContent, status, loaded };
}
```

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: builds without errors.

- [ ] **Step 3: Commit**

```bash
git add lib/notes.ts
git commit -m "feat(lib): add useNotes and useModuleNote hooks"
```

---

### Task 4: Build the shared `<NoteEditor>` component

**Files:**
- Create: `components/note-editor.tsx`

- [ ] **Step 1: Write the component**

Create `components/note-editor.tsx` with full content:

```tsx
"use client";

import { useModuleNote } from "@/lib/notes";
import { cn } from "@/lib/utils";

interface Props {
  moduleId: string;
  moduleTitle: string;
  /** When true (drawer/dark surface), use dark textarea colors. */
  dark?: boolean;
  /** Override default placeholder. */
  placeholder?: string;
  /** Override default min height (Tailwind class, e.g. "min-h-[160px]"). */
  minHeightClass?: string;
}

const MAX_CHARS = 20_000;

export function NoteEditor({
  moduleId,
  moduleTitle,
  dark = false,
  placeholder = "Jot anything you want to remember about this module…",
  minHeightClass = "min-h-[200px]",
}: Props) {
  const { content, setContent, status, loaded } = useModuleNote(
    moduleId,
    moduleTitle
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
        placeholder={loaded ? placeholder : "Loading…"}
        disabled={!loaded}
        maxLength={MAX_CHARS}
        spellCheck
        className={cn(
          "w-full resize-y rounded-lg border p-3 text-sm leading-relaxed",
          "whitespace-pre-wrap font-sans focus:outline-none focus:ring-2 focus:ring-primary/40",
          minHeightClass,
          dark
            ? "bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-500"
            : "bg-background border-border text-foreground placeholder:text-muted-foreground"
        )}
      />
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          {status === "saving" && "Saving…"}
          {status === "saved" && "Saved"}
          {status === "idle" && content.length > 0 && " "}
        </span>
        <span className="tabular-nums">
          {content.length} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: builds without errors.

- [ ] **Step 3: Commit**

```bash
git add components/note-editor.tsx
git commit -m "feat(ui): add shared NoteEditor component"
```

---

### Task 5: Add a "Notes" tab to the module page

**Files:**
- Modify: `components/module-tabs.tsx`

- [ ] **Step 1: Add Notes tab**

Open `components/module-tabs.tsx`. Make these exact edits:

Change the import line for icons (line 5) from:
```tsx
import { ArrowLeft, BookOpen, HelpCircle, CheckCircle2 } from "lucide-react";
```
to:
```tsx
import { ArrowLeft, BookOpen, HelpCircle, CheckCircle2, NotebookPen } from "lucide-react";
```

Add a new import below the existing component imports:
```tsx
import { NoteEditor } from "@/components/note-editor";
import { useAuth } from "@/lib/use-auth";
```

Change the Tab type (line 13) from:
```tsx
type Tab = "learn" | "quiz";
```
to:
```tsx
type Tab = "learn" | "notes" | "quiz";
```

Change the TABS array (lines 15-18) from:
```tsx
const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "quiz", label: "Quiz", Icon: HelpCircle },
];
```
to:
```tsx
const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "notes", label: "Notes", Icon: NotebookPen },
  { id: "quiz", label: "Quiz", Icon: HelpCircle },
];
```

Inside the component body, after `const mp = progress[module.id];` add:
```tsx
  const { user } = useAuth();
```

In the TABS render section, the `isDone` ternary currently only handles `"learn"` and `"quiz"`. Leave it as-is (no done check for notes). The tab button rendering loop still works because `isDone` will simply be `false` for the new tab.

Hide the Notes tab from logged-out users by filtering. Replace `{TABS.map(...)}` (line 53) with:
```tsx
            {TABS.filter((t) => t.id !== "notes" || !!user).map(({ id, label, Icon }) => {
```

Add a new tab content panel after the existing Quiz panel (after line 93). Insert immediately before the closing `</div>` of the outer flex container:
```tsx
      {/* Notes */}
      {tab === "notes" && user && (
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-3xl px-4 py-8">
            <h2 className="text-base font-semibold mb-1">My notes</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Free-form scratch pad for this module. Saves automatically.
            </p>
            <NoteEditor
              moduleId={module.id}
              moduleTitle={module.title}
              minHeightClass="min-h-[300px]"
            />
          </div>
        </div>
      )}
```

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: builds without errors.

- [ ] **Step 3: Manual verification**

Run `npm run dev`, log in, visit any module page (e.g. `/modules/intro-neurogenetics`).

Verify:
- A "Notes" tab appears between "Learn" and "Quiz".
- Clicking Notes shows the editor with the "Loading…" placeholder briefly, then the empty placeholder.
- Type a few characters. ~800 ms after stopping, the indicator changes from blank → "Saving…" → "Saved".
- Refresh the page; the typed content persists.
- Log out. The Notes tab is hidden.
- Log back in. The Notes tab is visible again and shows the saved content.

- [ ] **Step 4: Commit**

```bash
git add components/module-tabs.tsx
git commit -m "feat(ui): add Notes tab to module page"
```

---

### Task 6: Add a Notes drawer to the slide presenter

**Files:**
- Modify: `components/slide-presenter.tsx`

- [ ] **Step 1: Wire up imports and module title fetch**

The slide presenter currently only receives `moduleId`. The editor needs `moduleTitle`. Look up the title via the existing `lib/modules` helper.

In `components/slide-presenter.tsx`, change the imports at the top:

Change:
```tsx
import { ChevronLeft, ChevronRight, Play, Pause, ImageOff, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
```
to:
```tsx
import { ChevronLeft, ChevronRight, Play, Pause, ImageOff, Minus, Plus, NotebookPen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getModuleById } from "@/lib/modules";
import { NoteEditor } from "@/components/note-editor";
import { useAuth } from "@/lib/use-auth";
```

- [ ] **Step 2: Add drawer state and Esc handling**

In `components/slide-presenter.tsx`, inside the `SlidePresenter` function body, find the existing `useState` block (around lines 46-52). Add a new state right after them:
```tsx
  const [notesOpen, setNotesOpen] = useState(false);
```

Find the existing keyboard handler `useEffect` (around lines 125-138). Modify the handler to close the drawer on Escape and to ignore key shortcuts when the drawer is open. Replace the entire handler with:

```tsx
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        if (e.key === "Escape" && notesOpen) setNotesOpen(false);
        return;
      }
      if (e.key === "Escape" && notesOpen) {
        setNotesOpen(false);
        return;
      }
      if (notesOpen) return; // suppress slide nav while drawer is open
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setAutoplay((a) => !a);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, notesOpen]);
```

- [ ] **Step 3: Resolve module title**

Inside the component body, after `const [notesOpen, setNotesOpen] = useState(false);`, add:
```tsx
  const { user } = useAuth();
  const moduleTitle = getModuleById(moduleId)?.title ?? "";
```

- [ ] **Step 4: Add Notes button to the controls bar**

Find the controls bar block (the `div` starting with `className="shrink-0 flex items-center justify-center gap-3 ...` near line 168). Just before the closing `</div>` of that controls bar (where the `← → space` hint is), insert a new divider + button. The hint is at line 236-238 — insert this **before** that hint span:

```tsx
        {user && (
          <>
            <div className="w-px h-5 bg-neutral-700 mx-1" />
            <button
              onClick={() => setNotesOpen(true)}
              className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Open notes"
            >
              <NotebookPen className="h-3.5 w-3.5" />
              Notes
            </button>
          </>
        )}
```

- [ ] **Step 5: Add the drawer markup**

Find the outer return wrapper (`<div className="flex flex-col h-full bg-neutral-950 ...`). Just before its closing `</div>` (the very last line of the JSX), insert the drawer + backdrop:

```tsx
      {/* ── Notes drawer ────────────────────────────────────────────────────── */}
      {notesOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setNotesOpen(false)}
          />
          <aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Module notes"
          >
            <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-neutral-400" />
                <h2 className="text-sm font-semibold text-neutral-100">My notes</h2>
              </div>
              <button
                onClick={() => setNotesOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              <NoteEditor
                moduleId={moduleId}
                moduleTitle={moduleTitle}
                dark
                minHeightClass="min-h-[60vh]"
              />
            </div>
          </aside>
        </>
      )}
```

- [ ] **Step 6: Type-check**

Run: `npm run build`
Expected: builds without errors.

- [ ] **Step 7: Manual verification**

Run `npm run dev`, log in, navigate to a module's slides view (e.g. `/modules/intro-neurogenetics/slides`).

Verify:
- A "Notes" button appears in the controls bar.
- Clicking it opens a drawer from the right with the editor.
- Typing in the editor saves (indicator: Saving → Saved).
- Pressing Esc closes the drawer.
- While the drawer is open, ArrowLeft/ArrowRight/Space do NOT navigate slides.
- Clicking the backdrop closes the drawer.
- Open the same module's Notes tab on the module page — content matches.
- Log out: the Notes button is hidden.

- [ ] **Step 8: Commit**

```bash
git add components/slide-presenter.tsx
git commit -m "feat(ui): add notes drawer to slide presenter"
```

---

### Task 7: Merge notes into the Review Dashboard

**Files:**
- Modify: `app/review/page.tsx`

- [ ] **Step 1: Add the notes import and hook call**

Open `app/review/page.tsx`. Make these edits.

Change the icon import line (line 5) from:
```tsx
import { ArrowLeft, Bookmark, X, BookOpen, Shuffle } from "lucide-react";
```
to:
```tsx
import { ArrowLeft, Bookmark, X, BookOpen, Shuffle, NotebookPen } from "lucide-react";
```

Add below the flags import (line 6):
```tsx
import { NoteItem, useNotes } from "@/lib/notes";
```

Add `Link` and `useState` are already imported. Good.

- [ ] **Step 2: Build merged per-module groups**

Replace the `byModule` reduce block inside `ReviewPage` (lines 122-127):

```tsx
  // Group items by module
  const byModule = items.reduce<Record<string, FlaggedItem[]>>((acc, item) => {
    if (!acc[item.moduleId]) acc[item.moduleId] = [];
    acc[item.moduleId].push(item);
    return acc;
  }, {});
```

with:

```tsx
  const { notes } = useNotes();

  type ModuleGroup = {
    moduleId: string;
    moduleTitle: string;
    note?: NoteItem;
    flags: FlaggedItem[];
  };

  const groupMap = new Map<string, ModuleGroup>();
  for (const item of items) {
    const existing = groupMap.get(item.moduleId);
    if (existing) {
      existing.flags.push(item);
    } else {
      groupMap.set(item.moduleId, {
        moduleId: item.moduleId,
        moduleTitle: item.moduleTitle,
        flags: [item],
      });
    }
  }
  for (const note of notes) {
    const existing = groupMap.get(note.moduleId);
    if (existing) {
      existing.note = note;
    } else {
      groupMap.set(note.moduleId, {
        moduleId: note.moduleId,
        moduleTitle: note.moduleTitle,
        note,
        flags: [],
      });
    }
  }
  const groups = Array.from(groupMap.values());
  const hasAnything = groups.length > 0;
```

- [ ] **Step 3: Update header counts**

Find the header subtext (around line 158):
```tsx
          <p className="text-sm text-muted-foreground">
            {items.length} concept{items.length !== 1 ? "s" : ""} flagged for
            spaced review
          </p>
```

Replace with:
```tsx
          <p className="text-sm text-muted-foreground">
            {items.length} flagged concept{items.length !== 1 ? "s" : ""}
            {notes.length > 0 && (
              <>
                {" · "}
                {notes.length} note{notes.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
```

- [ ] **Step 4: Update the empty-state and main render**

Find the empty-state condition (line 177): `{items.length === 0 ? (` — replace with `{!hasAnything ? (`.

Inside the empty-state block, update the copy. Replace:
```tsx
          <p className="text-sm font-medium text-muted-foreground mb-1">
            No items flagged yet
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
            Hover over any key point while reading a module and click the
            bookmark icon to add it here.
          </p>
```

with:
```tsx
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Nothing saved for review yet
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
            Flag key points from any module to study them as flashcards, or
            jot free-form thoughts in a module&apos;s Notes tab.
          </p>
```

Replace the main groups render block. The existing block iterates `Object.entries(byModule).map(([moduleId, moduleItems]) => (...))`. Replace the entire `<div className="space-y-8">...</div>` block (lines 192-247) with:

```tsx
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.moduleId}>
              {/* Module group header */}
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <h2 className="text-sm font-semibold">{group.moduleTitle}</h2>
                <span className="text-xs text-muted-foreground">
                  {group.flags.length > 0 && (
                    <>
                      · {group.flags.length} flag
                      {group.flags.length !== 1 ? "s" : ""}
                    </>
                  )}
                  {group.note && (
                    <>
                      {group.flags.length > 0 ? " · " : "· "}1 note
                    </>
                  )}
                </span>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1.5 text-xs text-muted-foreground ml-auto"
                >
                  <Link href={`/modules/${group.moduleId}/slides`}>
                    Open module →
                  </Link>
                </Button>
              </div>

              {/* Note card (if present) */}
              {group.note && (
                <NoteCard note={group.note} />
              )}

              {/* Flagged items */}
              {group.flags.length > 0 && (
                <div className="space-y-2 mt-2">
                  {group.flags
                    .sort((a, b) => b.flaggedAt - a.flaggedAt)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-start gap-3 rounded-xl border bg-card px-4 py-3.5 transition-colors hover:bg-accent/30"
                      >
                        <Bookmark className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground mb-1">
                            {item.sectionTitle}
                          </p>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {item.keyPoint}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          title="Remove from review"
                          className="shrink-0 mt-0.5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </section>
          ))}
        </div>
```

- [ ] **Step 5: Add the NoteCard component**

At the bottom of `app/review/page.tsx`, after the closing brace of `ReviewPage`, add this component:

```tsx
function NoteCard({ note }: { note: NoteItem }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = note.content.length > 280 || note.content.split("\n").length > 6;
  const relative = formatRelative(note.updatedAt);

  return (
    <div className="rounded-xl border border-amber-200/50 bg-amber-50/30 dark:bg-amber-950/10 dark:border-amber-900/30 px-4 py-3.5 mb-2">
      <div className="flex items-start gap-3">
        <NotebookPen className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1">
            My note · updated {relative}
          </p>
          <p
            className={cn(
              "text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap",
              !expanded && isLong && "line-clamp-6"
            )}
          >
            {note.content}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function formatRelative(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 7 * 86_400) return `${Math.floor(seconds / 86_400)}d ago`;
  return new Date(ts).toLocaleDateString();
}
```

The `cn` helper is already imported at the top of the file (line 8). Verify it is — if not, add `import { cn } from "@/lib/utils";` to the import block.

- [ ] **Step 6: Type-check**

Run: `npm run build`
Expected: builds without errors.

- [ ] **Step 7: Manual verification**

Run `npm run dev`, log in, visit `/review`.

Verify:
- Modules with notes show an amber-tinted note card at the top of their group.
- Modules with only a note (no flags) still appear with their own group.
- Modules with only flags (no notes) render as before — no note card.
- Long notes (>280 chars or >6 lines) show "Show more" / "Show less" toggle.
- The header count shows both flags and notes (e.g. "5 flagged concepts · 2 notes").
- The "Open module →" link still works.
- Clearing a note (via the Notes tab on the module page or drawer) and refreshing `/review` removes that module's group if it had no flags.
- Empty state (no flags, no notes): the new copy displays.

- [ ] **Step 8: Commit**

```bash
git add app/review/page.tsx
git commit -m "feat(review): merge notes into per-module groups"
```

---

### Task 8: Final integration check

**Files:** None modified — verification only.

- [ ] **Step 1: Full-flow smoke test**

Run `npm run dev`. Log in as a test user.

1. Visit `/modules/intro-neurogenetics`. Click "Notes" tab. Type "Test note one". Wait for "Saved".
2. Visit `/modules/intro-neurogenetics/slides`. Open Notes drawer. Content matches "Test note one".
3. Edit in drawer to "Test note one — edited". Close drawer.
4. Visit `/review`. Note card shows "Test note one — edited" with "updated just now".
5. Flag a key point in the same module (use the existing bookmark UI in the Learn tab).
6. Reload `/review`. The module group shows the note card on top, then the flagged item below. Header chip reads "1 flag · 1 note".
7. Go to a second module, add only a note (no flag). Reload `/review`. That second module's group appears with only the note card.
8. Clear all text from the first module's note via the Notes tab. Reload `/review`. First module still appears because it has a flag, but the note card is gone.
9. Clear the second module's note. Reload `/review`. Second module no longer appears at all.
10. Log out and visit `/review`. Empty/redirect behavior matches existing flags page (no notes shown).

- [ ] **Step 2: Build for production**

Run: `npm run build`
Expected: success, no errors.

- [ ] **Step 3: Final commit (if any tweaks were needed)**

If steps 1-2 surfaced any fixes, commit them. Otherwise, no commit needed for this task.

---

## File Inventory

**Created:**
- `app/api/notes/route.ts` — GET/PUT endpoints
- `lib/notes.ts` — `useNotes()` and `useModuleNote()` hooks
- `components/note-editor.tsx` — shared editor

**Modified:**
- `scripts/setup-supabase.sql` — `notes` table DDL
- `components/module-tabs.tsx` — added Notes tab
- `components/slide-presenter.tsx` — added Notes drawer
- `app/review/page.tsx` — merged notes into per-module groups
