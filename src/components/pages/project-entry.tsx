"use client";

import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Panel } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Screenshot gallery.
 *
 * One large frame plus a thumbnail strip: at grid size these dense dashboards
 * are illegible, so one is shown big enough to read while the rest stay a click
 * away. Screens are `object-contain` on a white plate — cropping a UI
 * screenshot to fill a box discards the chrome that makes it readable.
 *
 * The frame fades on mount via a CSS animation keyed to the source. Deliberately
 * not `AnimatePresence`: `mode="wait"` holds the outgoing image until its exit
 * animation finishes, so if rAF stalls (backgrounded tab, heavy main-thread
 * work) the gallery silently stops advancing. A mount-only CSS fade cannot.
 */
function ScreenGallery({
  product,
  screens,
}: {
  product: Product;
  screens: NonNullable<Product["screens"]>;
}) {
  const [index, setIndex] = React.useState(0);
  const count = screens.length;
  const active = screens[index];

  const go = React.useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="image-zoom rounded-lg border border-border bg-white">
        <div className="relative aspect-16/10">
          <div
            key={active.src}
            className="absolute inset-0 animate-in fade-in duration-300"
          >
            <Image
              src={active.src}
              alt={`${product.name} — ${active.label}: ${active.caption}`}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-contain"
              unoptimized={active.src.endsWith(".svg")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{active.label}</p>
            <p className="truncate text-[0.6875rem] text-muted-foreground">
              {active.caption}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <span className="mr-1 font-mono text-[0.625rem] text-muted-foreground">
              {index + 1}/{count}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={`Previous ${product.name} screenshot`}
              className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={`Next ${product.name} screenshot`}
              className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-6 gap-1.5">
        {screens.map((screen, thumb) => (
          <li key={screen.src}>
            <button
              type="button"
              onClick={() => setIndex(thumb)}
              aria-label={`Show ${screen.label}`}
              aria-current={thumb === index}
              className={cn(
                "relative block w-full overflow-hidden rounded border bg-white outline-none",
                "transition-[transform,opacity,border-color] duration-200 ease-out",
                "hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring",
                thumb === index
                  ? "border-primary"
                  : "border-border opacity-50 hover:opacity-100",
              )}
            >
              <span className="relative block aspect-16/10">
                <Image
                  src={screen.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain"
                  unoptimized={screen.src.endsWith(".svg")}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Delivery roadmap, shown in place of the gallery while a product is still being
 * built.
 *
 * The alternative was a screenshot of an unfinished console or an invented
 * mockup, and the page's entire claim is that nothing on it is a mockup. A phase
 * list is also the more useful answer to the question a visitor actually has:
 * what works today, and what doesn't yet.
 */
function Roadmap({
  phases,
  brandColor,
}: {
  phases: NonNullable<Product["roadmap"]>;
  brandColor: string;
}) {
  const shipped = phases.filter((phase) => phase.state === "done").length;

  return (
    <Panel className="p-5">
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
        <p className="eyebrow text-muted-foreground">Delivery roadmap</p>
        <p className="font-mono text-[0.625rem] text-muted-foreground">
          {shipped} of {phases.length} shipped
        </p>
      </div>

      {/* Progress rail. Transform-only, and it reads the same figure as the
          count above so the two can never disagree. */}
      <div
        aria-hidden
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full origin-left rounded-full transition-transform duration-700 ease-out"
          style={{
            backgroundColor: brandColor,
            transform: `scaleX(${shipped / phases.length})`,
          }}
        />
      </div>

      <ol className="mt-5 flex flex-col">
        {phases.map((phase) => (
          <li
            key={phase.label}
            className="group/rd flex gap-3 border-b border-border py-3 last:border-0"
          >
            <span
              aria-hidden
              className={cn(
                "mt-1 size-2 shrink-0 rounded-full transition-transform duration-300 group-hover/rd:scale-125",
                phase.state === "planned" && "bg-border",
              )}
              style={
                phase.state === "planned"
                  ? undefined
                  : {
                      backgroundColor:
                        phase.state === "done" ? brandColor : "transparent",
                      boxShadow:
                        phase.state === "next"
                          ? `inset 0 0 0 1.5px ${brandColor}`
                          : undefined,
                    }
              }
            />

            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[0.625rem] text-muted-foreground">
                  {phase.label}
                </span>
                <span className="text-sm font-semibold">{phase.title}</span>
                {phase.state === "next" ? (
                  <span
                    className="rounded border px-1.5 py-0.5 font-mono text-[0.5625rem]"
                    style={{
                      color: brandColor,
                      borderColor: `${brandColor}55`,
                    }}
                  >
                    in progress
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {phase.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/**
 * One product, in full: logo, specs, gallery, headline features, the complete
 * module breakdown, stack and payment rails.
 *
 * `brandColor` is the product's own colour and is used only for its rules and
 * tagline — enough for each product to keep its identity without any of them
 * fighting the Plutox palette.
 */
export function ProjectEntry({ product }: { product: Product }) {
  const moduleCount = product.moduleGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <article id={product.slug} className="scroll-mt-24">
      {/* ---------------- Header ---------------- */}
      <Reveal preset="fadeUp">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: product.brandColor }}
              />
              <span className="eyebrow text-muted-foreground">
                {product.category}
              </span>
              {product.badge ? (
                <span className="rounded border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                  {product.badge}
                </span>
              ) : null}

              {/*
                Only in-development products get a status pill. Labelling the
                other four "shipped" would be noise — and the absence of the pill
                has to mean shipped, or the page starts implying that everything
                unlabelled might be vapour.
              */}
              {product.status === "in-development" ? (
                <span
                  className="rounded border px-2 py-0.5 font-mono text-[0.625rem]"
                  style={{
                    color: product.brandColor,
                    borderColor: `${product.brandColor}55`,
                  }}
                >
                  In development
                </span>
              ) : null}
            </div>

            {/*
              The product name is a real <h2> wrapping the logo, not a bare
              image. The logo alone would leave the page with no heading between
              h1 and the h3 module groups — so the document outline would skip a
              level and there'd be nothing for a screen reader to navigate by.
              The alt text carries the name; the plate keeps the artwork's own
              colours true against the dark canvas.
            */}
            <h2 className="mt-5 inline-flex items-center rounded-lg border border-border bg-white px-4 py-3">
              <Image
                src={product.image}
                alt={product.name}
                width={480}
                height={480}
                className={cn(
                  "w-auto object-contain",
                  // A stacked lock-up is a mark sitting above a wordmark, so at
                  // the horizontal wordmarks' height the words become unreadable.
                  // Roughly double the height evens up the optical weight.
                  product.logoLayout === "stacked"
                    ? "h-14 sm:h-16"
                    : "h-6 sm:h-7",
                )}
              />
            </h2>

            <p
              className="mt-5 font-display text-xl font-semibold tracking-tight sm:text-2xl"
              style={{ color: product.brandColor }}
            >
              {product.tagline}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <p className="mt-4 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Built for</span>{" "}
              {product.audience}
            </p>
          </div>

          {/* Spec figures, in mono to read as data rather than marketing. */}
          <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-4">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dd className="font-mono text-lg leading-none font-medium">
                  {spec.value}
                </dd>
                <dt className="mt-1.5 text-[0.625rem] leading-tight text-muted-foreground">
                  {spec.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* ---------------- Gallery (or roadmap) + headline features ---------------- */}
      <div className="grid gap-8 border-b border-border py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        <Reveal preset="fadeUp" className="min-w-0">
          {product.screens?.length ? (
            <ScreenGallery product={product} screens={product.screens} />
          ) : product.roadmap?.length ? (
            <Roadmap phases={product.roadmap} brandColor={product.brandColor} />
          ) : null}
        </Reveal>

        <Reveal preset="fadeUp" delay={0.08} className="flex flex-col">
          <p className="eyebrow text-muted-foreground">At a glance</p>
          <ul className="mt-4 grid gap-2.5">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0"
                  style={{ color: product.brandColor }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {product.metric ? (
            <Panel className="mt-6 flex items-baseline gap-3 p-4">
              <span className="font-mono text-lg font-medium">
                {product.metric.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {product.metric.label}
              </span>
            </Panel>
          ) : null}

          <div className="mt-6">
            <p className="eyebrow text-muted-foreground">Built with</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {product.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {product.payments?.length ? (
            <div className="mt-5">
              <p className="eyebrow text-muted-foreground">Payments</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {product.payments.join(" · ")}
              </p>
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Button asChild size="md">
              <Link href={product.demoUrl}>
                Book a demo
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/skills">See the stack behind it</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* ---------------- Full module breakdown ---------------- */}
      <div className="py-8">
        <Reveal preset="fadeUp">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="eyebrow text-muted-foreground">
              Every module, in detail
            </p>
            {/*
              Counted from the data rather than written in, so the figure can
              never drift out of step with the list printed underneath it.

              "Capabilities", not "modules": the breakdown also covers things
              that aren't sidebar modules — ServeSync's five field apps, for
              instance — so this figure is deliberately not the same number as
              the module count in the badge and specs.
            */}
            <p className="font-mono text-[0.6875rem] text-muted-foreground/70">
              {moduleCount} capabilities across {product.moduleGroups.length}{" "}
              areas
            </p>
          </div>
        </Reveal>

        {/*
          Four groups get a 2×2 then 4-up layout; three stay on the 3-up.
          Column count follows the data so no product ends up with a stray
          empty column, and the breakpoint is `xl` for four because at `lg`
          these columns get too narrow for the module descriptions to read.
        */}
        <div
          className={cn(
            "mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2",
            product.moduleGroups.length >= 4
              ? "xl:grid-cols-4"
              : "lg:grid-cols-3",
          )}
        >
          {product.moduleGroups.map((group) => (
            <Reveal key={group.title} preset="fadeUp">
              <section className="group/mg">
                <h3
                  className="eyebrow flex items-baseline justify-between gap-2 border-b pb-2 transition-colors"
                  style={{
                    color: product.brandColor,
                    borderColor: `${product.brandColor}33`,
                  }}
                >
                  {group.title}
                  <span className="font-mono text-[0.625rem] opacity-60">
                    {group.items.length}
                  </span>
                </h3>
                <dl className="mt-4 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <div key={item.name}>
                      <dt className="text-sm font-semibold">{item.name}</dt>
                      <dd className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {item.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
