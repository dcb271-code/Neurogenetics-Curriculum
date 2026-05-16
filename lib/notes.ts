"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/use-auth";

export interface NoteItem {
  moduleId: string;
  moduleTitle: string;
  content: string;
  updatedAt: number;
}

const SAVE_DEBOUNCE_MS = 800;

/** All notes for the logged-in user. Used by the Review Dashboard. */
export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetch("/api/notes")
      .then((r) => (r.ok ? r.json() : { notes: [] }))
      .then((d) => setNotes(d.notes ?? []))
      .catch(() => setNotes([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  return { notes, isLoading };
}

type SaveStatus = "idle" | "saving" | "saved";

/** Single-module note with debounced autosave. Used by edit surfaces. */
export function useModuleNote(moduleId: string, moduleTitle: string) {
  const { user } = useAuth();
  const [content, setContentState] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [loaded, setLoaded] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestContent = useRef("");
  const latestTitle = useRef(moduleTitle);

  // Keep refs current
  useEffect(() => {
    latestTitle.current = moduleTitle;
  }, [moduleTitle]);

  // Load initial content
  useEffect(() => {
    if (!user) {
      setContentState("");
      setLoaded(true);
      return;
    }
    setLoaded(false);
    fetch(`/api/notes?moduleId=${encodeURIComponent(moduleId)}`)
      .then((r) => (r.ok ? r.json() : { note: null }))
      .then((d) => {
        const text: string = d.note?.content ?? "";
        setContentState(text);
        latestContent.current = text;
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user, moduleId]);

  const putNote = useCallback(
    (keepalive = false) =>
      fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          moduleTitle: latestTitle.current,
          content: latestContent.current,
        }),
        keepalive,
      }),
    [moduleId]
  );

  const flush = useCallback(async () => {
    if (!user) return;
    setStatus("saving");
    try {
      await putNote();
      setStatus("saved");
    } catch {
      setStatus("idle");
    }
  }, [user, putNote]);

  const setContent = useCallback(
    (text: string) => {
      setContentState(text);
      latestContent.current = text;
      if (!user) return;
      setStatus("idle");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        flush();
      }, SAVE_DEBOUNCE_MS);
    },
    [user, flush]
  );

  // Flush on unmount if a save is pending
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        if (user) {
          putNote(true).catch(() => {});
        }
      }
    };
  }, [user, putNote]);

  return { content, setContent, status, loaded };
}
