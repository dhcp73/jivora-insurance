/** Indicative insurance calculators. All outputs must be labelled non-binding. */

export const GST_RATE = 0.18;

/** IRDAI/MoRTH-style private car annual TP base premiums (ex-GST), commonly cited FY24-25 tables. */
export const CAR_TP: Record<string, number> = {
  "upto-1000": 2094,
  "1001-1500": 3416,
  "above-1500": 7897,
};

export const BIKE_TP: Record<string, number> = {
  "upto-75": 538,
  "76-150": 714,
  "151-350": 1366,
  "above-350": 2804,
};

export const BIKE_EV_TP: Record<string, number> = {
  "upto-3kw": 457,
  "3-7kw": 607,
  "7-16kw": 1161,
  "above-16kw": 2383,
};

/** Simplified commercial goods TP bands (illustrative public-carrier GVW slices). */
export const CV_TP: Record<string, number> = {
  "gvw-upto-7500": 16049,
  "gvw-7501-12000": 27186,
  "gvw-12001-20000": 35313,
  "gvw-above-20000": 43950,
};

/** IRDAI IDV depreciation schedule by age band (years). */
export const IDV_DEPRECIATION: { maxYears: number; rate: number; label: string }[] = [
  { maxYears: 0.5, rate: 0.05, label: "0–6 months" },
  { maxYears: 1, rate: 0.15, label: "6–12 months" },
  { maxYears: 2, rate: 0.2, label: "1–2 years" },
  { maxYears: 3, rate: 0.3, label: "2–3 years" },
  { maxYears: 4, rate: 0.4, label: "3–4 years" },
  { maxYears: 5, rate: 0.5, label: "4–5 years" },
];

/** Typical NCB ladder on OD premium (illustrative; insurer grids vary). */
export const NCB_LADDER: { claimFreeYears: number; discount: number }[] = [
  { claimFreeYears: 0, discount: 0 },
  { claimFreeYears: 1, discount: 0.2 },
  { claimFreeYears: 2, discount: 0.25 },
  { claimFreeYears: 3, discount: 0.35 },
  { claimFreeYears: 4, discount: 0.45 },
  { claimFreeYears: 5, discount: 0.5 },
];

export function roundRupee(n: number): number {
  return Math.round(n);
}

export function withGst(premiumExGst: number): { exGst: number; gst: number; total: number } {
  const exGst = roundRupee(premiumExGst);
  const gst = roundRupee(exGst * GST_RATE);
  return { exGst, gst, total: exGst + gst };
}

export function idvFromExShowroom(exShowroom: number, ageYears: number): {
  idv: number;
  depreciationRate: number;
  label: string;
} {
  if (exShowroom <= 0) throw new Error("Ex-showroom price must be positive.");
  if (ageYears < 0) throw new Error("Age cannot be negative.");
  if (ageYears > 5) {
    return {
      idv: roundRupee(exShowroom * 0.4),
      depreciationRate: 0.6,
      label: "5+ years (negotiated — using 60% illustrative depreciation)",
    };
  }
  const band = IDV_DEPRECIATION.find((b) => ageYears <= b.maxYears) || IDV_DEPRECIATION.at(-1)!;
  return {
    idv: roundRupee(exShowroom * (1 - band.rate)),
    depreciationRate: band.rate,
    label: band.label,
  };
}

export function ncbDiscount(claimFreeYears: number): number {
  const years = Math.max(0, Math.min(5, Math.floor(claimFreeYears)));
  return NCB_LADDER.find((n) => n.claimFreeYears === years)?.discount ?? 0.5;
}

export type MotorProduct = "car" | "bike" | "bike-ev" | "cv";

export interface MotorEstimateInput {
  product: MotorProduct;
  ccBand: string;
  idv: number;
  odRatePercent: number; // e.g. 2.5 means 2.5% of IDV
  claimFreeYears: number;
  paCover?: number; // default 320 for owner-driver PA commonly referenced
  comprehensive?: boolean;
}

export interface MotorEstimate {
  tp: number;
  odGross: number;
  ncbPercent: number;
  odNet: number;
  pa: number;
  subtotal: number;
  gst: number;
  total: number;
  breakdown: string[];
  disclaimer: string;
}

export function estimateMotor(input: MotorEstimateInput): MotorEstimate {
  const table =
    input.product === "car"
      ? CAR_TP
      : input.product === "bike"
        ? BIKE_TP
        : input.product === "bike-ev"
          ? BIKE_EV_TP
          : CV_TP;
  const tp = table[input.ccBand];
  if (tp == null) throw new Error(`Unknown capacity band: ${input.ccBand}`);
  if (input.idv < 0) throw new Error("IDV cannot be negative.");
  const odRate = input.odRatePercent / 100;
  if (odRate < 0 || odRate > 0.2) throw new Error("OD rate percent out of expected range (0–20).");
  const comprehensive = input.comprehensive !== false;
  const ncb = ncbDiscount(input.claimFreeYears);
  const odGross = comprehensive ? roundRupee(input.idv * odRate) : 0;
  const odNet = comprehensive ? roundRupee(odGross * (1 - ncb)) : 0;
  const pa = comprehensive ? roundRupee(input.paCover ?? 320) : roundRupee(input.paCover ?? 320);
  const subtotal = tp + odNet + pa;
  const { gst, total } = withGst(subtotal);
  const breakdown = [
    `Third-party (indicative IRDAI/MoRTH band): ₹${tp.toLocaleString("en-IN")}`,
    comprehensive
      ? `Own-damage before NCB: ₹${odGross.toLocaleString("en-IN")} (IDV ₹${input.idv.toLocaleString("en-IN")} × ${input.odRatePercent}%)`
      : "Own-damage: not included (TP-focused estimate)",
    comprehensive ? `NCB discount: ${(ncb * 100).toFixed(0)}% → OD net ₹${odNet.toLocaleString("en-IN")}` : "",
    `Owner-driver PA (illustrative): ₹${pa.toLocaleString("en-IN")}`,
    `GST @ 18%: ₹${gst.toLocaleString("en-IN")}`,
  ].filter(Boolean);
  return {
    tp,
    odGross,
    ncbPercent: ncb * 100,
    odNet,
    pa,
    subtotal,
    gst,
    total,
    breakdown,
    disclaimer:
      "Indicative estimate only — not a binding quotation. Actual premiums depend on insurer underwriting, zone, add-ons, deductibles and current notified TP rates.",
  };
}

export interface HealthEstimateInput {
  age: number;
  members: number;
  sumInsured: number;
  cityTier: 1 | 2 | 3;
}

export function estimateHealth(input: HealthEstimateInput): {
  annualPremium: number;
  gst: number;
  total: number;
  perMember: number;
  notes: string[];
  disclaimer: string;
} {
  if (input.age < 0 || input.age > 100) throw new Error("Invalid age");
  if (input.members < 1 || input.members > 10) throw new Error("Members must be 1–10");
  if (input.sumInsured < 100000) throw new Error("Sum insured too low for estimate");
  // Simple illustrative base: ₹ per lakh SI by age band, adjusted by tier & members
  let ratePerLakh = 900;
  if (input.age >= 45) ratePerLakh = 1600;
  if (input.age >= 60) ratePerLakh = 3200;
  if (input.age >= 70) ratePerLakh = 4800;
  const tierMult = input.cityTier === 1 ? 1.15 : input.cityTier === 2 ? 1.05 : 1;
  const memberMult = 1 + (input.members - 1) * 0.55;
  const lakhs = input.sumInsured / 100000;
  const annual = roundRupee(ratePerLakh * lakhs * tierMult * memberMult);
  const { gst, total } = withGst(annual);
  return {
    annualPremium: annual,
    gst,
    total,
    perMember: roundRupee(total / input.members),
    notes: [
      `Base rate band ~₹${ratePerLakh}/lakh SI for age ${input.age}`,
      `City tier ${input.cityTier} multiplier ×${tierMult}`,
      `Family loading for ${input.members} members ×${memberMult.toFixed(2)}`,
      "Health GST treatment can vary with current tax rules — shown at 18% for consistency in this demo calculator.",
    ],
    disclaimer:
      "Indicative health premium model for education only. Insurer medical underwriting, PED waiting periods and plan features change the price materially.",
  };
}

export interface TermEstimateInput {
  age: number;
  cover: number; // sum assured
  termYears: number;
  smoker: boolean;
}

export function estimateTerm(input: TermEstimateInput): {
  annualPremium: number;
  gst: number;
  total: number;
  monthly: number;
  notes: string[];
  disclaimer: string;
} {
  if (input.age < 18 || input.age > 65) throw new Error("Term estimates support ages 18–65");
  if (input.cover < 2500000) throw new Error("Minimum illustrative cover ₹25 lakh");
  if (input.termYears < 5 || input.termYears > 40) throw new Error("Term length out of range");
  // Rough pure-term heuristic: base per-lakh rate rises with age
  let perLakh = 120 + Math.max(0, input.age - 25) * 8;
  if (input.smoker) perLakh *= 1.5;
  const lakhs = input.cover / 100000;
  const termFactor = 1 + Math.max(0, input.termYears - 10) * 0.01;
  const annual = roundRupee(perLakh * lakhs * termFactor);
  const { gst, total } = withGst(annual);
  return {
    annualPremium: annual,
    gst,
    total,
    monthly: roundRupee(total / 12),
    notes: [
      `Illustrative rate ~₹${roundRupee(perLakh)} per lakh of cover`,
      input.smoker ? "Smoker loading applied (+50% illustrative)" : "Non-smoker rates assumed",
      `Policy term ${input.termYears} years`,
    ],
    disclaimer:
      "Indicative term-life estimate only. Final premiums require insurer medical/financial underwriting and product selection.",
  };
}

export function recommendTermCover(annualIncome: number, existingCover = 0): {
  recommended: number;
  rule: string;
} {
  if (annualIncome <= 0) throw new Error("Income must be positive");
  const target = annualIncome * 15;
  const gap = Math.max(0, target - existingCover);
  return {
    recommended: roundRupee(gap),
    rule: "Common thumb-rule: ~10–20× annual income; this tool uses 15× minus existing cover.",
  };
}

export function recommendHealthCover(opts: {
  members: number;
  metro: boolean;
}): { recommended: number; rule: string } {
  const base = opts.metro ? 1000000 : 500000;
  const extra = Math.max(0, opts.members - 1) * (opts.metro ? 500000 : 300000);
  return {
    recommended: base + extra,
    rule: opts.metro
      ? "Metro illustration: ₹10L base + ₹5L per additional member"
      : "Non-metro illustration: ₹5L base + ₹3L per additional member",
  };
}

export function daysUntil(dateIso: string, from = new Date()): number {
  const end = new Date(dateIso + (dateIso.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(end.getTime())) throw new Error("Invalid date");
  const start = new Date(from.toISOString().slice(0, 10) + "T00:00:00");
  return Math.ceil((end.getTime() - start.getTime()) / 86400000);
}
