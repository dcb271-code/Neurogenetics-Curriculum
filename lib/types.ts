export type Tag = "Basic Genetics" | "Neurogenetics" | "Advanced";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Section {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // 0-based index of the correct option
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  difficulty: Difficulty;
  duration: string;
  color: "blue" | "violet" | "amber" | "green" | "rose";
  learningObjectives: string[];
  sections: Section[];
  quiz: QuizQuestion[];
}
