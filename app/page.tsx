"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Dna, Bookmark, ChevronRight, ClipboardList, Clock } from "lucide-react";
import { getAllModules } from "@/lib/modules";
import { useProgress, getOverallStats, getModuleSectionProgress } from "@/lib/progress";
import { useFlags } from "@/lib/flags";
import { useAuth } from "@/lib/use-auth";
import { Tag, Module } from "@/lib/types";
import { ModuleCard } from "@/components/module-card";
import { ProgressRing } from "@/components/progress-ring";
import { ContinueBanner } from "@/components/continue-banner";
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

interface Block {
  num: number;
  title: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  ids: string[];
}

const BLOCKS: Block[] = [
  {
    num: 1, title: "Foundations of Genetics",
    color: "bg-blue-500", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5", textColor: "text-blue-600 dark:text-blue-400",
    ids: ["intro-neurogenetics", "central-dogma", "chromosomes-iscn"],
  },
  {
    num: 2, title: "Epigenetics & Mosaicism",
    color: "bg-violet-500", borderColor: "border-violet-500/20", bgColor: "bg-violet-500/5", textColor: "text-violet-600 dark:text-violet-400",
    ids: ["epigenetics", "mosaicism"],
  },
  {
    num: 3, title: "Variant Interpretation",
    color: "bg-violet-500", borderColor: "border-violet-500/20", bgColor: "bg-violet-500/5", textColor: "text-violet-600 dark:text-violet-400",
    ids: ["variant-interpretation", "cnv-interpretation"],
  },
  {
    num: 4, title: "Test Selection & Counseling",
    color: "bg-amber-500", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/5", textColor: "text-amber-600 dark:text-amber-400",
    ids: ["diagnostic-yields", "genetic-counseling", "neuroimaging"],
  },
  {
    num: 5, title: "Epilepsy & Pharmacogenomics",
    color: "bg-rose-500", borderColor: "border-rose-500/20", bgColor: "bg-rose-500/5", textColor: "text-rose-600 dark:text-rose-400",
    ids: ["epilepsy", "pharmacogenetics"],
  },
  {
    num: 6, title: "Neurodevelopmental Disorders",
    color: "bg-rose-500", borderColor: "border-rose-500/20", bgColor: "bg-rose-500/5", textColor: "text-rose-600 dark:text-rose-400",
    ids: ["neurodevelopmental-disorders", "cerebral-palsy"],
  },
  {
    num: 7, title: "Movement Disorders & IEM",
    color: "bg-amber-500", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/5", textColor: "text-amber-600 dark:text-amber-400",
    ids: ["dystonia", "iem"],
  },
  {
    num: 8, title: "Neuromuscular & Ataxia",
    color: "bg-green-500", borderColor: "border-green-500/20", bgColor: "bg-green-500/5", textColor: "text-green-600 dark:text-green-400",
    ids: ["neuromuscular", "ataxia"],
  },
  {
    num: 9, title: "Stroke, Mitochondrial & Dual Diagnosis",
    color: "bg-blue-500", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5", textColor: "text-blue-600 dark:text-blue-400",
    ids: ["mitochondrial", "stroke", "dual-diagnosis"],
  },
  {
    num: 10, title: "Therapies & Integration",
    color: "bg-teal-500", borderColor: "border-teal-500/20", bgColor: "bg-teal-500/5", textColor: "text-teal-600 dark:text-teal-400",
    ids: ["therapies", "virtual-cases"],
  },
];

function getBlockModules(block: Block, allModules: Module[]): Module[] {
  return block.ids
    .map((id) => allModules.find((m) => m.id === id))
    .filter((m): m is Module => !!m);
}

function sumDuration(mods: Module[]): string {
  let total = 0;
  for (const m of mods) {
    const match = m.duration.match(/(\d+)/);
    if (match) total += parseInt(match[1], 10);
  }
  return `${total} min`;
}

function blockProgress(mods: Module[], sp: Record<string, number>): number {
  if (mods.length === 0) return 0;
  const sum = mods.reduce((acc, m) => acc + (sp[m.id] ?? 0), 0);
  return Math.round(sum / mods.length);
}

export default function HomePage() {
  const modules = getAllModules();
  const [activeTag, setActiveTag] = useState<FilterTag>("All");
  const { progress, loaded } = useProgress();
  const { count: flagCount } = useFlags();
  const { user } = useAuth();

  const stats = useMemo(() => getOverallStats(progress, modules.length), [progress, modules.length]);

  const sectionProgress = useMemo(() => {
    const sp: Record<string, number> = {};
    modules.forEach((m) => {
      sp[m.id] = getModuleSectionProgress(progress, m.id, m.sections.length);
    });
    return sp;
  }, [progress, modules]);

  const showDashboard = loaded && Object.keys(progress).length > 0;

  const inProgress = modules.filter((m) => {
    const pct = sectionProgress[m.id] ?? 0;
    return pct > 0 && pct < 100;
  });

  // Filter blocks by tag — show blocks that have at least one matching module
  const filteredBlocks = BLOCKS.map((block) => {
    const blockMods = getBlockModules(block, modules);
    const visible =
      activeTag === "All"
        ? blockMods
        : blockMods.filter((m) => m.tags.includes(activeTag as Tag));
    return { block, modules: visible };
  }).filter((b) => b.modules.length > 0);

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
              10 one-hour blocks covering the molecular genetics of the
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

      {/* Continue where you left off */}
      {user && <ContinueBanner />}

      {/* Comprehensive Exam CTA */}
      <section className="mb-10">
        <Link
          href="/exam"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Comprehensive Examination</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              50 board-style questions across all modules — passing score 70%
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
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

      {/* Blocks */}
      <div className="space-y-8">
        {filteredBlocks.map(({ block, modules: blockMods }, blockIdx) => {
          const allBlockMods = getBlockModules(block, modules);
          const pct = blockProgress(allBlockMods, sectionProgress);
          const duration = sumDuration(allBlockMods);

          return (
            <section
              key={block.num}
              className="animate-fade-in"
              style={{ animationDelay: `${blockIdx * 60}ms` }}
            >
              {/* Block header */}
              <div className={cn(
                "flex items-center gap-3 mb-4 px-1"
              )}>
                <div className={cn(
                  "flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold text-white shrink-0",
                  block.color
                )}>
                  {block.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-semibold truncate">
                      {block.title}
                    </h2>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3" />
                      {duration}
                    </span>
                  </div>
                  {/* Block progress bar */}
                  {pct > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="h-1 flex-1 rounded-full bg-border overflow-hidden max-w-48">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            pct === 100 ? "bg-green-500" : "bg-primary"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {pct}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Module cards within block */}
              <div className={cn(
                "grid gap-4",
                blockMods.length === 1
                  ? "grid-cols-1 sm:grid-cols-2"
                  : blockMods.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}>
                {blockMods.map((mod, i) => (
                  <div
                    key={mod.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(blockIdx * 3 + i) * 40}ms` }}
                  >
                    <ModuleCard module={mod} index={blockIdx * 3 + i} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {filteredBlocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-muted-foreground">No modules match this filter.</p>
          </div>
        )}
      </div>

    </main>
  );
}
