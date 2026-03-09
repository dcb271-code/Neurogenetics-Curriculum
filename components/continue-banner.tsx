"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlayCircle, ChevronRight } from "lucide-react";


interface RecentModule {
  moduleId: string;
  moduleTitle: string;
  currentSlide: number;
  totalSlides: number;
  sectionsRead: number;
  totalSections: number;
}

export function ContinueBanner() {
  const [recent, setRecent] = useState<RecentModule | null>(null);

  useEffect(() => {
    fetch("/api/progress/recent")
      .then((r) => r.json())
      .then((d) => {
        if (d.moduleId) setRecent(d);
      })
      .catch(() => {});
  }, []);

  if (!recent) return null;

  const pct = recent.totalSections > 0
    ? Math.round((recent.sectionsRead / recent.totalSections) * 100)
    : 0;

  return (
    <section className="mb-6 animate-fade-in">
      <Link
        href={`/modules/${recent.moduleId}/slides`}
        className="group flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors"
      >
        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <PlayCircle className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-primary uppercase tracking-wider">
            Continue where you left off
          </p>
          <p className="text-sm font-semibold mt-0.5 truncate">
            {recent.moduleTitle}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1 flex-1 max-w-32 rounded-full bg-primary/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground">{pct}%</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
      </Link>
    </section>
  );
}
