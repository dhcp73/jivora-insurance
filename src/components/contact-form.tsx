"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        message: fd.get("message"),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("err");
      setError(data.error || "Something went wrong");
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input className="input" id="name" name="name" required />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input className="input" id="email" name="email" type="email" required />
      </div>
      <div>
        <label className="label" htmlFor="phone">Phone</label>
        <input className="input" id="phone" name="phone" />
      </div>
      <div>
        <label className="label" htmlFor="message">Message</label>
        <textarea className="input min-h-28" id="message" name="message" required />
      </div>
      <button className="btn-primary" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "ok" && <p className="text-sm text-emerald-600">Thanks — we will get back to you shortly.</p>}
      {status === "err" && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
