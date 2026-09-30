import { useEffect, useState } from "react";

export function useFrontIndex(count: number, cycleMs: number) {
  const [font, setFront] = useState(0);

  useEffect(() => {
    const prefersReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce",
    ).matches;

    if (prefersReduceMotion) return;

    const id = setInterval(() => {
      setFront((current) => (current + 1) % count);
    }, cycleMs);
  }, [count, cycleMs]);
}
