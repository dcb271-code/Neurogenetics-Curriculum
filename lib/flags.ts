"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/use-auth";

export interface FlaggedItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  sectionTitle: string;
  keyPoint: string;
  flaggedAt: number;
}

export function useFlags() {
  const { user } = useAuth();
  const [flags, setFlags] = useState<FlaggedItem[]>([]);

  useEffect(() => {
    if (!user) {
      setFlags([]);
      return;
    }
    fetch("/api/flags")
      .then((r) => r.json())
      .then((d) => setFlags(d.flags ?? []))
      .catch(() => {});
  }, [user]);

  const toggle = useCallback(
    async (item: Omit<FlaggedItem, "id" | "flaggedAt">) => {
      if (!user) return;

      const res = await fetch("/api/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle",
          moduleId: item.moduleId,
          moduleTitle: item.moduleTitle,
          sectionTitle: item.sectionTitle,
          keyPoint: item.keyPoint,
        }),
      });
      const data = await res.json();

      // Refresh flags from server
      const updated = await fetch("/api/flags").then((r) => r.json());
      setFlags(updated.flags ?? []);

      return data.flagged;
    },
    [user]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user) return;
      setFlags((prev) => prev.filter((f) => f.id !== id));
      await fetch("/api/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", flagId: id }),
      });
    },
    [user]
  );

  const isFlagged = useCallback(
    (_moduleId: string, sectionTitle: string, keyPoint: string) =>
      flags.some((f) => f.sectionTitle === sectionTitle && f.keyPoint === keyPoint),
    [flags]
  );

  return { flags, toggle, remove, isFlagged, count: flags.length };
}
