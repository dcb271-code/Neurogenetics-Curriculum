import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

type PublishBody =
  | { kind: "section"; sectionIndex: number }
  | { kind: "quiz"; scope: "inline" | "comprehensive"; questionIndex: number };

export async function POST(
  req: NextRequest,
  { params }: { params: { moduleId: string } },
) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as PublishBody;

  if (body.kind === "section") {
    if (typeof body.sectionIndex !== "number" || body.sectionIndex < 0) {
      return NextResponse.json({ error: "sectionIndex required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("section_overrides")
      .update({ is_draft: false, updated_at: new Date().toISOString() })
      .eq("module_id", params.moduleId)
      .eq("section_index", body.sectionIndex)
      .select("*")
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "No draft to publish" }, { status: 404 });
    return NextResponse.json({ ok: true, row: data });
  }

  if (body.kind === "quiz") {
    if (body.scope !== "inline" && body.scope !== "comprehensive") {
      return NextResponse.json({ error: "scope invalid" }, { status: 400 });
    }
    if (typeof body.questionIndex !== "number" || body.questionIndex < 0) {
      return NextResponse.json({ error: "questionIndex required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("quiz_overrides")
      .update({ is_draft: false, updated_at: new Date().toISOString() })
      .eq("module_id", params.moduleId)
      .eq("scope", body.scope)
      .eq("question_index", body.questionIndex)
      .select("*")
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "No draft to publish" }, { status: 404 });
    return NextResponse.json({ ok: true, row: data });
  }

  return NextResponse.json({ error: "kind must be section or quiz" }, { status: 400 });
}
