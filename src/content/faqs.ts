
export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: "faq_tp_mandatory",
    category: "Motor",
    question: "Is third-party motor insurance mandatory in India?",
    answer:
      "Yes. Section 146 of the Motor Vehicles Act, 1988 requires a policy complying with the Act when a motor vehicle is used in a public place. Contraventions are addressed under Section 196. Always verify the latest penalty schedule from official sources.",
  },
  {
    id: "faq_indicative",
    category: "Quotes",
    question: "Are premiums on this website final quotes?",
    answer:
      "No. Calculators provide indicative educational estimates. Binding premiums are issued by IRDAI-registered insurers after proposal details, underwriting and product selection.",
  },
  {
    id: "faq_irdai",
    category: "About",
    question: "What is JivOra’s IRDAI registration number?",
    answer:
      "The registration number will be published here once confirmed: [IRDAI registration number to be added]. Ask us on WhatsApp for the latest appointment details before purchasing.",
  },
  {
    id: "faq_puc",
    category: "PUC",
    question: "Can JivOra issue a PUC certificate?",
    answer:
      "No. PUC certificates are issued only by authorised pollution testing centres. We can remind you before expiry and point you to official Parivahan resources.",
  },
  {
    id: "faq_ncb_transfer",
    category: "Motor",
    question: "Can I transfer NCB to a new insurer?",
    answer:
      "Usually yes, if you provide proof of entitlement from the previous insurer and meet product rules. Start the process before the prior policy expires.",
  },
  {
    id: "faq_health_waiting",
    category: "Health",
    question: "What is a waiting period in health insurance?",
    answer:
      "It is the time after policy start during which certain illnesses or pre-existing conditions are not covered. Lengths vary by product — read the prospectus carefully.",
  },
  {
    id: "faq_claim_help",
    category: "Claims",
    question: "Do you settle claims?",
    answer:
      "Insurers settle claims under policy terms. JivOra can help you intimate correctly, organise documents and follow up — we do not guarantee outcomes.",
  },
  {
    id: "faq_data",
    category: "Privacy",
    question: "How is my data used?",
    answer:
      "Contact, quote and account data are used to respond to your requests and operate reminders. See the Privacy Policy for details. Do not upload unnecessary sensitive documents.",
  },
  {
    id: "faq_languages",
    category: "About",
    question: "Do you support Gujarati-speaking customers?",
    answer:
      "Yes — many local customers prefer Gujarati on calls/WhatsApp even though this website is published in English for clarity and accessibility.",
  },
  {
    id: "faq_parivahan",
    category: "Compliance",
    question: "Can I check if my vehicle is in ‘permanent archive’ on this site?",
    answer:
      "No. Use the official Parivahan / state transport portals only. We deliberately do not recreate government vehicle databases.",
  },
];
