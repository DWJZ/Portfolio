import { useMemo } from "react";
import {
  SHOP_ODDS,
  POOL_PER_CHAMP,
  CHAMPS_PER_COST,
} from "./data";
import {
  expectedRefreshes,
  probReachWithinRefreshes,
} from "./math";

export interface TftProbabilityResult {
  perSlot: number;
  atLeastOne: number;
  afterNRefreshes: number[];
  expectedRefreshesTo2Star: number | null;
  expectedRefreshesTo3Star: number | null;
  prob2StarWithGold: number | null;
  prob3StarWithGold: number | null;
}

export function useTftProbability(
  level: number,
  cost: number,
  owned: number,
  sameCostTaken: number,
  gold: number
): TftProbabilityResult | null {
  return useMemo(() => {
    if (cost < 1 || cost > 7 || level < 1 || level > 11 || owned < 0)
      return null;

    const costIdx = cost - 1;
    const odds = SHOP_ODDS[level]?.[costIdx] ?? 0;
    const pool = POOL_PER_CHAMP[costIdx];
    const fullPool = CHAMPS_PER_COST[costIdx] * pool;
    const totalRemaining = Math.max(0, fullPool - sameCostTaken);
    const remaining = Math.max(0, pool - owned);

    if (remaining === 0 || totalRemaining === 0) {
      return {
        perSlot: 0,
        atLeastOne: 0,
        afterNRefreshes: Array(10).fill(0),
        expectedRefreshesTo2Star: null,
        expectedRefreshesTo3Star: null,
        prob2StarWithGold: null,
        prob3StarWithGold: null,
      };
    }

    const perSlot = odds * (remaining / totalRemaining);
    const atLeastOne = 1 - Math.pow(1 - perSlot, 5);
    const afterNRefreshes = Array.from({ length: 10 }, (_, n) =>
      1 - Math.pow(1 - atLeastOne, n + 1)
    );

    const to2Star = Math.max(0, 3 - owned);
    const to3Star = Math.max(0, 9 - owned);
    const e2 = expectedRefreshes(to2Star, remaining, totalRemaining, odds);
    const e3 = expectedRefreshes(to3Star, remaining, totalRemaining, odds);

    const expectedRefreshesTo2Star =
      to2Star > 0 && e2 < 1e9 ? e2 : null;
    const expectedRefreshesTo3Star =
      to3Star > 0 && e3 < 1e9 ? e3 : null;

    const nRefreshes = Math.max(0, Math.floor(gold / 2));
    const prob2StarWithGold =
      owned >= 3
        ? 1
        : probReachWithinRefreshes(
            3,
            nRefreshes,
            owned,
            remaining,
            totalRemaining,
            odds
          );
    const prob3StarWithGold =
      owned >= 9
        ? 1
        : probReachWithinRefreshes(
            9,
            nRefreshes,
            owned,
            remaining,
            totalRemaining,
            odds
          );

    return {
      perSlot,
      atLeastOne,
      afterNRefreshes,
      expectedRefreshesTo2Star,
      expectedRefreshesTo3Star,
      prob2StarWithGold,
      prob3StarWithGold,
    };
  }, [level, cost, owned, sameCostTaken, gold]);
}
