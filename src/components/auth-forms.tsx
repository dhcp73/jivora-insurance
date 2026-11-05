"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error || "Login failed"); return; }
    router.push(data.role === "admin" ? "/admin" : "/dashboard");
    router.refresh();
  }
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Log in</h1>
      <div><label className="label" htmlFor="email">Email</label><input className="input" id="email" name="email" type="email" required /></div>
      <div><label className="label" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" required /></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      <p className="text-sm text-slate-500">No account? <Link href="/signup" className="text-orange-600">Sign up</Link></p>
      <p className="text-xs text-slate-400">Demo: demo@jivora.local / demo1234 · admin@jivora.local / admin1234</p>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        password: fd.get("password"),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error || "Signup failed"); return; }
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Create account</h1>
      <div><label className="label" htmlFor="name">Name</label><input className="input" id="name" name="name" required /></div>
      <div><label className="label" htmlFor="email">Email</label><input className="input" id="email" name="email" type="email" required /></div>
      <div><label className="label" htmlFor="phone">Phone</label><input className="input" id="phone" name="phone" /></div>
      <div><label className="label" htmlFor="password">Password (min 8)</label><input className="input" id="password" name="password" type="password" minLength={8} required /></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating…" : "Sign up"}</button>
      <p className="text-sm text-slate-500">Already registered? <Link href="/login" className="text-orange-600">Log in</Link></p>
    </form>
  );
}
