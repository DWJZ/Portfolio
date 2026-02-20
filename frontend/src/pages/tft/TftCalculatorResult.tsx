import type { TftProbabilityResult } from "./useTftProbability";
import styles from "./TftCalculatorResult.module.css";

interface TftCalculatorResultProps {
  result: TftProbabilityResult;
  owned: number;
  gold: number;
}

function formatExpected(
  value: number | null,
  owned: number,
  threshold: number
): string {
  if (value == null) return "—";
  if (owned >= threshold) return "已达成";
  if (value < 0.1) return "<0.1";
  return `${value.toFixed(1)} 次`;
}

function formatProb(
  value: number | null,
  owned: number,
  threshold: number
): string {
  if (value == null) return "—";
  if (owned >= threshold) return "100%";
  return `${(value * 100).toFixed(1)}%`;
}

export function TftCalculatorResult({
  result,
  owned,
  gold,
}: TftCalculatorResultProps) {
  return (
    <div className={styles.result}>
      <h3>计算结果</h3>

      <p>
        单个卡槽出现目标弈子:{" "}
        <strong>{(result.perSlot * 100).toFixed(2)}%</strong>
      </p>
      <p>
        单次刷新至少出现 1 个:{" "}
        <strong>{(result.atLeastOne * 100).toFixed(2)}%</strong>
      </p>

      <h4 className={styles.subtitle}>期望刷新次数（达到目标星数）</h4>
      <div className={styles.expectedRefreshes}>
        <p>
          升至二星 (需 {Math.max(0, 3 - owned)} 个):{" "}
          <strong>
            {formatExpected(result.expectedRefreshesTo2Star, owned, 3)}
          </strong>
        </p>
        <p>
          升至三星 (需 {Math.max(0, 9 - owned)} 个):{" "}
          <strong>
            {formatExpected(result.expectedRefreshesTo3Star, owned, 9)}
          </strong>
        </p>
      </div>

      <h4 className={styles.subtitle}>
        {gold} 金币内刷新到目标星数
        <span className={styles.goldHint}>
          （约 {Math.floor(gold / 2)} 次刷新）
        </span>
      </h4>
      <div className={styles.expectedRefreshes}>
        <p>
          刷新到二星概率:{" "}
          <strong>{formatProb(result.prob2StarWithGold, owned, 3)}</strong>
        </p>
        <p>
          刷新到三星概率:{" "}
          <strong>{formatProb(result.prob3StarWithGold, owned, 9)}</strong>
        </p>
      </div>

      <h4 className={styles.subtitle}>刷新 1-10 次后至少出现 1 个</h4>
      <div className={styles.refreshGrid}>
        {result.afterNRefreshes.map((prob, i) => (
          <div key={i} className={styles.refreshItem}>
            <span className={styles.refreshCount}>{i + 1} 次</span>
            <strong>{(prob * 100).toFixed(1)}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
