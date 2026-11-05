import { NextResponse } from "next/server";
import { AuthError, authenticate, createSession, SESSION_COOKIE } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = authenticate(String(body.email || ""), String(body.password || ""));
    const token = createSession(userId);
    const user = getDb().prepare("SELECT role FROM users WHERE id = ?").get(userId) as { role: string };
    const res = NextResponse.json({ ok: true, role: user.role });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e) {
    const msg = e instanceof AuthError ? e.message : "Login failed";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
