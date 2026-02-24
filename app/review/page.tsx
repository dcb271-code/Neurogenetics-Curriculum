"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, X, BookOpen, Shuffle } from "lucide-react";
import { FlaggedItem, useFlags } from "@/lib/flags";
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

  // Group items by module
  const byModule = items.reduce<Record<string, FlaggedItem[]>>((acc, item) => {
    if (!acc[item.moduleId]) acc[item.moduleId] = [];
    acc[item.moduleId].push(item);
    return acc;
  }, {});

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
            {items.length} concept{items.length !== 1 ? "s" : ""} flagged for
            spaced review
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
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
          <Bookmark className="h-10 w-10 text-muted-foreground/20 mb-4" />
          <p className="text-sm font-medium text-muted-foreground mb-1">
            No items flagged yet
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
            Hover over any key point while reading a module and click the
            bookmark icon to add it here.
          </p>
          <Button asChild size="sm" variant="outline" className="mt-6">
            <Link href="/">Browse Modules</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(byModule).map(([moduleId, moduleItems]) => (
            <section key={moduleId}>
              {/* Module group header */}
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <h2 className="text-sm font-semibold">
                  {moduleItems[0].moduleTitle}
                </h2>
                <span className="text-xs text-muted-foreground">
                  · {moduleItems.length} item
                  {moduleItems.length !== 1 ? "s" : ""}
                </span>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1.5 text-xs text-muted-foreground ml-auto"
                >
                  <Link href={`/modules/${moduleId}/slides`}>
                    Open module →
                  </Link>
                </Button>
              </div>

              {/* Flagged items */}
              <div className="space-y-2">
                {moduleItems
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
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
