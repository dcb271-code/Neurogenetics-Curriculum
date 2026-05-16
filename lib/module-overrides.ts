import { Module, Section, QuizQuestion } from "@/lib/types";

export interface SectionOverride {
  moduleId: string;
  sectionIndex: number;
  title: string;
  content: string;
  contentHtml?: string;
  keyPoints: string[];
  isDraft: boolean;
  updatedBy: string | null;
  updatedAt: number;
}

export interface QuizOverride {
  moduleId: string;
  scope: "inline" | "comprehensive";
  questionIndex: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  isDraft: boolean;
  updatedBy: string | null;
  updatedAt: number;
}

export type EditStatus = "original" | "edited" | "draft";

export interface MergedEdits {
  sections: EditStatus[];
  inlineQuiz: EditStatus[];
  quiz: EditStatus[];
}

export interface MergedModule {
  module: Module;
  edits: MergedEdits;
}

function statusFor(override: { isDraft: boolean } | undefined): EditStatus {
  if (!override) return "original";
  return override.isDraft ? "draft" : "edited";
}

export function mergeModule(
  staticModule: Module,
  sectionOverrides: SectionOverride[],
  quizOverrides: QuizOverride[],
): MergedModule {
  const sectionByIdx = new Map<number, SectionOverride>();
  for (const o of sectionOverrides) sectionByIdx.set(o.sectionIndex, o);

  const inlineByIdx = new Map<number, QuizOverride>();
  const compByIdx = new Map<number, QuizOverride>();
  for (const o of quizOverrides) {
    (o.scope === "inline" ? inlineByIdx : compByIdx).set(o.questionIndex, o);
  }

  const sections: Section[] = staticModule.sections.map((s, i) => {
    const o = sectionByIdx.get(i);
    if (!o) return s;
    return {
      title: o.title,
      content: o.content,
      contentHtml: o.contentHtml,
      keyPoints: o.keyPoints,
    };
  });

  const applyQuizOverride = (q: QuizQuestion, o: QuizOverride | undefined): QuizQuestion => {
    if (!o) return q;
    return {
      question: o.question,
      options: o.options,
      answer: o.answer,
      explanation: o.explanation,
    };
  };

  const inlineQuiz = (staticModule.inlineQuiz ?? []).map((q, i) =>
    applyQuizOverride(q, inlineByIdx.get(i)),
  );
  const quiz = staticModule.quiz.map((q, i) =>
    applyQuizOverride(q, compByIdx.get(i)),
  );

  const merged: Module = {
    ...staticModule,
    sections,
    quiz,
    ...(staticModule.inlineQuiz !== undefined ? { inlineQuiz } : {}),
  };

  const edits: MergedEdits = {
    sections: sections.map((_, i) => statusFor(sectionByIdx.get(i))),
    inlineQuiz: (staticModule.inlineQuiz ?? []).map((_, i) => statusFor(inlineByIdx.get(i))),
    quiz: staticModule.quiz.map((_, i) => statusFor(compByIdx.get(i))),
  };

  return { module: merged, edits };
}
