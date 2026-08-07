"use client";

import { ArrowUp } from "lucide-react";
import * as React from "react";

import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { useScrollState } from "@/hooks/use-scroll-state";
import { cn } from "@/lib/utils";

/**
 * Floating back-to-top button.
 *
 * Sits directly above the Help & Support FAB in the bottom-right corner, and is
 * deliberately one size smaller so the two read as a stack with a clear
 * hierarchy rather than two competing buttons.
 *
 * Only appears past ~1.5 viewport heights — on the short intro page there is
 * nothing to scroll back from, so showing it there would be noise.
 */
export function BackToTop() {
  const { y } = useScrollState();
  const getLenis = useLenis();

  const visible = y > 900;

  function scrollToTop() {
    // Prefer Lenis so the ascent is smoothed like the rest of the page.
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className={cn(
        // Offsets clear the 52px help FAB (at bottom-5 / sm:bottom-6) with a
        // ~12px gap, so the two never crowd each other.
        "group fixed right-5 bottom-[5.25rem] z-80 transition-all duration-300 sm:right-6 sm:bottom-[5.75rem]",
        // Kept mounted and faded out rather than unmounted: a button that
        // appears and disappears from the accessibility tree on scroll is
        // disorienting, and `invisible` removes it from the tab order cleanly.
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-2 opacity-0",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-14 -translate-y-1/2 translate-x-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      >
        Back to top
      </span>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        className="grid size-11 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  );
}
