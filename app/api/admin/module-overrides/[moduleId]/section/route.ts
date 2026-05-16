import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/session";

interface PutBody {
  sectionIndex?: number;
  payload?: {
    title?: string;
    content?: string;
    contentHtml?: string;
    keyPoints?: string[];
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
  const { sectionIndex, payload, publish } = body;

  if (typeof sectionIndex !== "number" || sectionIndex < 0) {
    return NextResponse.json({ error: "sectionIndex required" }, { status: 400 });
  }
  if (!payload) {
    return NextResponse.json({ error: "payload required" }, { status: 400 });
  }
  const { title, content, contentHtml, keyPoints } = payload;
  if (typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  if (typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }
  if (!Array.isArray(keyPoints) || keyPoints.some((k) => typeof k !== "string")) {
    return NextResponse.json({ error: "keyPoints must be string[]" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("section_overrides")
    .upsert(
      {
        module_id: params.moduleId,
        section_index: sectionIndex,
        title,
        content,
        content_html: typeof contentHtml === "string" ? contentHtml : null,
        key_points: keyPoints,
        is_draft: publish !== true,
        updated_by: session.sub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "module_id,section_index" },
    )
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}
