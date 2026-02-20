import { useRef, useEffect, useState } from "react";
import styles from "./ScrollPicker.module.css";

interface ScrollPickerProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
  label: string;
  formatValue?: (v: number) => string;
}

const ITEM_HEIGHT = 44;

export function ScrollPicker({
  value,
  onChange,
  options,
  label,
  formatValue = (v) => String(v),
}: ScrollPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartRef = useRef<{ y: number; index: number } | null>(null);

  const idx = options.indexOf(value);
  const selectedIndex = idx >= 0 ? idx : 0;

  const changeByRef = useRef<(delta: number) => void>(() => {});
  changeByRef.current = (delta: number) => {
    const idx2 = options.indexOf(value);
    const clamped = idx2 >= 0 ? idx2 : 0;
    const newIdx = Math.max(0, Math.min(options.length - 1, clamped - delta));
    onChange(options[newIdx]);
  };

  const latestRef = useRef({ selectedIndex, options, onChange, dragOffset });
  latestRef.current = { selectedIndex, options, onChange, dragOffset };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 10) {
        changeByRef.current(e.deltaY > 0 ? -1 : 1);
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        y: e.touches[0].clientY,
        index: latestRef.current.selectedIndex,
      };
      setIsDragging(true);
      setDragOffset(0);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;
      e.preventDefault();
      const dy = e.touches[0].clientY - start.y;
      setDragOffset(dy);
    };
    const handleTouchEnd = () => {
      const start = touchStartRef.current;
      if (!start) return;
      const { options: opts } = latestRef.current;
      const deltaItems = latestRef.current.dragOffset / ITEM_HEIGHT;
      const newIndex = Math.max(
        0,
        Math.min(opts.length - 1, Math.round(start.index - deltaItems))
      );
      latestRef.current.onChange(opts[newIndex]);
      touchStartRef.current = null;
      setIsDragging(false);
      setDragOffset(0);
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const changeBy = (delta: number) => changeByRef.current(delta);

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div
        ref={containerRef}
        className={styles.reel}
      >
        <button
          type="button"
          className={styles.btn}
          aria-label="Decrease"
          onClick={() => changeBy(1)}
        >
          −
        </button>
        <div className={styles.viewport}>
          <div
            className={styles.strip}
            style={{
              transform: `translateY(${
                isDragging && touchStartRef.current
                  ? -touchStartRef.current.index * ITEM_HEIGHT + dragOffset
                  : -selectedIndex * ITEM_HEIGHT
              }px)`,
              transition: isDragging ? "none" : undefined,
            }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={styles.item}
                style={{ height: ITEM_HEIGHT }}
              >
                {formatValue(opt)}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={styles.btn}
          aria-label="Increase"
          onClick={() => changeBy(-1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
