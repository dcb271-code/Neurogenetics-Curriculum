"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Images, BookOpen, HelpCircle, CheckCircle2 } from "lucide-react";
import { Module } from "@/lib/types";
import { TagBadge } from "@/components/tag-badge";
import { SlidePresenter } from "@/components/slide-presenter";
import { ContentReader } from "@/components/content-reader";
import { QuizComponent } from "@/components/quiz-component";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Tab = "slides" | "learn" | "quiz";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "slides", label: "Slides", Icon: Images },
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "quiz", label: "Quiz", Icon: HelpCircle },
];

export function ModuleTabs({ module }: { module: Module }) {
  const [tab, setTab] = useState<Tab>("slides");
  const { progress } = useProgress();
  const mp = progress[module.id];

  const slidesCompleted = mp?.slidesCompleted ?? false;
  const quizCompleted = mp?.quizCompleted ?? false;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* ── Compact header + tab bar (sticky below navbar) ───────────────────── */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto max-w-screen-xl px-4">
          {/* Title row */}
          <div className="flex items-center gap-3 pt-2.5 pb-1 min-w-0">
            <Link
              href="/"
              className="shrink-0 text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              <span className="hidden sm:inline">All Modules</span>
            </Link>
            <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
            <h1 className="text-sm font-semibold truncate text-foreground">{module.title}</h1>
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              {module.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0.5 -mb-px">
            {TABS.map(({ id, label, Icon }) => {
              const isDone =
                (id === "learn" && slidesCompleted) ||
                (id === "quiz" && quizCompleted);
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors",
                    tab === id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                  {isDone && (
                    <CheckCircle2 className="h-3 w-3 text-green-500 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ───────────────────────────────────────────────────────── */}

      {/* Slides: full height dark viewer */}
      {tab === "slides" && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <SlidePresenter moduleId={module.id} />
        </div>
      )}

      {/* Learn: ContentReader (has its own scroll and sticky sidebar) */}
      {tab === "learn" && (
        <div className="flex-1">
          <ContentReader module={module} />
        </div>
      )}

      {/* Quiz: centred container */}
      {tab === "quiz" && (
        <div className="flex-1">
          <QuizComponent module={module} />
        </div>
      )}
    </div>
  );
}
