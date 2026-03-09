import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

/** GET: all flags for logged-in user */
export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ flags: [] }, { status: 401 });

  const { data } = await supabase
    .from("flags")
    .select("*")
    .eq("resident_id", session.sub)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    flags: (data ?? []).map((f) => ({
      id: f.id,
      moduleId: f.module_id,
      moduleTitle: f.module_title,
      sectionTitle: f.section_title,
      keyPoint: f.key_point,
      flaggedAt: new Date(f.created_at).getTime(),
    })),
  });
}

/** POST: toggle or remove a flag */
export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action, moduleId, moduleTitle, sectionTitle, keyPoint, flagId } = await req.json();

  if (action === "remove" && flagId) {
    await supabase.from("flags").delete().eq("id", flagId).eq("resident_id", session.sub);
    return NextResponse.json({ ok: true, flagged: false });
  }

  if (action === "toggle") {
    // Check if exists
    const { data: existing } = await supabase
      .from("flags")
      .select("id")
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId)
      .eq("section_title", sectionTitle)
      .eq("key_point", keyPoint)
      .single();

    if (existing) {
      await supabase.from("flags").delete().eq("id", existing.id);
      return NextResponse.json({ ok: true, flagged: false });
    }

    await supabase.from("flags").insert({
      resident_id: session.sub,
      module_id: moduleId,
      module_title: moduleTitle ?? "",
      section_title: sectionTitle,
      key_point: keyPoint,
    });
    return NextResponse.json({ ok: true, flagged: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
