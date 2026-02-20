import { useState, useEffect } from "react";
import {
  POOL_PER_CHAMP,
  useTftProbability,
  TftCalculatorForm,
  TftCalculatorResult,
} from "./tft";
import styles from "./TftCalculatorPage.module.css";

export function TftCalculatorPage() {
  const [level, setLevel] = useState(8);
  const [cost, setCost] = useState(4);
  const [owned, setOwned] = useState(0);
  const [sameCostTaken, setSameCostTaken] = useState(0);
  const [gold, setGold] = useState(50);

  const result = useTftProbability(
    level,
    cost,
    owned,
    sameCostTaken,
    gold
  );

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

      <section className={styles.calculator}>
        <TftCalculatorForm
          level={level}
          cost={cost}
          owned={owned}
          sameCostTaken={sameCostTaken}
          gold={gold}
          onLevelChange={setLevel}
          onCostChange={setCost}
          onOwnedChange={setOwned}
          onSameCostTakenChange={setSameCostTaken}
          onGoldChange={setGold}
        />

        {result !== null && (
          <TftCalculatorResult result={result} owned={owned} gold={gold} />
        )}
      </section>
    </div>
  );
}
