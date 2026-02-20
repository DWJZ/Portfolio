/**
 * TFT shop odds and pool data.
 * Source: https://www.metatft.com/tables/shop-odds (Set 16)
 */

/** Shop odds by level (1-11), index = cost - 1 (1-cost to 7-cost) */
export const SHOP_ODDS: Record<number, number[]> = {
  1: [1, 0, 0, 0, 0, 0, 0],
  2: [1, 0, 0, 0, 0, 0, 0],
  3: [0.75, 0.25, 0, 0, 0, 0, 0],
  4: [0.55, 0.3, 0.15, 0, 0, 0, 0],
  5: [0.45, 0.33, 0.2, 0.02, 0, 0, 0],
  6: [0.3, 0.4, 0.25, 0.05, 0, 0, 0],
  7: [0.16, 0.3, 0.43, 0.1, 0.01, 0, 0],
  8: [0.15, 0.2, 0.32, 0.3, 0.03, 0, 0],
  9: [0.1, 0.17, 0.25, 0.33, 0.15, 0, 0],
  10: [0.05, 0.1, 0.2, 0.4, 0.25, 0, 0],
  11: [0.01, 0.02, 0.12, 0.5, 0.35, 0, 0],
};

/** Pool: copies per champion for each cost tier */
export const POOL_PER_CHAMP = [30, 25, 18, 10, 9, 9, 9];

/** Number of unique champions per cost tier */
export const CHAMPS_PER_COST = [13, 13, 13, 12, 10, 8, 9];

export const LEVEL_OPTIONS = Array.from({ length: 11 }, (_, i) => i + 1);
export const COST_OPTIONS = Array.from({ length: 7 }, (_, i) => i + 1);
export const GOLD_OPTIONS = Array.from({ length: 101 }, (_, i) => i);

export function getOwnedOptions(cost: number): number[] {
  const pool = POOL_PER_CHAMP[cost - 1] ?? 9;
  return Array.from({ length: pool + 1 }, (_, i) => i);
}

export function getSameCostTakenOptions(cost: number): number[] {
  const full =
    (CHAMPS_PER_COST[cost - 1] ?? 10) * (POOL_PER_CHAMP[cost - 1] ?? 9);
  return Array.from({ length: Math.min(full + 1, 200) }, (_, i) => i);
}
