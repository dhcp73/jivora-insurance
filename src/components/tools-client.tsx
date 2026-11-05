"use client";

import { useMemo, useState } from "react";
import {
  estimateHealth,
  estimateMotor,
  estimateTerm,
  idvFromExShowroom,
  ncbDiscount,
  recommendHealthCover,
  recommendTermCover,
  daysUntil,
  CAR_TP,
  BIKE_TP,
  BIKE_EV_TP,
  CV_TP,
} from "@/lib/calculators";
import { DisclaimerBanner } from "./disclaimer-banner";

function Result({ lines, total }: { lines: string[]; total?: string }) {
  return (
    <div className="card space-y-2 bg-navy-900 p-5 text-white">
      {lines.map((l) => (
        <p key={l} className="text-sm text-slate-200">{l}</p>
      ))}
      {total && <p className="pt-2 text-2xl font-bold text-orange-400">{total}</p>}
    </div>
  );
}

export function PremiumCalculator() {
  const [product, setProduct] = useState<"car" | "bike" | "bike-ev" | "cv">("car");
  const [ccBand, setCcBand] = useState("1001-1500");
  const [idv, setIdv] = useState(500000);
  const [odRate, setOdRate] = useState(2.5);
  const [ncbYears, setNcbYears] = useState(2);
  const [comprehensive, setComprehensive] = useState(true);
  const bands = product === "car" ? CAR_TP : product === "bike" ? BIKE_TP : product === "bike-ev" ? BIKE_EV_TP : CV_TP;
  const result = useMemo(() => {
    try {
      return estimateMotor({ product, ccBand, idv, odRatePercent: odRate, claimFreeYears: ncbYears, comprehensive });
    } catch { return null; }
  }, [product, ccBand, idv, odRate, ncbYears, comprehensive]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div>
          <label className="label">Vehicle type</label>
          <select className="input" value={product} onChange={(e) => {
            const p = e.target.value as typeof product;
            setProduct(p);
            const table = p === "car" ? CAR_TP : p === "bike" ? BIKE_TP : p === "bike-ev" ? BIKE_EV_TP : CV_TP;
            setCcBand(Object.keys(table)[0]!);
          }}>
            <option value="car">Private car</option>
            <option value="bike">Two-wheeler</option>
            <option value="bike-ev">Two-wheeler EV</option>
            <option value="cv">Commercial (goods, illustrative)</option>
          </select>
        </div>
        <div>
          <label className="label">Capacity / GVW band</label>
          <select className="input" value={ccBand} onChange={(e) => setCcBand(e.target.value)}>
            {Object.entries(bands).map(([k, v]) => (
              <option key={k} value={k}>{k} — TP ₹{v.toLocaleString("en-IN")}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">IDV (₹)</label>
          <input className="input" type="number" value={idv} onChange={(e) => setIdv(Number(e.target.value))} />
        </div>
        <div>
          <label className="label">OD rate % of IDV</label>
          <input className="input" type="number" step="0.1" value={odRate} onChange={(e) => setOdRate(Number(e.target.value))} />
        </div>
        <div>
          <label className="label">Claim-free years (NCB)</label>
          <input className="input" type="number" min={0} max={5} value={ncbYears} onChange={(e) => setNcbYears(Number(e.target.value))} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={comprehensive} onChange={(e) => setComprehensive(e.target.checked)} />
          Comprehensive (include OD)
        </label>
      </div>
      <div className="space-y-4">
        <DisclaimerBanner />
        {result ? <Result lines={result.breakdown} total={`Indicative total incl. GST: ₹${result.total.toLocaleString("en-IN")}`} /> : <p className="text-sm text-red-600">Check inputs</p>}
      </div>
    </div>
  );
}

export function IdvCalculator() {
  const [price, setPrice] = useState(800000);
  const [age, setAge] = useState(2);
  const r = useMemo(() => { try { return idvFromExShowroom(price, age); } catch { return null; } }, [price, age]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div><label className="label">Ex-showroom (₹)</label><input className="input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
        <div><label className="label">Vehicle age (years)</label><input className="input" type="number" step="0.1" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
      </div>
      <div className="space-y-4">
        <DisclaimerBanner>Educational IDV using common IRDAI age depreciation bands.</DisclaimerBanner>
        {r && <Result lines={[`Band: ${r.label}`, `Depreciation: ${(r.depreciationRate * 100).toFixed(0)}%`]} total={`Indicative IDV: ₹${r.idv.toLocaleString("en-IN")}`} />}
      </div>
    </div>
  );
}

export function NcbCalculator() {
  const [years, setYears] = useState(3);
  const [od, setOd] = useState(12000);
  const d = ncbDiscount(years);
  const net = Math.round(od * (1 - d));
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div><label className="label">Claim-free years</label><input className="input" type="number" min={0} max={5} value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div><label className="label">OD premium before NCB (₹)</label><input className="input" type="number" value={od} onChange={(e) => setOd(Number(e.target.value))} /></div>
      </div>
      <Result lines={[`Illustrative NCB: ${(d * 100).toFixed(0)}%`, `OD before NCB: ₹${od.toLocaleString("en-IN")}`]} total={`OD after NCB: ₹${net.toLocaleString("en-IN")}`} />
    </div>
  );
}

export function HealthCoverCalculator() {
  const [age, setAge] = useState(35);
  const [members, setMembers] = useState(3);
  const [si, setSi] = useState(1000000);
  const [tier, setTier] = useState<1 | 2 | 3>(2);
  const rec = recommendHealthCover({ members, metro: tier === 1 });
  const est = useMemo(() => { try { return estimateHealth({ age, members, sumInsured: si, cityTier: tier }); } catch { return null; } }, [age, members, si, tier]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div><label className="label">Eldest age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div><label className="label">Members</label><input className="input" type="number" min={1} max={10} value={members} onChange={(e) => setMembers(Number(e.target.value))} /></div>
        <div><label className="label">Sum insured (₹)</label><input className="input" type="number" value={si} onChange={(e) => setSi(Number(e.target.value))} /></div>
        <div>
          <label className="label">City tier</label>
          <select className="input" value={tier} onChange={(e) => setTier(Number(e.target.value) as 1 | 2 | 3)}>
            <option value={1}>Tier 1 (metro)</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
          </select>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">Suggested SI: ₹{rec.recommended.toLocaleString("en-IN")} — {rec.rule}</p>
      </div>
      <div className="space-y-4">
        <DisclaimerBanner />
        {est && <Result lines={est.notes} total={`Indicative annual incl. GST: ₹${est.total.toLocaleString("en-IN")}`} />}
      </div>
    </div>
  );
}

export function TermCoverCalculator() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(800000);
  const [existing, setExisting] = useState(0);
  const [term, setTerm] = useState(30);
  const [smoker, setSmoker] = useState(false);
  const rec = recommendTermCover(income, existing);
  const est = useMemo(() => {
    try { return estimateTerm({ age, cover: Math.max(rec.recommended, 2500000), termYears: term, smoker }); }
    catch { return null; }
  }, [age, rec.recommended, term, smoker]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div><label className="label">Age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div><label className="label">Annual income (₹)</label><input className="input" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
        <div><label className="label">Existing life cover (₹)</label><input className="input" type="number" value={existing} onChange={(e) => setExisting(Number(e.target.value))} /></div>
        <div><label className="label">Policy term (years)</label><input className="input" type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={smoker} onChange={(e) => setSmoker(e.target.checked)} /> Smoker</label>
        <p className="text-sm text-slate-600 dark:text-slate-300">Suggested additional cover: ₹{rec.recommended.toLocaleString("en-IN")} — {rec.rule}</p>
      </div>
      <div className="space-y-4">
        <DisclaimerBanner />
        {est && <Result lines={est.notes} total={`Indicative annual incl. GST: ₹${est.total.toLocaleString("en-IN")} (~₹${est.monthly.toLocaleString("en-IN")}/mo)`} />}
      </div>
    </div>
  );
}

export function RenewalReminderTool() {
  const [label, setLabel] = useState("Car insurance");
  const [kind, setKind] = useState("policy");
  const [expiry, setExpiry] = useState("");
  const [email, setEmail] = useState("");
  const [remindDays, setRemindDays] = useState(30);
  const [status, setStatus] = useState("");
  const days = expiry ? (() => { try { return daysUntil(expiry); } catch { return null; } })() : null;
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving…");
    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, kind, expiry_date: expiry, email, remind_days: remindDays }),
    });
    const data = await res.json().catch(() => ({}));
    setStatus(res.ok ? "Reminder saved. Emails go via SMTP or the admin outbox." : data.error || "Failed");
  }
  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-5">
        <div><label className="label" htmlFor="rem-label">Label</label><input className="input" id="rem-label" value={label} onChange={(e) => setLabel(e.target.value)} required /></div>
        <div>
          <label className="label" htmlFor="rem-kind">Type</label>
          <select className="input" id="rem-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="policy">Insurance policy</option>
            <option value="puc">PUC certificate</option>
          </select>
        </div>
        <div><label className="label" htmlFor="rem-expiry">Expiry date</label><input className="input" id="rem-expiry" type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} required /></div>
        <div><label className="label" htmlFor="rem-email">Email for reminder</label><input className="input" id="rem-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="label" htmlFor="rem-days">Remind days before</label><input className="input" id="rem-days" type="number" min={1} max={90} value={remindDays} onChange={(e) => setRemindDays(Number(e.target.value))} /></div>
        <button className="btn-primary" type="submit">Save reminder</button>
        {status && <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>}
      </div>
      <div className="space-y-4">
        <DisclaimerBanner>Reminders are helpful nudges — not legal notices. Verify vehicle status only on Parivahan.</DisclaimerBanner>
        {days != null && (
          <Result
            lines={[`Item: ${label}`, `Expiry: ${expiry}`, days < 0 ? "Already past expiry." : `Days remaining: ${days}`]}
            total={days < 0 ? "Expired" : days <= remindDays ? "Inside reminder window" : "On track"}
          />
        )}
      </div>
    </form>
  );
}
