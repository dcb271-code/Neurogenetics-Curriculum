"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { Module } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type AnswerState = "idle" | "correct" | "incorrect";

export function QuizComponent({ module }: { module: Module }) {
  const { update } = useProgress();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [state, setState] = useState<AnswerState>("idle");
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const question = module.quiz[questionIndex];
  const isLast = questionIndex === module.quiz.length - 1;

  const handleSelect = (index: number) => {
    if (state !== "idle") return;
    setSelected(index);
    setState(index === question.answer ? "correct" : "incorrect");
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === question.answer;
    const newAnswers = [...answers, correct];
    const newScore = newAnswers.filter(Boolean).length;

    if (isLast) {
      setScore(newScore);
      setAnswers(newAnswers);
      setFinished(true);
      update(module.id, { quizCompleted: true, quizScore: newScore });
    } else {
      setAnswers(newAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
      setState("idle");
    }
  };

  const handleRetake = () => {
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setState("idle");
    setFinished(false);
    setScore(0);
  };

  if (finished) {
    const pct = Math.round((score / module.quiz.length) * 100);
    const passed = pct >= 80;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="mb-6 flex justify-center">
            <div
              className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center",
                passed ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
              )}
            >
              <Trophy className="h-8 w-8" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {passed ? "Well done!" : "Keep studying!"}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            You scored{" "}
            <span className="font-semibold text-foreground">
              {score} out of {module.quiz.length}
            </span>{" "}
            ({pct}%)
          </p>

          <div className="rounded-xl border bg-card p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Results
            </p>
            {module.quiz.map((q, i) => (
              <div key={i} className="flex items-start gap-2.5 py-1.5">
                {answers[i] ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                )}
                <span className="text-xs text-muted-foreground leading-snug">
                  {q.question}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={handleRetake}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Retake
            </Button>
            <Button size="sm" asChild>
              <Link href="/">
                All Modules
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Link
          href={`/modules/${module.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {module.title}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex gap-1">
            {module.quiz.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i < questionIndex
                    ? answers[i]
                      ? "bg-green-500 w-6"
                      : "bg-red-400 w-6"
                    : i === questionIndex
                    ? "bg-primary w-6"
                    : "bg-border w-4"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {questionIndex + 1} / {module.quiz.length}
          </span>
        </div>

        <div className="animate-fade-in" key={questionIndex}>
          <div className="mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Question {questionIndex + 1}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-6 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrect = i === question.answer;
              const revealed = state !== "idle";

              let optionClass = "border-border hover:border-primary/40 hover:bg-accent/50";
              if (revealed) {
                if (isCorrect) optionClass = "border-green-500 bg-green-500/10";
                else if (isSelected) optionClass = "border-red-400 bg-red-400/10";
                else optionClass = "border-border opacity-50";
              } else if (isSelected) {
                optionClass = "border-primary bg-primary/5";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 text-sm transition-all duration-150",
                    optionClass,
                    !revealed && "cursor-pointer"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors",
                        revealed && isCorrect
                          ? "border-green-500 text-green-500"
                          : revealed && isSelected && !isCorrect
                          ? "border-red-400 text-red-400"
                          : isSelected
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                    {revealed && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto shrink-0 mt-0.5" />
                    )}
                    {revealed && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-red-400 ml-auto shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {state !== "idle" && (
            <div
              className={cn(
                "rounded-xl border p-4 mb-6 animate-fade-in text-sm leading-relaxed",
                state === "correct"
                  ? "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400"
                  : "border-red-400/30 bg-red-400/5 text-red-700 dark:text-red-400"
              )}
            >
              <div className="flex items-start gap-2">
                {state === "correct" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <BookOpen className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <p>{question.explanation}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selected === null} size="sm">
              {isLast ? "View Results" : "Next Question"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
