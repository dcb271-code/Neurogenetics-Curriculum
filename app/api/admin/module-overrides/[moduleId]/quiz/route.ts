import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

interface PutBody {
  scope?: "inline" | "comprehensive";
  questionIndex?: number;
  payload?: {
    question?: string;
    options?: string[];
    answer?: number;
    explanation?: string;
  };
  publish?: boolean;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body: PutBody = await req.json();
  const { scope, questionIndex, payload, publish } = body;

  if (scope !== "inline" && scope !== "comprehensive") {
    return NextResponse.json({ error: "scope must be inline or comprehensive" }, { status: 400 });
  }
  if (typeof questionIndex !== "number" || questionIndex < 0) {
    return NextResponse.json({ error: "questionIndex required" }, { status: 400 });
  }
  if (!payload) {
    return NextResponse.json({ error: "payload required" }, { status: 400 });
  }
  const { question, options, answer, explanation } = payload;
  if (typeof question !== "string" || question.trim().length < 5) {
    return NextResponse.json({ error: "question must be a non-trivial string" }, { status: 400 });
  }
  if (
    !Array.isArray(options) ||
    options.length === 0 ||
    options.some((o) => typeof o !== "string" || o.trim().length === 0)
  ) {
    return NextResponse.json({ error: "options must be a non-empty string[]" }, { status: 400 });
  }
  if (typeof answer !== "number" || answer < 0 || answer >= options.length) {
    return NextResponse.json({ error: "answer must be a valid option index" }, { status: 400 });
  }
  if (typeof explanation !== "string" || explanation.trim().length === 0) {
    return NextResponse.json({ error: "explanation required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quiz_overrides")
    .upsert(
      {
        module_id: params.moduleId,
        scope,
        question_index: questionIndex,
        question,
        options,
        answer,
        explanation,
        is_draft: publish !== true,
        updated_by: session.sub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "module_id,scope,question_index" },
    )
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}
