import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ScreenGallery } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader, Panel } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { moduleScreens, productModules } from "@/data/modules";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/** Prerender all of them — the list is short and fixed. */
export function generateStaticParams() {
  return productModules.map((mod) => ({ slug: mod.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = productModules.find((entry) => entry.slug === slug);
  if (!mod) return {};

  return buildMetadata({
    title: mod.name,
    description: `${mod.summary} Already running in ${mod.shippedIn
      .map((product) => product.name)
      .join(", ")}.`,
    path: `/products/${mod.slug}`,
  });
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = productModules.find((entry) => entry.slug === slug);
  if (!mod) notFound();

  const screens = moduleScreens(mod);
  const Icon = mod.icon;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Products", path: "/products" },
          { name: mod.name, path: `/products/${mod.slug}` },
        ])}
      />

      <PageHeader eyebrow="Module" title={mod.name} lede={mod.summary}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-primary">
            <Icon className="size-4" />
          </span>
          <Button asChild variant="outline" size="sm">
            <Link href="/products">
              <ArrowLeft />
              All modules
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-8 border-b border-border px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:px-14">
        <Reveal preset="fadeUp" className="min-w-0">
          {screens.length ? (
            <ScreenGallery name={mod.name} screens={screens} />
          ) : (
            /*
              A module with nothing captured says so. Filling the frame with
              another product's screens would be the one dishonest thing this
              site does, and /projects makes a point of not doing it.
            */
            <Panel className="p-6">
              <p className="eyebrow text-muted-foreground">Screenshots</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not captured yet. We would rather show you nothing here than fill
                the space with another product&rsquo;s screens — ask and we will
                walk you through the running site instead.
              </p>
              <Button asChild size="md" className="mt-5">
                <Link href="/contact">
                  Book a walkthrough
                  <ArrowRight />
                </Link>
              </Button>
            </Panel>
          )}
        </Reveal>

        <Reveal preset="fadeUp" delay={0.08} className="flex flex-col">
          <p className="eyebrow text-muted-foreground">What you get</p>
          <ul className="mt-4 grid gap-2.5">
            {mod.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                {capability}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="eyebrow text-muted-foreground">Running in</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {mod.shippedIn.map((product) => (
                <li key={product.name}>
                  <Link
                    href={`/projects#${product.slug}`}
                    className="hover-lift inline-flex rounded border border-border px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Button asChild size="md">
              <Link href="/contact">
                Ask about {mod.name}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/projects">See it running</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Prev / next through the module list, same idea as the page pager. */}
      <nav
        aria-label="Module navigation"
        className="grid border-t border-border sm:grid-cols-2"
      >
        {[-1, 1].map((step) => {
          const index = productModules.indexOf(mod) + step;
          const sibling = productModules[index];
          if (!sibling) return <span key={step} aria-hidden />;

          return (
            <Link
              key={step}
              href={`/products/${sibling.slug}`}
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
