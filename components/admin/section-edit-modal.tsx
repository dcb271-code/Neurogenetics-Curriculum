"use client";

import { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { Section } from "@/lib/types";
import { EditStatus } from "@/lib/module-overrides";
import { Button } from "@/components/ui/button";
import { AdminBadge } from "@/components/admin/admin-badge";

interface Props {
  moduleId: string;
  sectionIndex: number;
  initial: Section;
  currentStatus: EditStatus;
  onClose: () => void;
  onSaved: () => void;
}

export function SectionEditModal({
  moduleId,
  sectionIndex,
  initial,
  currentStatus,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [keyPoints, setKeyPoints] = useState<string[]>(initial.keyPoints ?? []);
  const [saving, setSaving] = useState<"idle" | "draft" | "publish" | "revert" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, title, content, keyPoints]);

  async function save(publish: boolean) {
    setSaving(publish ? "publish" : "draft");
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/module-overrides/${moduleId}/section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionIndex,
          payload: {
            title,
            content,
            contentHtml: initial.contentHtml,
            keyPoints,
          },
          publish,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Save failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
      setSaving("error");
    }
  }

  async function revert() {
    setSaving("revert");
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/admin/module-overrides/${moduleId}/section/${sectionIndex}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Revert failed");
        setSaving("error");
        return;
      }
      onSaved();
      onClose();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Revert failed");
      setSaving("error");
    }
  }

  function updateKp(i: number, value: string) {
    setKeyPoints((prev) => prev.map((kp, idx) => (idx === i ? value : kp)));
  }
  function moveKp(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= keyPoints.length) return;
    setKeyPoints((prev) => {
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  }
  function deleteKp(i: number) {
    setKeyPoints((prev) => prev.filter((_, idx) => idx !== i));
  }
  function addKp() {
    setKeyPoints((prev) => [...prev, ""]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        role="dialog"
        aria-label="Edit section"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Edit section</h2>
            <AdminBadge status={currentStatus} />
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            title="Close (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="px-5 py-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full min-h-[200px] rounded-lg border bg-background p-2 text-sm leading-relaxed whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          {initial.contentHtml && (
            <p className="text-[11px] text-muted-foreground italic">
              Reference table from the source document is preserved; not editable in this view.
            </p>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key points</span>
              <button
                type="button"
                onClick={addKp}
                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <textarea
                    value={kp}
                    onChange={(e) => updateKp(i, e.target.value)}
                    rows={2}
                    className="flex-1 rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <button onClick={() => moveKp(i, -1)} disabled={i === 0} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => moveKp(i, 1)} disabled={i === keyPoints.length - 1} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => deleteKp(i)} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {keyPoints.length === 0 && (
                <p className="text-[11px] text-muted-foreground/70 italic">No key points. Click Add to create one.</p>
              )}
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-destructive">{errorMsg}</p>
          )}
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-2 px-5 py-3 border-t bg-background/95 backdrop-blur">
          <div>
            {currentStatus !== "original" && (
              <Button variant="ghost" size="sm" onClick={revert} disabled={saving !== "idle" && saving !== "error"}>
                Revert to original
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "draft" ? "Saving…" : "Save draft"}
            </Button>
            <Button size="sm" onClick={() => save(true)} disabled={saving !== "idle" && saving !== "error"}>
              {saving === "publish" ? "Publishing…" : "Save & publish"}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
