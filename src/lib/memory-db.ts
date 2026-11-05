
import { createHash, randomBytes, scryptSync } from "node:crypto";

type Row = Record<string, unknown>;

type Tables = {
  users: Row[];
  sessions: Row[];
  leads: Row[];
  quotes: Row[];
  policies: Row[];
  reminders: Row[];
  documents: Row[];
  claim_requests: Row[];
  outbox: Row[];
  newsletter: Row[];
  settings: Row[];
  faqs: Row[];
  _migrations: Row[];
};

const g = globalThis as unknown as { __jivoraMem?: MemoryDatabase };

function nowIso() {
  return new Date().toISOString();
}

function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function newId(prefix: string) {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export class MemoryStatement {
  constructor(private db: MemoryDatabase, private sql: string) {}

  run(...params: unknown[]) {
    this.db._run(this.sql, params);
    return { changes: 1 };
  }

  get(...params: unknown[]): Row | undefined {
    const rows = this.db._all(this.sql, params);
    return rows[0];
  }

  all(...params: unknown[]): Row[] {
    return this.db._all(this.sql, params);
  }
}

export class MemoryDatabase {
  tables: Tables;
  constructor() {
    this.tables = emptyTables();
    seedDemo(this);
  }

  prepare(sql: string) {
    return new MemoryStatement(this, normalize(sql));
  }

  exec(_sql: string) {
    /* schema is implicit */
  }

  pragma(_s: string) {
    return undefined;
  }

  transaction<T>(fn: () => T): () => T {
    return () => fn();
  }

  close() {
    /* noop */
  }

  _run(sql: string, params: unknown[]) {
    const s = normalize(sql);
    const p = params;

    if (s.startsWith("INSERT INTO users")) {
      const [id, email, name, phone, password_hash, role, created_at] = p as string[];
      this.tables.users.push({ id, email, name, phone, password_hash, role, created_at });
      return;
    }
    if (s.startsWith("UPDATE users SET password_hash")) {
      const [password_hash, role, name, id] = p as string[];
      const u = this.tables.users.find((x) => x.id === id);
      if (u) Object.assign(u, { password_hash, role, name });
      return;
    }
    if (s.startsWith("INSERT INTO sessions")) {
      const [id, user_id, expires_at, created_at] = p as string[];
      this.tables.sessions.push({ id, user_id, expires_at, created_at });
      return;
    }
    if (s.startsWith("DELETE FROM sessions")) {
      this.tables.sessions = this.tables.sessions.filter((x) => x.id !== p[0]);
      return;
    }
    if (s.startsWith("INSERT INTO leads")) {
      // contact: (?, 'contact', ?, ?, ?, ?, '{}', 'new', ?)
      if (s.includes("'contact'")) {
        const [id, name, email, phone, message, created_at] = p as string[];
        this.tables.leads.push({
          id, type: "contact", name, email, phone, message, payload: "{}", status: "new", user_id: null, created_at,
        });
        return;
      }
      // quote: (?, 'quote', ?, ?, ?, ?, ?, 'new', ?, ?)
      if (s.includes("'quote'")) {
        const [id, name, email, phone, message, payload, user_id, created_at] = p as (string | null)[];
        this.tables.leads.push({
          id, type: "quote", name, email, phone, message, payload, status: "new", user_id, created_at,
        });
        return;
      }
      // generic fallback with all columns bound
      const [id, type, name, email, phone, message, payload, status, user_id, created_at] = p as (string | null)[];
      this.tables.leads.push({ id, type, name, email, phone, message, payload, status, user_id: user_id ?? null, created_at });
      return;
    }
    if (s.startsWith("INSERT INTO quotes")) {
      // (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
      const [id, user_id, product_type, inputs, estimate, name, email, phone, created_at] = p as (string | null)[];
      this.tables.quotes.push({
        id, user_id, product_type, inputs, estimate, name, email, phone, status: "new", created_at,
      });
      return;
    }
    if (s.startsWith("INSERT INTO policies")) {
      const [
        id, user_id, product_type, insurer, policy_number, vehicle_or_subject,
        sum_insured, premium, start_date, end_date, notes, created_at, updated_at,
      ] = p;
      this.tables.policies.push({
        id, user_id, product_type, insurer, policy_number, vehicle_or_subject,
        sum_insured, premium, start_date, end_date, notes, created_at, updated_at,
      });
      return;
    }
    if (s.startsWith("INSERT INTO reminders")) {
      // seed/full: all bound; API: (?, ?, ?, ?, ?, ?, ?, 'active', ?)
      if (s.includes("'active'")) {
        const [id, user_id, email, label, kind, expiry_date, remind_days, created_at] = p as (string | number | null)[];
        this.tables.reminders.push({
          id, user_id, email, label, kind, expiry_date, remind_days, last_sent_at: null, status: "active", created_at,
        });
      } else {
        const [id, user_id, email, label, kind, expiry_date, remind_days, status, created_at] = p as (string | number | null)[];
        this.tables.reminders.push({
          id, user_id, email, label, kind, expiry_date, remind_days, last_sent_at: null, status, created_at,
        });
      }
      return;
    }
    if (s.startsWith("UPDATE reminders SET last_sent_at")) {
      const [last_sent_at, id] = p as string[];
      const r = this.tables.reminders.find((x) => x.id === id);
      if (r) r.last_sent_at = last_sent_at;
      return;
    }
    if (s.startsWith("INSERT INTO documents")) {
      const [id, user_id, policy_id, filename, stored_name, mime, size, created_at] = p;
      this.tables.documents.push({ id, user_id, policy_id, filename, stored_name, mime, size, created_at });
      return;
    }
    if (s.startsWith("INSERT INTO claim_requests")) {
      const [id, user_id, name, email, phone, policy_number, details, status, created_at] = p;
      // API uses 'new' literal sometimes
      if (s.includes("'new'")) {
        const [id2, user_id2, name2, email2, phone2, policy_number2, details2, created_at2] = p as (string | null)[];
        this.tables.claim_requests.push({
          id: id2, user_id: user_id2, name: name2, email: email2, phone: phone2,
          policy_number: policy_number2, details: details2, status: "new", created_at: created_at2,
        });
      } else {
        this.tables.claim_requests.push({ id, user_id, name, email, phone, policy_number, details, status, created_at });
      }
      return;
    }
    if (s.startsWith("INSERT INTO outbox")) {
      // (?, ?, ?, ?, ?, 'queued', '', ?, ?)
      const [id, to_addr, subject, body, html, meta, created_at] = p as string[];
      this.tables.outbox.push({
        id, to_addr, subject, body, html, status: "queued", error: "", meta, created_at, sent_at: null,
      });
      return;
    }
    if (s.includes("UPDATE outbox SET status = 'logged'")) {
      const [sent_at, id] = p as string[];
      const o = this.tables.outbox.find((x) => x.id === id);
      if (o) Object.assign(o, { status: "logged", sent_at });
      return;
    }
    if (s.includes("UPDATE outbox SET status = 'sent'")) {
      const [sent_at, id] = p as string[];
      const o = this.tables.outbox.find((x) => x.id === id);
      if (o) Object.assign(o, { status: "sent", sent_at });
      return;
    }
    if (s.includes("UPDATE outbox SET status = 'error'")) {
      const [error, id] = p as string[];
      const o = this.tables.outbox.find((x) => x.id === id);
      if (o) Object.assign(o, { status: "error", error });
      return;
    }
    if (s.startsWith("INSERT INTO newsletter") || s.startsWith("INSERT OR REPLACE INTO newsletter")) {
      if (s.includes("'active'")) {
        const [id, email, created_at] = p as string[];
        this.tables.newsletter = this.tables.newsletter.filter((x) => x.email !== email);
        this.tables.newsletter.push({ id, email, status: "active", created_at });
      } else {
        const [id, email, status, created_at] = p as string[];
        this.tables.newsletter = this.tables.newsletter.filter((x) => x.email !== email);
        this.tables.newsletter.push({ id, email, status, created_at });
      }
      return;
    }
    if (s.startsWith("INSERT OR REPLACE INTO settings") || s.startsWith("INSERT INTO settings")) {
      const [key, value] = p as string[];
      this.tables.settings = this.tables.settings.filter((x) => x.key !== key);
      this.tables.settings.push({ key, value });
      return;
    }
    if (s.startsWith("DELETE FROM faqs")) {
      this.tables.faqs = [];
      return;
    }
    if (s.startsWith("INSERT INTO faqs")) {
      const [id, category, question, answer, sort_order] = p;
      this.tables.faqs.push({ id, category, question, answer, sort_order });
      return;
    }
    if (s.startsWith("INSERT INTO _migrations")) {
      this.tables._migrations.push({ id: this.tables._migrations.length + 1, applied_at: p[0] });
      return;
    }
  }

  _all(sql: string, params: unknown[]): Row[] {
    const s = normalize(sql);
    if (s.includes("COUNT(*) AS c FROM _migrations")) {
      return [{ c: this.tables._migrations.length || 1 }];
    }
    if (s.includes("FROM users WHERE email = ?")) {
      return this.tables.users.filter((x) => x.email === params[0]).map(clone);
    }
    if (s.includes("FROM users WHERE id = ?") && s.includes("created_at AS createdAt")) {
      return this.tables.users
        .filter((x) => x.id === params[0])
        .map((u) => clone({ id: u.id, email: u.email, name: u.name, phone: u.phone, role: u.role, createdAt: u.created_at }));
    }
    if (s.includes("SELECT role FROM users WHERE id = ?") || (s.includes("FROM users WHERE id = ?") && s.includes("SELECT id, email"))) {
      return this.tables.users.filter((x) => x.id === params[0]).map(clone);
    }
    if (s.includes("SELECT id, password_hash FROM users WHERE email = ?")) {
      return this.tables.users.filter((x) => x.email === params[0]).map((u) => clone({ id: u.id, password_hash: u.password_hash }));
    }
    if (s.includes("SELECT 1 FROM users WHERE email = ?")) {
      return this.tables.users.filter((x) => x.email === params[0]).map(() => ({ 1: 1 }));
    }
    if (s.includes("FROM sessions WHERE id = ?")) {
      return this.tables.sessions.filter((x) => x.id === params[0]).map(clone);
    }
    if (s.includes("COUNT(*) AS c FROM leads")) return [{ c: this.tables.leads.length }];
    if (s.includes("COUNT(*) AS c FROM quotes")) return [{ c: this.tables.quotes.length }];
    if (s.includes("COUNT(*) AS c FROM users WHERE role = 'customer'")) {
      return [{ c: this.tables.users.filter((u) => u.role === "customer").length }];
    }
    if (s.includes("COUNT(*) AS c FROM reminders WHERE status = 'active'")) {
      return [{ c: this.tables.reminders.filter((r) => r.status === "active").length }];
    }
    if (s.includes("COUNT(*) AS c FROM outbox")) return [{ c: this.tables.outbox.length }];

    if (s.includes("FROM quotes WHERE user_id = ? OR email = ?")) {
      const [uid, email] = params;
      return sortDesc(this.tables.quotes.filter((q) => q.user_id === uid || q.email === email), "created_at");
    }
    if (s.includes("FROM quotes ORDER BY created_at DESC")) {
      return sortDesc(this.tables.quotes, "created_at").slice(0, 200);
    }
    if (s.includes("FROM policies WHERE user_id = ?")) {
      return sortDesc(this.tables.policies.filter((p) => p.user_id === params[0]), "updated_at");
    }
    if (s.includes("FROM policies ORDER BY updated_at DESC")) {
      return sortDesc(this.tables.policies, "updated_at");
    }
    if (s.includes("FROM reminders WHERE user_id = ? OR email = ?")) {
      const [uid, email] = params;
      return sortAsc(this.tables.reminders.filter((r) => r.user_id === uid || r.email === email), "expiry_date");
    }
    if (s.includes("FROM reminders WHERE status = 'active'")) {
      return this.tables.reminders.filter((r) => r.status === "active").map(clone);
    }
    if (s.includes("FROM reminders ORDER BY expiry_date")) {
      return sortAsc(this.tables.reminders, "expiry_date");
    }
    if (s.includes("FROM documents WHERE user_id = ?")) {
      return sortDesc(this.tables.documents.filter((d) => d.user_id === params[0]), "created_at").map((d) =>
        clone({ id: d.id, filename: d.filename, mime: d.mime, size: d.size, policy_id: d.policy_id, created_at: d.created_at }),
      );
    }
    if (s.includes("FROM leads ORDER BY created_at DESC")) return sortDesc(this.tables.leads, "created_at").slice(0, 50);
    if (s.includes("FROM users ORDER BY created_at DESC") || s.includes("SELECT id, email, name, phone, role, created_at FROM users")) {
      return sortDesc(this.tables.users, "created_at").map((u) =>
        clone({ id: u.id, email: u.email, name: u.name, phone: u.phone, role: u.role, created_at: u.created_at }),
      );
    }
    if (s.includes("FROM outbox ORDER BY created_at DESC")) return sortDesc(this.tables.outbox, "created_at").slice(0, 100);
    if (s.includes("FROM newsletter WHERE email = ?")) {
      return this.tables.newsletter.filter((n) => n.email === params[0]).map(clone);
    }
    if (s.includes("SELECT * FROM leads") || s === "SELECT * FROM leads") return clone(this.tables.leads);
    if (s.includes("SELECT * FROM quotes")) return clone(this.tables.quotes);
    if (s.includes("SELECT * FROM policies")) return clone(this.tables.policies);
    if (s.includes("SELECT * FROM reminders")) return clone(this.tables.reminders);
    if (s.includes("SELECT * FROM outbox")) return clone(this.tables.outbox);
    if (s.includes("SELECT * FROM newsletter")) return clone(this.tables.newsletter);
    return [];
  }
}

function emptyTables(): Tables {
  return {
    users: [], sessions: [], leads: [], quotes: [], policies: [], reminders: [],
    documents: [], claim_requests: [], outbox: [], newsletter: [], settings: [], faqs: [], _migrations: [{ id: 1, applied_at: nowIso() }],
  };
}

function normalize(sql: string) {
  return sql.replace(/\s+/g, " ").trim();
}

function sortDesc(rows: Row[], key: string) {
  return [...rows].sort((a, b) => String(b[key] ?? "").localeCompare(String(a[key] ?? ""))).map(clone);
}
function sortAsc(rows: Row[], key: string) {
  return [...rows].sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? ""))).map(clone);
}

function seedDemo(db: MemoryDatabase) {
  const ts = nowIso();
  const adminId = "usr_admin_demo_seed01";
  const demoId = "usr_demo_customer_seed";
  db.tables.users.push(
    { id: adminId, email: "admin@jivora.local", name: "JivOra Admin", phone: "", password_hash: hashPassword("admin1234"), role: "admin", created_at: ts },
    { id: demoId, email: "demo@jivora.local", name: "Demo Customer", phone: "8460327686", password_hash: hashPassword("demo1234"), role: "customer", created_at: ts },
  );
  db.tables.policies.push({
    id: newId("pol"), user_id: demoId, product_type: "motor-car", insurer: "Illustrative Insurer",
    policy_number: "DEMO/MOT/2026/001", vehicle_or_subject: "GJ09 Demo Car", sum_insured: 450000, premium: 12500,
    start_date: "2026-01-01", end_date: "2027-01-01", notes: "Seed policy", created_at: ts, updated_at: ts,
  });
  db.tables.reminders.push({
    id: newId("rem"), user_id: demoId, email: "demo@jivora.local", label: "Demo car policy", kind: "policy",
    expiry_date: "2027-01-01", remind_days: 45, last_sent_at: null, status: "active", created_at: ts,
  });
  db.tables.quotes.push({
    id: newId("qt"), user_id: demoId, product_type: "motor-car", inputs: "{}",
    estimate: JSON.stringify({ summary: "Indicative total incl. GST: ₹14,200" }),
    name: "Demo Customer", email: "demo@jivora.local", phone: "8460327686", status: "new", created_at: ts,
  });
  db.tables.leads.push({
    id: newId("lead"), type: "contact", name: "Walk-in Lead", email: "lead@example.com", phone: "9999999999",
    message: "Need bike renewal help", payload: "{}", status: "new", user_id: null, created_at: ts,
  });
  db.tables.settings.push({ key: "brand_notice", value: "IRDAI registration: [to be added]" });
  db.tables.settings.push({ key: "storage_mode", value: "demo" });
}

export function getMemoryDb(): MemoryDatabase {
  if (!g.__jivoraMem) g.__jivoraMem = new MemoryDatabase();
  // Ensure demo users always exist after cold-ish resets of subset — reseed if empty users
  if (!g.__jivoraMem.tables.users.length) seedDemo(g.__jivoraMem);
  return g.__jivoraMem;
}

export function resetMemoryDb() {
  g.__jivoraMem = undefined;
}

// silence unused import warning helpers
void createHash;
