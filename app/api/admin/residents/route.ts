import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

/** DELETE: remove a resident by id (admin only, cannot delete self) */
export async function DELETE(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing resident id" }, { status: 400 });

  // Prevent self-deletion
  if (id === session.sub) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 403 });
  }

  const { error } = await supabase.from("residents").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Delete failed" }, { status: 500 });

  return NextResponse.json({ ok: true });
}

/** GET: all residents with progress summary (admin only) */
export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch all residents
  const { data: residents } = await supabase
    .from("residents")
    .select("id, username, display_name, role, created_at")
    .order("created_at", { ascending: true });

  if (!residents) return NextResponse.json({ residents: [] });

  // Fetch all progress
  const { data: allProgress } = await supabase
    .from("progress")
    .select("resident_id, module_id, slides_completed, quiz_completed, quiz_score, started_at, completed_at, sections_read");

  // Fetch latest quiz attempts per resident per module
  const { data: allAttempts } = await supabase
    .from("quiz_attempts")
    .select("resident_id, module_id, score, total_questions, completed_at")
    .order("completed_at", { ascending: false });

  // Group progress by resident
  const progressMap = new Map<string, Array<Record<string, unknown>>>();
  for (const p of allProgress ?? []) {
    const arr = progressMap.get(p.resident_id) ?? [];
    arr.push(p);
    progressMap.set(p.resident_id, arr);
  }

  // Group attempts by resident
  const attemptsMap = new Map<string, Array<Record<string, unknown>>>();
  for (const a of allAttempts ?? []) {
    const arr = attemptsMap.get(a.resident_id) ?? [];
    arr.push(a);
    attemptsMap.set(a.resident_id, arr);
  }

  const result = residents.map((r) => {
    const prog = progressMap.get(r.id) ?? [];
    const attempts = attemptsMap.get(r.id) ?? [];
    const modulesStarted = prog.length;
    const modulesCompleted = prog.filter((p) => p.slides_completed && p.quiz_completed).length;
    const quizScores = prog.filter((p) => p.quiz_score != null).map((p) => p.quiz_score as number);
    const avgScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : null;

    return {
      id: r.id,
      username: r.username,
      displayName: r.display_name,
      role: r.role,
      createdAt: r.created_at,
      modulesStarted,
      modulesCompleted,
      avgQuizScore: avgScore,
      totalAttempts: attempts.length,
      progress: Object.fromEntries(
        prog.map((p) => [
          p.module_id,
          {
            slidesCompleted: p.slides_completed,
            quizCompleted: p.quiz_completed,
            quizScore: p.quiz_score,
            sectionsRead: (p.sections_read as number[])?.length ?? 0,
          },
        ])
      ),
    };
  });

  return NextResponse.json({ residents: result });
}
