import { ScrollPicker } from "../../components/ScrollPicker";
import styles from "./TftCalculatorForm.module.css";
import {
  LEVEL_OPTIONS,
  COST_OPTIONS,
  GOLD_OPTIONS,
  getOwnedOptions,
  getSameCostTakenOptions,
} from "./data";

interface TftCalculatorFormProps {
  level: number;
  cost: number;
  owned: number;
  sameCostTaken: number;
  gold: number;
  onLevelChange: (v: number) => void;
  onCostChange: (v: number) => void;
  onOwnedChange: (v: number) => void;
  onSameCostTakenChange: (v: number) => void;
  onGoldChange: (v: number) => void;
}

export function TftCalculatorForm({
  level,
  cost,
  owned,
  sameCostTaken,
  gold,
  onLevelChange,
  onCostChange,
  onOwnedChange,
  onSameCostTakenChange,
  onGoldChange,
}: TftCalculatorFormProps) {
  const ownedOpts = getOwnedOptions(cost);
  const sameCostOpts = getSameCostTakenOptions(cost);

  return (
    <div className={styles.form}>
      <ScrollPicker
        value={level}
        onChange={onLevelChange}
        options={LEVEL_OPTIONS}
        label="当前等级 (1-11)"
      />
      <ScrollPicker
        value={cost}
        onChange={onCostChange}
        options={COST_OPTIONS}
        label="弈子费用 (1-7)"
      />
      <ScrollPicker
        value={owned}
        onChange={onOwnedChange}
        options={ownedOpts}
        label="已拥有数量 (≥0)"
      />
      <ScrollPicker
        value={sameCostTaken}
        onChange={onSameCostTakenChange}
        options={sameCostOpts}
        label="同费用弈子已被购买总数 (≥0)"
      />
      <ScrollPicker
        value={gold}
        onChange={onGoldChange}
        options={GOLD_OPTIONS}
        label="当前金币"
      />
    </div>
  );
}
