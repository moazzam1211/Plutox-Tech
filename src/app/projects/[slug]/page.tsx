import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PricingTable } from "@/components/pages/pricing-table";
import { ScreenGallery } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import {
  breadcrumbJsonLd,
  buildMetadata,
  softwareApplicationJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Every product, fixed list — prerender them all. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) return {};

  /*
    The tagline and the headline specs, not `product.description` — that is a
    body paragraph and ran to 599 characters on ONVEE, four times what Google
    renders. This composes a complete sentence that fits, from fields that are
    already short by design.
  */
  const specs = product.specs
    .slice(0, 2)
    .map((spec) => `${spec.value} ${spec.label.toLowerCase()}`)
    .join(", ");

  return buildMetadata({
    title: `${product.name} — ${product.category}`,
    description: `${product.name}: ${product.tagline} ${specs ? `${specs}. ` : ""}Designed and built by Plutox Tech in Lahore.`,
    path: `/projects/${product.slug}`,
    keywords: [
      `${product.category.toLowerCase()} software`,
      `${product.name} pricing`,
      `${product.name} features`,
      `${product.name} modules`,
    ],
  });
}

/**
 * One product, as its own portfolio — in its own colours.
 *
 * `/projects` is the comparison view and stays in the Plutox violet so five
 * products don't shout over each other. Here there is only one product, so the
 * page takes *its* palette: ServeSync is teal throughout,
 * Fleet Flow coral.
 *
 * The mechanism is one CSS custom property set on the wrapper. Every accent below
 * reads `var(--product)`, so theming a whole page costs one declaration instead
 * of threading a colour through twenty components — and a sixth product themes
 * itself the day its `brandColor` lands in the data.
 *
 * The colour is used for rules, headings, icons and figures — never for body text
 * on the page background, because these are brand colours chosen for their own
 * canvases and several of them fail contrast at paragraph size on one of ours.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const capabilities = product.moduleGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const position = products.indexOf(product);
  const previous = products[position - 1];
  const next = products[position + 1];

  return (
    <div
      data-product={product.slug}
      style={
        {
          "--product": product.brandColor,
          // Tints for washes and hairlines. `color-mix` keeps them derived from
          // the one colour rather than five more hex values to keep in step.
          "--product-wash": `color-mix(in oklab, ${product.brandColor} 12%, transparent)`,
          "--product-line": `color-mix(in oklab, ${product.brandColor} 34%, transparent)`,
        } as React.CSSProperties
      }
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: product.name, path: `/projects/${product.slug}` },
        ])}
      />

      {/*
        The page is a software product page, so it says so in the vocabulary a
        crawler reads. Prices come from the same data the pricing charts render,
        and there is no rating — we have none that is verified.
      */}
      <JsonLd data={softwareApplicationJsonLd(product)} />

      {/* ---------------- Themed hero ---------------- */}
      <header className="relative overflow-hidden border-b border-border">
        {/* Brand wash. Decorative, and inset so it cannot widen the document. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 60% at 15% 0%, var(--product-wash), transparent 70%)",
          }}
        />

        <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <Reveal preset="fadeUp">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group/back inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
                All platforms
              </Link>
              <span aria-hidden className="h-px w-6 bg-border" />
              <span className="eyebrow" style={{ color: "var(--product-ink)" }}>
                {product.category}
              </span>
              {product.badge ? (
                <span
                  className="rounded border px-2 py-0.5 font-mono text-[0.75rem]"
                  style={{
                    color: "var(--product-ink)",
                    borderColor: "var(--product-line)",
                  }}
                >
                  {product.badge}
                </span>
              ) : null}
              {product.status === "in-development" ? (
                <span
                  className="rounded border px-2 py-0.5 font-mono text-[0.75rem]"
                  style={{
                    color: "var(--product-ink)",
                    borderColor: "var(--product-line)",
                  }}
                >
                  In development
                </span>
              ) : null}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <Reveal preset="fadeUp" delay={0.05}>
                {/* The logo plate carries the h1; the alt text is the name, so the
                    page has a real heading rather than an image with a caption. */}
                <h1 className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={560}
                    height={560}
                    priority
                    className={cn(
                      "w-auto object-contain",
                      product.logoLayout === "stacked"
                        ? "h-16 sm:h-20"
                        : "h-8 sm:h-10",
                    )}
                  />
                </h1>
              </Reveal>

              <Reveal preset="fadeUp" delay={0.1}>
                <p
                  className="mt-7 max-w-3xl font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                  style={{ color: "var(--product-ink)" }}
                >
                  {product.tagline}
                </p>
              </Reveal>

              <Reveal preset="fadeUp" delay={0.15}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {product.description}
                </p>
              </Reveal>

              <Reveal preset="fadeUp" delay={0.2}>
                <p className="mt-5 max-w-3xl text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Built for</span>{" "}
                  {product.audience}
                </p>
              </Reveal>

              <Reveal preset="fadeUp" delay={0.25}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild size="md">
                    <Link href="/contact">
                      Book a demo
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="md">
                    <Link href="#pricing">See pricing</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Spec figures, in the product's colour, as a vertical stack on
                large screens so the hero has a right-hand anchor. */}
            <Reveal preset="fadeUp" delay={0.3}>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-1 lg:gap-y-4 lg:border-l lg:pl-8">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dd
                      className="font-mono text-xl leading-none font-medium"
                      style={{ color: "var(--product-ink)" }}
                    >
                      {spec.value}
                    </dd>
                    <dt className="mt-1.5 text-[0.75rem] leading-tight text-muted-foreground">
                      {spec.label}
                    </dt>
                  </div>
                ))}
                <div>
                  <dd
                    className="font-mono text-xl leading-none font-medium"
                    style={{ color: "var(--product-ink)" }}
                  >
                    {capabilities}
                  </dd>
                  <dt className="mt-1.5 text-[0.75rem] leading-tight text-muted-foreground">
                    Capabilities
                  </dt>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------------- Highlights + gallery ---------------- */}
      <section className="border-b border-border px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal preset="fadeUp" className="min-w-0">
            {product.screens?.length ? (
              <ScreenGallery name={product.name} screens={product.screens} />
            ) : null}
          </Reveal>

          <div className="min-w-0">
            <Reveal preset="fadeUp" delay={0.08}>
              <p className="eyebrow" style={{ color: "var(--product-ink)" }}>
                At a glance
              </p>
            </Reveal>

            <ul className="mt-5 grid gap-3">
              {product.features.map((feature, index) => (
                <Reveal
                  key={feature}
                  preset="fadeUp"
                  delay={Math.min(index, 6) * 0.04}
                >
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0"
                      style={{ color: "var(--product-ink)" }}
                    />
                    {feature}
                  </li>
                </Reveal>
              ))}
            </ul>

            {product.metric ? (
              <Reveal preset="fadeUp" delay={0.1}>
                <div
                  className="mt-7 flex items-baseline gap-3 rounded-lg border px-4 py-3"
                  style={{ borderColor: "var(--product-line)" }}
                >
                  <span
                    className="font-mono text-lg font-medium"
                    style={{ color: "var(--product-ink)" }}
                  >
                    {product.metric.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.metric.label}
                  </span>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------------- Module breakdown ---------------- */}
      <section className="border-b border-border px-6 py-14 sm:px-10 lg:px-14">
        <Reveal preset="fadeUp">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="eyebrow" style={{ color: "var(--product-ink)" }}>
              Every module, in detail
            </h2>
            <p className="font-mono text-[0.75rem] text-muted-foreground/70">
              {capabilities} capabilities across {product.moduleGroups.length}{" "}
              areas
            </p>
          </div>
        </Reveal>

        <div
          className={cn(
            "mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2",
            product.moduleGroups.length >= 4
              ? "xl:grid-cols-4"
              : "lg:grid-cols-3",
          )}
        >
          {product.moduleGroups.map((group) => (
            <Reveal key={group.title} preset="fadeUp">
              <section>
                <h3
                  className="eyebrow flex items-baseline justify-between gap-2 border-b pb-2"
                  style={{
                    color: "var(--product-ink)",
                    borderColor: "var(--product-line)",
                  }}
                >
                  {group.title}
                  <span className="font-mono text-[0.75rem] opacity-60">
                    {group.items.length}
                  </span>
                </h3>
                <dl className="mt-4 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <div key={item.name} className="group/mi">
                      <dt className="text-sm font-semibold transition-transform duration-300 group-hover/mi:translate-x-0.5">
                        {item.name}
                      </dt>
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
      </section>

      {/* ---------------- Roadmap, if it is still shipping ---------------- */}
      {product.roadmap?.length ? (
        <section className="border-b border-border px-6 py-14 sm:px-10 lg:px-14">
          <Reveal preset="fadeUp">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="eyebrow" style={{ color: "var(--product-ink)" }}>
                Delivery roadmap
              </h2>
              <p className="font-mono text-[0.75rem] text-muted-foreground/70">
                {product.roadmap.filter((phase) => phase.state === "done").length}{" "}
                of {product.roadmap.length} shipped
              </p>
            </div>
          </Reveal>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.roadmap.map((phase, index) => (
              <Reveal
                key={phase.label}
                preset="fadeUp"
                delay={Math.min(index, 6) * 0.04}
                className="h-full"
              >
                <li
                  className="flex h-full flex-col rounded-lg border p-5"
                  style={{
                    borderColor:
                      phase.state === "planned"
                        ? undefined
                        : "var(--product-line)",
                    background:
                      phase.state === "done" ? "var(--product-wash)" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.75rem] text-muted-foreground">
                      {phase.label}
                    </span>
                    {phase.state === "done" ? (
                      <Check
                        className="size-3.5"
                        style={{ color: "var(--product-ink)" }}
                        aria-label="shipped"
                      />
                    ) : phase.state === "next" ? (
                      <span
                        className="rounded border px-1.5 py-0.5 font-mono text-[0.75rem]"
                        style={{
                          color: "var(--product-ink)",
                          borderColor: "var(--product-line)",
                        }}
                      >
                        in progress
                      </span>
                    ) : (
                      <span className="font-mono text-[0.75rem] text-muted-foreground/60">
                        planned
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{phase.title}</p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {phase.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ---------------- Built with ---------------- */}
      <section className="border-b border-border px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            { label: "Languages", items: product.languages },
            { label: "Built with", items: product.stack },
            ...(product.payments?.length
              ? [{ label: "Payments", items: product.payments }]
              : []),
          ].map((block) => (
            <Reveal key={block.label} preset="fadeUp">
              <div>
                <h2 className="eyebrow" style={{ color: "var(--product-ink)" }}>
                  {block.label}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[0.75rem] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      {product.pricing ? (
        <section
          id="pricing"
          className="scroll-mt-24 border-b border-border px-6 py-14 sm:px-10 lg:px-14"
        >
          <PricingTable
            pricing={product.pricing}
            brandColor={product.brandColor}
            productName={product.name}
          />
        </section>
      ) : null}

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative overflow-hidden border-b border-border px-6 py-16 sm:px-10 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 80% 100%, var(--product-wash), transparent 70%)",
          }}
        />
        <Reveal preset="fadeUp">
          <h2 className="max-w-3xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Want {product.name} running in your{" "}
            <span style={{ color: "var(--product-ink)" }}>
              {product.category.toLowerCase()}
            </span>
            ?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Tell us how you trade today and we will tell you which package fits,
            what the hardware costs and how long the rollout takes — before you
            commit to anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">See how a rollout runs</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Prev / next ---------------- */}
      <nav
        aria-label="Platform navigation"
        className="grid border-t border-border sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group/pg sheen-on-hover flex items-center gap-4 border-b border-border px-6 py-8 transition-colors hover:bg-muted/40 sm:border-b-0 sm:border-r sm:px-10 lg:px-14"
          >
            <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:-translate-x-1" />
            <span className="min-w-0">
              <span className="block text-[0.75rem] text-muted-foreground">
                Previous
              </span>
              <span className="block truncate font-display text-base font-semibold">
                {previous.name}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block sm:border-r sm:border-border" />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group/pg sheen-on-hover flex items-center justify-end gap-4 px-6 py-8 text-right transition-colors hover:bg-muted/40 sm:px-10 lg:px-14"
          >
            <span className="min-w-0">
              <span className="block text-[0.75rem] text-muted-foreground">
                Next
              </span>
              <span className="block truncate font-display text-base font-semibold">
                {next.name}
              </span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:translate-x-0.5 group-hover/pg:-translate-y-0.5" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
