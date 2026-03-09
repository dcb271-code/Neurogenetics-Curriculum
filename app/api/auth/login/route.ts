import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/hash";
import { createSession, setSessionCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  const { data } = await supabase
    .from("residents")
    .select("id, username, display_name, role, password_hash")
    .eq("username", username.toLowerCase())
    .single();

  if (!data || data.password_hash !== passwordHash) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = await createSession({
    sub: data.id,
    username: data.username,
    displayName: data.display_name,
    role: data.role,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    user: { id: data.id, username: data.username, displayName: data.display_name, role: data.role },
  });
}
