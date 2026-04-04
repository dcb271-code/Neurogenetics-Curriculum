"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  FileQuestion,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import baselineData from "@/data/baseline-assessment.json";

interface BaselineQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  sourceModules: string[];
  difficulty: string;
  category: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BaselinePage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<BaselineQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = baselineData.questions as BaselineQuestion[];

  const startAssessment = () => {
    setQuestions(shuffleArray(allQuestions));
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setSelectedAnswers([]);
    setFinished(false);
    setScore(0);
    setStarted(true);
  };

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === questions[questionIndex].answer;
    const newAnswers = [...answers, correct];
    const newScore = newAnswers.filter(Boolean).length;
    const newSelectedAnswers = [...selectedAnswers, selected];

    if (questionIndex === questions.length - 1) {
      setScore(newScore);
      setAnswers(newAnswers);
      setSelectedAnswers(newSelectedAnswers);
      setFinished(true);

      const records = questions.map((q, i) => ({
        questionIndex: i,
        questionText: q.question,
        selectedAnswer: newSelectedAnswers[i],
        correctAnswer: q.answer,
        correct: newAnswers[i],
      }));
      fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: "baseline-assessment",
          score: newScore,
          totalQuestions: questions.length,
          answers: records,
        }),
      }).catch(() => {});
    } else {
      setAnswers(newAnswers);
      setSelectedAnswers(newSelectedAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
    }
  };

  // ── Start screen ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <FileQuestion className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Baseline Assessment</h1>
          <p className="text-muted-foreground mb-2 text-sm">
            {allQuestions.length} questions to gauge your starting knowledge
          </p>
          <p className="text-muted-foreground mb-6 text-xs">
            No feedback is provided during this assessment. You will see your
            total score at the end.
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/assessments">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Back
              </Link>
            </Button>
            <Button size="sm" onClick={startAssessment}>
              Begin Assessment
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

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-2xl px-4 py-10">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                <BarChart3 className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Baseline Complete</h2>
            <p className="text-muted-foreground text-sm mb-4">
              You scored{" "}
              <span className="font-semibold text-foreground">
                {score} out of {questions.length}
              </span>{" "}
              ({pct}%)
            </p>
            <p className="text-muted-foreground text-xs max-w-md mx-auto">
              This is your starting point. Work through the curriculum modules,
              then take the comprehensive assessment to measure your growth.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={startAssessment}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Retake
            </Button>
            <Button size="sm" asChild>
              <Link href="/">
                Start Learning
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active quiz (no feedback) ─────────────────────────────────────────────────
  const question = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/assessments"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Baseline Assessment
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300"
              style={{
                width: `${(questionIndex / questions.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="animate-fade-in" key={questionIndex}>
          <div className="mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Question {questionIndex + 1}
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-6 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => {
              const isSelected = selected === i;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 text-sm transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border-violet-500 bg-violet-500/5"
                      : "border-border hover:border-violet-500/40 hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors",
                        isSelected
                          ? "border-violet-500 text-violet-500"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selected === null}
              size="sm"
            >
              {isLast ? "View Results" : "Next"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
