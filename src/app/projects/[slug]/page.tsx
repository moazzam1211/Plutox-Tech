import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectEntry } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader, StatStrip } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/** Five products, fixed list — prerender them all. */
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

  return buildMetadata({
    title: `${product.name} — ${product.category}`,
    description: product.description,
    path: `/projects/${product.slug}`,
    keywords: [
      `${product.category.toLowerCase()} software`,
      `${product.name} pricing`,
      `${product.name} features`,
    ],
  });
}

/**
 * One system, on its own page: every feature, every screenshot, its packages and
 * its price.
 *
 * `/projects` lists all five and is long; a buyer comparing one system wants a
 * URL they can send to a colleague. The body is the same `ProjectEntry` the list
 * renders, so the two can never describe a product differently.
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

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: product.name, path: `/projects/${product.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={product.category}
        title={product.name}
        lede={product.tagline}
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            ...product.specs.slice(0, 3).map((spec) => ({
              value: spec.value,
              label: spec.label,
            })),
            { value: String(capabilities), label: "Capabilities" },
          ]}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="md">
            <Link href="/contact">
              Book a demo
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/projects">
              <ArrowLeft />
              All five platforms
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="px-6 py-12 sm:px-10 lg:px-14">
        <ProjectEntry product={product} />
      </div>

      {/* Prev / next through the platforms. */}
      <nav
        aria-label="Platform navigation"
        className="grid border-t border-border sm:grid-cols-2"
      >
        {[-1, 1].map((step) => {
          const sibling = products[products.indexOf(product) + step];
          if (!sibling) return <span key={step} aria-hidden />;

          return (
            <Link
              key={step}
              href={`/projects/${sibling.slug}`}
              className={
                step === -1
                  ? "group/pg sheen-on-hover flex items-center gap-4 border-b border-border px-6 py-8 transition-colors hover:bg-muted/40 sm:border-b-0 sm:border-r sm:px-10 lg:px-14"
                  : "group/pg sheen-on-hover flex items-center justify-end gap-4 px-6 py-8 text-right transition-colors hover:bg-muted/40 sm:px-10 lg:px-14"
              }
            >
              {step === -1 ? (
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:-translate-x-1 group-hover/pg:text-primary" />
              ) : null}
              <span className="min-w-0">
                <span className="block text-[0.6875rem] text-muted-foreground">
                  {step === -1 ? "Previous" : "Next"}
                </span>
                <span className="block truncate font-display text-base font-semibold">
                  {sibling.name}
                </span>
              </span>
              {step === 1 ? (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/pg:translate-x-1 group-hover/pg:text-primary" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
