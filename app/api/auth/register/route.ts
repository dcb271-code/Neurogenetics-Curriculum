import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/hash";
import { createSession, setSessionCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { username, password, displayName } = await req.json();

  if (!username || !password || !displayName) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  if (username.length < 3 || username.length > 30) {
    return NextResponse.json({ error: "Username must be 3-30 characters" }, { status: 400 });
  }
  if (password.length < 4) {
    return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  const { data, error } = await supabase
    .from("residents")
    .insert({ username: username.toLowerCase(), password_hash: passwordHash, display_name: displayName })
    .select("id, username, display_name, role")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
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
