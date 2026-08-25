import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/shared/json-ld";
import {
  PageHeader,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { productModules } from "@/data/modules";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Three management systems: ServeSync POS in restaurant, pharmacy and mart editions, StaySync for hotels and Fleet Flow for transport. Plus the shared modules — online ordering, kitchen display, rider and staff management, inventory, warehouse, analytics, expenses, admin panel and PRA/FBR fiscal compliance.",
  path: "/products",
  keywords: [
    "restaurant management system",
    "pharmacy management system",
    "mart management system",
    "hotel management system",
    "fleet management system",
    "POS modules",
  ],
});

/**
 * Products — organised by management system.
 *
 * A restaurant buyer does not want a flat list of every module we have ever
 * written; they want to know what the *restaurant* system contains. So each
 * system gets its own section listing its own modules, read from the same
 * `moduleGroups` that /projects renders — a module cannot appear here and be
 * missing there. The modules several systems share sit underneath, each with its
 * own page.
 */
export default function ProductsPage() {
  const totalModules = products.reduce(
    (sum, product) =>
      sum +
      product.moduleGroups.reduce(
        (count, group) => count + group.items.length,
        0,
      ),
    0,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <PageHeader
        eyebrow="Products"
        title={
          <>
            Three management systems,{" "}
            <span className="text-primary">each with its own modules</span>
          </>
        }
        lede="A restaurant does not need a pharmacy's controlled-drug register, and a pharmacy has no use for a kitchen display — so ServeSync ships them as editions, hiding what does not apply and relabelling what does. Every module named here exists in shipped software."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(products.length), label: "Management systems" },
            { value: String(totalModules), label: "Modules across them" },
            { value: String(productModules.length), label: "Shared modules" },
            { value: "3", label: "POS editions" },
          ]}
        />
      </PageHeader>

      {/* Jump links — the sections are long. */}
      <nav
        aria-label="Jump to a system"
        className="border-b border-border px-6 py-5 sm:px-10 lg:px-14"
      >
        <ul className="flex flex-wrap gap-2">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`#${product.slug}`}
                className="hover-lift inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {product.category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------------- One section per system ---------------- */}
      {products.map((product) => {
        const moduleCount = product.moduleGroups.reduce(
          (count, group) => count + group.items.length,
          0,
        );

        return (
          <section
            key={product.slug}
            id={product.slug}
            className="scroll-mt-24 border-b border-border px-6 py-14 sm:px-10 lg:px-14 lg:py-16"
          >
            <Reveal preset="fadeUp">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: product.brandColor }}
                    />
                    <span className="eyebrow text-muted-foreground">
                      {product.category} management system
                    </span>
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

                  <h2 className="mt-5 inline-flex items-center rounded-lg border border-border bg-white px-4 py-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={480}
                      height={480}
                      className={cn(
                        "w-auto object-contain",
                        product.logoLayout === "stacked"
                          ? "h-12 sm:h-14"
                          : "h-6 sm:h-7",
                      )}
                    />
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {product.tagline} — for {product.audience}.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <p className="font-mono text-[0.6875rem] text-muted-foreground">
                    {moduleCount} modules
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/projects/${product.slug}`}>
                      Screens &amp; pricing
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            {/*
              Module names only. The sentence of detail per module lives on the
              system's own page — repeating it here would make a five-system page
              unscannable, which is the one job this page has.
            */}
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.moduleGroups.map((group) => (
                <Reveal key={group.title} preset="fadeUp">
                  <section>
                    <h3
                      className="eyebrow flex items-baseline justify-between gap-2 border-b pb-2"
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
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-muted-foreground"
                        >
                          <Check
                            className="mt-1 size-3 shrink-0"
                            style={{ color: product.brandColor }}
                          />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* ---------------- Shared modules ---------------- */}
      <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <Reveal preset="fadeUp">
          <p className="eyebrow text-primary">Shared across systems</p>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
            Modules that appear in more than one
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Some modules are built once and deployed into several systems — the
            same inventory engine runs behind a pharmacy&rsquo;s batches and a
            mart&rsquo;s aisles. Each has its own page, with screenshots from
            whichever systems run it.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productModules.map((mod, position) => {
            const Icon = mod.icon;

            return (
              <Reveal
                key={mod.slug}
                preset="fadeUp"
                delay={Math.min(position, 5) * 0.04}
                className="h-full"
              >
                <Link href={`/products/${mod.slug}`} className="block h-full">
                  <Panel
                    interactive
                    className="group/mod flex h-full flex-col p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {mod.name}
                        </span>
                        <span className="mt-1 block font-mono text-[0.625rem] text-muted-foreground">
                          {/*
                            Counted over distinct slugs, not entries: a module in
                            all three ServeSync editions ships in one system, not
                            three.
                          */}
                          {(() => {
                            const systems = new Set(mod.shippedIn.map((p) => p.slug));
                            return systems.size === 1
                              ? mod.shippedIn[0].name
                              : `${systems.size} systems`;
                          })()}
                        </span>
                      </span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover/mod:-translate-y-0.5 group-hover/mod:translate-x-0.5 group-hover/mod:text-primary" />
                    </div>

                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {mod.summary}
                    </p>
                  </Panel>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal preset="fadeUp" className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="md">
            <Link href="/contact">
              Ask which system fits you
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/projects">See them running</Link>
          </Button>
        </Reveal>
      </section>

      <Pager current="/products" />
    </>
  );
}
