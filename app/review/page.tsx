"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, X, BookOpen, Shuffle, NotebookPen } from "lucide-react";
import { FlaggedItem, useFlags } from "@/lib/flags";
import { NoteItem, useNotes } from "@/lib/notes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Flashcard mode ────────────────────────────────────────────────────────────

function FlashcardMode({
  items,
  onExit,
}: {
  items: FlaggedItem[];
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(() => [...items].sort(() => Math.random() - 0.5));

  const current = deck[index];
  const isLast = index === deck.length - 1;

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => Math.min(i + 1, deck.length - 1)), 100);
  };
  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => Math.max(i - 1, 0)), 100);
  };
  const reshuffle = () => {
    setDeck([...items].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  };

  if (!current) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Controls */}
      <div className="flex items-center gap-3 w-full max-w-xl">
        <Button variant="ghost" size="sm" onClick={onExit} className="text-xs">
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back
        </Button>
        <div className="flex-1 text-center text-xs text-muted-foreground">
          {index + 1} / {deck.length}
        </div>
        <Button variant="ghost" size="sm" onClick={reshuffle} className="text-xs">
          <Shuffle className="h-3.5 w-3.5 mr-1" />
          Shuffle
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xl h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "w-full max-w-xl min-h-[200px] rounded-2xl border-2 p-8 text-left transition-all duration-200 cursor-pointer",
          flipped
            ? "bg-primary/5 border-primary/30"
            : "bg-card border-border hover:border-primary/20"
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          {flipped ? "Concept" : current.sectionTitle + " · " + current.moduleTitle}
        </p>
        <p className="text-base font-medium leading-relaxed">
          {flipped ? (
            current.keyPoint
          ) : (
            <span className="text-muted-foreground italic text-sm">
              Click to reveal the concept
            </span>
          )}
        </p>
        {!flipped && (
          <p className="mt-4 text-xs text-muted-foreground/50">
            From: {current.moduleTitle}
          </p>
        )}
      </button>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={prev} disabled={index === 0}>
          Previous
        </Button>
        {isLast ? (
          <Button size="sm" onClick={reshuffle}>
            <Shuffle className="h-3.5 w-3.5 mr-1.5" />
            Restart
          </Button>
        ) : (
          <Button size="sm" onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const { flags: items, remove } = useFlags();
  const [flashcardMode, setFlashcardMode] = useState(false);
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

  if (flashcardMode && items.length > 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-amber-500" />
          Flashcard Review
        </h1>
        <FlashcardMode items={items} onExit={() => setFlashcardMode(false)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Modules
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="h-5 w-5 text-amber-500" />
            <h1 className="text-2xl font-bold">Review Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {items.length} flagged concept{items.length !== 1 ? "s" : ""}
            {notes.length > 0 && (
              <>
                {" · "}
                {notes.length} note{notes.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        </div>

        {items.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFlashcardMode(true)}
          >
            <Shuffle className="h-3.5 w-3.5 mr-1.5" />
            Flashcard Mode
          </Button>
        )}
      </div>

      {/* Empty state */}
      {!hasAnything ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
          <Bookmark className="h-10 w-10 text-muted-foreground/20 mb-4" />
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Nothing saved for review yet
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
            Flag key points from any module to study them as flashcards, or
            jot free-form thoughts in a module&apos;s Notes tab.
          </p>
          <Button asChild size="sm" variant="outline" className="mt-6">
            <Link href="/">Browse Modules</Link>
          </Button>
        </div>
      ) : (
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
                  <Link href={`/modules/${group.moduleId}`}>
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
      )}
    </div>
  );
}

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
