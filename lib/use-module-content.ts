"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Module } from "@/lib/types";
import { useAuth } from "@/lib/use-auth";
import {
  SectionOverride,
  QuizOverride,
  MergedEdits,
  mergeModule,
} from "@/lib/module-overrides";

export function useModuleContent(moduleId: string, staticModule: Module) {
  const { user } = useAuth();
  const isAdminUser = user?.role === "admin";

  const [sectionOverrides, setSectionOverrides] = useState<SectionOverride[]>([]);
  const [quizOverrides, setQuizOverrides] = useState<QuizOverride[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOverrides = useCallback(async () => {
    const url = isAdminUser
      ? `/api/admin/module-overrides/${moduleId}`
      : `/api/module-overrides/${moduleId}`;
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        setSectionOverrides([]);
        setQuizOverrides([]);
        return;
      }
      const data = await res.json();
      setSectionOverrides(data.sections ?? []);
      setQuizOverrides(data.quiz ?? []);
    } catch {
      setSectionOverrides([]);
      setQuizOverrides([]);
    } finally {
      setLoading(false);
    }
  }, [moduleId, isAdminUser]);

  useEffect(() => {
    fetchOverrides();
  }, [fetchOverrides]);

  const { module, edits } = useMemo(
    () => mergeModule(staticModule, sectionOverrides, quizOverrides),
    [staticModule, sectionOverrides, quizOverrides],
  );

  return {
    module,
    edits,
    isAdminUser,
    loading,
    refresh: fetchOverrides,
  } as {
    module: Module;
    edits: MergedEdits;
    isAdminUser: boolean;
    loading: boolean;
    refresh: () => Promise<void>;
  };
}
