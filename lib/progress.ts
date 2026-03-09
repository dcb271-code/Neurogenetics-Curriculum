"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/use-auth";

export interface ModuleProgress {
  currentSlide: number;
  sectionsRead: number[];
  slidesCompleted: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  startedAt?: string;
  completedAt?: string;
  lastSection?: number;
}

export interface CurriculumProgress {
  [moduleId: string]: ModuleProgress;
}

const defaultModuleProgress: ModuleProgress = {
  currentSlide: 0,
  sectionsRead: [],
  slidesCompleted: false,
  quizCompleted: false,
};

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CurriculumProgress>({});
  const [loaded, setLoaded] = useState(false);

  // Fetch from API when logged in
  useEffect(() => {
    if (!user) {
      setProgress({});
      setLoaded(true);
      return;
    }
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => setProgress(data))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user]);

  const update = useCallback(
    (moduleId: string, partial: Partial<ModuleProgress>) => {
      if (!user) return;

      // Optimistic update
      setProgress((prev) => {
        const existing = prev[moduleId] ?? { ...defaultModuleProgress };
        // Merge sectionsRead arrays if both exist
        const merged = { ...existing, ...partial };
        if (partial.sectionsRead && existing.sectionsRead) {
          const set = new Set([...existing.sectionsRead, ...partial.sectionsRead]);
          merged.sectionsRead = Array.from(set).sort((a, b) => a - b);
        }
        return { ...prev, [moduleId]: merged };
      });

      // Fire-and-forget API call
      fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, ...partial }),
      }).catch(() => {});
    },
    [user]
  );

  const refresh = useCallback(() => {
    if (!user) return;
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => setProgress(data))
      .catch(() => {});
  }, [user]);

  return { progress, update, refresh, loaded };
}

/** 0–100 percentage of sections read for a module. */
export function getModuleSectionProgress(
  progress: CurriculumProgress,
  moduleId: string,
  totalSections: number
): number {
  if (totalSections === 0) return 0;
  const mp = progress[moduleId];
  if (!mp) return 0;
  if (mp.slidesCompleted) return 100;
  return Math.round(((mp.sectionsRead ?? []).length / totalSections) * 100);
}

export function getOverallStats(
  progress: CurriculumProgress,
  totalModules: number
) {
  const started = Object.keys(progress).length;
  const completed = Object.values(progress).filter(
    (p) => p.slidesCompleted && p.quizCompleted
  ).length;
  const percent =
    totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
  return { started, completed, percent };
}
