import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { moduleId: string; scope: string; index: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (params.scope !== "inline" && params.scope !== "comprehensive") {
    return NextResponse.json({ error: "Invalid scope" }, { status: 400 });
  }
  const questionIndex = Number(params.index);
  if (!Number.isInteger(questionIndex) || questionIndex < 0) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const { error } = await supabase
    .from("quiz_overrides")
    .delete()
    .eq("module_id", params.moduleId)
    .eq("scope", params.scope)
    .eq("question_index", questionIndex);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
