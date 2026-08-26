import { Check } from "lucide-react";
import Link from "next/link";

import { Panel } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * A product's subscription tiers.
 *
 * Every figure is the price the product itself bills — the seeded fee or the
 * documented package price in its own repository, not a number invented for a
 * marketing page. That is the only reason it is safe to print at all.
 *
 * One tier may be `featured`; it takes the product's own brand colour rather than
 * the Plutox violet, so a page showing several products doesn't end up with five
 * identically-highlighted columns.
 */
/**
 * A product's pricing, one chart per edition.
 *
 * ServeSync prices three editions; the other products carry a single chart. The
 * charts are stacked rather than tabbed: a tab hides two thirds of the pricing
 * behind a click, and on a phone the tab strip itself costs more room than the
 * heading it would save.
 */
export function PricingTable({
  pricing,
  brandColor,
  productName,
}: {
  pricing: NonNullable<Product["pricing"]>;
  brandColor: string;
  productName: string;
}) {
  const multi = pricing.length > 1;

  return (
    <div className={cn(multi && "grid gap-12 sm:gap-14")}>
      {pricing.map((chart) => (
        <PricingChart
          key={chart.edition ?? productName}
          chart={chart}
          brandColor={brandColor}
          productName={productName}
          showEdition={multi}
        />
      ))}
    </div>
  );
}

function PricingChart({
  chart,
  brandColor,
  productName,
  showEdition,
}: {
  chart: NonNullable<Product["pricing"]>[number];
  brandColor: string;
  productName: string;
  showEdition: boolean;
}) {
  const { note, plans, edition, editionSummary } = chart;

  // Text takes the theme-corrected variant; borders and ticks keep the raw brand
  // colour, where contrast rules do not apply. See --product-ink in globals.css.
  const ink = "var(--product-ink)";

  return (
    <div>
      <Reveal preset="fadeUp">
        {showEdition && edition ? (
          /*
            The edition name is the heading when there is more than one chart —
            without it, three identically-priced tables read as a mistake.
          */
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-border pb-3">
            <span
              aria-hidden
              className="h-px w-6 shrink-0"
              style={{ backgroundColor: brandColor }}
            />
            <h3
              className="font-display text-base font-semibold tracking-tight"
              style={{ color: ink }}
            >
              {edition}
            </h3>
            {editionSummary ? (
              <p className="w-full text-[0.8125rem] leading-relaxed text-muted-foreground sm:w-auto sm:flex-1">
                {editionSummary}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="eyebrow text-muted-foreground">
            {showEdition ? "Packages" : "Packages & pricing"}
          </p>
          <p className="font-mono text-[0.75rem] text-muted-foreground/70">
            {plans.length === 1 ? "one plan" : `${plans.length} plans`}
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      </Reveal>

      <div
        className={cn(
          "mt-6 grid gap-4",
          plans.length === 1
            ? "max-w-md"
            : plans.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {plans.map((plan, position) => (
          <Reveal
            key={plan.name}
            preset="fadeUp"
            delay={position * 0.06}
            className="h-full"
          >
            <Panel
              className="flex h-full flex-col p-6"
              style={
                plan.featured
                  ? { borderColor: `${brandColor}66` }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className="eyebrow"
                  style={{ color: plan.featured ? ink : undefined }}
                >
                  {plan.name}
                </p>
                {plan.featured ? (
                  <span
                    className="rounded border px-1.5 py-0.5 font-mono text-[0.75rem]"
                    style={{ color: ink, borderColor: `${brandColor}55` }}
                  >
                    most taken
                  </span>
                ) : null}
              </div>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  {plan.period}
                </span>
              </p>

              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {plan.summary}
              </p>

              <ul className="mt-5 grid gap-2">
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0"
                      style={{ color: ink }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.featured ? "primary" : "outline"}
                size="md"
                className="mt-auto w-full pt-0 [margin-top:auto]"
              >
                <Link href="/contact">Enquire</Link>
              </Button>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal preset="fadeUp">
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Prices are what {productName} bills today and exclude hardware,
          on-site installation and data migration — those are quoted per outlet
          once we know what you already have.
        </p>
      </Reveal>
    </div>
  );
}
