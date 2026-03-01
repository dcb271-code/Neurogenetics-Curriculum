"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dna, Sparkles, Bookmark, ChevronRight, Map, GraduationCap } from "lucide-react";
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
  "Clinical Decision-Making",
];

const tagStyle: Record<FilterTag, string> = {
  All: "data-[active=true]:bg-foreground data-[active=true]:text-background",
  "Basic Genetics": "data-[active=true]:bg-blue-500 data-[active=true]:text-white",
  Neurogenetics: "data-[active=true]:bg-violet-500 data-[active=true]:text-white",
  Advanced: "data-[active=true]:bg-amber-500 data-[active=true]:text-white",
  "Clinical Decision-Making": "data-[active=true]:bg-teal-500 data-[active=true]:text-white",
};

export default function HomePage() {
  const modules = getAllModules();
  const [activeTag, setActiveTag] = useState<FilterTag>("All");
  const [stats, setStats] = useState({ started: 0, completed: 0, percent: 0 });
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const [flagCount, setFlagCount] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPathway, setShowPathway] = useState(false);

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

      {/* Curriculum Pathway */}
      <section className="mb-10">
        <button
          onClick={() => setShowPathway((p) => !p)}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <Map className="h-3.5 w-3.5" />
          {showPathway ? "Hide" : "Show"} Curriculum Pathway
        </button>

        {showPathway && (
          <div className="rounded-xl border bg-card p-5 animate-fade-in space-y-5">
            {/* Tracks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {([
                {
                  title: "1. Foundation",
                  color: "bg-blue-500",
                  ids: ["intro-neurogenetics", "intro-genetics", "central-dogma", "chromosomes-iscn", "mosaicism", "methylation"],
                },
                {
                  title: "2. Variant Interpretation",
                  color: "bg-violet-500",
                  ids: ["cnv-interpretation", "variant-interpretation-intro", "variant-interpretation"],
                },
                {
                  title: "3. Clinical Syndromes",
                  color: "bg-rose-500",
                  ids: ["ataxia", "epilepsy", "mitochondrial", "dystonia", "neuromuscular", "stroke", "cerebral-palsy", "dual-diagnosis"],
                },
                {
                  title: "4. Mechanisms & Therapeutics",
                  color: "bg-amber-500",
                  ids: ["iem", "pharmacogenetics", "therapies", "epigenetics-neurology", "neuronal-signaling"],
                },
                {
                  title: "5. Clinical Decision-Making",
                  color: "bg-teal-500",
                  ids: ["diagnostic-yields", "neuroimaging", "virtual-cases"],
                },
              ] as const).map((track) => (
                <div key={track.title} className="rounded-lg border bg-background p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("h-2 w-2 rounded-full", track.color)} />
                    <span className="text-[11px] font-semibold">{track.title}</span>
                  </div>
                  <div className="space-y-1">
                    {track.ids.map((id) => {
                      const m = modules.find((mod) => mod.id === id);
                      if (!m) return null;
                      const pct = sectionProgress[id] ?? 0;
                      return (
                        <Link
                          key={id}
                          href={`/modules/${id}`}
                          className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors py-0.5"
                        >
                          <div className="h-1 w-1 rounded-full shrink-0" style={{
                            backgroundColor: pct === 100 ? "#22c55e" : pct > 0 ? "hsl(var(--primary))" : "hsl(var(--border))"
                          }} />
                          <span className="truncate">{m.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Role-based starting points */}
            <div className="border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Suggested Starting Points
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 px-3 py-2.5">
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mb-1">Junior Resident (PGY-2/3)</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Start with Foundation track, then Clinical Syndromes. Focus on pattern recognition and when to order genetic testing.
                  </p>
                </div>
                <div className="rounded-lg bg-violet-500/5 border border-violet-500/20 px-3 py-2.5">
                  <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 mb-1">Senior Resident (PGY-4/5)</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Start with Variant Interpretation, then Diagnostic Yields and Clinical Syndromes. Focus on interpreting results and test selection.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2.5">
                  <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mb-1">Genetics Fellow</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Start with Variant Interpretation and Mechanisms, then Virtual Cases. Focus on ACMG classification, pharmacogenomics, and integrative reasoning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

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
