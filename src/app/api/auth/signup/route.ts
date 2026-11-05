import { NextResponse } from "next/server";
import { AuthError, createSession, createUser, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      name?: string;
      password?: string;
      phone?: string;
    };
    const email = String(body.email || "").trim();
    const name = String(body.name || "").trim();
    const password = String(body.password || "");
    const phone = String(body.phone || "").trim();
    const { userId } = createUser({ email, name, password, phone });
    const token = createSession(userId);
    const res = NextResponse.json({ ok: true, userId });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.VERCEL === "1" || process.env.NODE_ENV === "production",
    });
    return res;
  } catch (e) {
    const msg =
      e instanceof AuthError
        ? e.message
        : e instanceof Error
          ? e.message
          : "Signup failed";
    if (!(e instanceof AuthError)) console.error("signup error", e);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
