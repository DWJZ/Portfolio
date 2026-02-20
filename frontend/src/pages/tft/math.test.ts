import { describe, it, expect } from "vitest";
import { binom, expectedRefreshes, probReachWithinRefreshes } from "./math";

describe("binom", () => {
  it("returns C(n,k) for valid inputs", () => {
    expect(binom(5, 0)).toBe(1);
    expect(binom(5, 1)).toBe(5);
    expect(binom(5, 2)).toBe(10);
    expect(binom(5, 3)).toBe(10);
    expect(binom(5, 4)).toBe(5);
    expect(binom(5, 5)).toBe(1);
  });

  it("returns C(10,3) = 120", () => {
    expect(binom(10, 3)).toBe(120);
  });

  it("returns 0 when k < 0", () => {
    expect(binom(5, -1)).toBe(0);
  });

  it("returns 0 when k > n", () => {
    expect(binom(5, 6)).toBe(0);
    expect(binom(3, 5)).toBe(0);
  });

  it("returns 1 for C(n,0) and C(n,n)", () => {
    expect(binom(100, 0)).toBe(1);
    expect(binom(100, 100)).toBeCloseTo(1, 10);
  });
});

describe("expectedRefreshes", () => {
  it("returns 0 when k <= 0", () => {
    expect(expectedRefreshes(0, 10, 100, 0.25)).toBe(0);
    expect(expectedRefreshes(-1, 10, 100, 0.25)).toBe(0);
  });

  it("returns Infinity when r <= 0 or t <= 0", () => {
    expect(expectedRefreshes(1, 0, 100, 0.25)).toBe(Infinity);
    expect(expectedRefreshes(1, 10, 0, 0.25)).toBe(Infinity);
  });

  it("returns Infinity when effective odds are 0", () => {
    expect(expectedRefreshes(1, 10, 100, 0)).toBe(Infinity);
  });

  it("returns finite positive value for valid inputs", () => {
    const e = expectedRefreshes(1, 30, 100, 0.25);
    expect(e).toBeGreaterThan(0);
    expect(e).toBeLessThan(1e9);
    expect(Number.isFinite(e)).toBe(true);
  });

  it("increases when more copies needed (k larger)", () => {
    const e1 = expectedRefreshes(1, 30, 100, 0.25);
    const e3 = expectedRefreshes(3, 30, 100, 0.25);
    const e9 = expectedRefreshes(9, 30, 100, 0.25);
    expect(e1).toBeLessThan(e3);
    expect(e3).toBeLessThan(e9);
  });

  it("decreases when pool has more copies (r larger)", () => {
    const eSmall = expectedRefreshes(3, 5, 50, 0.25);
    const eLarge = expectedRefreshes(3, 25, 100, 0.25);
    expect(eSmall).toBeGreaterThan(eLarge);
  });
});

describe("probReachWithinRefreshes", () => {
  it("returns 1 when already at or above target", () => {
    expect(probReachWithinRefreshes(3, 10, 3, 10, 50, 0.25)).toBe(1);
    expect(probReachWithinRefreshes(3, 10, 5, 10, 50, 0.25)).toBe(1);
    expect(probReachWithinRefreshes(9, 10, 9, 5, 50, 0.25)).toBe(1);
  });

  it("returns 0 when nRefreshes <= 0", () => {
    expect(probReachWithinRefreshes(3, 0, 0, 10, 50, 0.25)).toBe(0);
    expect(probReachWithinRefreshes(3, -1, 0, 10, 50, 0.25)).toBe(0);
  });

  it("returns 0 when remaining <= 0 and not at target", () => {
    // owned=10, remaining=0 → already at target (10 >= 3), returns 1
    expect(probReachWithinRefreshes(3, 10, 10, 0, 50, 0.25)).toBe(1);
    // owned=0, remaining=0 → cannot get any more, returns 0
    expect(probReachWithinRefreshes(3, 10, 0, 0, 50, 0.25)).toBe(0);
  });

  it("returns 0 when totalRemaining <= 0", () => {
    expect(probReachWithinRefreshes(3, 10, 0, 10, 0, 0.25)).toBe(0);
  });

  it("returns probability in [0, 1] for valid inputs", () => {
    const p = probReachWithinRefreshes(3, 5, 0, 20, 80, 0.25);
    expect(p).toBeGreaterThanOrEqual(0);
    expect(p).toBeLessThanOrEqual(1);
  });

  it("increases with more refreshes", () => {
    const p5 = probReachWithinRefreshes(3, 5, 0, 20, 80, 0.25);
    const p10 = probReachWithinRefreshes(3, 10, 0, 20, 80, 0.25);
    const p20 = probReachWithinRefreshes(3, 20, 0, 20, 80, 0.25);
    expect(p5).toBeLessThanOrEqual(p10);
    expect(p10).toBeLessThanOrEqual(p20);
  });

  it("increases when starting with more copies", () => {
    const p0 = probReachWithinRefreshes(3, 10, 0, 20, 80, 0.25);
    const p1 = probReachWithinRefreshes(3, 10, 1, 19, 79, 0.25);
    const p2 = probReachWithinRefreshes(3, 10, 2, 18, 78, 0.25);
    expect(p0).toBeLessThanOrEqual(p1);
    expect(p1).toBeLessThanOrEqual(p2);
  });

  it("handles TFT-like scenario: 2-star from 0 copies in 25 refreshes", () => {
    // Level 8, 4-cost: odds ~0.3 for 4-cost, pool 10 per champ, 12 champs
    const remaining = 10;
    const totalRemaining = 12 * 10; // 120
    const odds = 0.3;
    const p = probReachWithinRefreshes(3, 25, 0, remaining, totalRemaining, odds);
    expect(p).toBeGreaterThan(0);
    expect(p).toBeLessThanOrEqual(1);
    expect(Number.isFinite(p)).toBe(true);
  });
});
