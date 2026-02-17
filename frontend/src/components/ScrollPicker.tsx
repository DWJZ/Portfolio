import { useRef, useEffect } from "react";

interface ScrollPickerProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
  label: string;
  formatValue?: (v: number) => string;
}

export function ScrollPicker({
  value,
  onChange,
  options,
  label,
  formatValue = (v) => String(v),
}: ScrollPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const changeByRef = useRef<(delta: number) => void>(() => {});
  changeByRef.current = (delta: number) => {
    const idx2 = options.indexOf(value);
    const clamped = idx2 >= 0 ? idx2 : 0;
    const newIdx = Math.max(0, Math.min(options.length - 1, clamped - delta));
    onChange(options[newIdx]);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 10) {
        changeByRef.current(e.deltaY > 0 ? 1 : -1);
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const changeBy = (delta: number) => changeByRef.current(delta);

  const touchStartY = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const dy = touchStartY.current - e.touches[0].clientY;
    if (Math.abs(dy) > 30) {
      changeBy(dy > 0 ? 1 : -1);
      touchStartY.current = e.touches[0].clientY;
    }
  };

  return (
    <div className="tft-field">
      <label>{label}</label>
      <div
        ref={containerRef}
        className="scroll-picker-inline"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button
          type="button"
          className="scroll-picker-inline-btn"
          aria-label="Decrease"
          onClick={() => changeBy(1)}
        >
          −
        </button>
        <span className="scroll-picker-inline-value">{formatValue(value)}</span>
        <button
          type="button"
          className="scroll-picker-inline-btn"
          aria-label="Increase"
          onClick={() => changeBy(-1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
