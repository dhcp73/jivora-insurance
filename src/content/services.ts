
export type ServiceSlug =
  | "motor-car"
  | "two-wheeler"
  | "commercial-vehicle"
  | "health"
  | "family-floater"
  | "senior-health"
  | "term-life"
  | "investment-life"
  | "home"
  | "travel"
  | "shop"
  | "puc";

export interface ServicePage {
  slug: ServiceSlug;
  title: string;
  category: string;
  summary: string;
  hero: string;
  bullets: string[];
  sections: { heading: string; body: string }[];
  quoteType: "motor-car" | "motor-bike" | "motor-cv" | "health" | "term" | "general" | "puc";
  related: ServiceSlug[];
}

export const services: ServicePage[] = [
  {
    slug: "motor-car",
    title: "Private Car Insurance",
    category: "Motor",
    summary: "Third-party, own-damage and comprehensive cover for private cars registered in Gujarat and across India.",
    hero: "Protect your car with clear advice on TP versus comprehensive cover, IDV, NCB and useful add-ons — without scare tactics.",
    bullets: [
      "Mandatory third-party liability explained in plain English",
      "Help choosing IDV and claim-free NCB strategy",
      "Add-ons: zero depreciation, engine protect, RSA and more",
      "Renewal reminders so cover does not lapse unnoticed",
    ],
    sections: [
      {
        heading: "Why car insurance matters",
        body: "Under Section 146 of the Motor Vehicles Act, 1988, a motor vehicle used in a public place must carry a valid third-party liability policy. Driving without required insurance is an offence under Section 196. Beyond the legal minimum, own-damage cover helps with accidental damage, theft and natural perils subject to policy terms.",
      },
      {
        heading: "Comprehensive vs third-party",
        body: "Third-party covers liability for injury or property damage you cause to others. Comprehensive adds own-damage cover for your vehicle. TP base premiums for private cars are notified in IRDAI/MoRTH tables by engine cubic capacity; own-damage premiums vary by insurer, IDV, location, NCB and deductibles.",
      },
      {
        heading: "What we help with",
        body: "JivOra helps you compare plan structures, understand exclusions, prepare documents for cashless garage claims, and set renewal reminders. Indicative calculator estimates on this site are educational — final quotes come from insurers.",
      },
    ],
    quoteType: "motor-car",
    related: ["two-wheeler", "commercial-vehicle", "puc"],
  },
  {
    slug: "two-wheeler",
    title: "Two-Wheeler Insurance",
    category: "Motor",
    summary: "Bike and scooter cover with IRDAI-linked TP slabs by CC or EV kW, plus optional own-damage.",
    hero: "From daily commute scooters to performance bikes — understand TP slabs, IDV depreciation and when comprehensive still makes sense.",
    bullets: [
      "TP premiums mapped to CC / EV power slabs",
      "Guidance when TP-only may be enough for older bikes",
      "Battery and charger considerations for EVs",
      "Quick renewal assistance via WhatsApp",
    ],
    sections: [
      {
        heading: "TP slabs in simple terms",
        body: "Two-wheeler third-party premiums are fixed by notified slabs (for example ≤75cc, 76–150cc, 151–350cc, above 350cc for ICE; kW slabs for EVs). Crossing a slab boundary can change premium sharply even if displacement differs by only a few cc.",
      },
      {
        heading: "Comprehensive choices",
        body: "Own-damage becomes more relevant for newer, financed or higher-value bikes, and for EVs where battery replacement costs are significant. Add-ons such as zero depreciation can reduce deduction surprises at claim time.",
      },
    ],
    quoteType: "motor-bike",
    related: ["motor-car", "puc"],
  },
  {
    slug: "commercial-vehicle",
    title: "Commercial Vehicle Insurance",
    category: "Motor",
    summary: "Goods and passenger commercial vehicle liability and package covers aligned to usage and GVW.",
    hero: "Fleet or single CV — get structured help on mandatory liability, package policies and documents lenders expect.",
    bullets: [
      "Public and private carrier distinctions explained",
      "GVW-linked liability premium awareness",
      "Package policy and addon discussion",
      "Support for claim intimation coordination",
    ],
    sections: [
      {
        heading: "Commercial vs private use",
        body: "Commercial vehicles used for hire or reward fall under different third-party rate tables than private cars. Mis-declaring use can jeopardise claims — we help you describe usage accurately when approaching insurers.",
      },
    ],
    quoteType: "motor-cv",
    related: ["motor-car", "shop"],
  },
  {
    slug: "health",
    title: "Health Insurance",
    category: "Health",
    summary: "Individual mediclaim with cashless hospitalisation networks, restoration and rider options.",
    hero: "Choose sum insured, understand waiting periods, and avoid room-rent traps that shrink claim payouts.",
    bullets: [
      "Sum insured sizing for your city and family risk",
      "Waiting periods, PED and day-care clarity",
      "Cashless network and claim documentation help",
      "Top-up / super top-up layering ideas",
    ],
    sections: [
      {
        heading: "Buying checklist",
        body: "Look beyond premium: sub-limits, co-pay, restoration benefit, maternity (if needed), AYUSH cover, and how no-claim bonuses work. Compare claim settlement ratios published by IRDAI where relevant, and read exclusions carefully.",
      },
    ],
    quoteType: "health",
    related: ["family-floater", "senior-health"],
  },
  {
    slug: "family-floater",
    title: "Family Floater Health Plans",
    category: "Health",
    summary: "One sum insured shared across eligible family members — efficient for young families, with trade-offs to understand.",
    hero: "A floater can be cost-effective, but shared limits need sizing so one hospitalisation does not exhaust cover for everyone.",
    bullets: [
      "When floater beats multiple individual plans",
      "Age of eldest member pricing impact",
      "Restoration and multiple-claim scenarios",
      "Combining floater with a top-up",
    ],
    sections: [
      {
        heading: "Who a floater suits",
        body: "Floaters often suit parents with dependent children when ages are not far apart. If seniors are included, premiums rise with the eldest member’s age band — sometimes separate senior cover is clearer.",
      },
    ],
    quoteType: "health",
    related: ["health", "senior-health"],
  },
  {
    slug: "senior-health",
    title: "Senior Citizen Health Cover",
    category: "Health",
    summary: "Plans and checklists for parents and seniors, including medicals, co-pays and PED waiting.",
    hero: "Help parents get appropriate cover with eyes open on co-pays, room eligibility and pre-existing disease timelines.",
    bullets: [
      "Medical test expectations explained",
      "Co-pay and room-rent structures",
      "PED waiting and lifelong renewability",
      "Claim companionship guidance",
    ],
    sections: [
      {
        heading: "Practical tips",
        body: "Disclose health history fully. Budget for co-pays common in senior products. Keep prior policy and hospital records organised for portability or claims.",
      },
    ],
    quoteType: "health",
    related: ["health", "family-floater"],
  },
  {
    slug: "term-life",
    title: "Term Life Insurance",
    category: "Life",
    summary: "High pure-risk cover to protect income, loans and dependants — usually the foundation of a life portfolio.",
    hero: "Size cover with a clear income multiple, compare claim settlement quality, and keep nominees updated.",
    bullets: [
      "Cover sizing (income multiple) calculators",
      "Term vs return-of-premium trade-offs",
      "Critical illness and disability riders",
      "Tax notes at a high level (not tax advice)",
    ],
    sections: [
      {
        heading: "Why term first",
        body: "Term insurance focuses premiums on risk cover rather than savings. For most salaried families, adequate term cover plus separate investments is clearer than bundling everything into one opaque product.",
      },
    ],
    quoteType: "term",
    related: ["investment-life", "health"],
  },
  {
    slug: "investment-life",
    title: "Savings, Endowment & ULIP",
    category: "Life",
    summary: "Education on traditional savings plans and ULIPs — with honest talk about charges, lock-ins and suitability.",
    hero: "We explain structure and costs so you can decide whether a savings-oriented life plan fits after term cover is in place.",
    bullets: [
      "Endowment vs ULIP differences",
      "Charge and lock-in awareness",
      "Suitability over product pitching",
      "Alignment with goals and horizon",
    ],
    sections: [
      {
        heading: "Suitability first",
        body: "Investment-linked or participating life products are not short-term instruments. We walk through illustrations, charges and exit conditions so expectations match reality. Insurance remains subject to solicitation.",
      },
    ],
    quoteType: "general",
    related: ["term-life"],
  },
  {
    slug: "home",
    title: "Home Insurance",
    category: "General",
    summary: "Structure and contents cover for fire, allied perils, burglary and selected disaster risks.",
    hero: "Protect the building and belongings with sum insured methods that reflect rebuilding cost — not just market price shortcuts.",
    bullets: [
      "Structure vs contents clarification",
      "Jewellery and valuable item schedules",
      "Rent / alternate accommodation add-ons",
      "Claim documentation basics",
    ],
    sections: [
      {
        heading: "Sum insured pitfalls",
        body: "Under-insuring structure to save premium can trigger average clauses at claim time. We help estimate rebuilding cost discussions with insurers rather than relying only on circle-rate shortcuts.",
      },
    ],
    quoteType: "general",
    related: ["shop", "travel"],
  },
  {
    slug: "travel",
    title: "Travel Insurance",
    category: "General",
    summary: "Domestic and international trip cover for medical emergencies, delays and baggage — matched to destination.",
    hero: "Pick medical limits that fit the country you are visiting, and read adventure-sport exclusions before you go.",
    bullets: [
      "Single-trip and annual multi-trip options",
      "Schengen and high-medical-cost destinations",
      "Pre-existing condition clauses",
      "Claim process while abroad",
    ],
    sections: [
      {
        heading: "Before you fly",
        body: "Carry digital and printed policy copies, emergency numbers, and understand whether cashless medical networks apply. Declare known conditions as required by the proposal form.",
      },
    ],
    quoteType: "general",
    related: ["health", "home"],
  },
  {
    slug: "shop",
    title: "Shop & Business Insurance",
    category: "General",
    summary: "Shopkeeper packages, fire & burglary, and SME-oriented covers for Himmatnagar-area businesses and beyond.",
    hero: "Protect stock, interiors and liability exposures with package policies sized to your premises and turnover.",
    bullets: [
      "Shopkeeper package building blocks",
      "Stock declaration and peak season tips",
      "Public liability awareness",
      "Business interruption conversations",
    ],
    sections: [
      {
        heading: "Local business focus",
        body: "We help small shops and offices document assets, understand warranties (like burglar alarm or shutter conditions), and prepare claim inventories if the unexpected happens.",
      },
    ],
    quoteType: "general",
    related: ["home", "commercial-vehicle"],
  },
  {
    slug: "puc",
    title: "PUC Renewal Assistance",
    category: "Compliance",
    summary: "Reminders and guidance to keep Pollution Under Control certificates valid — separate from insurance, often checked together.",
    hero: "We remind you about PUC timelines and point you to authorised centres and the official Parivahan portal. We do not issue PUC certificates.",
    bullets: [
      "Validity norms explained (BS-IV/VI commonly annual)",
      "Authorised centre testing — not done by JivOra",
      "Link-out to official Parivahan status tools",
      "Combine with insurance renewal reminders",
    ],
    sections: [
      {
        heading: "Important boundaries",
        body: "JivOra is an insurance solutions partner. PUC certificates are issued only by authorised pollution testing centres. For registration or archive status of a vehicle, always use official RTO / Parivahan services — we will never impersonate government systems.",
      },
      {
        heading: "Practical reminder",
        body: "Keep a digital copy of your latest PUC with your RC and insurance. Set a calendar or use our renewal reminder tool so both insurance and PUC are reviewed before expiry.",
      },
    ],
    quoteType: "puc",
    related: ["motor-car", "two-wheeler"],
  },
];

export function getService(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}
