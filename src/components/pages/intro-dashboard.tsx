"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * One slide of the intro carousel.
 *
 * `plate` is the screenshot's own page background. The frame is a fixed 16:10
 * and the image is `object-contain`, so a capture with a different aspect ratio
 * letterboxes — painting the gap in the screenshot's own colour makes that
 * invisible, where cropping to fill would cut off the chrome that makes a dense
 * UI readable.
 */
type Slide = {
  product: string;
  /** Target product page. No longer unique — three slides are ServeSync editions. */
  slug: string;
  screen: string;
  /** Route shown in the window chrome — the app's own path, not a hostname. */
  path: string;
  src: string;
  alt: string;
  plate: string;
  brandColor: string;
  /** Two figures read straight off the screenshot, so they can never disagree. */
  figures: [{ value: string; label: string }, { value: string; label: string }];
};

/**
 * Four slides: ServeSync's three editions plus StaySync.
 *
 * Chart-bearing dashboards lead — the pharmacy edition and StaySync both show a
 * populated seven-day chart, so the graph is the first thing a visitor sees. The
 * restaurant and mart slides follow with their busiest populated screens; their
 * own dashboards ship with a zero-state demo dataset (`Rs 0.00`, "No sales yet"),
 * which would read as a broken product sitting next to the headline.
 *
 * Each slide carries its edition's real accent, the same three colours the POS
 * swaps at runtime: teal, blue and orange.
 */
const SLIDES: Slide[] = [
  {
    product: "ServeSync Pharmacy",
    slug: "servesync-pos",
    screen: "Dashboard",
    path: "/dashboard",
    src: "/images/products/screens/pharmasync-dashboard.svg",
    alt: "The ServeSync pharmacy-edition dashboard: today's sales of Rs 24,850 across 18 invoices, Rs 9,120 profit at a 36.7% margin, Rs 1.50M inventory value, a seven-day sales bar chart from Wednesday to Tuesday, and expiry, stock and prescription alerts.",
    plate: "#eef3fb",
    brandColor: "#004AAD",
    figures: [
      { value: "Rs 24,850", label: "Today · 18 invoices" },
      { value: "36.7%", label: "Gross margin" },
    ],
  },
  {
    product: "StaySync Hotel ERP",
    slug: "staysync",
    screen: "Operations dashboard",
    path: "/dashboard",
    src: "/images/products/screens/staysync-dashboard.webp",
    alt: "The StaySync Hotel ERP dashboard for StaySync Grand Karachi: 14% occupancy over 4 of 28 rooms, Rs 11,250 ADR, Rs 1,607 RevPAR, Rs 32,480 revenue today, a seven-day occupancy and revenue chart, and a cashier panel showing Rs 59,000 outstanding.",
    plate: "#f4f5f7",
    brandColor: "#6F50E9",
    figures: [
      { value: "Rs 32,480", label: "Revenue today" },
      { value: "Rs 1,607", label: "RevPAR" },
    ],
  },
  {
    product: "ServeSync POS",
    slug: "servesync-pos",
    screen: "Kitchen Display",
    path: "/kitchen",
    src: "/images/products/screens/servesync-kitchen.webp",
    alt: "The ServeSync POS Kitchen Display with four live tickets — orders 59, 66, 71 and 72 across tables T1 and D1 — each listing its items, one showing a Classic Burger with 'Medium, Extra Cheese' modifiers, with Ready and Served actions.",
    plate: "#0d0f12",
    brandColor: "#33BCA8",
    figures: [
      { value: "4 tickets", label: "Live on the pass" },
      { value: "33 modules", label: "One codebase" },
    ],
  },
  {
    product: "ServeSync Mart",
    slug: "servesync-pos",
    screen: "Checkout",
    path: "/sell",
    src: "/images/products/screens/vendeez-checkout.webp",
    alt: "The ServeSync mart-edition sell screen with a five-line cart — bananas, apples, potatoes, onions and tomatoes — totalling Rs 1,740.00, beside a department-filtered catalogue showing live stock per aisle.",
    plate: "#ffffff",
    brandColor: "#F97316",
    figures: [
      { value: "Rs 1,740", label: "5 lines in cart" },
      { value: "3 ways", label: "To scan an item" },
    ],
  },
];

/** How long each slide holds before advancing. */
const INTERVAL_MS = 5200;

/**
 * The product carousel on the intro hero.
 *
 * Shows real screens from the shipped software rather than an invented
 * mockup, cycling so the hero carries the whole portfolio instead of one
 * product.
 *
 * Two deliberate implementation choices:
 *
 * 1. **The track translates; nothing mounts or unmounts.** All four slides sit
 *    in a row and the row slides. An `AnimatePresence` transition holds the
 *    outgoing slide until its exit finishes, so a stalled rAF (backgrounded tab,
 *    heavy main-thread work) silently freezes the carousel. A CSS transform on a
 *    permanently-mounted track cannot — the worst case is an instant cut to the
 *    right position.
 * 2. **Colour changes snap, they don't transition.** A frozen compositor leaves
 *    a colour transition stuck part-way, which would strand the plate on the
 *    previous slide's colour. Snapping is invisible mid-crossfade.
 * 3. **It slides on its own, with no controls.** There are no arrows, dots or
 *    pause button to click — the rotation just runs. It still pauses while the
 *    pointer is over the frame or the slide link has keyboard focus, so it can't
 *    change out from under someone reading it, and it never starts at all under
 *    `prefers-reduced-motion`. Those two are the pause mechanism WCAG 2.2.2 asks
 *    for on auto-updating content, without putting a button on screen.
 */
export function IntroDashboard() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const active = SLIDES[index];
  const autoplaying = !reducedMotion && !paused;

  React.useEffect(() => {
    if (!autoplaying) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [autoplaying]);

  return (
    <div className="relative" style={{ perspective: "1800px" }}>
      {/* Accent glow pooled behind the frame. Decorative. */}
      <div
        aria-hidden
        /* -inset-4 below sm: at 375px the frame is 327px wide, so an 8-unit
           bleed on both sides makes the glow 391px and the document scrolls
           sideways by 8px. The glow is decorative, so it gives way. */
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] sm:-inset-8 bg-[radial-gradient(60%_60%_at_60%_35%,color-mix(in_oklab,var(--primary)_38%,transparent),transparent_72%)] blur-2xl animate-breathe"
      />

      {/*
        `group/dash` drives the hover straighten and the affordance arrow.
        Hover and focus-within pause autoplay so a slide can't change under
        someone who is reading it or tabbing through the controls.
      */}
      <div
        className="group/dash"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_90px_-45px_rgb(0_0_0/0.55)] transition-transform duration-700 ease-out will-change-transform group-hover/dash:[transform:none]"
          style={{
            // Straightens to flat on hover via the class above.
            transform: "rotateY(-7deg) rotateX(3deg) scale(0.985)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ---- Window chrome ---- */}
          <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>

            <span className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border px-2.5 py-1">
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: active.brandColor }}
              />
              <span className="truncate font-mono text-[0.6875rem] text-muted-foreground">
                {active.product}
                <span className="opacity-50"> · {active.path}</span>
              </span>
            </span>

            {/* Position in the rotation, as an indicator only — nothing here is
                clickable. */}
            <span className="flex shrink-0 items-center gap-1" aria-hidden>
              {SLIDES.map((slide, position) => (
                <span
                  key={slide.product}
                  className={cn(
                    "block h-1 rounded-full transition-all duration-500",
                    position === index ? "w-4 bg-primary" : "w-1 bg-border",
                  )}
                />
              ))}
            </span>
          </div>

          {/*
            ---- Dwell bar ----
            Fills over exactly one interval, then restarts because `key` changes
            with the slide. `animationDuration` comes from the same constant that
            drives the timer, so the bar can't drift out of step with the
            rotation, and it freezes with the rotation on hover.
          */}
          <div
            aria-hidden
            className="h-px w-full overflow-hidden bg-border/60"
          >
            <div
              key={index}
              className="h-full origin-left bg-primary animate-progress"
              style={{
                animationDuration: `${INTERVAL_MS}ms`,
                animationPlayState: autoplaying ? "running" : "paused",
              }}
            />
          </div>

          {/*
            ---- Sliding track ----
            The slides sit in a row and the whole row translates. This replaces an
            opacity crossfade: a translate reads as an actual slider, and being
            transform-only it stays on the compositor with no per-frame paint.

            `overflow-hidden` on the viewport is what clips the off-screen slides;
            the frame's own rounded corners can't do it because the track is wider
            than the frame.
          */}
          <div className="relative overflow-hidden">
            <div
              className="flex w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {SLIDES.map((slide, position) => {
                const current = position === index;
                return (
                  <Link
                    key={slide.src}
                    href={`/projects#${slide.slug}`}
                    aria-label={`${slide.product} — ${slide.screen}. See the full project.`}
                    aria-hidden={!current}
                    tabIndex={current ? 0 : -1}
                    style={{ backgroundColor: slide.plate }}
                    className={cn(
                      "relative block aspect-16/10 w-full shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      current ? null : "pointer-events-none",
                    )}
                  >
                    {/*
                      A slight inward drift on the incoming slide: the image lags
                      the track by a fraction, which reads as depth rather than a
                      flat panel sliding past. Transform-only, and it settles to
                      identity so a stalled compositor leaves it merely off by a
                      few pixels rather than blank.
                    */}
                    <span
                      className={cn(
                        "absolute inset-0 block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                        current ? "scale-100" : "scale-[1.06]",
                      )}
                    >
                      <Image
                        src={slide.src}
                        alt={current ? slide.alt : ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        /* The first slide is the hero's largest contentful paint
                           candidate, so it must not be lazy-loaded. The rest load
                           eagerly too — they are seconds away and a blank frame
                           mid-rotation is worse than the bytes. */
                        {...(position === 0
                          ? { priority: true }
                          : { loading: "eager" as const })}
                        unoptimized={slide.src.endsWith(".svg")}
                        className="object-contain"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Hover affordance. */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 bottom-3 grid size-8 place-items-center rounded-md border border-border bg-background/90 text-muted-foreground opacity-0 transition-all duration-300 group-hover/dash:translate-y-0 group-hover/dash:opacity-100 translate-y-1"
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>

          {/* ---- Caption ---- */}
          <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{active.screen}</p>
              <p className="truncate text-[0.6875rem] text-muted-foreground">
                {active.product}
              </p>
            </div>

            {/* No NN/NN counter: the dots in the chrome already show position,
                and the site prints no index numbers anywhere else. */}
            <p
              className="shrink-0 font-mono text-[0.6875rem]"
              style={{ color: active.brandColor }}
            >
              {active.path}
            </p>
          </div>
        </div>
      </div>

      {/* Floating figures, lifted from whichever screen is showing. */}
      <div className="pointer-events-none absolute -bottom-4 -left-3 hidden rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-lg sm:block">
        <p className="font-mono text-sm leading-none font-medium">
          {active.figures[0].value}
        </p>
        <p className="mt-1 text-[0.6875rem] text-muted-foreground">
          {active.figures[0].label}
        </p>
      </div>

      <div className="pointer-events-none absolute -top-4 -right-3 hidden rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-lg sm:block">
        <p
          className="font-mono text-sm leading-none font-medium"
          style={{ color: active.brandColor }}
        >
          {active.figures[1].value}
        </p>
        <p className="mt-1 text-[0.6875rem] text-muted-foreground">
          {active.figures[1].label}
        </p>
      </div>

      {/* Attribution — these are real products, so say so. */}
      <p className="mt-6 text-center text-[0.6875rem] text-muted-foreground lg:text-left">
        Real screens from{" "}
        <Link href="/projects" className="link-underline font-medium text-foreground">
          the shipped platforms
        </Link>{" "}
        — captured from the running software, nothing mocked up
      </p>
    </div>
  );
}
