"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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
 * The four slides, one per shipped product.
 *
 * Chart-bearing dashboards lead: PharmaSync and StaySync both show a populated
 * seven-day chart, so the graph is the first thing a visitor sees. ServeSync and
 * Vendeez follow with their busiest populated screens — their own dashboards
 * ship with a zero-state demo dataset (`Rs 0.00`, "No sales yet"), which would
 * read as a broken product sitting next to the headline.
 */
const SLIDES: Slide[] = [
  {
    product: "PharmaSync POS",
    slug: "pharmasync-pos",
    screen: "Dashboard",
    path: "/dashboard",
    src: "/images/products/screens/pharmasync-dashboard.svg",
    alt: "The PharmaSync POS dashboard: today's sales of Rs 24,850 across 18 invoices, Rs 9,120 profit at a 36.7% margin, Rs 1.50M inventory value, a seven-day sales bar chart from Wednesday to Tuesday, and expiry, stock and prescription alerts.",
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
    src: "/images/products/screens/staysync-dashboard.png",
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
    src: "/images/products/screens/servesync-kitchen.png",
    alt: "The ServeSync POS Kitchen Display with four live tickets — orders 59, 66, 71 and 72 across tables T1 and D1 — each listing its items, one showing a Classic Burger with 'Medium, Extra Cheese' modifiers, with Ready and Served actions.",
    plate: "#0d0f12",
    brandColor: "#33BCA8",
    figures: [
      { value: "4 tickets", label: "Live on the pass" },
      { value: "24 modules", label: "One codebase" },
    ],
  },
  {
    product: "Vendeez POS",
    slug: "vendeez-pos",
    screen: "Checkout",
    path: "/sell",
    src: "/images/products/screens/vendeez-checkout.png",
    alt: "The Vendeez POS sell screen with a five-line cart — bananas, apples, potatoes, onions and tomatoes — totalling Rs 1,740.00, beside a department-filtered catalogue showing live stock per aisle.",
    plate: "#ffffff",
    brandColor: "#005F73",
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
 * Shows real screens from all four shipped platforms rather than an invented
 * mockup, cycling so the hero carries the whole portfolio instead of one
 * product.
 *
 * Two deliberate implementation choices:
 *
 * 1. **No exit animations.** Every slide is mounted and stacked; only `opacity`
 *    and `pointer-events` change. An `AnimatePresence` crossfade holds the
 *    outgoing slide until its exit finishes, so a stalled rAF (backgrounded tab,
 *    heavy main-thread work) silently freezes the carousel. Stacked opacity
 *    cannot — the worst case is an instant cut.
 * 2. **Colour changes snap, they don't transition.** A frozen compositor leaves
 *    a colour transition stuck part-way, which would strand the plate on the
 *    previous slide's colour. Snapping is invisible mid-crossfade.
 * 3. **Autoplay is opt-out-able and never fights the user.** It pauses on hover
 *    and on keyboard focus, stops for good once a control is used, and never
 *    starts under `prefers-reduced-motion`.
 */
export function IntroDashboard() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [stopped, setStopped] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const active = SLIDES[index];
  const autoplaying = !reducedMotion && !stopped && !paused;

  React.useEffect(() => {
    if (!autoplaying) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [autoplaying]);

  /** Any manual navigation ends autoplay — the visitor is driving now. */
  const go = React.useCallback((next: number) => {
    setStopped(true);
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <div className="relative" style={{ perspective: "1800px" }}>
      {/* Accent glow pooled behind the frame. Decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_60%_35%,color-mix(in_oklab,var(--primary)_38%,transparent),transparent_72%)] blur-2xl animate-breathe"
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
              <span className="truncate font-mono text-[0.5625rem] text-muted-foreground">
                {active.product}
                <span className="opacity-50"> · {active.path}</span>
              </span>
            </span>

            {/* Autoplay toggle. Hidden from the reduced-motion path, where
                nothing is playing to begin with. */}
            {reducedMotion ? null : (
              <button
                type="button"
                onClick={() => setStopped((was) => !was)}
                aria-label={
                  stopped ? "Resume the carousel" : "Pause the carousel"
                }
                className="grid size-6 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {stopped ? (
                  <Play className="size-2.5" />
                ) : (
                  <Pause className="size-2.5" />
                )}
              </button>
            )}
          </div>

          {/* ---- Stacked slides ---- */}
          <div
            className="relative aspect-16/10"
            style={{ backgroundColor: active.plate }}
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
                  className={cn(
                    "absolute inset-0 block outline-none transition-opacity duration-700 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    current
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
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
                </Link>
              );
            })}

            {/* Hover affordance. */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 bottom-3 grid size-8 place-items-center rounded-md border border-border bg-background/90 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover/dash:opacity-100"
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>

          {/* ---- Caption + controls ---- */}
          <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{active.screen}</p>
              <p className="truncate text-[0.625rem] text-muted-foreground">
                {active.product}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {/*
                Dots double as the slide labels for assistive tech.

                The visible bar is 6px tall, but the padding makes every button at
                least 24×24: a 6px hit area is unusable on a phone and would fail
                the 24×24 minimum target size.
              */}
              <ul className="flex items-center">
                {SLIDES.map((slide, position) => (
                  <li key={slide.slug}>
                    <button
                      type="button"
                      onClick={() => go(position)}
                      aria-label={`Show ${slide.product}`}
                      aria-current={position === index}
                      className="grid h-6 place-items-center px-2 outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all duration-300",
                          position === index ? "w-5 bg-primary" : "w-2 bg-border",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous product"
                className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next product"
                className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating figures, lifted from whichever screen is showing. */}
      <div className="pointer-events-none absolute -bottom-4 -left-3 hidden rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-lg sm:block">
        <p className="font-mono text-sm leading-none font-medium">
          {active.figures[0].value}
        </p>
        <p className="mt-1 text-[0.625rem] text-muted-foreground">
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
        <p className="mt-1 text-[0.625rem] text-muted-foreground">
          {active.figures[1].label}
        </p>
      </div>

      {/* Attribution — these are real products, so say so. */}
      <p className="mt-6 text-center text-[0.6875rem] text-muted-foreground lg:text-left">
        Real screens from{" "}
        <Link href="/projects" className="link-underline font-medium text-foreground">
          all four shipped platforms
        </Link>{" "}
        — captured from the running software, nothing mocked up
      </p>
    </div>
  );
}
