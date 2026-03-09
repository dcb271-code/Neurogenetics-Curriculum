import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

/** GET: fetch all progress for logged-in user */
export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { data } = await supabase
    .from("progress")
    .select("*")
    .eq("resident_id", session.sub);

  const map: Record<string, unknown> = {};
  for (const row of data ?? []) {
    map[row.module_id] = {
      currentSlide: row.current_slide,
      sectionsRead: row.sections_read ?? [],
      slidesCompleted: row.slides_completed,
      quizCompleted: row.quiz_completed,
      quizScore: row.quiz_score,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      lastSection: row.last_section,
    };
  }
  return NextResponse.json(map);
}

/** PUT: upsert progress for a module */
export async function PUT(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { moduleId, ...fields } = body;
  if (!moduleId) return NextResponse.json({ error: "moduleId required" }, { status: 400 });

  // Merge sectionsRead with existing data if row already exists
  let mergedSectionsRead: number[] | undefined;
  if (fields.sectionsRead !== undefined) {
    const { data: existing } = await supabase
      .from("progress")
      .select("sections_read")
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId)
      .single();

    const prev: number[] = (existing?.sections_read as number[]) ?? [];
    const combined = new Set([...prev, ...fields.sectionsRead]);
    mergedSectionsRead = Array.from(combined).sort((a, b) => a - b);
  }

  // Build upsert payload — only include fields that were sent
  const row: Record<string, unknown> = {
    resident_id: session.sub,
    module_id: moduleId,
    updated_at: new Date().toISOString(),
  };
  if (fields.currentSlide !== undefined) row.current_slide = fields.currentSlide;
  if (mergedSectionsRead !== undefined) row.sections_read = mergedSectionsRead;
  if (fields.slidesCompleted !== undefined) row.slides_completed = fields.slidesCompleted;
  if (fields.quizCompleted !== undefined) row.quiz_completed = fields.quizCompleted;
  if (fields.quizScore !== undefined) row.quiz_score = fields.quizScore;
  if (fields.startedAt !== undefined) row.started_at = fields.startedAt;
  if (fields.completedAt !== undefined) row.completed_at = fields.completedAt;
  if (fields.lastSection !== undefined) row.last_section = fields.lastSection;

  const { error } = await supabase
    .from("progress")
    .upsert(row, { onConflict: "resident_id,module_id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
