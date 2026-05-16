"use client";

import { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";
import { QuizQuestion } from "@/lib/types";
import { EditStatus } from "@/lib/module-overrides";
import { Button } from "@/components/ui/button";
import { AdminBadge } from "@/components/admin/admin-badge";

interface Props {
  moduleId: string;
  scope: "inline" | "comprehensive";
  questionIndex: number;
  initial: QuizQuestion;
  currentStatus: EditStatus;
  onClose: () => void;
  onSaved: () => void;
}

export function QuizEditModal({
  moduleId,
  scope,
  questionIndex,
  initial,
  currentStatus,
  onClose,
  onSaved,
}: Props) {
  const [question, setQuestion] = useState(initial.question);
  const [options, setOptions] = useState<string[]>(initial.options);
  const [answer, setAnswer] = useState<number>(initial.answer);
  const [explanation, setExplanation] = useState(initial.explanation);
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
  }, [onClose, question, options, answer, explanation]);

  async function save(publish: boolean) {
    setSaving(publish ? "publish" : "draft");
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/module-overrides/${moduleId}/quiz`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope,
          questionIndex,
          payload: { question, options, answer, explanation },
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
        `/api/admin/module-overrides/${moduleId}/quiz/${scope}/${questionIndex}`,
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

  function updateOption(i: number, value: string) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? value : o)));
  }
  function moveOption(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= options.length) return;
    setOptions((prev) => {
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
    if (answer === i) setAnswer(target);
    else if (answer === target) setAnswer(i);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl"
        role="dialog"
        aria-label="Edit quiz question"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">
              Edit {scope === "inline" ? "inline" : "comprehensive"} question
            </h2>
            <AdminBadge status={currentStatus} />
          </div>
          <button onClick={onClose} className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Close (Esc)">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="px-5 py-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question</span>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 w-full min-h-[100px] rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Options (select correct answer)</span>
            <div className="mt-1 space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex items-start gap-2">
                  <label className="flex items-center gap-2 pt-2 shrink-0">
                    <input
                      type="radio"
                      name="quiz-answer"
                      checked={answer === i}
                      onChange={() => setAnswer(i)}
                    />
                    <span className="text-xs font-mono opacity-60 w-3">{String.fromCharCode(65 + i)}</span>
                  </label>
                  <textarea
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    rows={2}
                    className="flex-1 rounded-lg border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <button onClick={() => moveOption(i, -1)} disabled={i === 0} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => moveOption(i, 1)} disabled={i === options.length - 1} className="h-5 w-5 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent disabled:opacity-30">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explanation</span>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="mt-1 w-full min-h-[120px] rounded-lg border bg-background p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>

          {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
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
