# JivOra Insurance Solutions

**One Partner • Every Protection**

Production-quality Next.js website for a Gujarat (GJ09 / Sabarkantha–Himmatnagar) insurance agency: motor, health, life, general, PUC assistance, indicative quotes, comparisons, calculators, renewal reminders, customer & admin dashboards, and email outbox.

> Insurance is the subject matter of solicitation. Premiums on this site are **indicative**. IRDAI registration: `[to be added]`.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- SQLite via `better-sqlite3`
- Nodemailer (SMTP optional → otherwise admin outbox)
- Vitest + Playwright

## Quick start

```bash
npm install
npm run seed
npm run build
npm run start:bg   # port 3200 + reminder worker
# or: npm run dev
```

Stop: `npm run stop`

### Demo logins

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@jivora.local | admin1234 |
| Customer | demo@jivora.local | demo1234 |

Contact on site: WhatsApp/phone **8460327686**, email **jivora.insurance.solutions@gmail.com**.

## Scripts

- `npm test` — unit tests (calculators, auth)
- `npm run test:e2e` — Playwright smoke (signup, quote, reminder, admin, responsive)
- `npm run typecheck` / `npm run lint` / `npm run check`
- `npm run worker -- --once` — process due renewal reminder emails once
- `npm run screenshots` — desktop + mobile PNGs into `screenshots/`

## Research

See [`docs/RESEARCH.md`](docs/RESEARCH.md) for industry sources, TP rate anchors, legal notes, and what could **not** be verified about JivOra publicly.

## Content rules

- Do **not** reproduce MoRTH/RTO-style “Permanent Archive” scare notices.
- Link vehicle status to official [Parivahan](https://parivahan.gov.in) only.
- Mark illustrative comparison data clearly.

## Environment

Copy `.env.example`. Without SMTP, emails are logged to the admin **outbox** tab.
