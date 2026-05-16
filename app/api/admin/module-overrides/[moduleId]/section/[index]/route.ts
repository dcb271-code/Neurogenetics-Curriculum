import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { moduleId: string; index: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sectionIndex = Number(params.index);
  if (!Number.isInteger(sectionIndex) || sectionIndex < 0) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const { error } = await supabase
    .from("section_overrides")
    .delete()
    .eq("module_id", params.moduleId)
    .eq("section_index", sectionIndex);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
