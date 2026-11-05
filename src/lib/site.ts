export const site = {
  name: "JivOra Insurance Solutions",
  shortName: "JivOra",
  tagline: "One Partner • Every Protection",
  description:
    "Independent insurance guidance for motor, health, life and general cover — serving families and businesses in Gujarat with clear advice, renewal reminders and claim assistance.",
  phone: "8460327686",
  phoneDisplay: "+91 84603 27686",
  whatsapp: "918460327686",
  email: "jivora.insurance.solutions@gmail.com",
  region: "Sabarkantha / Himmatnagar, Gujarat (GJ09)",
  addressPlaceholder: "[Office address to be confirmed — serving Sabarkantha / Himmatnagar, Gujarat]",
  irdaiPlaceholder: "[IRDAI registration number to be added]",
  url: process.env.SITE_URL || "http://localhost:3200",
  instagramHint: "dhavalshah60",
  parivahanUrl: "https://parivahan.gov.in",
  legalDisclaimer:
    "Insurance is the subject matter of solicitation. JivOra Insurance Solutions assists customers in understanding and obtaining insurance products underwritten by IRDAI-registered insurers. Premiums shown on this website are indicative estimates, not binding quotations.",
} as const;

export const nav = {
  main: [
    { href: "/services", label: "Services" },
    { href: "/compare", label: "Compare" },
    { href: "/tools", label: "Tools" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/motor-car", label: "Car Insurance", group: "Motor" },
    { href: "/services/two-wheeler", label: "Two-Wheeler", group: "Motor" },
    { href: "/services/commercial-vehicle", label: "Commercial Vehicle", group: "Motor" },
    { href: "/services/health", label: "Health Insurance", group: "Health" },
    { href: "/services/family-floater", label: "Family Floater", group: "Health" },
    { href: "/services/senior-health", label: "Senior Citizen Health", group: "Health" },
    { href: "/services/term-life", label: "Term Life", group: "Life" },
    { href: "/services/investment-life", label: "Savings & ULIP", group: "Life" },
    { href: "/services/home", label: "Home Insurance", group: "General" },
    { href: "/services/travel", label: "Travel Insurance", group: "General" },
    { href: "/services/shop", label: "Shop & Business", group: "General" },
    { href: "/services/puc", label: "PUC Assistance", group: "Compliance" },
  ],
  tools: [
    { href: "/tools/premium-calculator", label: "Premium Calculator" },
    { href: "/tools/idv-calculator", label: "IDV Calculator" },
    { href: "/tools/ncb-calculator", label: "NCB Calculator" },
    { href: "/tools/health-cover", label: "Health Cover Calculator" },
    { href: "/tools/term-cover", label: "Term Cover Calculator" },
    { href: "/tools/renewal-reminder", label: "Renewal Reminder" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Use" },
    { href: "/legal/disclaimer", label: "Disclaimer" },
    { href: "/legal/grievance", label: "Grievance Redressal" },
    { href: "/legal/refund", label: "Refund & Cancellation" },
  ],
} as const;
