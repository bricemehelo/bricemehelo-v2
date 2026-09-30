import { useEffect, useState } from "react";

export function useFrontIndex(count: number, cycleMs: number) {
  const [font, setFront] = useState(0);

  useEffect(() => {
    const prefersReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce",
    ).matches;
  }, [count, cycleMs]);
}
