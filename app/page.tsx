"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dna, Sparkles, Bookmark, ChevronRight } from "lucide-react";
import { getAllModules } from "@/lib/modules";
import { getProgress, getOverallStats, getModuleSectionProgress } from "@/lib/progress";
import { getFlags } from "@/lib/flags";
import { Tag } from "@/lib/types";
import { ModuleCard } from "@/components/module-card";
import { ProgressRing } from "@/components/progress-ring";
import { cn } from "@/lib/utils";

type FilterTag = Tag | "All";

const TAG_OPTIONS: FilterTag[] = [
  "All",
  "Basic Genetics",
  "Neurogenetics",
  "Advanced",
];

const tagStyle: Record<FilterTag, string> = {
  All: "data-[active=true]:bg-foreground data-[active=true]:text-background",
  "Basic Genetics": "data-[active=true]:bg-blue-500 data-[active=true]:text-white",
  Neurogenetics: "data-[active=true]:bg-violet-500 data-[active=true]:text-white",
  Advanced: "data-[active=true]:bg-amber-500 data-[active=true]:text-white",
};

export default function HomePage() {
  const modules = getAllModules();
  const [activeTag, setActiveTag] = useState<FilterTag>("All");
  const [stats, setStats] = useState({ started: 0, completed: 0, percent: 0 });
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const [flagCount, setFlagCount] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    setStats(getOverallStats(progress, modules.length));
    setFlagCount(getFlags().length);
    const sp: Record<string, number> = {};
    modules.forEach((m) => {
      sp[m.id] = getModuleSectionProgress(m.id, m.sections.length);
    });
    setSectionProgress(sp);
    setShowDashboard(Object.keys(progress).length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules.length]);

  const filtered =
    activeTag === "All"
      ? modules
      : modules.filter((m) => m.tags.includes(activeTag as Tag));

  const inProgress = modules.filter((m) => {
    const pct = sectionProgress[m.id] ?? 0;
    return pct > 0 && pct < 100;
  });

  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="mb-10 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Dna className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Curriculum
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Neurogenetics
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              A structured learning path through the molecular genetics of the
              nervous system — from foundational concepts to clinical variant
              interpretation.
            </p>
          </div>

          {stats.started > 0 && (
            <div className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4 shrink-0">
              <ProgressRing value={stats.percent} size={52} strokeWidth={4.5} showLabel />
              <div>
                <p className="text-sm font-semibold">Your Progress</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stats.completed} of {modules.length} completed
                </p>
                {flagCount > 0 && (
                  <Link
                    href="/review"
                    className="flex items-center gap-1 mt-1.5 text-[11px] text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    <Bookmark className="h-3 w-3" />
                    {flagCount} flagged for review
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* In-Progress Dashboard */}
      {showDashboard && inProgress.length > 0 && (
        <section className="mb-10 rounded-xl border bg-card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Continue Learning
          </h2>
          <div className="space-y-1">
            {inProgress.map((m) => {
              const pct = sectionProgress[m.id] ?? 0;
              return (
                <Link
                  key={m.id}
                  href={`/modules/${m.id}/slides`}
                  className="flex items-center gap-4 rounded-lg hover:bg-accent/50 px-3 py-2.5 transition-colors group"
                >
                  <ProgressRing value={pct} size={36} strokeWidth={3} showLabel />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {Math.round(pct)}% sections read · {m.duration}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </Link>
              );
            })}
          </div>

          {/* All-modules progress strip */}
          <div className="mt-4 pt-4 border-t border-border/60">
            <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">
              All modules
            </p>
            <div className="flex gap-1">
              {modules.map((m) => {
                const pct = sectionProgress[m.id] ?? 0;
                return (
                  <Link
                    key={m.id}
                    href={`/modules/${m.id}`}
                    title={`${m.title} — ${pct}%`}
                    className="flex-1 h-1.5 rounded-full overflow-hidden bg-border"
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        pct === 100 ? "bg-green-500" : pct > 0 ? "bg-primary" : "bg-transparent"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tag Filter */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            data-active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
              "border-border bg-background text-muted-foreground",
              "hover:text-foreground hover:border-foreground/20",
              tagStyle[tag]
            )}
          >
            {tag}
            {tag !== "All" && (
              <span className="ml-1.5 opacity-60">
                ({modules.filter((m) => m.tags.includes(tag as Tag)).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modules grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((module, i) => (
            <div
              key={module.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <ModuleCard module={module} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Sparkles className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No modules for this tag yet.</p>
        </div>
      )}

      <p className="mt-12 text-center text-xs text-muted-foreground/50">
        Add modules by creating JSON files in{" "}
        <code className="font-mono text-muted-foreground">data/modules/</code>
      </p>
    </main>
  );
}
