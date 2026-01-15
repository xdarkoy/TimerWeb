import { describe, expect, it } from "vitest";
import { PRICING_PLANS, getPlanById, getPlanPrice } from "./products";

describe("Stripe Products", () => {
  it("should have three plans defined", () => {
    expect(PRICING_PLANS).toHaveLength(3);
  });

  it("should have valid pricing for starter plan", () => {
    const starter = getPlanById('starter');
    expect(starter).toBeDefined();
    expect(starter?.priceMonthly).toBe(900);
    expect(starter?.priceYearly).toBe(9000);
  });

  it("should have valid pricing for professional plan", () => {
    const professional = getPlanById('professional');
    expect(professional).toBeDefined();
    expect(professional?.priceMonthly).toBe(2900);
    expect(professional?.priceYearly).toBe(29000);
  });

  it("should have valid pricing for enterprise plan", () => {
    const enterprise = getPlanById('enterprise');
    expect(enterprise).toBeDefined();
    expect(enterprise?.priceMonthly).toBe(9900);
    expect(enterprise?.priceYearly).toBe(99000);
  });

  it("should have multilingual names for all plans", () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.name.de).toBeDefined();
      expect(plan.name.en).toBeDefined();
      expect(plan.name.hr).toBeDefined();
    }
  });

  it("should have multilingual descriptions for all plans", () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.description.de).toBeDefined();
      expect(plan.description.en).toBeDefined();
      expect(plan.description.hr).toBeDefined();
    }
  });

  it("should have multilingual features for all plans", () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.features.de.length).toBeGreaterThan(0);
      expect(plan.features.en.length).toBeGreaterThan(0);
      expect(plan.features.hr.length).toBeGreaterThan(0);
    }
  });

  it("should mark professional plan as popular", () => {
    const professional = getPlanById('professional');
    const starter = getPlanById('starter');
    const enterprise = getPlanById('enterprise');
    
    expect(professional?.popular).toBe(true);
    expect(starter?.popular).toBeFalsy();
    expect(enterprise?.popular).toBeFalsy();
  });

  it("should return correct price with getPlanPrice", () => {
    expect(getPlanPrice('starter', 'monthly')).toBe(900);
    expect(getPlanPrice('starter', 'yearly')).toBe(9000);
    expect(getPlanPrice('professional', 'monthly')).toBe(2900);
    expect(getPlanPrice('professional', 'yearly')).toBe(29000);
    expect(getPlanPrice('nonexistent', 'monthly')).toBe(0);
  });
});
