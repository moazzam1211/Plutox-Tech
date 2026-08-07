import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Reveal } from "@/components/shared/reveal";
import { getAdjacentRoutes } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * The building blocks of the new UI language.
 *
 * The previous design leaned on glass, blur, gradient blobs, cursor spotlights
 * and 3D tilt. This one is deliberately flat and typographic: hairline rules,
 * square-ish panels, monospace index numbers and generous whitespace. The
 * colour tokens are unchanged — only the surface treatment and layout are.
 */

/* ------------------------------------------------------------------ */
/* Page header                                                        */
/* ------------------------------------------------------------------ */

interface PageHeaderProps {
  /** Two-digit route index, e.g. "02". */
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  children?: React.ReactNode;
}

/**
 * The top of every page. The oversized index number anchors the reader in a
 * seven-page sequence, which a conventional breadcrumb doesn't do as directly.
 */
export function PageHeader({
  index,
  eyebrow,
  title,
  lede,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <Reveal preset="fadeUp">
          <div className="flex items-center gap-4">
            <span className="relative font-mono text-xs tracking-[0.25em] text-primary">
              {/* Slow accent glow behind the page number. */}
              <span
                aria-hidden
                className="absolute -inset-2 -z-10 rounded-full bg-primary/20 blur-md animate-breathe"
              />
              {index}
            </span>
            {/* The rule draws itself in from the left on load. */}
            <span className="h-px flex-1 origin-left bg-border animate-sweep" />
            <span className="eyebrow text-muted-foreground">{eyebrow}</span>
          </div>
        </Reveal>

        <Reveal preset="fadeUp" delay={0.06}>
          <h1 className="mt-8 max-w-4xl text-display-lg font-semibold">
            {title}
          </h1>
        </Reveal>

        <Reveal preset="fadeUp" delay={0.12}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        </Reveal>

        {children ? (
          <Reveal preset="fadeUp" delay={0.18} className="mt-9">
            {children}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Block — a titled content region                                    */
/* ------------------------------------------------------------------ */

interface BlockProps {
  /** Small label in the left column on large screens. */
  label?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  /** Remove the bottom rule (use on the last block of a page). */
  last?: boolean;
}

/**
 * A page region with its label in a narrow left column and the content on the
 * right — a two-column editorial rhythm that replaces the old centred
 * section-heading stack, and reads much faster when scanning.
 */
export function Block({
  label,
  title,
  description,
  className,
  children,
  last = false,
}: BlockProps) {
  return (
    <section
      className={cn(
        "px-6 py-14 sm:px-10 lg:px-14 lg:py-20",
        !last && "border-b border-border",
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
        {label || title || description ? (
          <div className="lg:sticky lg:top-28 lg:self-start">
            {label ? (
              <Reveal preset="fadeUp">
                <p className="eyebrow text-primary">{label}</p>
              </Reveal>
            ) : null}
            {title ? (
              <Reveal preset="fadeUp" delay={0.05}>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {title}
                </h2>
              </Reveal>
            ) : null}
            {description ? (
              <Reveal preset="fadeUp" delay={0.1}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </Reveal>
            ) : null}
          </div>
        ) : (
          <div aria-hidden className="hidden lg:block" />
        )}

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Panel — the flat surface that replaces the glass card              */
/* ------------------------------------------------------------------ */

export function Panel({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card",
        // `hover-lift` + `sheen-on-hover` are transform/opacity only, so the
        // hover stays on the compositor and never triggers layout.
        interactive &&
          "hover-lift sheen-on-hover hover:border-primary/40 hover:bg-muted/40",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Definition row — the workhorse list item                           */
/* ------------------------------------------------------------------ */

/**
 * A numbered row: index, term, detail. Used for services, modules and skills —
 * one pattern instead of the old mix of icon cards, bento tiles and accordions.
 */
export function DefRow({
  index,
  term,
  detail,
  className,
}: {
  index?: string;
  term: string;
  detail: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/row grid gap-2 border-b border-border py-5 last:border-0 sm:grid-cols-[3rem_14rem_minmax(0,1fr)] sm:gap-6",
        className,
      )}
    >
      {index ? (
        <span className="relative font-mono text-[0.6875rem] text-muted-foreground/70 transition-colors group-hover/row:text-primary">
          {/* Accent tick that grows out of the index on hover. */}
          <span
            aria-hidden
            className="absolute top-1/2 -left-3 h-3 w-0.5 origin-center -translate-y-1/2 scale-y-0 bg-primary transition-transform duration-200 group-hover/row:scale-y-100"
          />
          {index}
        </span>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      <h3 className="text-sm font-semibold">{term}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pager — prev / next through the seven pages                        */
/* ------------------------------------------------------------------ */

/**
 * Sequential navigation at the foot of every page.
 *
 * With only seven pages, a prev/next pager is a better model than a footer
 * sitemap: it invites the visitor to read the whole site in order.
 */
export function Pager({ current }: { current: string }) {
  const { previous, next } = getAdjacentRoutes(current);

  return (
    <nav
      aria-label="Page navigation"
      className="grid border-t border-border sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group/pg sheen-on-hover flex items-center gap-4 border-b border-border px-6 py-8 transition-colors hover:bg-muted/40 sm:border-b-0 sm:border-r sm:px-10 lg:px-14"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:-translate-x-1 group-hover/pg:text-primary" />
          <span className="min-w-0">
            <span className="block text-[0.6875rem] text-muted-foreground">
              Previous · {previous.index}
            </span>
            <span className="block truncate font-display text-base font-semibold">
              {previous.label}
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block sm:border-r sm:border-border" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group/pg sheen-on-hover flex items-center justify-end gap-4 px-6 py-8 text-right transition-colors hover:bg-muted/40 sm:px-10 lg:px-14"
        >
          <span className="min-w-0">
            <span className="block text-[0.6875rem] text-muted-foreground">
              Next · {next.index}
            </span>
            <span className="block truncate font-display text-base font-semibold">
              {next.label}
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:translate-x-1 group-hover/pg:text-primary" />
        </Link>
      ) : null}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Stat strip                                                         */
/* ------------------------------------------------------------------ */

/** A row of figures separated by hairlines, no cards. */
export function StatStrip({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 divide-border border-border sm:grid-cols-4 sm:divide-x",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="px-0 py-4 sm:px-6 sm:first:pl-0">
          <dd className="font-display text-2xl leading-none font-semibold">
            {item.value}
          </dd>
          <dt className="mt-2 text-xs leading-tight text-muted-foreground">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
