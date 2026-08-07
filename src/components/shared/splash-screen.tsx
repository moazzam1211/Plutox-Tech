"use client";

import Image from "next/image";
import * as React from "react";

import { BRAND } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

/** Fade-out duration; must match the `duration-500` class below. */
const FADE_MS = 500;

type Phase = "visible" | "fading" | "done";

/**
 * Brand splash shown on first paint.
 *
 * The supplied lock-up centred on a full-bleed brand canvas, rather than a fixed
 * 16:9 raster of the same composition — a wide image would letterbox badly on a
 * phone, whereas a centred lock-up on a coloured field is correct at every
 * aspect ratio and is the same artwork.
 *
 * Both theme variants are rendered and swapped with CSS, so the splash never
 * flashes the wrong one before hydration, and it always matches the site it is
 * about to reveal.
 *
 * Built without an animation library, unlike the rest of the site. This is a
 * fully opaque overlay on first paint, so its *removal* must not depend on
 * anything that can stall:
 *
 * - The fade is a CSS transition and the unmount is driven by a timer, not by an
 *   animation completing. If the fade never paints (rAF starved by hydration
 *   work, or a throttled background tab) the node is still removed.
 * - `pointer-events-none` applies the instant fading starts, so it can never
 *   trap a click mid-transition.
 * - Dismissal runs on a microtask when the document is already complete, because
 *   timers are heavily throttled in non-composited pages.
 */
export function SplashScreen() {
  const [phase, setPhase] = React.useState<Phase>("visible");

  React.useEffect(() => {
    if (phase !== "visible") return;

    const startFade = () => setPhase("fading");

    if (document.readyState === "complete") {
      queueMicrotask(startFade);
      return;
    }

    const cap = window.setTimeout(startFade, 850);
    window.addEventListener("load", startFade, { once: true });

    const onVisible = () => {
      if (document.visibilityState === "visible") startFade();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", startFade);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [phase]);

  // Unmount after the fade window, whether or not it painted.
  React.useEffect(() => {
    if (phase !== "fading") return;
    const timer = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Lock scrolling only while the splash is opaque.
  React.useEffect(() => {
    if (phase !== "visible") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        // `bg-brand-paper` in light, the mark's ink in dark — the same fields the
        // supplied artwork sits on, so the lock-up reads as part of the canvas.
        "fixed inset-0 z-200 grid place-items-center bg-brand-paper dark:bg-brand-ink",
        "transition-opacity duration-500 ease-out",
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="relative aspect-square w-[min(62vw,20rem)] sm:w-[min(38vw,22rem)]">
        <Image
          src={BRAND.lockup}
          alt=""
          fill
          sizes="(max-width: 640px) 62vw, 352px"
          priority
          className="object-contain dark:hidden"
        />
        <Image
          src={BRAND.lockupDark}
          alt=""
          fill
          sizes="(max-width: 640px) 62vw, 352px"
          priority
          className="hidden object-contain dark:block"
        />
      </div>
    </div>
  );
}
