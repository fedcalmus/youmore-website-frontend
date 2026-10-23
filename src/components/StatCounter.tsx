"use client";

import { useEffect, useState } from "react";

export function StatCounter({ to, color }: { to: number; color?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1200;
    let start: number | null = null;
    let frame: number;

    function step(t: number) {
      if (start === null) start = t;
      const k = Math.min(1, (t - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) frame = requestAnimationFrame(step);
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <div className="disp stat-counter" style={{ color }}>
      {value}
    </div>
  );
}
