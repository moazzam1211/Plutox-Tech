"use client";

import * as React from "react";

interface ScrollState {
  /** Page has scrolled past `threshold` — used to condense the navbar. */
  scrolled: boolean;
  /** Last movement direction; drives the auto-hiding mobile header. */
  direction: "up" | "down";
  /** Absolute scroll offset in pixels. */
  y: number;
}

/**
 * Track scroll offset and direction from a single passive listener.
 *
 * Reads are batched into a `requestAnimationFrame` so we never touch layout
 * properties more than once per frame, and state is only committed when a
 * value actually changes — a scroll of 2000px produces a handful of renders,
 * not hundreds.
 */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = React.useState<ScrollState>({
    scrolled: false,
    direction: "up",
    y: 0,
  });

  React.useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      // Ignore sub-pixel jitter and iOS rubber-banding above the fold.
      const delta = y - lastY;
      const direction = Math.abs(delta) < 4 ? undefined : delta > 0 ? "down" : "up";
      lastY = y;

      setState((prev) => {
        const next: ScrollState = {
          y,
          scrolled: y > threshold,
          direction: direction ?? prev.direction,
        };
        return prev.y === next.y &&
          prev.scrolled === next.scrolled &&
          prev.direction === next.direction
          ? prev
          : next;
      });
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
