"use client";
import { useState } from "react";
export function NewsletterForm() {
  const [status, setStatus] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: fd.get("email") }) });
    setStatus(res.ok ? "Subscribed — check outbox/email." : "Failed");
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input className="input" type="email" name="email" placeholder="Email for tips" required />
      <button className="btn-primary" type="submit">Subscribe</button>
      {status && <p className="text-xs text-slate-500 sm:ml-2">{status}</p>}
    </form>
  );
}
