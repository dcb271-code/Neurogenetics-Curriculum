import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { getModuleById } from "@/lib/modules";

/** GET: most recently active module for "continue where you left off" */
export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({});

  const { data } = await supabase
    .from("progress")
    .select("module_id, current_slide, sections_read, last_section, slides_completed, quiz_completed, updated_at")
    .eq("resident_id", session.sub)
    .eq("slides_completed", false)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (!data) return NextResponse.json({});

  const mod = getModuleById(data.module_id);

  return NextResponse.json({
    moduleId: data.module_id,
    moduleTitle: mod?.title ?? data.module_id,
    currentSlide: data.current_slide,
    totalSlides: 0,
    sectionsRead: (data.sections_read ?? []).length,
    totalSections: mod?.sections.length ?? 0,
  });
}
