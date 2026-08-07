"use client";

import * as React from "react";

/**
 * Return the id of the section currently dominating the viewport.
 *
 * Implemented with a single IntersectionObserver over all tracked ids, which
 * costs nothing on scroll — the browser does the work off the main thread.
 * The `rootMargin` biases selection toward the upper-middle of the screen so
 * the nav highlight changes when a section *feels* current, not when its very
 * first pixel appears.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track ratios per id so we can always pick the most-visible section.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setActive(best);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
