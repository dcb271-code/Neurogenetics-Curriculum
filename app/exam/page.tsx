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
  ClipboardList,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import examData from "@/data/comprehensive-exam.json";

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  sourceModules: string[];
  difficulty: string;
  category: string;
}

type AnswerState = "idle" | "correct" | "incorrect";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ExamPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [state, setState] = useState<AnswerState>("idle");
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showAudit, setShowAudit] = useState(false);

  const allQuestions = examData.questions as ExamQuestion[];
  const passingScore = (examData as { passingScore?: number }).passingScore ?? 35;

  const startExam = () => {
    setQuestions(shuffleArray(allQuestions));
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setState("idle");
    setFinished(false);
    setScore(0);
    setStarted(true);
    setShowAudit(false);
  };

  const handleSelect = (index: number) => {
    if (state !== "idle") return;
    setSelected(index);
    setState(index === questions[questionIndex].answer ? "correct" : "incorrect");
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === questions[questionIndex].answer;
    const newAnswers = [...answers, correct];
    const newScore = newAnswers.filter(Boolean).length;

    if (questionIndex === questions.length - 1) {
      setScore(newScore);
      setAnswers(newAnswers);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
      setState("idle");
    }
  };

  // ── Start screen ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ClipboardList className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Comprehensive Examination</h1>
          <p className="text-muted-foreground mb-2 text-sm">
            {allQuestions.length} board-style questions covering all curriculum modules
          </p>
          <p className="text-muted-foreground mb-6 text-xs">
            Passing score: {passingScore}/{allQuestions.length} ({Math.round((passingScore / allQuestions.length) * 100)}%)
          </p>

          <div className="rounded-xl border bg-card p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Question breakdown
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>Clinical Vignettes: {allQuestions.filter(q => q.category === "Clinical Vignette").length}</span>
              <span>Knowledge: {allQuestions.filter(q => q.category === "Knowledge").length}</span>
              <span>Interpretation: {allQuestions.filter(q => q.category === "Interpretation").length}</span>
              <span>Ethics: {allQuestions.filter(q => q.category === "Ethics").length}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Back
              </Link>
            </Button>
            <Button size="sm" onClick={startExam}>
              Begin Exam
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = score >= passingScore;

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-2xl px-4 py-10">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="mb-4 flex justify-center">
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
              {passed ? "Passed!" : "Not yet — keep studying!"}
            </h2>
            <p className="text-muted-foreground text-sm">
              You scored{" "}
              <span className="font-semibold text-foreground">
                {score} out of {questions.length}
              </span>{" "}
              ({pct}%) — passing is {passingScore}/{questions.length}
            </p>
          </div>

          {/* Audit toggle */}
          <div className="flex gap-3 justify-center mb-6">
            <Button variant="outline" size="sm" onClick={startExam}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Retake
            </Button>
            <Button
              variant={showAudit ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAudit(!showAudit)}
            >
              <Tag className="h-3.5 w-3.5 mr-1.5" />
              {showAudit ? "Hide" : "Show"} Audit Trail
            </Button>
            <Button size="sm" asChild>
              <Link href="/">
                All Modules
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Results list */}
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Question-by-question results
            </p>
            {questions.map((q, i) => (
              <div key={i} className="py-2 border-b border-border/50 last:border-0">
                <div className="flex items-start gap-2.5">
                  {answers[i] ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground leading-snug block">
                      {q.question}
                    </span>
                    {!answers[i] && (
                      <span className="text-[11px] text-green-600 dark:text-green-400 mt-1 block">
                        Correct: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                      </span>
                    )}
                    {showAudit && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {q.sourceModules.map((mod) => (
                          <Link
                            key={mod}
                            href={`/modules/${mod}`}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary/20 transition-colors"
                          >
                            {mod}
                          </Link>
                        ))}
                        <span className="text-[10px] text-muted-foreground/60">
                          {q.category} / {q.difficulty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Active quiz ───────────────────────────────────────────────────────────────
  const question = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Comprehensive Exam
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="animate-fade-in" key={questionIndex}>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Question {questionIndex + 1}
            </span>
            <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              {question.category}
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-6 leading-snug">
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
                <div>
                  <p>{question.explanation}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {question.sourceModules.map((mod) => (
                      <span
                        key={mod}
                        className="inline-flex items-center rounded-full bg-white/20 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
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
