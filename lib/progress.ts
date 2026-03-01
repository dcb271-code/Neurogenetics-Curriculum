"use client";

import { useEffect, useState, useCallback } from "react";

export interface ModuleProgress {
  currentSlide: number;
  sectionsRead: number[]; // indices of sections the user has scrolled through
  slidesCompleted: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  startedAt?: string;
  completedAt?: string;
  lastSection?: number; // index of last-viewed section for resume
}

export interface CurriculumProgress {
  [moduleId: string]: ModuleProgress;
}

const STORAGE_KEY = "neurogenetics-progress";

export function getProgress(): CurriculumProgress {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: CurriculumProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

export function getModuleProgress(moduleId: string): ModuleProgress | null {
  const progress = getProgress();
  return progress[moduleId] || null;
}

const defaultModuleProgress: ModuleProgress = {
  currentSlide: 0,
  sectionsRead: [],
  slidesCompleted: false,
  quizCompleted: false,
};

export function updateModuleProgress(
  moduleId: string,
  update: Partial<ModuleProgress>
): void {
  const progress = getProgress();
  const existing = progress[moduleId] ?? { ...defaultModuleProgress };
  progress[moduleId] = { ...existing, ...update };
  saveProgress(progress);
}

/** Mark a section as read (idempotent — skips write if already recorded). */
export function markSectionRead(moduleId: string, sectionIndex: number): void {
  const progress = getProgress();
  const existing = progress[moduleId] ?? { ...defaultModuleProgress };
  const sectionsRead = existing.sectionsRead ?? [];
  if (sectionsRead.includes(sectionIndex)) return;
  progress[moduleId] = {
    ...existing,
    sectionsRead: [...sectionsRead, sectionIndex],
    startedAt: existing.startedAt ?? new Date().toISOString(),
  };
  saveProgress(progress);
}

/** 0–100 percentage of sections read for a module. */
export function getModuleSectionProgress(
  moduleId: string,
  totalSections: number
): number {
  if (totalSections === 0) return 0;
  const mp = getProgress()[moduleId];
  if (!mp) return 0;
  if (mp.slidesCompleted) return 100;
  return Math.round(((mp.sectionsRead ?? []).length / totalSections) * 100);
}

export function useProgress() {
  const [progress, setProgress] = useState<CurriculumProgress>({});

  const refresh = useCallback(() => {
    setProgress(getProgress());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const update = useCallback(
    (moduleId: string, partial: Partial<ModuleProgress>) => {
      updateModuleProgress(moduleId, partial);
      setProgress(getProgress());
    },
    []
  );

  return { progress, update, refresh };
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
