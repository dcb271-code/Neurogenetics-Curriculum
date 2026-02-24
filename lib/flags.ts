"use client";

import { useState, useEffect, useCallback } from "react";

const FLAGS_KEY = "neurogenetics-flags";

export interface FlaggedItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  sectionTitle: string;
  keyPoint: string;
  flaggedAt: number;
}

function makeId(
  moduleId: string,
  sectionTitle: string,
  keyPoint: string
): string {
  const str = `${moduleId}||${sectionTitle}||${keyPoint}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

export function getFlags(): FlaggedItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FLAGS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveFlags(flags: FlaggedItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
}

/**
 * Toggle a flag. Returns true if the item is now flagged, false if unflagged.
 */
export function toggleFlag(
  item: Omit<FlaggedItem, "id" | "flaggedAt">
): boolean {
  const flags = getFlags();
  const id = makeId(item.moduleId, item.sectionTitle, item.keyPoint);
  const existingIdx = flags.findIndex((f) => f.id === id);
  if (existingIdx !== -1) {
    saveFlags(flags.filter((_, i) => i !== existingIdx));
    return false;
  }
  saveFlags([...flags, { ...item, id, flaggedAt: Date.now() }]);
  return true;
}

export function removeFlag(id: string): void {
  saveFlags(getFlags().filter((f) => f.id !== id));
}

export function isFlagged(
  moduleId: string,
  sectionTitle: string,
  keyPoint: string
): boolean {
  const id = makeId(moduleId, sectionTitle, keyPoint);
  return getFlags().some((f) => f.id === id);
}

export function useFlags() {
  const [flags, setFlags] = useState<FlaggedItem[]>([]);

  useEffect(() => {
    setFlags(getFlags());
  }, []);

  const toggle = useCallback(
    (item: Omit<FlaggedItem, "id" | "flaggedAt">) => {
      toggleFlag(item);
      setFlags(getFlags());
    },
    []
  );

  const remove = useCallback((id: string) => {
    removeFlag(id);
    setFlags(getFlags());
  }, []);

  const check = useCallback(
    (moduleId: string, sectionTitle: string, keyPoint: string) =>
      isFlagged(moduleId, sectionTitle, keyPoint),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flags]
  );

  return { flags, toggle, remove, isFlagged: check, count: flags.length };
}
