import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  authenticate,
  createSession,
  createUser,
  getSessionByToken,
  hashPassword,
  verifyPassword,
  AuthError,
} from "../src/lib/auth";
import { resetDb } from "../src/lib/db";

const tmp = path.join(os.tmpdir(), `jivora-test-${process.pid}`);

beforeEach(() => {
  fs.mkdirSync(tmp, { recursive: true });
  process.env.JIVORA_DATA_DIR = tmp;
  process.env.JIVORA_DB = path.join(tmp, "test.db");
  resetDb();
});

afterEach(() => {
  resetDb();
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("auth", () => {
  it("hashes and verifies passwords", () => {
    const h = hashPassword("demo1234");
    expect(verifyPassword("demo1234", h)).toBe(true);
    expect(verifyPassword("nope", h)).toBe(false);
  });

  it("creates user and session", () => {
    const { userId } = createUser({
      email: "a@test.com",
      name: "A",
      password: "password1",
    });
    const { userId: again } = authenticate("a@test.com", "password1");
    expect(again).toBe(userId);
    const token = createSession(userId);
    const session = getSessionByToken(token);
    expect(session?.user.email).toBe("a@test.com");
  });

  it("rejects duplicate email", () => {
    createUser({ email: "a@test.com", name: "A", password: "password1" });
    expect(() => createUser({ email: "a@test.com", name: "B", password: "password1" })).toThrow(AuthError);
  });
});
