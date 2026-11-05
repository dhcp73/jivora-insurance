
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "how-ncb-works",
    title: "How No Claim Bonus (NCB) Works on Motor Insurance",
    excerpt: "NCB reduces your own-damage premium after claim-free years. Here is the usual ladder, what resets it, and how to protect it when switching insurers.",
    category: "Motor",
    date: "2026-09-12",
    readMinutes: 6,
    body: [
      "No Claim Bonus is a discount on the own-damage (OD) portion of a comprehensive motor policy when you make no own-damage claims during the policy year. Third-party premium is generally unaffected by NCB.",
      "Insurers commonly follow a ladder such as 20% after one claim-free year, rising in steps to around 50% after five years. Exact grids and eligibility are set in each insurer’s prospectus — treat public examples as illustrative.",
      "An OD claim typically reduces or resets NCB at renewal. Some products offer NCB protection add-ons that preserve discount after a limited number of claims, usually for an extra premium.",
      "When you change insurers, you can often transfer NCB with proof (prior policy and NCB confirmation). Keep documents handy before your current policy expires.",
      "NCB does not mean you should avoid legitimate claims — it is one input into whether a small repair is worth filing. Ask an advisor to run both scenarios.",
    ],
  },
  {
    slug: "puc-rules-explained",
    title: "PUC Certificates Explained: Validity, Testing and Official Checks",
    excerpt: "Pollution Under Control certificates are separate from insurance. Know typical validity, where to test, and how to verify status on official portals.",
    category: "Compliance",
    date: "2026-09-18",
    readMinutes: 5,
    body: [
      "A Pollution Under Control (PUC/PUCC) certificate records that a vehicle’s emissions were within prescribed limits at an authorised testing centre.",
      "Validity is commonly one year for BS-IV and BS-VI vehicles; older emission norms often require renewal every six months. Always confirm the date printed on your certificate.",
      "JivOra does not operate PUC centres. Visit an authorised testing station, keep the receipt, and store a digital copy with your RC and insurance papers.",
      "To check vehicle-related status, use the official Parivahan portal and your state transport resources. Beware of messages that look like government “archive” notices but arrive via informal social ads.",
      "Pair PUC and insurance reminders on the same calendar so roadside compliance checks are less stressful.",
    ],
  },
  {
    slug: "motor-claim-process",
    title: "Motor Insurance Claim Process: A Calm Step-by-Step Guide",
    excerpt: "From intimation to survey and settlement — what to do after an accident, which documents matter, and how cashless garages fit in.",
    category: "Motor",
    date: "2026-09-25",
    readMinutes: 7,
    body: [
      "Safety first: move to a safe place if possible, help the injured, and call emergency services when needed. Photographs of the scene, number plates and damage help later.",
      "Intimate the insurer as soon as practical via their app, helpline or broker/agent channel. Delays can complicate surveys.",
      "For cashless claims, use a network garage where available. For reimbursement claims, retain original invoices and payment proofs.",
      "Typical documents include claim form, RC, policy copy, driving licence, FIR for theft or third-party injury cases, and repair estimates.",
      "JivOra can help you organise paperwork and follow up with insurer desks — the insurer remains the claim decision-maker under policy terms.",
    ],
  },
  {
    slug: "choosing-health-cover",
    title: "Choosing Health Cover: Sum Insured, Waiting Periods and Fine Print",
    excerpt: "Premium is only one line. Room rent, co-pay, PED waiting and restoration benefits often decide whether a policy feels fair at claim time.",
    category: "Health",
    date: "2026-10-02",
    readMinutes: 8,
    body: [
      "Size sum insured for your city’s hospital costs and family size. Metros often need higher covers; top-ups can extend protection efficiently after a base plan.",
      "Read waiting periods for specific illnesses and pre-existing diseases. Portability rules may help carry waiting period credit when switching.",
      "Watch room-rent ceilings and proportionate deduction clauses — they can silently cut claim amounts.",
      "Check restoration benefits, daycare lists, AYUSH cover and maternity terms if relevant to your stage of life.",
      "Use IRDAI disclosures and insurer prospectus PDFs; treat marketing banners as secondary to policy wordings.",
    ],
  },
  {
    slug: "comprehensive-vs-third-party",
    title: "Comprehensive vs Third-Party Motor Cover",
    excerpt: "TP is mandatory; comprehensive adds own-damage. Use a simple framework to decide when OD cover still earns its premium.",
    category: "Motor",
    date: "2026-10-08",
    readMinutes: 5,
    body: [
      "Third-party liability insurance meets the Motor Vehicles Act requirement for use in public places. It does not pay to repair your own vehicle.",
      "Comprehensive policies combine TP with OD (and usually owner-driver personal accident cover subject to product rules).",
      "OD value declines with IDV depreciation. For very old, low-IDV vehicles, some owners consciously choose TP-only — understanding they self-insure own repairs.",
      "Financed vehicles typically require comprehensive cover until the loan ends.",
      "Run both quotes annually; do not assume last year’s choice still fits after a major IDV drop or a move between cities.",
    ],
  },
  {
    slug: "term-vs-endowment",
    title: "Term Insurance vs Endowment: Separating Protection and Savings",
    excerpt: "Term maximises cover per rupee of premium. Endowment blends savings with lower pure-risk cover — understand the trade-off before you buy.",
    category: "Life",
    date: "2026-10-14",
    readMinutes: 6,
    body: [
      "Term plans pay a lump sum on death (and sometimes terminal illness) during the term. There is usually no maturity benefit on pure term products.",
      "Endowment and money-back plans return value on survival but typically offer less life cover for the same premium outlay.",
      "A common planning approach is: buy adequate term cover first, invest surplus separately in instruments you understand.",
      "Illustrations are not guarantees. Participating products depend on bonuses; ULIPs depend on fund performance net of charges.",
      "Insurance is the subject matter of solicitation — suitability depends on your goals, horizon and risk capacity.",
    ],
  },
  {
    slug: "idv-explained",
    title: "What Is IDV and How Depreciation Changes Your Motor Premium",
    excerpt: "Insured Declared Value is the basis for OD premium and total-loss payouts. See the standard age-based depreciation bands.",
    category: "Motor",
    date: "2026-10-20",
    readMinutes: 5,
    body: [
      "IDV approximates the insurer’s current insured value for the vehicle, usually derived from manufacturer’s listed price minus depreciation for age, adjusted for accessories as declared.",
      "IRDAI-linked depreciation schedules commonly move from 5% in the first six months to about 50% by year four–five, with negotiation thereafter.",
      "Higher IDV means higher OD premium and potentially higher total-loss payout — but IDV cannot be arbitrarily inflated beyond insurer norms.",
      "Under-declaring IDV to chase a cheaper premium can hurt at claim time.",
      "Use our IDV calculator for an educational estimate, then confirm with insurer quotes.",
    ],
  },
  {
    slug: "documents-checklist-motor",
    title: "Motor Insurance Documents Checklist (Buy, Renew, Claim)",
    excerpt: "A practical list for proposal, renewal and claim stages — RC, previous policy, NCB proof, KYC and more.",
    category: "Guides",
    date: "2026-10-26",
    readMinutes: 4,
    body: [
      "Purchase / renewal: registration certificate (RC), previous policy copy, NCB confirmation if switching, vehicle photos if requested, KYC as required.",
      "Inspection: some break-in renewals or ownership transfers need inspection — schedule it before expecting OD cover to attach.",
      "Claim: claim form, DL of the driver, FIR where mandated, repair estimates, invoices, discharge documents for cashless cases.",
      "Keep digital scans in a secure folder and upload copies to your JivOra customer vault for easy retrieval.",
      "Never share OTPs or full card details with anyone claiming to be from an insurer or RTO over WhatsApp.",
    ],
  },
  {
    slug: "family-floater-tips",
    title: "Family Floater Health Plans: Pros, Cons and Sizing Tips",
    excerpt: "Shared covers can be efficient — until one large claim uses the pool. Here’s how to size and when to split plans.",
    category: "Health",
    date: "2026-11-01",
    readMinutes: 6,
    body: [
      "A family floater shares one sum insured across listed members. Premium often keys off the eldest member’s age.",
      "Pros: simpler administration and potentially lower cost than multiple individual plans for young families.",
      "Cons: a major hospitalisation can consume the pool; seniors in the same floater can make premiums steep.",
      "Mitigations include higher base SI, restoration benefits, and a super top-up sitting above the floater.",
      "Review the floater every year as parents age or children become financially independent.",
    ],
  },
  {
    slug: "renewal-calendar",
    title: "Build a Simple Insurance & PUC Renewal Calendar",
    excerpt: "Lapsed motor cover is a legal problem; lapsed health cover can restart waiting periods. A lightweight reminder system prevents both.",
    category: "Guides",
    date: "2026-11-03",
    readMinutes: 4,
    body: [
      "List every policy and PUC with insurer, number, and expiry date. Include nominee names for life covers.",
      "Set reminders at 45, 30 and 7 days before expiry — our renewal tool can email you if you prefer.",
      "For motor, align PUC checks with insurance renewal month so you review both documents together.",
      "Store PDFs in your dashboard vault; share access only with trusted family members.",
      "If you receive alarming “permanent archive” style messages on social media, verify on official Parivahan/RTO channels before panicking — and renew on facts, not fear.",
    ],
  },
  {
    slug: "gujarat-motor-basics",
    title: "Motor Insurance Basics for Gujarat Vehicle Owners (GJ Series)",
    excerpt: "GJ09 points to Sabarkantha / Himmatnagar RTO jurisdiction. Here’s what local vehicle owners should keep handy.",
    category: "Motor",
    date: "2026-11-04",
    readMinutes: 5,
    body: [
      "Indian registration marks encode state and RTO. GJ is Gujarat; GJ09 is associated with Sabarkantha (Himmatnagar) jurisdiction in public RTO code lists.",
      "Carry digital RC, insurance and PUC when riding. Many checks accept DigiLocker / mParivahan documents — confirm current acceptance rules locally.",
      "Choose insurers with accessible cashless garages on corridors you actually drive (Himmatnagar–Ahmedabad, local highways).",
      "JivOra assists with explanations and renewals; policy contracts remain with the insurer.",
      "For official vehicle status always use parivahan.gov.in rather than third-party lookalikes.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
