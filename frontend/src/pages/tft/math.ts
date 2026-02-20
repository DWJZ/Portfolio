/**
 * TFT probability calculations.
 */

/** Binomial coefficient C(n,k) */
export function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= (n - i) / (i + 1);
  return r;
}

/**
 * Expected refreshes to get k copies, accounting for pool depletion.
 * Each purchase reduces both our champ's remaining and total cost tier.
 * Uses DP with binomial model for 5 slots per refresh.
 */
export function expectedRefreshes(
  k: number,
  r: number,
  t: number,
  odds: number
): number {
  if (k <= 0) return 0;
  if (r <= 0 || t <= 0) return Infinity;
  if (odds * (r / t) <= 0) return Infinity;

  const maxR = Math.min(30, r);
  const maxT = Math.min(500, t);
  const INF = 1e9;
  const E: Record<string, number> = {};
  const key = (a: number, b: number, c: number) => `${a},${b},${c}`;

  for (let kk = 0; kk <= k; kk++) {
    for (let rr = 0; rr <= maxR; rr++) {
      for (let tt = 0; tt <= maxT; tt++) {
        if (kk === 0) {
          E[key(kk, rr, tt)] = 0;
          continue;
        }
        if (rr === 0 || tt === 0) {
          E[key(kk, rr, tt)] = INF;
          continue;
        }
        const pCur = odds * (rr / tt);
        if (pCur <= 0) {
          E[key(kk, rr, tt)] = INF;
          continue;
        }
        let sum = 1;
        const p0 = Math.pow(1 - pCur, 5);
        for (let actual = 1; actual <= Math.min(5, rr); actual++) {
          let pi: number;
          if (actual < rr) {
            pi =
              binom(5, actual) *
              Math.pow(pCur, actual) *
              Math.pow(1 - pCur, 5 - actual);
          } else {
            pi = 0;
            for (let i = rr; i <= 5; i++) {
              pi +=
                binom(5, i) * Math.pow(pCur, i) * Math.pow(1 - pCur, 5 - i);
            }
          }
          const nk = Math.max(0, kk - actual);
          const nr = Math.max(0, rr - actual);
          const nt = Math.max(0, tt - actual);
          sum += pi * (E[key(nk, nr, nt)] ?? INF);
        }
        const denom = 1 - p0;
        E[key(kk, rr, tt)] = denom > 1e-10 ? sum / denom : INF;
      }
    }
  }

  const result = E[key(k, Math.min(r, maxR), Math.min(t, maxT))];
  return result != null && result < INF ? result : Infinity;
}

/**
 * Probability of reaching target copies within N refreshes.
 * Uses DP: dp[have] = P(having "have" copies after n refreshes).
 */
export function probReachWithinRefreshes(
  target: number,
  nRefreshes: number,
  owned: number,
  remaining: number,
  totalRemaining: number,
  odds: number
): number {
  if (owned >= target) return 1;
  if (nRefreshes <= 0 || remaining <= 0 || totalRemaining <= 0) return 0;
  const pool = remaining + owned;
  const maxHave = Math.min(9, pool);
  let dp = new Array(maxHave + 1).fill(0);
  dp[owned] = 1;

  for (let n = 0; n < nRefreshes; n++) {
    const next = new Array(maxHave + 1).fill(0);
    for (let have = 0; have <= maxHave; have++) {
      if (dp[have] === 0) continue;
      const r = pool - have;
      const t = totalRemaining - have + owned;
      if (r <= 0 || t <= 0) {
        next[have] += dp[have];
        continue;
      }
      const pCur = odds * (r / t);
      for (let actual = 0; actual <= Math.min(5, r); actual++) {
        let pi: number;
        if (actual < r) {
          pi =
            binom(5, actual) *
            Math.pow(pCur, actual) *
            Math.pow(1 - pCur, 5 - actual);
        } else {
          pi = 0;
          for (let i = r; i <= 5; i++) {
            pi +=
              binom(5, i) * Math.pow(pCur, i) * Math.pow(1 - pCur, 5 - i);
          }
        }
        const newHave = Math.min(have + actual, maxHave);
        next[newHave] += dp[have] * pi;
      }
    }
    dp = next;
  }

  let prob = 0;
  for (let have = target; have <= maxHave; have++) {
    prob += dp[have];
  }
  return prob;
}
