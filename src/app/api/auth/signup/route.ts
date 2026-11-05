import { NextResponse } from "next/server";
import { AuthError, createSession, createUser, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = createUser({
      email: String(body.email || ""),
      name: String(body.name || ""),
      password: String(body.password || ""),
      phone: String(body.phone || ""),
    });
    const token = createSession(userId);
    const res = NextResponse.json({ ok: true, userId });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e) {
    const msg = e instanceof AuthError ? e.message : "Signup failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
