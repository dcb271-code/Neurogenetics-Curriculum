import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";
import type { SectionOverride, QuizOverride } from "@/lib/module-overrides";

interface SectionRow {
  module_id: string;
  section_index: number;
  title: string;
  content: string;
  content_html: string | null;
  key_points: string[];
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

interface QuizRow {
  module_id: string;
  scope: "inline" | "comprehensive";
  question_index: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  is_draft: boolean;
  updated_by: string | null;
  updated_at: string;
}

function toSection(row: SectionRow): SectionOverride {
  return {
    moduleId: row.module_id,
    sectionIndex: row.section_index,
    title: row.title,
    content: row.content,
    contentHtml: row.content_html ?? undefined,
    keyPoints: row.key_points,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

function toQuiz(row: QuizRow): QuizOverride {
  return {
    moduleId: row.module_id,
    scope: row.scope,
    questionIndex: row.question_index,
    question: row.question,
    options: row.options,
    answer: row.answer,
    explanation: row.explanation,
    isDraft: row.is_draft,
    updatedBy: row.updated_by,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { moduleId } = params;

  const [secRes, quizRes] = await Promise.all([
    supabase.from("section_overrides").select("*").eq("module_id", moduleId),
    supabase.from("quiz_overrides").select("*").eq("module_id", moduleId),
  ]);

  if (secRes.error) {
    return NextResponse.json({ error: secRes.error.message }, { status: 500 });
  }
  if (quizRes.error) {
    return NextResponse.json({ error: quizRes.error.message }, { status: 500 });
  }

  return NextResponse.json({
    sections: (secRes.data ?? []).map((r) => toSection(r as SectionRow)),
    quiz: (quizRes.data ?? []).map((r) => toQuiz(r as QuizRow)),
  });
}
