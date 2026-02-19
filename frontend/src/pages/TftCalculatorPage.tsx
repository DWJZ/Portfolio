import { useState, useMemo, useEffect } from "react";
import { ScrollPicker } from "../components/ScrollPicker";

// TFT shop odds by level (1-11), index 0 = 1-cost ... 6 = 7-cost
// Source: https://www.metatft.com/tables/shop-odds (Set 16), 6/7-cost estimated
const SHOP_ODDS: Record<number, number[]> = {
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

// Pool: copies per champion (MetaTFT Set 16), 6/7-cost estimated
const POOL_PER_CHAMP = [30, 25, 18, 10, 9, 9, 9];
// Number of unique champions per cost
const CHAMPS_PER_COST = [13, 13, 13, 12, 10, 8, 9];

function useTftProbability(
  level: number,
  cost: number,
  owned: number,
  sameCostTaken: number
) {
  return useMemo(() => {
    if (cost < 1 || cost > 7 || level < 1 || level > 11 || owned < 0) return null;
    const costIdx = cost - 1;
    const odds = SHOP_ODDS[level]?.[costIdx] ?? 0;
    const pool = POOL_PER_CHAMP[costIdx];
    const fullPool = CHAMPS_PER_COST[costIdx] * pool;
    const totalRemaining = Math.max(0, fullPool - sameCostTaken);
    const remaining = Math.max(0, pool - owned);
    if (remaining === 0 || totalRemaining === 0)
      return {
        perSlot: 0,
        atLeastOne: 0,
        afterNRefreshes: Array(10).fill(0),
        expectedRefreshesTo2Star: null as number | null,
        expectedRefreshesTo3Star: null as number | null,
      };
    const perSlot = odds * (remaining / totalRemaining);
    const atLeastOne = 1 - Math.pow(1 - perSlot, 5);
    const afterNRefreshes = Array.from({ length: 10 }, (_, n) =>
      1 - Math.pow(1 - atLeastOne, n + 1)
    );
    const copiesPerRefresh = 5 * perSlot;
    const to2Star = Math.max(0, 3 - owned);
    const to3Star = Math.max(0, 9 - owned);
    const expectedRefreshesTo2Star =
      copiesPerRefresh > 0 ? to2Star / copiesPerRefresh : null;
    const expectedRefreshesTo3Star =
      copiesPerRefresh > 0 ? to3Star / copiesPerRefresh : null;
    return {
      perSlot,
      atLeastOne,
      afterNRefreshes,
      expectedRefreshesTo2Star,
      expectedRefreshesTo3Star,
    };
  }, [level, cost, owned, sameCostTaken]);
}

const LEVEL_OPTIONS = Array.from({ length: 11 }, (_, i) => i + 1);
const COST_OPTIONS = Array.from({ length: 7 }, (_, i) => i + 1);

function ownedOptionsForCost(cost: number): number[] {
  const pool = POOL_PER_CHAMP[cost - 1] ?? 9;
  return Array.from({ length: pool + 1 }, (_, i) => i);
}

function sameCostTakenOptions(cost: number): number[] {
  const full = (CHAMPS_PER_COST[cost - 1] ?? 10) * (POOL_PER_CHAMP[cost - 1] ?? 9);
  return Array.from({ length: Math.min(full + 1, 200) }, (_, i) => i);
}

export function TftCalculatorPage() {
  const [level, setLevel] = useState(8);
  const [cost, setCost] = useState(4);
  const [owned, setOwned] = useState(0);
  const [sameCostTaken, setSameCostTaken] = useState(0);

  const result = useTftProbability(level, cost, owned, sameCostTaken);

  const ownedOpts = useMemo(() => ownedOptionsForCost(cost), [cost]);
  const sameCostOpts = useMemo(() => sameCostTakenOptions(cost), [cost]);

  useEffect(() => {
    const maxOwned = POOL_PER_CHAMP[cost - 1] ?? 9;
    if (owned > maxOwned) setOwned(maxOwned);
  }, [cost, owned]);

  return (
    <div className="container">
      <header className="page-header">
        <h1>TFT Probability Calculator</h1>
        <p className="page-subtitle">计算单次刷新出现目标弈子的概率</p>
      </header>

      <section className="tft-calculator">
        <div className="tft-form">
          <ScrollPicker
            value={level}
            onChange={setLevel}
            options={LEVEL_OPTIONS}
            label="当前等级 (1-11)"
          />
          <ScrollPicker
            value={cost}
            onChange={setCost}
            options={COST_OPTIONS}
            label="弈子费用 (1-7)"
          />
          <ScrollPicker
            value={owned}
            onChange={setOwned}
            options={ownedOpts}
            label="已拥有数量 (≥0)"
          />
          <ScrollPicker
            value={sameCostTaken}
            onChange={setSameCostTaken}
            options={sameCostOpts}
            label="同费用弈子已被购买总数 (≥0)"
          />
        </div>

        {result !== null && (
          <div className="tft-result">
            <h3>计算结果</h3>
            <p>
              单个卡槽出现目标弈子:{" "}
              <strong>{(result.perSlot * 100).toFixed(2)}%</strong>
            </p>
            <p>
              单次刷新至少出现 1 个:{" "}
              <strong>{(result.atLeastOne * 100).toFixed(2)}%</strong>
            </p>
            <h4 className="tft-result-subtitle">期望刷新次数（达到目标星数）</h4>
            <div className="tft-expected-refreshes">
              <p>
                升至二星 (需 {Math.max(0, 3 - owned)} 个):{" "}
                <strong>
                  {result.expectedRefreshesTo2Star != null
                    ? owned >= 3
                      ? "已达成"
                      : result.expectedRefreshesTo2Star < 0.1
                        ? "<0.1"
                        : `${result.expectedRefreshesTo2Star.toFixed(1)} 次`
                    : "—"}
                </strong>
              </p>
              <p>
                升至三星 (需 {Math.max(0, 9 - owned)} 个):{" "}
                <strong>
                  {result.expectedRefreshesTo3Star != null
                    ? owned >= 9
                      ? "已达成"
                      : result.expectedRefreshesTo3Star < 0.1
                        ? "<0.1"
                        : `${result.expectedRefreshesTo3Star.toFixed(1)} 次`
                    : "—"}
                </strong>
              </p>
            </div>
            <h4 className="tft-result-subtitle">刷新 1-10 次后至少出现 1 个</h4>
            <div className="tft-refresh-grid">
              {result.afterNRefreshes.map((prob, i) => (
                <div key={i} className="tft-refresh-item">
                  <span className="tft-refresh-count">{i + 1} 次</span>
                  <strong>{(prob * 100).toFixed(1)}%</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
