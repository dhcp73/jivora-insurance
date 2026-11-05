"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { estimateHealth, estimateMotor, estimateTerm, CAR_TP, BIKE_TP, CV_TP } from "@/lib/calculators";
import { DisclaimerBanner } from "./disclaimer-banner";

type QuoteType = "motor-car" | "motor-bike" | "motor-cv" | "health" | "term" | "general" | "puc";

export function QuoteWizard() {
  const sp = useSearchParams();
  const initial = (sp.get("type") as QuoteType) || "motor-car";
  const [step, setStep] = useState(1);
  const [type, setType] = useState<QuoteType>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ccBand, setCcBand] = useState("1001-1500");
  const [idv, setIdv] = useState(500000);
  const [odRate, setOdRate] = useState(2.5);
  const [ncbYears, setNcbYears] = useState(1);
  const [age, setAge] = useState(35);
  const [members, setMembers] = useState(2);
  const [sumInsured, setSumInsured] = useState(1000000);
  const [cover, setCover] = useState(10000000);
  const [termYears, setTermYears] = useState(25);
  const [smoker, setSmoker] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [quoteId, setQuoteId] = useState("");

  const estimate = useMemo(() => {
    try {
      if (type === "motor-car" || type === "motor-bike" || type === "motor-cv") {
        const product = type === "motor-car" ? "car" : type === "motor-bike" ? "bike" : "cv";
        const e = estimateMotor({ product, ccBand, idv, odRatePercent: odRate, claimFreeYears: ncbYears, comprehensive: true });
        return { summary: `Indicative total incl. GST: ₹${e.total.toLocaleString("en-IN")}`, detail: e, payload: { ccBand, idv, odRate, ncbYears } };
      }
      if (type === "health") {
        const e = estimateHealth({ age, members, sumInsured, cityTier: 2 });
        return { summary: `Indicative health total incl. GST: ₹${e.total.toLocaleString("en-IN")}`, detail: e, payload: { age, members, sumInsured } };
      }
      if (type === "term") {
        const e = estimateTerm({ age, cover, termYears, smoker });
        return { summary: `Indicative term total incl. GST: ₹${e.total.toLocaleString("en-IN")}`, detail: e, payload: { age, cover, termYears, smoker } };
      }
      return { summary: "We will prepare options manually and WhatsApp you.", detail: null, payload: { notes } };
    } catch (err) {
      return { summary: err instanceof Error ? err.message : "Invalid inputs", detail: null, payload: {} };
    }
  }, [type, ccBand, idv, odRate, ncbYears, age, members, sumInsured, cover, termYears, smoker, notes]);

  async function submit() {
    setStatus("Submitting…");
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_type: type,
        name,
        email,
        phone,
        inputs: estimate.payload,
        estimate: { summary: estimate.summary, detail: estimate.detail },
        notes,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(data.error || "Failed");
      return;
    }
    setQuoteId(data.id);
    setStatus("ok");
    setStep(4);
  }

  const bands = type === "motor-bike" ? BIKE_TP : type === "motor-cv" ? CV_TP : CAR_TP;

  return (
    <div className="card p-6">
      <div className="mb-6 flex gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={`rounded-full px-3 py-1 ${step === n ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-navy-800"}`}>
            Step {n}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">What do you need?</h2>
          <select className="input" value={type} onChange={(e) => setType(e.target.value as QuoteType)}>
            <option value="motor-car">Car insurance</option>
            <option value="motor-bike">Two-wheeler</option>
            <option value="motor-cv">Commercial vehicle</option>
            <option value="health">Health</option>
            <option value="term">Term life</option>
            <option value="general">Home / travel / shop</option>
            <option value="puc">PUC assistance / reminder</option>
          </select>
          <button className="btn-primary" type="button" onClick={() => setStep(2)}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Details</h2>
          {(type === "motor-car" || type === "motor-bike" || type === "motor-cv") && (
            <>
              <div>
                <label className="label">Capacity / GVW band</label>
                <select className="input" value={ccBand} onChange={(e) => setCcBand(e.target.value)}>
                  {Object.entries(bands).map(([k, v]) => (
                    <option key={k} value={k}>{k} (TP ₹{v.toLocaleString("en-IN")})</option>
                  ))}
                </select>
              </div>
              <div><label className="label">IDV (₹)</label><input className="input" type="number" value={idv} onChange={(e) => setIdv(Number(e.target.value))} /></div>
              <div><label className="label">OD rate %</label><input className="input" type="number" step="0.1" value={odRate} onChange={(e) => setOdRate(Number(e.target.value))} /></div>
              <div><label className="label">Claim-free years</label><input className="input" type="number" value={ncbYears} onChange={(e) => setNcbYears(Number(e.target.value))} /></div>
            </>
          )}
          {type === "health" && (
            <>
              <div><label className="label">Eldest age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
              <div><label className="label">Members</label><input className="input" type="number" value={members} onChange={(e) => setMembers(Number(e.target.value))} /></div>
              <div><label className="label">Sum insured</label><input className="input" type="number" value={sumInsured} onChange={(e) => setSumInsured(Number(e.target.value))} /></div>
            </>
          )}
          {type === "term" && (
            <>
              <div><label className="label">Age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
              <div><label className="label">Cover (₹)</label><input className="input" type="number" value={cover} onChange={(e) => setCover(Number(e.target.value))} /></div>
              <div><label className="label">Term (years)</label><input className="input" type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} /></div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={smoker} onChange={(e) => setSmoker(e.target.checked)} /> Smoker</label>
            </>
          )}
          {(type === "general" || type === "puc") && (
            <div><label className="label">Notes</label><textarea className="input min-h-24" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us what you need" /></div>
          )}
          <div className="flex gap-2">
            <button className="btn-ghost" type="button" onClick={() => setStep(1)}>Back</button>
            <button className="btn-primary" type="button" onClick={() => setStep(3)}>See estimate</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Your indicative estimate</h2>
          <DisclaimerBanner />
          <p className="text-2xl font-bold text-orange-600">{estimate.summary}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div><label className="label" htmlFor="quote-name">Name</label><input className="input" id="quote-name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div><label className="label" htmlFor="quote-email">Email</label><input className="input" id="quote-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><label className="label" htmlFor="quote-phone">Phone</label><input className="input" id="quote-phone" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost" type="button" onClick={() => setStep(2)}>Back</button>
            <button className="btn-primary" type="button" onClick={submit} disabled={!name || !email}>Save & email me</button>
          </div>
          {status && status !== "ok" && <p className="text-sm text-slate-600">{status}</p>}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-600">Request received</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Reference <strong>{quoteId}</strong>. A confirmation was queued to {email}. An advisor may follow up on WhatsApp.</p>
          <DisclaimerBanner />
        </div>
      )}
    </div>
  );
}
