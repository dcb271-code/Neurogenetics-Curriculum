import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";

interface NoteRow {
  id: string;
  module_id: string;
  module_title: string;
  content: string;
  updated_at: string;
}

function toClient(row: NoteRow) {
  return {
    moduleId: row.module_id,
    moduleTitle: row.module_title,
    content: row.content,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

/** GET: all notes for logged-in user, or single note when ?moduleId=X. */
export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ notes: [], note: null }, { status: 401 });

  const moduleId = req.nextUrl.searchParams.get("moduleId");

  if (moduleId) {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ note: data ? toClient(data as NoteRow) : null });
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("resident_id", session.sub)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    notes: (data ?? []).map((row) => toClient(row as NoteRow)),
  });
}

/** PUT: upsert a note. Whitespace-only content deletes the row. */
export async function PUT(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId, moduleTitle, content } = await req.json();

  if (typeof moduleId !== "string" || moduleId.length === 0) {
    return NextResponse.json({ error: "moduleId required" }, { status: 400 });
  }

  const trimmed = typeof content === "string" ? content : "";

  if (trimmed.trim().length === 0) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("resident_id", session.sub)
      .eq("module_id", moduleId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, note: null });
  }

  const { data, error } = await supabase
    .from("notes")
    .upsert(
      {
        resident_id: session.sub,
        module_id: moduleId,
        module_title: typeof moduleTitle === "string" ? moduleTitle : "",
        content: trimmed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "resident_id,module_id" }
    )
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    note: data ? toClient(data as NoteRow) : null,
  });
}
