"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  question: QuizQuestion;
}

export function InlineQuestion({ question }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === question.answer;

  return (
    <div className="mt-8 rounded-xl border border-dashed border-primary/20 bg-primary/[0.03] p-5 not-print">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 mb-3 flex items-center gap-1.5">
        <span>✦</span> Check Your Understanding
      </p>
      <p className="text-sm font-medium text-foreground mb-4 leading-relaxed">
        {question.question}
      </p>
      <div className="grid grid-cols-1 gap-2">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !answered && setSelected(i)}
            disabled={answered}
            className={cn(
              "text-left flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs transition-all",
              !answered &&
                "border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
              answered &&
                i === question.answer &&
                "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400",
              answered &&
                selected === i &&
                i !== question.answer &&
                "border-red-400/30 bg-red-500/10 text-red-700 dark:text-red-400",
              answered && i !== question.answer && selected !== i && "border-border opacity-50"
            )}
          >
            <span className="shrink-0 font-mono font-bold opacity-50 mt-0.5">
              {String.fromCharCode(65 + i)}.
            </span>
            <span className="leading-relaxed">{option}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={cn(
            "mt-4 rounded-lg px-4 py-3 text-xs leading-relaxed",
            correct
              ? "bg-green-500/10 text-green-800 dark:text-green-300 border border-green-500/20"
              : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20"
          )}
        >
          <span className="font-semibold">{correct ? "Correct. " : "Not quite. "}</span>
          {question.explanation}
        </div>
      )}

      {!answered && (
        <p className="mt-3 text-[10px] text-muted-foreground/50">
          Select an answer to reveal the explanation
        </p>
      )}
    </div>
  );
}
