import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

/** GET: list quiz attempts — ?moduleId=X for a specific module, or all */
export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ attempts: [] }, { status: 401 });

  const moduleId = req.nextUrl.searchParams.get("moduleId");

  let query = supabase
    .from("quiz_attempts")
    .select("*")
    .eq("resident_id", session.sub)
    .order("completed_at", { ascending: false });

  if (moduleId) query = query.eq("module_id", moduleId);

  const { data } = await query;

  return NextResponse.json({
    attempts: (data ?? []).map((a) => ({
      id: a.id,
      moduleId: a.module_id,
      answers: a.answers,
      score: a.score,
      totalQuestions: a.total_questions,
      completedAt: a.completed_at,
    })),
  });
}

/** POST: save a new quiz attempt */
export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId, answers, score, totalQuestions } = await req.json();
  if (!moduleId || !answers || score === undefined || !totalQuestions) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert({
      resident_id: session.sub,
      module_id: moduleId,
      answers,
      score,
      total_questions: totalQuestions,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
