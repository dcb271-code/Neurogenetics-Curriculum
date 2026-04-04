"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  FileQuestion,
} from "lucide-react";

interface AttemptInfo {
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export default function AssessmentsPage() {
  const [baseline, setBaseline] = useState<AttemptInfo | null>(null);
  const [comprehensive, setComprehensive] = useState<AttemptInfo | null>(null);

  useEffect(() => {
    fetch("/api/quiz-attempts?moduleId=baseline-assessment")
      .then((r) => r.json())
      .then((d) => {
        if (d.attempts?.length > 0) setBaseline(d.attempts[0]);
      })
      .catch(() => {});

    fetch("/api/quiz-attempts?moduleId=comprehensive-exam")
      .then((r) => r.json())
      .then((d) => {
        if (d.attempts?.length > 0) setComprehensive(d.attempts[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Modules
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Test Your Knowledge
        </h1>
        <p className="text-sm text-muted-foreground">
          Measure where you start and how far you&apos;ve come.
        </p>
      </div>

      <div className="space-y-4">
        {/* Baseline */}
        <Link
          href="/assessments/baseline"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              Pre-Curriculum Baseline Assessment
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              25 questions &mdash; gauge your starting knowledge (no feedback
              provided)
            </p>
            {baseline && (
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Last attempt: {baseline.score}/{baseline.totalQuestions} (
                {Math.round(
                  (baseline.score / baseline.totalQuestions) * 100
                )}
                %) &mdash;{" "}
                {new Date(baseline.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>

        {/* Comprehensive */}
        <Link
          href="/assessments/comprehensive"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              Post-Curriculum Comprehensive Assessment
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              50 board-style questions &mdash; 76% to pass
            </p>
            {comprehensive && (
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Last attempt: {comprehensive.score}/
                {comprehensive.totalQuestions} (
                {Math.round(
                  (comprehensive.score / comprehensive.totalQuestions) *
                    100
                )}
                %) &mdash;{" "}
                {new Date(comprehensive.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      </div>
    </main>
  );
}
