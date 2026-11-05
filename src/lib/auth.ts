import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getDb, now } from "./db";
import { newId, randomString, sha256 } from "./ids";
import { isDemoMode } from "./mode";
import { mintSessionToken, parseSessionToken, preferSignedSession } from "./session-token";

export type Role = "customer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface SessionInfo {
  user: User;
  sessionId: string;
}

const SESSION_DAYS = 30;
export const SESSION_COOKIE = "jivora_session";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [alg, saltHex, hashHex] = stored.split("$");
  if (alg !== "scrypt" || !saltHex || !hashHex) return false;
  const hash = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), 64, {
    N: 16384,
    r: 8,
    p: 1,
  });
  const expected = Buffer.from(hashHex, "hex");
  return expected.length === hash.length && crypto.timingSafeEqual(expected, hash);
}

export class AuthError extends Error {}

export function createUser(input: {
  email: string;
  name: string;
  password: string;
  phone?: string;
  role?: Role;
}): { userId: string } {
  const db = getDb();
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AuthError("Enter a valid email address.");
  if (input.password.length < 8) throw new AuthError("Password must be at least 8 characters.");
  if (!input.name.trim()) throw new AuthError("Name is required.");
  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) {
    throw new AuthError("An account with this email already exists.");
  }
  const userId = newId("usr");
  db.prepare(
    "INSERT INTO users (id, email, name, phone, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(
    userId,
    email,
    input.name.trim(),
    input.phone?.trim() || "",
    hashPassword(input.password),
    input.role || "customer",
    now(),
  );
  return { userId };
}

export function authenticate(email: string, password: string): { userId: string } {
  const row = getDb()
    .prepare("SELECT id, password_hash FROM users WHERE email = ?")
    .get(email.trim().toLowerCase()) as { id: string; password_hash: string } | undefined;
  if (!row || !verifyPassword(password, row.password_hash)) {
    throw new AuthError("Invalid email or password.");
  }
  return { userId: row.id };
}

export function createSession(userId: string): string {
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  if (preferSignedSession()) {
    const u = getDb()
      .prepare(
        "SELECT id, email, name, phone, role, created_at AS createdAt FROM users WHERE id = ?",
      )
      .get(userId) as User | undefined;
    if (!u) throw new AuthError("User not found for session");
    // Best-effort local session row (may not be shared across serverless instances).
    try {
      const opaque = randomString(40);
      getDb()
        .prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
        .run(sha256(opaque), userId, expires, now());
    } catch {
      /* ignore */
    }
    return mintSessionToken(u, expires);
  }
  const token = randomString(40);
  getDb()
    .prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .run(sha256(token), userId, expires, now());
  return token;
}

export function getSessionByToken(token: string | undefined | null): SessionInfo | null {
  if (!token) return null;
  const signed = parseSessionToken(token);
  if (signed) return signed;
  if (isDemoMode() && preferSignedSession()) {
    // Opaque tokens from older demo deploys won't resolve across instances.
    return null;
  }
  const db = getDb();
  const s = db
    .prepare("SELECT id, user_id, expires_at FROM sessions WHERE id = ?")
    .get(sha256(token)) as { id: string; user_id: string; expires_at: string } | undefined;
  if (!s || s.expires_at < now()) return null;
  const u = db
    .prepare(
      "SELECT id, email, name, phone, role, created_at AS createdAt FROM users WHERE id = ?",
    )
    .get(s.user_id) as User | undefined;
  if (!u) return null;
  return { user: u, sessionId: s.id };
}

export function destroySession(token: string | undefined | null) {
  if (!token) return;
  getDb().prepare("DELETE FROM sessions WHERE id = ?").run(sha256(token));
}

export async function getSession(): Promise<SessionInfo | null> {
  const jar = await cookies();
  return getSessionByToken(jar.get(SESSION_COOKIE)?.value);
}

export async function requireUser(role?: Role): Promise<SessionInfo> {
  const session = await getSession();
  if (!session) throw new AuthError("Authentication required");
  if (role && session.user.role !== role && session.user.role !== "admin") {
    throw new AuthError("Insufficient permissions");
  }
  if (role === "admin" && session.user.role !== "admin") {
    throw new AuthError("Admin access required");
  }
  return session;
}
