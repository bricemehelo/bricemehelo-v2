import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useFrontIndex } from "../useFontIndex";

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reducedMotion,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe("useFrontIndex", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("advances to the next index after cycleMs", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useFrontIndex(6, 2800));

    expect(result.current[0]).toBe(0);

    act(() => {
      vi.advanceTimersByTime(2800);
    });

    expect(result.current[0]).toBe(1);
  });

  it("wraps aaround afert the last card", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useFrontIndex(6, 2800));
  });
});
