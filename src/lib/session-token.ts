import crypto from "node:crypto";
import type { Role, SessionInfo, User } from "./auth";
import { isDemoMode } from "./mode";

function secret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.JIVORA_SESSION_SECRET ||
    "jivora-demo-session-secret-v1"
  );
}

function b64url(buf: Buffer | string): string {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  return b.toString("base64url");
}

function fromB64url(s: string): Buffer {
  return Buffer.from(s, "base64url");
}

export function mintSessionToken(user: User, expiresAtIso: string): string {
  const payload = {
    uid: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone || "",
    role: user.role,
    exp: expiresAtIso,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(crypto.createHmac("sha256", secret()).update(body).digest());
  return `dj1.${body}.${sig}`;
}

export function parseSessionToken(token: string | undefined | null): SessionInfo | null {
  if (!token || !token.startsWith("dj1.")) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [, body, sig] = parts;
  const expected = b64url(crypto.createHmac("sha256", secret()).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(fromB64url(body).toString("utf8")) as {
      uid: string;
      email: string;
      name: string;
      phone?: string;
      role: Role;
      exp: string;
    };
    if (!payload.exp || payload.exp < new Date().toISOString()) return null;
    const user: User = {
      id: payload.uid,
      email: payload.email,
      name: payload.name,
      phone: payload.phone || "",
      role: payload.role,
      createdAt: "",
    };
    return { user, sessionId: `jwt_${payload.uid}` };
  } catch {
    return null;
  }
}

export function preferSignedSession(): boolean {
  return isDemoMode();
}
