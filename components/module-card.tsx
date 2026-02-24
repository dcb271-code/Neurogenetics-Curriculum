"use client";

import Link from "next/link";
import { Clock, ChevronRight, CheckCircle2, BookOpen } from "lucide-react";
import { Module } from "@/lib/types";
import { TagBadge } from "@/components/tag-badge";
import { ProgressRing } from "@/components/progress-ring";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const colorAccent: Record<string, string> = {
  blue: "from-blue-500/5 to-transparent border-blue-500/10 hover:border-blue-500/25",
  violet: "from-violet-500/5 to-transparent border-violet-500/10 hover:border-violet-500/25",
  amber: "from-amber-500/5 to-transparent border-amber-500/10 hover:border-amber-500/25",
  green: "from-green-500/5 to-transparent border-green-500/10 hover:border-green-500/25",
  rose: "from-rose-500/5 to-transparent border-rose-500/10 hover:border-rose-500/25",
};

const colorDot: Record<string, string> = {
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  green: "bg-green-500",
  rose: "bg-rose-500",
};

const difficultyLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface ModuleCardProps {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const { progress } = useProgress();
  const mp = progress[module.id];

  const sectionsCount = module.sections.length;
  const sectionsProgress =
    mp && mp.slidesCompleted
      ? 100
      : mp && sectionsCount > 0
      ? Math.round(((mp.sectionsRead ?? []).length / sectionsCount) * 100)
      : 0;

  const isComplete = mp?.slidesCompleted && mp?.quizCompleted;
  const isStarted = !!mp && ((mp.sectionsRead ?? []).length > 0 || mp.slidesCompleted);

  const totalProgress = isComplete
    ? 100
    : mp?.slidesCompleted
    ? 60
    : sectionsProgress * 0.6;

  return (
    <Link
      href={`/modules/${module.id}`}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-gradient-to-br p-5 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        colorAccent[module.color] || colorAccent.blue
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "h-2 w-2 rounded-full shrink-0 mt-0.5",
              colorDot[module.color] || colorDot.blue
            )}
          />
          <TagBadge tag={module.tags[0]} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isComplete && (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          )}
          <ProgressRing value={totalProgress} size={32} strokeWidth={3} />
        </div>
      </div>

      <h3 className="mb-1.5 text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {module.title}
      </h3>

      <p className="mb-4 text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {module.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {module.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {sectionsCount} sections
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted capitalize">
            {difficultyLabel[module.difficulty]}
          </span>
        </div>
        <span className="flex items-center gap-0.5 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity text-[11px]">
          {isStarted ? "Continue" : "Start"}
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      {(isStarted || isComplete) && (
        <div className="mt-3 pt-3 border-t border-border/60">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>
              {isComplete
                ? "Completed"
                : mp?.slidesCompleted
                ? "Sections done · Quiz pending"
                : `${(mp?.sectionsRead ?? []).length} of ${sectionsCount} sections read`}
            </span>
            {mp?.quizScore !== undefined && (
              <span className="text-green-500 font-medium">
                Quiz: {mp.quizScore}/{module.quiz.length}
              </span>
            )}
          </div>
          <div className="h-0.5 w-full rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
