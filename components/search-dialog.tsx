"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, BookOpen, HelpCircle, Lightbulb } from "lucide-react";
import { getAllModules } from "@/lib/modules";
import { cn } from "@/lib/utils";

interface SearchResult {
  moduleId: string;
  moduleTitle: string;
  type: "content" | "keypoint" | "quiz";
  sectionTitle?: string;
  text: string;
  highlight: string; // snippet with match
}

function buildIndex() {
  const modules = getAllModules();
  const entries: SearchResult[] = [];

  for (const m of modules) {
    // Index section content
    for (const s of m.sections) {
      entries.push({
        moduleId: m.id,
        moduleTitle: m.title,
        type: "content",
        sectionTitle: s.title,
        text: s.content,
        highlight: "",
      });
      // Index key points
      for (const kp of s.keyPoints) {
        entries.push({
          moduleId: m.id,
          moduleTitle: m.title,
          type: "keypoint",
          sectionTitle: s.title,
          text: kp,
          highlight: "",
        });
      }
    }
    // Index quiz questions + explanations
    for (const q of m.quiz) {
      entries.push({
        moduleId: m.id,
        moduleTitle: m.title,
        type: "quiz",
        text: q.question + " " + q.explanation,
        highlight: "",
      });
    }
  }
  return entries;
}

function searchEntries(entries: SearchResult[], query: string): SearchResult[] {
  if (query.length < 2) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];
  for (const entry of entries) {
    const lower = entry.text.toLowerCase();
    if (terms.every((t) => lower.includes(t))) {
      // Build a snippet around the first match
      const idx = lower.indexOf(terms[0]);
      const start = Math.max(0, idx - 60);
      const end = Math.min(entry.text.length, idx + terms[0].length + 80);
      const snippet =
        (start > 0 ? "…" : "") +
        entry.text.slice(start, end) +
        (end < entry.text.length ? "…" : "");
      results.push({ ...entry, highlight: snippet });
    }
    if (results.length >= 30) break;
  }
  return results;
}

const typeIcon = {
  content: BookOpen,
  keypoint: Lightbulb,
  quiz: HelpCircle,
};

const typeLabel = {
  content: "Content",
  keypoint: "Key Point",
  quiz: "Quiz",
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const indexRef = useRef<SearchResult[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build index lazily on first open
  useEffect(() => {
    if (open && !indexRef.current) {
      indexRef.current = buildIndex();
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search on query change
  useEffect(() => {
    if (!indexRef.current) return;
    setResults(searchEntries(indexRef.current, query));
  }, [query]);

  // Keyboard shortcut: Ctrl/Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
        title="Search (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:block">Search</span>
        <kbd className="hidden md:inline-flex h-4 items-center rounded border border-border bg-muted px-1 text-[9px] font-mono text-muted-foreground ml-1">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      {/* Dialog */}
      <div className="fixed inset-x-0 top-[10%] z-[61] mx-auto w-full max-w-lg px-4">
        <div className="rounded-xl border bg-background shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, key points, quizzes…"
              className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={close}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {query.length > 0 && results.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
            {results.map((r, i) => {
              const Icon = typeIcon[r.type];
              return (
                <Link
                  key={i}
                  href={`/modules/${r.moduleId}/slides`}
                  onClick={close}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border/40 last:border-b-0"
                  )}
                >
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium truncate">
                        {r.moduleTitle}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                        {typeLabel[r.type]}
                      </span>
                    </div>
                    {r.sectionTitle && (
                      <p className="text-[11px] text-muted-foreground mb-0.5">
                        {r.sectionTitle}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                      {r.highlight}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          {query.length === 0 && (
            <div className="px-4 py-3 border-t text-center">
              <p className="text-[11px] text-muted-foreground">
                Search across all module content, key points, and quiz explanations
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
