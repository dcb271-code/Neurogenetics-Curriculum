import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: {
      id: session.sub,
      username: session.username,
      displayName: session.displayName,
      role: session.role,
    },
  });
}
