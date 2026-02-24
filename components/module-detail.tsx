"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Target,
  CheckCircle2,
  Trophy,
  Play,
  RotateCcw,
  Images,
} from "lucide-react";
import { Module } from "@/lib/types";
import { TagBadge } from "@/components/tag-badge";
import { ProgressRing } from "@/components/progress-ring";
import { Button } from "@/components/ui/button";
import { SlideGallery } from "@/components/slide-gallery";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const difficultyStyle: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

type Tab = "overview" | "slides";

export function ModuleDetail({ module }: { module: Module }) {
  const [tab, setTab] = useState<Tab>("overview");
  const { progress } = useProgress();
  const mp = progress[module.id];

  const slidesCompleted = mp?.slidesCompleted ?? false;
  const quizCompleted = mp?.quizCompleted ?? false;
  const sectionsRead = mp?.sectionsRead ?? [];
  const quizScore = mp?.quizScore;
  const sectionCount = module.sections.length;

  const slideProgress = slidesCompleted
    ? 100
    : sectionCount > 0
    ? Math.round((sectionsRead.length / sectionCount) * 100)
    : 0;

  const totalProgress =
    slidesCompleted && quizCompleted
      ? 100
      : slidesCompleted
      ? 60
      : slideProgress * 0.6;

  const isStarted = !!mp && (sectionsRead.length > 0 || slidesCompleted);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Modules
        </Link>

        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {module.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${difficultyStyle[module.difficulty]}`}
              >
                {module.difficulty}
              </span>
            </div>
            <ProgressRing value={totalProgress} size={48} strokeWidth={4} showLabel />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">{module.title}</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
            {module.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {module.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {sectionCount} sections
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="h-4 w-4" />
              {module.quiz.length} quiz questions
            </span>
          </div>
        </div>

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="flex gap-1 border-b border-border mb-8">
          {(["overview", "slides"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "slides" && <Images className="h-3.5 w-3.5" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Slides tab ────────────────────────────────────────────────────── */}
        {tab === "slides" && (
          <SlideGallery moduleId={module.id} />
        )}

        {/* ── Overview tab ──────────────────────────────────────────────────── */}
        {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: objectives + content list */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Objectives */}
            <section className="rounded-xl border bg-card p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Learning Objectives
              </h2>
              <ul className="space-y-2.5">
                {module.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center text-[9px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section list */}
            <section className="rounded-xl border bg-card p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Module Content
              </h2>
              <div className="space-y-1">
                {module.sections.map((section, i) => {
                  const done = slidesCompleted || sectionsRead.includes(i);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-xs tabular-nums text-muted-foreground w-5 shrink-0">
                        {i + 1}
                      </span>
                      {done ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      ) : (
                        <span className="h-3.5 w-3.5 rounded-full border border-border shrink-0" />
                      )}
                      <span className={`text-sm ${done ? "text-muted-foreground" : "text-foreground"}`}>
                        {section.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right: actions */}
          <div className="space-y-4">
            {/* Sections CTA */}
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Sections</h3>
                {slidesCompleted && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {slidesCompleted
                  ? "You've completed all sections."
                  : isStarted
                  ? `${sectionsRead.length} of ${sectionCount} sections read.`
                  : `${sectionCount} sections to work through.`}
              </p>
              <div className="h-1 w-full rounded-full bg-secondary mb-4 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
              <Button asChild className="w-full" size="sm">
                <Link href={`/modules/${module.id}/slides`}>
                  <Play className="h-3.5 w-3.5 mr-1.5" />
                  {slidesCompleted ? "Review" : isStarted ? "Continue" : "Start Learning"}
                </Link>
              </Button>
            </div>

            {/* Quiz CTA */}
            <div className={`rounded-xl border bg-card p-5 transition-opacity ${slidesCompleted ? "" : "opacity-60"}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Quiz</h3>
                {quizCompleted && (
                  <Trophy className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {quizCompleted
                  ? `Scored ${quizScore ?? "?"} / ${module.quiz.length} — ${
                      quizScore !== undefined && quizScore >= Math.ceil(module.quiz.length * 0.8)
                        ? "Excellent!"
                        : "Keep studying!"
                    }`
                  : slidesCompleted
                  ? `${module.quiz.length} questions to test your knowledge.`
                  : "Complete sections to unlock the quiz."}
              </p>
              <Button
                asChild
                variant={quizCompleted ? "outline" : "default"}
                className="w-full"
                size="sm"
                disabled={!slidesCompleted}
              >
                <Link href={`/modules/${module.id}/quiz`}>
                  {quizCompleted ? (
                    <>
                      <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                      Retake Quiz
                    </>
                  ) : (
                    <>
                      <Target className="h-3.5 w-3.5 mr-1.5" />
                      Take Quiz
                    </>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        )} {/* end overview tab */}
      </div>
    </div>
  );
}
