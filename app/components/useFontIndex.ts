import { useEffect, useState } from "react";
import { clearInterval } from "timers";

export function useFrontIndex(count: number, cycleMs: number) {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const prefersReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce",
    ).matches;

    if (prefersReduceMotion) return;

    const id = setInterval(() => {
      setFront((current) => (current + 1) % count);
    }, cycleMs);

    return () => clearInterval(id);
  }, [count, cycleMs]);

  return [front, setFront] as const;
}
