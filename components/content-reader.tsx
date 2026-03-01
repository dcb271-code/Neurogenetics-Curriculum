"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Printer,
  ChevronRight,
  List,
  X,
  Target,
} from "lucide-react";
import { Module } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useProgress, markSectionRead, updateModuleProgress } from "@/lib/progress";
import { InlineQuestion } from "@/components/inline-question";
import { FlaggableKeyPoint } from "@/components/flaggable-key-point";
import { cn } from "@/lib/utils";

// ── Cross-link renderer ──────────────────────────────────────────────────────
// Parses [[module-id|display text]] in content strings into clickable links

function renderContent(text: string) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
    if (match) {
      const [, moduleId, display] = match;
      return (
        <a
          key={i}
          href={`/modules/${moduleId}`}
          className="text-primary hover:underline underline-offset-2 font-medium"
        >
          {display}
        </a>
      );
    }
    return part;
  });
}

// ── Sidebar item ──────────────────────────────────────────────────────────────

function SidebarItem({
  title,
  active,
  read,
  onClick,
}: {
  title: string;
  active: boolean;
  read: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {read ? (
        <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-green-500" />
      ) : (
        <Circle className="h-3 w-3 shrink-0 mt-0.5 opacity-30" />
      )}
      <span className="leading-snug line-clamp-2">{title}</span>
    </button>
  );
}

// ── Sidebar panel (shared between desktop sticky + mobile drawer) ─────────────

function SidebarNav({
  module,
  activeSection,
  sectionsRead,
  onNavigate,
}: {
  module: Module;
  activeSection: number;
  sectionsRead: number[];
  onNavigate: (i: number) => void;
}) {
  const pct = Math.round(
    (sectionsRead.length / module.sections.length) * 100
  );
  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-3">
        Sections
      </p>
      <nav className="flex-1 space-y-0.5 overflow-y-auto scrollbar-thin">
        {module.sections.map((s, i) => (
          <SidebarItem
            key={i}
            title={s.title}
            active={activeSection === i}
            read={sectionsRead.includes(i)}
            onClick={() => onNavigate(i)}
          />
        ))}
      </nav>
      {/* Progress bar */}
      <div className="mt-6 px-3 shrink-0">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
          <span>Progress</span>
          <span className="tabular-nums">
            {sectionsRead.length}/{module.sections.length}
          </span>
        </div>
        <div className="h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ContentReader({ module }: { module: Module }) {
  const { progress, update, refresh } = useProgress();
  const mp = progress[module.id];
  const sectionsRead: number[] = mp?.sectionsRead ?? [];
  const slidesCompleted = mp?.slidesCompleted ?? false;

  const [activeSection, setActiveSection] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // One ref slot per section heading
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  // Track which section indices are currently intersecting
  const visibleSet = useRef<Set<number>>(new Set());

  // Resume reading position on mount
  useEffect(() => {
    const saved = mp?.lastSection;
    if (saved && saved > 0) {
      // Delay to let DOM render
      const timer = setTimeout(() => {
        const el = sectionRefs.current[saved];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id]);

  // IntersectionObserver — detects active section + marks sections as read
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = sectionRefs.current.indexOf(
            entry.target as HTMLElement
          );
          if (idx === -1) return;

          if (entry.isIntersecting) {
            visibleSet.current.add(idx);
            // Persist read state to localStorage
            markSectionRead(module.id, idx);
            // Refresh React progress state (cheap: only re-reads localStorage)
            refresh();
          } else {
            visibleSet.current.delete(idx);
          }
        });

        if (visibleSet.current.size > 0) {
          const active = Math.min(...Array.from(visibleSet.current));
          setActiveSection(active);
          // Save last-viewed section for resume
          updateModuleProgress(module.id, { lastSection: active });
        }
      },
      {
        // A section is "visible" when its top edge passes 64px from the
        // viewport top (below the sticky navbar) and before 55% from the bottom.
        rootMargin: "-64px 0px -55% 0px",
        threshold: 0,
      }
    );

    const refs = sectionRefs.current;
    refs.forEach((el) => el && observer.observe(el));
    return () => refs.forEach((el) => el && observer.unobserve(el));
  }, [module.id, refresh]);

  const scrollToSection = useCallback((idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileSidebarOpen(false);
  }, []);

  const handleComplete = () => {
    update(module.id, {
      slidesCompleted: true,
      currentSlide: module.sections.length,
      sectionsRead: module.sections.map((_, i) => i),
      completedAt: new Date().toISOString(),
    });
  };

  const allRead =
    slidesCompleted || sectionsRead.length >= module.sections.length;

  return (
    <>
      {/* ── Mobile sidebar drawer ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border/60",
          "flex flex-col p-4 pt-5 transition-transform duration-200 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </span>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarNav
          module={module}
          activeSection={activeSection}
          sectionsRead={sectionsRead}
          onNavigate={scrollToSection}
        />
      </aside>

      {/* ── Page layout ── */}
      <div className="relative flex max-w-screen-xl mx-auto px-3 sm:px-6">
        {/* Desktop sticky sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden py-8 pr-4">
            <SidebarNav
              module={module}
              activeSection={activeSection}
              sectionsRead={sectionsRead}
              onNavigate={scrollToSection}
            />
          </div>
        </aside>

        {/* Main reading area */}
        <main className="flex-1 min-w-0 max-w-2xl py-10 px-4 sm:px-8">
          {/* Top toolbar */}
          <div className="flex items-center justify-between mb-10 gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-accent border border-border"
              >
                <List className="h-3.5 w-3.5" />
                <span>Sections</span>
              </button>
              <Link
                href={`/modules/${module.id}`}
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {module.title}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/modules/${module.id}/print`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-accent border border-border not-print"
              >
                <Printer className="h-3.5 w-3.5" />
                <span className="hidden sm:block">Print</span>
              </Link>
              <Link
                href={`/modules/${module.id}/quiz`}
                className={cn(
                  "flex items-center gap-1.5 text-xs transition-colors px-2.5 py-1.5 rounded-lg border not-print",
                  slidesCompleted
                    ? "text-foreground border-primary/40 hover:bg-primary/5"
                    : "text-muted-foreground border-border opacity-50 pointer-events-none"
                )}
                aria-disabled={!slidesCompleted}
              >
                <Target className="h-3.5 w-3.5" />
                <span className="hidden sm:block">Quiz</span>
              </Link>
            </div>
          </div>

          {/* Module title */}
          <header className="mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-snug">
              {module.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {module.sections.length} sections · {module.duration}
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-16">
            {module.sections.map((section, i) => {
              const inlineQ = module.quiz[i % module.quiz.length];
              const isRead = sectionsRead.includes(i);

              return (
                <section
                  key={i}
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                  className="scroll-mt-24"
                >
                  {/* Section heading */}
                  <div className="flex items-start gap-3 mb-5">
                    <span className="mt-1 shrink-0 w-5 flex justify-center">
                      {isRead ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-[11px] font-mono tabular-nums text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </span>
                    <h2 className="text-xl font-semibold tracking-tight leading-snug">
                      {section.title}
                    </h2>
                  </div>

                  {/* Body indented under the number/check */}
                  <div className="ml-8">
                    <p className="text-base text-muted-foreground leading-[1.85] mb-6">
                      {renderContent(section.content)}
                    </p>

                    {section.keyPoints.length > 0 && (
                      <div className="rounded-xl border bg-card/60 p-5 mb-2">
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Key Points
                        </h3>
                        <ul className="space-y-3">
                          {section.keyPoints.map((kp, ki) => (
                            <FlaggableKeyPoint
                              key={ki}
                              keyPoint={kp}
                              moduleId={module.id}
                              moduleTitle={module.title}
                              sectionTitle={section.title}
                            />
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Inline quiz question (1 per section, cycling) */}
                    {inlineQ && <InlineQuestion question={inlineQ} />}
                  </div>

                  {/* Section divider */}
                  {i < module.sections.length - 1 && (
                    <hr className="mt-16 border-border/40" />
                  )}
                </section>
              );
            })}
          </div>

          {/* Completion footer */}
          <div className="mt-16 pt-8 border-t border-border/60">
            {slidesCompleted ? (
              <div className="flex items-center justify-between rounded-xl bg-green-500/10 border border-green-500/20 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                      All sections completed!
                    </p>
                    <p className="text-xs text-green-600/70 dark:text-green-500/70 mt-0.5">
                      Ready to take the end-of-module quiz
                    </p>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/modules/${module.id}/quiz`}>
                    Take Quiz
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4">
                <div>
                  <p className="text-sm font-semibold mb-0.5">
                    {allRead
                      ? "You've read all sections — ready to mark complete?"
                      : `${sectionsRead.length} of ${module.sections.length} sections read`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {allRead
                      ? "Marking complete unlocks the quiz."
                      : "Scroll through all sections to track your progress."}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={handleComplete}
                  disabled={!allRead}
                  className="shrink-0"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Mark Complete
                </Button>
              </div>
            )}
          </div>
        </main>

        {/* Right quick-actions column (xl+ only) */}
        <aside className="hidden xl:block w-40 shrink-0">
          <div className="sticky top-14 py-10 pl-4">
            <div className="space-y-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground text-[11px] uppercase tracking-widest">
                Actions
              </p>
              <Link
                href={`/modules/${module.id}/print`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Printer className="h-3.5 w-3.5 shrink-0" />
                Print / Save PDF
              </Link>
              <Link
                href={`/modules/${module.id}/quiz`}
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  slidesCompleted
                    ? "hover:text-foreground"
                    : "opacity-40 pointer-events-none"
                )}
              >
                <Target className="h-3.5 w-3.5 shrink-0" />
                End-of-Module Quiz
              </Link>
              <Link
                href="/review"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                Review Dashboard
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
