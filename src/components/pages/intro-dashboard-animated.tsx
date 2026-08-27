import Link from "next/link";

/**
 * Animated dashboard for the intro hero.
 *
 * Hand-built rather than a downloaded Lottie or SVG pack, for three reasons: it
 * matches the ink/paper/violet palette exactly instead of approximately, it adds
 * no dependency and no third-party licence to track, and it weighs nothing —
 * there is no JSON payload, no player, and no external request.
 *
 * It is deliberately abstract. The site's whole claim is that its screenshots are
 * real, so an invented dashboard must not be mistakable for one: no product name,
 * no plausible-looking figures presented as data, and an explicit caption saying
 * it is an illustration. The real screens are two clicks away on /projects.
 *
 * Everything animates via CSS on `transform`, `opacity` and `stroke-dashoffset`
 * only, so it stays on the compositor and needs no JavaScript at all — nothing
 * here can stall the way an `AnimatePresence` exit does. Under
 * `prefers-reduced-motion` every animation is disabled and the panel renders as a
 * still composition, which is why each element's resting state is its finished
 * state rather than its starting one.
 */

/** Bars for the little column chart. Heights are percentages of the plot area. */
const BARS = [38, 52, 44, 68, 58, 82, 71];

/** The sparkline path, drawn once and then re-drawn on a slow loop. */
const SPARK =
  "M0 46 L26 38 L52 41 L78 28 L104 33 L130 18 L156 24 L182 10 L208 15 L234 4";

export function IntroDashboardAnimated() {
  return (
    <div className="relative">
      {/*
        A soft wash behind the panel, inset only a little: an earlier version used
        `-inset-8`, which on a 327px-wide frame measured 391px and put horizontal
        scroll on the whole page at 375.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-3xl bg-primary/8 blur-2xl sm:-inset-6"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_70px_-40px_rgb(0_0_0/0.45)]">
        {/* ---- Window chrome ---- */}
        <div className="flex items-center gap-2 border-b border-border bg-background-subtle px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-destructive/50" />
            <span className="size-2 rounded-full bg-primary/40" />
            <span className="size-2 rounded-full bg-success/50" />
          </span>
          <span className="ml-1 font-mono text-[0.75rem] text-muted-foreground">
            plutox · overview
          </span>
          {/* A slow pulse is the only thing that says "live" without a fake number. */}
          <span className="ml-auto flex items-center gap-1.5">
            <span className="dash-pulse size-1.5 rounded-full bg-success" aria-hidden />
            <span className="font-mono text-[0.75rem] text-muted-foreground">live</span>
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:p-5">
          {/* ---- KPI row ---- */}
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((tile) => (
              <div
                key={tile}
                className="dash-rise rounded-lg border border-border bg-background/60 p-2.5"
                style={{ animationDelay: `${tile * 120}ms` }}
              >
                {/* Skeleton bars, not numbers — an invented figure on a company
                    site reads as a real claim, and this one would be a lie. */}
                <span className="block h-1.5 w-8 rounded-full bg-muted-foreground/25" />
                <span
                  className="dash-grow mt-2 block h-2.5 rounded-full bg-foreground/70"
                  style={{
                    width: ["68%", "52%", "80%"][tile],
                    animationDelay: `${300 + tile * 120}ms`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* ---- Sparkline ---- */}
          <div className="rounded-lg border border-border bg-background/60 p-3">
            <div className="flex items-baseline justify-between">
              <span className="block h-1.5 w-14 rounded-full bg-muted-foreground/25" />
              <span className="block h-1.5 w-6 rounded-full bg-primary/50" />
            </div>
            <svg
              viewBox="0 0 234 50"
              className="mt-2.5 h-14 w-full"
              fill="none"
              aria-hidden
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${SPARK} L234 50 L0 50 Z`}
                fill="url(#dash-fill)"
                className="dash-fade"
              />
              <path
                d={SPARK}
                stroke="var(--brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dash-draw"
              />
              {/* The travelling dot rides the same slow cycle as the line. */}
              <circle r="3" fill="var(--brand)" className="dash-dot">
                <animateMotion dur="7s" repeatCount="indefinite" path={SPARK} />
              </circle>
            </svg>
          </div>

          {/* ---- Column chart + donut ---- */}
          {/*
            Side by side at every width, not just `sm` and up. Stacked, this row
            added ~90px and left the whole mock rendering portrait — a shape no
            real dashboard has, which undercut the one thing the visual is for.
          */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2.5">
            <div className="rounded-lg border border-border bg-background/60 p-3">
              <span className="block h-1.5 w-10 rounded-full bg-muted-foreground/25" />
              <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden>
                {BARS.map((height, bar) => (
                  <span
                    key={bar}
                    className="dash-bar flex-1 rounded-t-sm bg-foreground/15"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${bar * 90}ms`,
                      backgroundColor:
                        bar === BARS.length - 2 ? "var(--brand)" : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid place-items-center rounded-lg border border-border bg-background/60 p-3">
              <svg viewBox="0 0 44 44" className="size-16" aria-hidden>
                <circle
                  cx="22"
                  cy="22"
                  r="17"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="6"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="17"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  transform="rotate(-90 22 22)"
                  className="dash-ring"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/*
        Said plainly. The page next to this one insists every screenshot is real,
        and that claim only holds if the one illustration admits what it is.
      */}
      <p className="mt-4 text-center text-[0.75rem] text-muted-foreground lg:text-left">
        An illustration, not a screenshot — the real screens are on{" "}
        <Link
          href="/projects"
          className="link-underline font-medium text-foreground"
        >
          our projects page
        </Link>
        .
      </p>
    </div>
  );
}
