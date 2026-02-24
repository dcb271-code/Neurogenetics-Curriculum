"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  List,
  X,
  ArrowLeft,
  Circle,
} from "lucide-react";
import { Module } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function SlideViewer({ module }: { module: Module }) {
  const { progress, update } = useProgress();
  const mp = progress[module.id];

  const [current, setCurrent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (progress[module.id]?.slidesCompleted) {
      setCurrent(0);
    } else {
      const saved = progress[module.id]?.currentSlide ?? 0;
      setCurrent(Math.min(saved, module.sections.length - 1));
    }
  }, [module.id, module.sections.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const section = module.sections[current];
  const isLast = current === module.sections.length - 1;
  const slidesCompleted = mp?.slidesCompleted ?? false;
  const seenUpTo = Math.max(mp?.currentSlide ?? 0, current);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(index, module.sections.length - 1));
    setCurrent(next);
    setSidebarOpen(false);
    const furthest = Math.max(mp?.currentSlide ?? 0, next);
    update(module.id, { currentSlide: furthest });
  };

  const handleComplete = () => {
    update(module.id, {
      slidesCompleted: true,
      currentSlide: module.sections.length,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-sm px-4 h-12 shrink-0">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Link href={`/modules/${module.id}`}>
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">{module.title}</span>
            </Link>
          </Button>
        </div>

        <div className="flex-1 mx-6 max-w-xs hidden sm:block">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round(((current + 1) / module.sections.length) * 100)}%`,
                }}
              />
            </div>
            <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">
              {current + 1}/{module.sections.length}
            </span>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="sm:hidden flex items-center justify-center h-7 w-7 rounded-md hover:bg-accent transition-colors"
        >
          <List className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "border-r border-border/60 bg-card/50 overflow-y-auto scrollbar-thin shrink-0 transition-all duration-200",
            "hidden sm:block w-56",
            sidebarOpen && "fixed inset-0 z-40 flex flex-col w-full sm:relative sm:w-56 sm:flex"
          )}
        >
          {sidebarOpen && (
            <div className="flex items-center justify-between p-3 border-b sm:hidden">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sections
              </span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="p-2">
            {module.sections.map((s, i) => {
              const done = slidesCompleted || i < seenUpTo;
              const active = i === current;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "w-full text-left flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-xs transition-colors",
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span className="mt-px shrink-0">
                    {done ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    ) : active ? (
                      <Circle className="h-3.5 w-3.5 fill-primary text-primary" />
                    ) : (
                      <Circle className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="leading-snug line-clamp-2">{s.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 animate-fade-in" key={current}>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {String(current + 1).padStart(2, "0")} / {String(module.sections.length).padStart(2, "0")}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-snug">
              {section.title}
            </h2>

            <p className="text-base text-muted-foreground leading-[1.8] mb-8">
              {section.content}
            </p>

            {section.keyPoints.length > 0 && (
              <div className="rounded-xl border bg-card/60 p-5 mb-10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Key Points
                </h3>
                <ul className="space-y-3">
                  {section.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-foreground/80 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {isLast ? (
                <Button
                  size="sm"
                  onClick={slidesCompleted ? undefined : handleComplete}
                  asChild={slidesCompleted}
                  className={slidesCompleted ? "" : "bg-green-600 hover:bg-green-700"}
                >
                  {slidesCompleted ? (
                    <Link href={`/modules/${module.id}/quiz`}>Take Quiz →</Link>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Complete
                    </>
                  )}
                </Button>
              ) : (
                <Button size="sm" onClick={() => goTo(current + 1)}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            {slidesCompleted && (
              <div className="mt-6 flex items-center justify-between rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">All sections completed!</span>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/modules/${module.id}/quiz`}>Take Quiz →</Link>
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
