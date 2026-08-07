import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Block,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { routes } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";

/**
 * Intro — page 01.
 *
 * Deliberately short: a statement, the four products as a compact index, the
 * headline numbers, then a route index into the rest of the site. Everything
 * that used to be crammed into an eighteen-section landing page now has its own
 * page, which is the whole point of the restructure.
 */
export default function IntroPage() {
  return (
    <>
      {/* ---------------- Statement ---------------- */}
      <section className="border-b border-border">
        <div className="px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <Reveal preset="fadeUp">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.25em] text-primary">
                01
              </span>
              <span className="h-px w-16 bg-border" />
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
              A founder-led software house building point-of-sale, ERP and
              hospitality platforms — four of them already built, deployed and
              running real businesses. {siteConfig.tagline}
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/projects">
                  See the four platforms
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
              className="mt-16 max-w-3xl border-t pt-4"
              items={[
                { value: "4", label: "Products built & deployed" },
                { value: "60+", label: "Live modules across them" },
                { value: "2022", label: "Founded in Lahore" },
                { value: "24/7", label: "Support availability" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- The four products ---------------- */}
      <Block
        label="What we've built"
        title="Four platforms"
        description="Each one designed, built and shipped by us — not resold, not white-labelled."
      >
        <RevealGroup stagger={0.07} className="flex flex-col">
          {products.map((product, index) => (
            <RevealItem key={product.slug}>
              <Link
                href={`/projects#${product.slug}`}
                className="group/prod grid items-center gap-5 border-b border-border py-6 transition-colors first:border-t hover:bg-muted/40 sm:grid-cols-[3rem_11rem_minmax(0,1fr)_auto] sm:gap-6"
              >
                <span className="font-mono text-[0.6875rem] text-muted-foreground/70 transition-colors group-hover/prod:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Logo on a white plate so each product's own colours stay true. */}
                <span className="inline-flex w-fit items-center rounded-md border border-border bg-white px-3 py-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={480}
                    height={96}
                    className="h-5 w-auto object-contain"
                  />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    {product.name}
                    <span className="ml-2 font-normal text-muted-foreground">
                      {product.category}
                    </span>
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
        title="Seven pages"
        description="No endless scroll. Each page answers one question."
        last
      >
        <RevealGroup stagger={0.05} className="grid gap-3 sm:grid-cols-2">
          {routes.slice(1).map((route) => (
            <RevealItem key={route.href}>
              <Link href={route.href} className="block h-full">
                <Panel
                  interactive
                  className="group/idx flex h-full items-start gap-4 p-5"
                >
                  <span className="font-mono text-[0.6875rem] text-muted-foreground/70 transition-colors group-hover/idx:text-primary">
                    {route.index}
                  </span>
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
