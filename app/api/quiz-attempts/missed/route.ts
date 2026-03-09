import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

/** GET: all incorrectly answered questions from most recent attempt per module */
export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ missed: [] }, { status: 401 });

  // Get the most recent attempt per module
  const { data } = await supabase
    .from("quiz_attempts")
    .select("module_id, answers, completed_at")
    .eq("resident_id", session.sub)
    .order("completed_at", { ascending: false });

  if (!data) return NextResponse.json({ missed: [] });

  // Keep only the latest attempt per module
  const latestByModule = new Map<string, { answers: Array<{ questionIndex: number; selectedAnswer: number; correct: boolean }>; completedAt: string }>();
  for (const row of data) {
    if (!latestByModule.has(row.module_id)) {
      latestByModule.set(row.module_id, { answers: row.answers, completedAt: row.completed_at });
    }
  }

  // Collect incorrect answers
  const missed: Array<{ moduleId: string; questionIndex: number; selectedAnswer: number; completedAt: string }> = [];
  for (const [moduleId, attempt] of Array.from(latestByModule.entries())) {
    for (const a of attempt.answers) {
      if (!a.correct) {
        missed.push({ moduleId, questionIndex: a.questionIndex, selectedAnswer: a.selectedAnswer, completedAt: attempt.completedAt });
      }
    }
  }

  return NextResponse.json({ missed });
}
