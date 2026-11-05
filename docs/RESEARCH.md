# JivOra Insurance Solutions — Research Brief

**Research date:** 5 November 2026 (Europe/London)  
**Purpose:** Ground the website in verified industry facts; avoid inventing company claims.

---

## 1. Company research — JivOra Insurance Solutions

### What we know (from the provided Instagram ad only)

| Field | Value | Source |
|---|---|---|
| Brand name | JivOra Insurance Solutions | Instagram Story ad |
| Tagline | "One Partner • Every Protection." | Ad |
| Lines of business | Motor, Health, Life, General | Ad icons |
| Phone / WhatsApp | 8460327686 (+91) | Ad footer |
| Email | jivora.insurance.solutions@gmail.com | Ad footer |
| Implied geography | Vehicle sample **GJ09** (RTO code for Sabarkantha / Himmatnagar, Gujarat) | Ad sample registration |
| Instagram poster | `@dhavalshah60` | Story UI |
| Theme of ad | Insurance & PUC renewal reminders | Ad headline (Gujarati + English) |

### What we could **not** verify (do not invent)

Web searches for “JivOra Insurance Solutions”, the email, the phone number, and Himmatnagar/Sabarkantha listings returned **no matching public business profile**, IRDAI licence page, Google Business listing, or website under this exact name.

Near-misses (different businesses — **not** JivOra):
- **Jivani Insurance Solution** (Porbandar, Gujarat) — different name and phone (+91 86909 92886).
- **Jivant Insurance** (Ahmedabad) — different brand, IRDAI/AMFI-oriented mediclaim practice.
- Multiple HDFC ERGO / other agents listed in Himmatnagar — none named JivOra.

**Placeholders for the site (must stay marked until the owner supplies proof):**
- IRDAI registration / broker or agent licence number: `[to be added]`
- Legal entity / GSTIN / CIN: `[to be added]`
- Physical office address: `[to be confirmed — serving Sabarkantha / Himmatnagar, Gujarat]`
- Founding year, team bios, claim statistics, customer counts, insurer partnership badges: **omit or mark illustrative**

### Content rule (enforced in product copy)

The Instagram ad includes a red-bordered “Permanent Archive … MoRTH” style notice. We treat that as **marketing copy that resembles an official notice**. The website must **not** reproduce it or imply that JivOra speaks for MoRTH, RTO, Vahan, or Parivahan. Use honest, factual reminders only (e.g. Motor Vehicles Act obligations). For live vehicle status, link out to the official Parivahan portal.

---

## 2. Indian insurance industry snapshot

### Market scale

- India is roughly the **10th largest** insurance market by nominal premium (Swiss Re / PIB summary for FY 2024–25).
- FY 2024–25: ~**₹11.93 lakh crore** total premiums; ~41.84 crore policies; claims ~₹8.36 lakh crore; AUM ~₹74.44 lakh crore (31 Mar 2025). Penetration ~**3.7%** (life 2.7%, non-life 1%); density ~USD 97.  
  Source: [PIB Press Release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2254950)
- FY 2025–26 (to Jan 2026): industry premiums ~**₹10.51 lakh crore**, ~11.45% YoY; life ~₹7.67 lakh crore; general ~₹2.83 lakh crore; health ~14.41% growth (GST relief cited).  
  Source: [TaxGuru / IRDAI 134th meeting summary](https://taxguru.in/corporate-law/irdai-reviews-insurance-sector-growth-approves-drafting-new-regulations-sbsr-act-2025.html)
- Non-life FY26 ~**₹3.36 trillion**, ~9.3% growth; standalone health insurers faster (~19.4%).  
  Sources: [Asia Insurance Post](https://asiainsurancepost.com/archives/78794), [Business Standard](https://www.business-standard.com/finance/insurance/non-life-insurers-log-9-3-premium-growth-in-fy26-amid-gst-relief-126040901105_1.html)

### Digital / intermediary landscape (UX takeaways)

| Player | Model | UX / feature notes for our build |
|---|---|---|
| **Policybazaar** | Multi-insurer aggregator | Quote → compare → buy/renew; heavy SEO content; reminders |
| **InsuranceDekho** | Aggregator + assisted | Fast issuance narrative; solicitation process pages |
| **Acko** | Digital insurer (own products) | Single-brand, instant issue, in-app claims — not multi-compare |
| **Go Digit** | Digital general insurer | Clean product UX, motor/health focus |
| **Turtlemint** | Advisor + POSP network | Advisor-assisted compare, claims help, policy tracking |
| **RenewBuy / Coverfox / Ditto / PhonePe Insurance** | Broker / embedded | Compare + advisory or app-embedded |

**Implications for JivOra (local agency site):** lead with trust + local WhatsApp, clear product education, transparent **indicative** calculators, compare educational tables (not live insurer APIs unless licensed/connected), renewal reminders, document checklists, and compliance disclosures — not a fake “instant buy from 40 insurers” claim without brokerage infrastructure.

Sources: [Mordor — Online Insurance India](https://www.mordorintelligence.com/industry-reports/online-insurance-market-in-india), player sites (Policybazaar, InsuranceDekho, Acko).

### Major insurers (illustrative roster for comparisons)

**General / motor / health (multiline):** New India Assurance, ICICI Lombard, Bajaj General / Bajaj Allianz, HDFC ERGO, Tata AIG, Reliance General, SBI General, United India, Oriental, National Insurance, Go Digit, Acko.  
**Standalone health:** Star Health, Niva Bupa, Care Health, and peers.  
**Life:** LIC, SBI Life, HDFC Life, ICICI Prudential, Max Life, Kotak Life, Aditya Birla Sun Life.

*(Partnership logos on the site are illustrative until JivOra confirms appointments.)*

---

## 3. Product taxonomy (site IA)

### Motor
- **Third-party (TP)** — mandatory under MV Act; IRDAI/MoRTH fixed base rates by CC / GVW / kW.
- **Own-damage (OD)** — vehicle damage/theft; rate ≈ IDV × OD rate (varies by insurer, zone, NCB, deductibles).
- **Comprehensive** — TP + OD (+ usually PA cover).
- **Add-ons:** zero depreciation, engine protect, consumables, roadside assistance, return to invoice, key protect, etc.
- **NCB (No Claim Bonus):** discount on OD for claim-free years (commonly up to 50% after 5 years — exact grids vary by insurer; site labels illustrative).
- **IDV:** Insured Declared Value; IRDAI depreciation schedule by vehicle age.
- Segments: private car, two-wheeler, commercial vehicle (goods / passenger).

### Health
- Individual, family floater, senior citizen, top-up / super top-up, critical illness, personal accident.
- Key buying factors: sum insured, waiting periods, room rent, PED waiting, restoration, cashless network, claim settlement ratio (use public IRDAI data only when citing).

### Life
- Term (pure risk), endowment / traditional savings, ULIP, whole life, annuity — site educates; sales subject to solicitation rules.

### General / others
- Home, travel, shopkeepers / SME, commercial property, marine (info-level).

### PUC (Pollution Under Control)
- Separate from insurance but often co-reminded for vehicle compliance.
- Validity commonly **1 year for BS-IV/BS-VI**; older norms often **6 months** (confirm at authorised centre).
- Obtain / renew at authorised PUC centres; status via Parivahan / state portals — **do not scrape or impersonate**.  
  Sources: [PIB on standardised PUCC](https://pib.gov.in/Pressreleaseshare.aspx?PRID=1737647), [CPCB FAQ](https://cpcb.nic.in/faq.php), insurer explainers.

---

## 4. Motor TP premium anchors (for calculators)

Rates commonly cited for private cars / two-wheelers under MoRTH / IRDAI TP base premium tables (GSR 354(E) 28.03.2024 lineage; **GST extra**; always label site outputs as indicative):

**Private cars (annual TP):** ≤1000 cc ₹2,094; 1001–1500 cc ₹3,416; >1500 cc ₹7,897.  
**Two-wheelers:** ≤75 cc ₹538; 76–150 cc ₹714; 151–350 cc ₹1,366; >350 cc ₹2,804.  
**EV two-wheelers (kW slabs, ~15% discount vs ICE equivalents in published tables):** ≤3 kW ₹457; 3–7 kW ₹607; 7–16 kW ₹1,161; >16 kW ₹2,383.

Sources: [HonestMoney rate table summary](https://honestmoney.in/motor-insurance/two-wheeler-insurance-premium-by-cc-complete-rate-table), [Bajaj General blog rate table](https://www.bajajgeneralinsurance.com/blog/motor-insurance-articles/motor-insurance-premium-rates.html), [eCourts / rules text excerpt](https://indiacode.ecourtsindia.com/rules/eec22d5c/).

Commercial vehicle TP uses GVW / passenger tables — site uses simplified illustrative bands and discloses that.

**OD formula used on site (indicative):** `OD ≈ IDV × odRate` then apply NCB %; add TP + PA + GST (18% on premium components as typically applicable — note GST on health may differ after exemptions; label clearly).

---

## 5. Legal & compliance facts used in copy

### Mandatory motor insurance
- **Section 146**, Motor Vehicles Act, 1988 — vehicle in a public place must be covered by a policy complying with Chapter XI.  
- **Section 196** — driving / causing / allowing drive in contravention of s.146 is an offence. Penalty text has been amended over time (2019 amendments; further Jan Vishwas 2026 rewrite reported by secondary sources). Site states the obligation factually and advises checking the current notified penalty schedule — **without scare copy**.  
  Sources: [LawSathi s.196](https://research.lawsathi.in/acts/motor-vehicles-act-1988/section-196/), [LawMaker s.196](https://www.lawmaker.in/bare-acts/motor-vehicles-act-1988/section-196), [Indian Kanoon s.196](https://indiankanoon.org/doc/125316407/).

### Intermediary / disclosure
- Insurance is the **subject matter of solicitation**.
- Brokers / agents / POSPs must follow IRDAI regulations (registration, disclosures, mis-selling rules). From ~Jan 2027, seller tagging on proposals/policies is being tightened in industry reporting.  
  Sources: [IRDAI Brokers Regulations 2018 PDF](https://www.financialservices.gov.in/beta/sites/default/files/2024-11/IRDAI%20%28Insurance%20Brokers%29%20Regulations%202018.pdf), [Business Standard intermediary rules](https://www.business-standard.com/finance/insurance/irdai-tightens-intermediary-rules-eases-insurers-investment-norms-126073101478_1.html).
- Site includes: Privacy, Terms, Disclaimer, Grievance, Refund pages; IRDAI licence placeholder; “we are an intermediary / advisor — policies are underwritten by insurers”.

### Official vehicle status
- Link only: [https://parivahan.gov.in](https://parivahan.gov.in) (and state RTO tools). No fake “check GJ09 status here” scraping.

---

## 6. Competitive feature checklist (mapped to our build)

| Need | Policybazaar-class | JivOra site |
|---|---|---|
| Quotes | Live multi-insurer | Indicative calculators + lead capture to WhatsApp/email |
| Compare | Live plans | Educational comparison tables (labelled illustrative) |
| Renew | Online + reminders | Reminder checker + email schedule + policy vault |
| Claims | Insurer portals | Claim help guides + assistance request form |
| Trust | Brand + ratings | Local WhatsApp, transparent disclosures, knowledge centre |
| PUC | Rarely primary | Dedicated assistance page + Parivahan link + reminder tool |

---

## 7. Brand & UX direction

- Colours from ad: **deep navy**, **warm orange**, white; accents light blue / green check.
- Tone: calm, professional, Gujarati-market aware but site language **English** (as requested).
- Avoid urgency red “Permanent Archive / MoRTH” patterns.
- Enterprise-clean minimal UI: Inter/Geist, generous whitespace, clear CTAs to WhatsApp `wa.me/918460327686`.

---

## 8. Open items for the business owner

1. Confirm IRDAI / POSP / broker registration number and exact legal name.  
2. Confirm office address, hours, and languages served.  
3. Confirm which insurers they are appointed with (for accurate partnership display).  
4. Replace demo SMTP with production email.  
5. Decide whether live insurer quote APIs will be integrated later.

---

*This document cites public secondary sources. Premium tables and penalty amounts change by notification — calculators must remain labelled indicative and should be re-verified against the latest MoRTH/IRDAI gazette before marketing as exact quotes.*
