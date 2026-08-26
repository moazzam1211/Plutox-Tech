import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IntroDashboard } from "@/components/pages/intro-dashboard";
import {
  Block,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { routes, secondaryRoutes } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Intro.
 *
 * Deliberately short: a statement, the products as a compact index, the
 * headline numbers, then an index into the rest of the site. Everything
 * that used to be crammed into an eighteen-section landing page now has its own
 * page, which is the whole point of the restructure.
 */
export default function IntroPage() {
  return (
    <>
      {/* ---------------- Statement ---------------- */}
      <section className="border-b border-border">
        <div className="grid items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 lg:px-14 lg:py-28">
          {/* ---- Copy column ---- */}
          <div>
          <Reveal preset="fadeUp">
            {/* No page number here any more — it matched the navbar, headers and
                pager indices, all of which were removed. The rule now leads. */}
            <div className="flex items-center gap-4">
              <span className="h-px w-16 origin-left bg-border animate-sweep" />
              <span className="eyebrow text-muted-foreground">
                Plutox Tech · Lahore, Pakistan
              </span>
            </div>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.06}>
            <h1 className="mt-10 max-w-4xl text-display-xl font-semibold">
              We build the software{" "}
              {/* Explicit space before the break so `h1.textContent` reads as a
                  sentence for crawlers and copy-paste, not "softwarebusinesses". */}
              <br />
              businesses actually run on.
            </h1>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.12}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A founder-led software house building point-of-sale, ERP,
              hospitality and logistics platforms — four already built, deployed
              and running real businesses, with a fifth in build.{" "}
              {siteConfig.tagline}
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/projects">
                  See the platforms
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.24}>
            <StatStrip
              className="mt-14 border-t pt-4"
              items={[
                { value: "4", label: "Products built & deployed" },
                { value: "60+", label: "Live modules across them" },
                { value: "2022", label: "Founded in Lahore" },
                { value: "24/7", label: "Support availability" },
              ]}
            />
          </Reveal>
          </div>

          {/* ---- Dashboard column ---- */}
          <Reveal preset="fadeUp" delay={0.3} className="lg:pl-4">
            <IntroDashboard />
          </Reveal>
        </div>
      </section>

      {/* ---------------- The products ---------------- */}
      <Block
        label="What we've built"
        title="Three platforms"
        description="Each one designed and built by us — not resold, not white-labelled. All three are shipped and running, and ServeSync alone covers restaurants, pharmacies and marts."
      >
        <RevealGroup stagger={0.07} className="flex flex-col">
          {products.map((product) => (
            <RevealItem key={product.slug}>
              <Link
                href={`/projects#${product.slug}`}
                className="group/prod sheen-on-hover grid items-center gap-5 border-b border-border py-6 transition-colors first:border-t hover:bg-muted/40 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:gap-6"
              >

                {/*
                  Logo on a white plate so each product's own colours stay true.
                  The plate lifts and the wordmark grows a shade on hover, so the
                  row reads as one object reacting rather than three.

                  Stacked lock-ups (a mark above a wordmark) need roughly double
                  the height of a horizontal wordmark to stay legible.
                */}
                <span className="inline-flex w-fit items-center rounded-md border border-border bg-white px-3 py-2 transition-[transform,border-color] duration-300 ease-out group-hover/prod:-translate-y-0.5 group-hover/prod:border-primary/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={480}
                    className={cn(
                      "w-auto object-contain transition-transform duration-500 ease-out group-hover/prod:scale-[1.04]",
                      product.logoLayout === "stacked" ? "h-10" : "h-5",
                    )}
                  />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    {product.name}
                    {/* Explicit space: `ml-2` puts a visual gap here but leaves
                        textContent reading "ServeSync POSRestaurant" for
                        crawlers, screen readers and copy-paste. */}{" "}
                    <span className="font-normal text-muted-foreground">
                      {product.category}
                    </span>
                    {product.status === "in-development" ? (
                      <>
                        {" "}
                        <span className="rounded border border-border px-1.5 py-0.5 align-middle font-mono text-[0.6875rem] font-normal text-muted-foreground">
                          in development
                        </span>
                      </>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {product.tagline}
                  </span>
                </span>

                <ArrowUpRight className="hidden size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover/prod:translate-x-0.5 group-hover/prod:-translate-y-0.5 group-hover/prod:text-primary sm:block" />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      {/* ---------------- Site index ---------------- */}
      <Block
        label="This site"
        title="Every page"
        description="No endless scroll. Each page answers one question."
        last
      >
        <RevealGroup stagger={0.05} className="grid gap-3 sm:grid-cols-2">
          {[...routes.slice(1), ...secondaryRoutes].map((route) => (
            <RevealItem key={route.href}>
              <Link href={route.href} className="block h-full">
                <Panel
                  interactive
                  className="group/idx flex h-full flex-col p-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {route.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {route.summary}
                    </span>
                  </span>
                  <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover/idx:translate-x-0.5 group-hover/idx:-translate-y-0.5 group-hover/idx:text-primary" />
                </Panel>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      <Pager current="/" />
    </>
  );
}
