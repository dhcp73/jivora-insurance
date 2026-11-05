
export interface ComparisonColumn {
  key: string;
  label: string;
}

export interface ComparisonRow {
  feature: string;
  values: Record<string, string>;
}

export interface ComparisonTable {
  id: string;
  title: string;
  subtitle: string;
  illustrative: boolean;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}

export const comparisons: ComparisonTable[] = [
  {
    id: "comp-vs-tp",
    title: "Comprehensive vs Third-Party (Private Car)",
    subtitle: "Structural comparison of cover types — not a price quote.",
    illustrative: true,
    columns: [
      { key: "feature", label: "Feature" },
      { key: "tp", label: "Third-Party" },
      { key: "comp", label: "Comprehensive" },
    ],
    rows: [
      { feature: "Legal minimum (MV Act)", values: { tp: "Yes", comp: "Includes TP" } },
      { feature: "Damage to your own car", values: { tp: "Not covered", comp: "Covered (OD terms)" } },
      { feature: "Theft / total loss of your car", values: { tp: "Not covered", comp: "Subject to IDV & terms" } },
      { feature: "Third-party injury / property", values: { tp: "Covered", comp: "Covered" } },
      { feature: "NCB applies to", values: { tp: "N/A on TP premium", comp: "Usually OD portion" } },
      { feature: "Typical add-ons", values: { tp: "Limited", comp: "Zero dep, RSA, engine protect…" } },
    ],
  },
  {
    id: "term-vs-endowment",
    title: "Term vs Endowment (Life)",
    subtitle: "Educational comparison of product families.",
    illustrative: true,
    columns: [
      { key: "feature", label: "Feature" },
      { key: "term", label: "Pure Term" },
      { key: "endow", label: "Endowment / Traditional Savings" },
    ],
    rows: [
      { feature: "Primary purpose", values: { term: "Risk cover", endow: "Savings + some cover" } },
      { feature: "Cover per premium rupee", values: { term: "Typically high", endow: "Typically lower" } },
      { feature: "Maturity benefit", values: { term: "Usually none", endow: "Yes (product-specific)" } },
      { feature: "Complexity", values: { term: "Lower", endow: "Bonus illustrations" } },
      { feature: "Best discussed after", values: { term: "Need analysis", endow: "Term gap filled" } },
    ],
  },
  {
    id: "insurer-features",
    title: "Illustrative Insurer Feature Grid (Motor)",
    subtitle: "Sample feature presence for education — not live quotes or rankings. Confirm with each insurer.",
    illustrative: true,
    columns: [
      { key: "feature", label: "Feature" },
      { key: "a", label: "Insurer A*" },
      { key: "b", label: "Insurer B*" },
      { key: "c", label: "Insurer C*" },
    ],
    rows: [
      { feature: "Cashless garage network", values: { a: "Wide", b: "Wide", c: "Growing" } },
      { feature: "Zero-dep add-on", values: { a: "Yes", b: "Yes", c: "Yes" } },
      { feature: "App-based intimation", values: { a: "Yes", b: "Yes", c: "Yes" } },
      { feature: "Engine protect add-on", values: { a: "Yes", b: "Optional", c: "Yes" } },
      { feature: "Typical inspection on break-in", values: { a: "Often", b: "Often", c: "Often" } },
    ],
  },
  {
    id: "health-plan-types",
    title: "Health Plan Types at a Glance",
    subtitle: "Individual, floater, senior and top-up roles.",
    illustrative: true,
    columns: [
      { key: "feature", label: "Aspect" },
      { key: "ind", label: "Individual" },
      { key: "float", label: "Family Floater" },
      { key: "senior", label: "Senior" },
      { key: "topup", label: "Top-up / Super Top-up" },
    ],
    rows: [
      { feature: "Sum insured", values: { ind: "Per person", float: "Shared", senior: "Per person / floater variants", topup: "Above threshold" } },
      { feature: "Premium driver", values: { ind: "Each age", float: "Eldest age", senior: "Age + co-pay", topup: "SI + deductible" } },
      { feature: "Best for", values: { ind: "Different risk profiles", float: "Young families", senior: "Parents 60+", topup: "Boosting base cover" } },
    ],
  },
];
