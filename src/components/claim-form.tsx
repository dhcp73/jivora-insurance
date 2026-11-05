"use client";

import { useState } from "react";

export function ClaimForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setStatus("err"); setError(data.error || "Failed"); return; }
    setStatus("ok");
    e.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h3 className="font-semibold text-navy-900 dark:text-white">Request claim assistance</h3>
      {(["name","email","phone","policy_number"] as const).map((f) => (
        <div key={f}>
          <label className="label" htmlFor={f}>{f.replace("_"," ")}</label>
          <input className="input" id={f} name={f} required={f==="name"||f==="email"} type={f==="email"?"email":"text"} />
        </div>
      ))}
      <div>
        <label className="label" htmlFor="details">What happened?</label>
        <textarea className="input min-h-28" id="details" name="details" required />
      </div>
      <button className="btn-primary" type="submit" disabled={status==="loading"}>{status==="loading"?"Submitting…":"Submit request"}</button>
      {status==="ok" && <p className="text-sm text-emerald-600">Request received. We will contact you.</p>}
      {status==="err" && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
