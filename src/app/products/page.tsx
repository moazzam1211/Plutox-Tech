import { ArrowRight, Check } from "lucide-react";
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
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "The modules we build: online ordering, kitchen display, rider management, staff management, inventory, warehouse, analytics and reports, expense management, an admin panel and PRA/FBR fiscal compliance — every one already running inside a shipped platform.",
  path: "/products",
  keywords: [
    "online ordering system",
    "kitchen display system",
    "rider management software",
    "inventory management software",
    "warehouse management system",
    "expense management software",
    "POS admin panel",
  ],
});

/**
 * Products — the modules, as opposed to /projects which is the five platforms.
 *
 * Every module names the shipped products it already runs inside and links to
 * them. That constraint is the page's whole value: a module list is easy to
 * write and impossible to check, so each one here points at working software.
 */
export default function ProductsPage() {
  const capabilityCount = productModules.reduce(
    (total, mod) => total + mod.capabilities.length,
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
            The modules, and{" "}
            <span className="text-primary">what already runs them</span>
          </>
        }
        lede="Buy a mod or buy the platform. Either way these are not slides: every mod below already ships inside at least one of our five platforms, and each one says which — so you can go and look at the screenshots rather than take the list on trust."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(productModules.length), label: "Modules" },
            { value: String(capabilityCount), label: "Capabilities" },
            { value: "5", label: "Platforms running them" },
            { value: "4", label: "Shipped and in production" },
          ]}
        />
      </PageHeader>

      <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          {productModules.map((mod, position) => {
            const Icon = mod.icon;

            return (
              <Reveal
                key={mod.slug}
                preset="fadeUp"
                delay={Math.min(position, 5) * 0.05}
                className="h-full"
              >
                <Panel
                  id={mod.slug}
                  className="flex h-full scroll-mt-24 flex-col p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary">
                      <Icon className="size-4" />
                    </span>
                    <h2 className="font-display text-base font-semibold tracking-tight">
                      <Link
                        href={`/products/${mod.slug}`}
                        className="link-underline"
                      >
                        {mod.name}
                      </Link>
                    </h2>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {mod.summary}
                  </p>

                  <ul className="mt-5 grid gap-2">
                    {mod.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {capability}
                      </li>
                    ))}
                  </ul>

                  {/*
                    The claim and its evidence in the same card. A mod list with
                    no link to working software is the easiest thing on a agency
                    site to write and the hardest to believe.
                  */}
                  <div className="mt-auto pt-6">
                    <p className="eyebrow text-muted-foreground">Running in</p>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {mod.shippedIn.map((product) => (
                        <li key={product.slug}>
                          <Link
                            href={`/projects#${product.slug}`}
                            className="hover-lift inline-flex rounded border border-border px-2 py-1 font-mono text-[0.625rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Button asChild variant="outline" size="sm" className="mt-5">
                      <Link href={`/products/${mod.slug}`}>
                        Details & screenshots
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </Panel>
              </Reveal>
            );
          })}
        </div>

        <Reveal preset="fadeUp" className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="md">
            <Link href="/contact">
              Ask which modules you need
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/projects">See them running</Link>
          </Button>
        </Reveal>
      </div>

      <Pager current="/products" />
    </>
  );
}
