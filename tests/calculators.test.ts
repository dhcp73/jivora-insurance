import { describe, expect, it } from "vitest";
import {
  CAR_TP,
  BIKE_TP,
  daysUntil,
  estimateHealth,
  estimateMotor,
  estimateTerm,
  idvFromExShowroom,
  ncbDiscount,
  recommendHealthCover,
  recommendTermCover,
  withGst,
} from "../src/lib/calculators";

describe("motor TP tables", () => {
  it("has expected car bands", () => {
    expect(CAR_TP["1001-1500"]).toBe(3416);
    expect(BIKE_TP["76-150"]).toBe(714);
  });
});

describe("estimateMotor", () => {
  it("computes comprehensive total with NCB and GST", () => {
    const r = estimateMotor({
      product: "car",
      ccBand: "1001-1500",
      idv: 500000,
      odRatePercent: 2,
      claimFreeYears: 1,
      comprehensive: true,
      paCover: 320,
    });
    // OD gross 10000, NCB 20% => 8000; TP 3416; PA 320; subtotal 11736; gst 18%
    expect(r.tp).toBe(3416);
    expect(r.odGross).toBe(10000);
    expect(r.ncbPercent).toBe(20);
    expect(r.odNet).toBe(8000);
    expect(r.subtotal).toBe(3416 + 8000 + 320);
    expect(r.total).toBe(withGst(r.subtotal).total);
    expect(r.disclaimer).toMatch(/Indicative/);
  });

  it("rejects unknown band", () => {
    expect(() =>
      estimateMotor({
        product: "car",
        ccBand: "nope",
        idv: 1,
        odRatePercent: 1,
        claimFreeYears: 0,
      }),
    ).toThrow(/Unknown/);
  });
});

describe("idv / ncb / health / term", () => {
  it("idv depreciation year 2", () => {
    const r = idvFromExShowroom(100000, 1.5);
    expect(r.depreciationRate).toBe(0.2);
    expect(r.idv).toBe(80000);
  });

  it("ncb ladder", () => {
    expect(ncbDiscount(0)).toBe(0);
    expect(ncbDiscount(5)).toBe(0.5);
  });

  it("health estimate positive", () => {
    const r = estimateHealth({ age: 40, members: 3, sumInsured: 1000000, cityTier: 2 });
    expect(r.total).toBeGreaterThan(1000);
  });

  it("term estimate", () => {
    const r = estimateTerm({ age: 30, cover: 10000000, termYears: 20, smoker: false });
    expect(r.monthly).toBeGreaterThan(0);
  });

  it("recommenders", () => {
    expect(recommendTermCover(500000, 0).recommended).toBe(7500000);
    expect(recommendHealthCover({ members: 2, metro: true }).recommended).toBe(1500000);
  });

  it("daysUntil", () => {
    const d = daysUntil("2099-01-01", new Date("2026-01-01T00:00:00Z"));
    expect(d).toBeGreaterThan(365 * 70);
  });
});
