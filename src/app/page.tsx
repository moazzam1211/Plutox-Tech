import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IntroDashboardAnimated } from "@/components/pages/intro-dashboard-animated";
import {
  Block,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { routes, secondaryRoutes } from "@/data/navigation";
import {
  buildCategories,
  differentiators,
  industries,
  technologies,
} from "@/data/positioning";
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
/*
  Counted from the product data rather than typed. The strip used to say "3
  platforms / 93 modules" and both went stale the moment a product was added,
  which is exactly the kind of number a visitor checks against the page below it.
*/
const moduleTotal = products.reduce((total, product) => {
  const spec = product.specs.find((entry) => /module/i.test(entry.label));
  return total + (spec ? Number.parseInt(spec.value.replace(/[^0-9]/g, ""), 10) || 0 : 0);
}, 0);
const screenTotal = products.reduce(
  (total, product) => total + (product.screens?.length ?? 0),
  0,
);

export default function IntroPage() {
  return (
    <>
      {/* ---------------- Statement ---------------- */}
      <section className="relative isolate overflow-hidden border-b border-border">
        {/*
          A dot field rather than the grid used on every other page header, so the
          intro reads as its own place. Masked from the bottom so it dissolves
          into the section below instead of stopping at a hard edge.
        */}
        <div
          aria-hidden
          className="bg-dots mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-80"
        />

        <div className="grid items-center gap-10 px-6 py-12 sm:gap-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 lg:px-14 lg:py-28">
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
            <h1 className="mt-6 max-w-4xl text-display-xl font-semibold sm:mt-10">
              Software that runs{" "}
              {/* Explicit space before the break so `h1.textContent` reads as a
                  sentence for crawlers and copy-paste, not "runsyour". */}
              <br />
              your business.
            </h1>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8">
              We design and build POS, ERP, hospitality, logistics, AI and custom
              business platforms — from first idea to daily operations. Five of
              them are ours, built here in Lahore and running real businesses.
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.18}>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10">
              <Button asChild variant="accent" size="lg">
                <Link href="/products">
                  Explore our products
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">Book a free consultation</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.24}>
            <StatStrip
              className="mt-9 border-t pt-4 sm:mt-14"
              items={[
                { value: String(products.length), label: "Platforms built" },
                { value: String(moduleTotal), label: "Live modules" },
                { value: String(screenTotal), label: "Real screenshots" },
                { value: siteConfig.founded, label: "Founded" },
              ]}
            />
          </Reveal>
          </div>

          {/* ---- Dashboard column ---- */}
          <Reveal preset="fadeUp" delay={0.3} className="lg:pl-4">
            <IntroDashboardAnimated />
          </Reveal>
        </div>
      </section>

      {/* ---------------- The products ---------------- */}
      <Block
        label="What we've built"
        title="Six platforms"
        description="Each one designed and built by us — not resold, not white-labelled. Five are shipped and running; Plutox ID is live inside Fleet Flow with key rotation still to come."
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
                        textContent reading "ServeSync ERPRestaurant" for
                        crawlers, screen readers and copy-paste. */}{" "}
                    <span className="font-normal text-muted-foreground">
                      {product.category}
                    </span>
                    {product.status === "in-development" ? (
                      <>
                        {" "}
                        <span className="rounded border border-border px-1.5 py-0.5 align-middle font-mono text-[0.75rem] font-normal text-muted-foreground">
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

      {/* ---------------- Industries ---------------- */}
      <Block
        label="Who it is for"
        title="Six trades, one company"
        description="Every card names the products that serve it, because an industry list nobody has shipped into is decoration."
      >
        <RevealGroup stagger={0.06} className="grid gap-3 sm:grid-cols-2">
          {industries.map(({ name, icon: Icon, problem, answer, served }) => (
            <RevealItem key={name}>
              <Panel className="group/ind flex h-full flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary transition-colors duration-300 group-hover/ind:border-primary/40">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-display text-sm font-semibold tracking-tight">
                    {name}
                  </h3>
                </div>

                <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {problem}
                </p>
                <p className="mt-2.5 border-l-2 border-primary/30 pl-3 text-[0.8125rem] leading-relaxed">
                  {answer}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {served.map((slug) => {
                    const product = products.find((p) => p.slug === slug);
                    if (!product) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="hover-lift inline-flex rounded border border-border px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {product.name}
                      </Link>
                    );
                  })}
                </div>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      {/* ---------------- What we build ---------------- */}
      <Block
        label="What we build"
        title="Four kinds of work"
        description="Business software first. The rest exists because a platform needs a phone app, an integration and somewhere to run."
      >
        <RevealGroup stagger={0.06} className="grid gap-3 sm:grid-cols-2">
          {buildCategories.map(({ name, blurb, items }) => (
            <RevealItem key={name}>
              <Panel className="flex h-full flex-col p-5">
                <h3 className="font-display text-sm font-semibold tracking-tight">
                  {name}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
                <ul className="mt-4 grid gap-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[0.8125rem] text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="fadeUp" delay={0.1}>
          <div className="mt-6">
            <Button asChild variant="outline" size="md">
              <Link href="/services">
                Consultancy and delivery
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Block>

      {/* ---------------- Why Plutox ---------------- */}
      <Block
        label="Why us"
        title="Not just developers"
        description="Your technology partner — which mostly means we are still reachable after the invoice."
      >
        <RevealGroup stagger={0.06} className="flex flex-col">
          {differentiators.map(({ title, detail, icon: Icon }) => (
            <RevealItem key={title}>
              <div className="group/why grid gap-3 border-b border-border py-5 transition-colors first:border-t hover:bg-muted/30 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary transition-[transform,border-color] duration-300 group-hover/why:-translate-y-0.5 group-hover/why:border-primary/40">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      {/* ---------------- Technology ---------------- */}
      <Block
        label="Technology"
        title="What it runs on"
        description="Counted from the products themselves — the number beside each is how many of the five are built with it. Nothing on this list is here for decoration."
      >
        <RevealGroup stagger={0.02} className="flex flex-wrap gap-2">
          {technologies.map(({ name, usedBy }) => (
            <RevealItem key={name}>
              <span
                title={`Used in ${usedBy.join(", ")}`}
                className="hover-lift inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[0.8125rem] transition-colors duration-300 hover:border-primary/40"
              >
                {name}
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  {usedBy.length}
                </span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="fadeUp" delay={0.1}>
          <div className="mt-6">
            <Button asChild variant="outline" size="md">
              <Link href="/skills">
                The stack in detail
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
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

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative isolate overflow-hidden border-b border-border px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <div
          aria-hidden
          className="bg-dots mask-fade-t pointer-events-none absolute inset-0 -z-10 opacity-70"
        />
        <Reveal preset="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-sm font-semibold tracking-tight">
              Have a business problem that software can solve?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Tell us what the day looks like now and where it breaks. Thirty
              minutes, free, and you will get an honest answer about whether we
              are the right people for it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/demo">
                  Book a free consultation
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">Explore our work</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <Pager current="/" />
    </>
  );
}
