import Link from "next/link";

import { ProjectEntry } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { Pager, PageHeader, StatStrip } from "@/components/shared/page-shell";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Five platforms built by Plutox Tech — POS, hotel ERP, fleet management, cross-border delivery and identity — with module detail and real screenshots.",
  path: "/projects",
  keywords: [
    "restaurant POS software",
    "pharmacy POS software",
    "supermarket POS software",
    "hotel ERP software",
    "fleet management software",
    "transport management system",
  ],
});

/*
  Counted off the product data rather than typed, so the header can never
  disagree with the sections under it. Endpoints are a floor, not a total:
  StaySync publishes a module count but not an endpoint count, so it contributes
  nothing to the sum and the figure carries a "+".
*/
const specNumber = (product: (typeof products)[number], pattern: RegExp) => {
  const spec = product.specs.find((entry) => pattern.test(entry.label));
  return spec ? Number.parseInt(spec.value.replace(/[^0-9]/g, ""), 10) || 0 : 0;
};
const moduleTotal = products.reduce((n, p) => n + specNumber(p, /module/i), 0);
const endpointTotal = products.reduce((n, p) => n + specNumber(p, /endpoint/i), 0);
const capabilityTotal = products.reduce(
  (n, p) => n + p.moduleGroups.reduce((m, group) => m + group.items.length, 0),
  0,
);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Five platforms,{" "}
            <span className="text-primary">built here, not resold</span>
          </>
        }
        lede="Every figure below comes from the products' own documentation, and every screenshot is from the running software — nothing here is a mockup, and the one platform with no captures yet shows its roadmap rather than a borrowed screen. ServeSync alone runs restaurants, pharmacies and marts, as three editions of one codebase."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(products.length), label: "Platforms" },
            { value: String(moduleTotal), label: "Live modules" },
            { value: endpointTotal + "+", label: "REST endpoints" },
            { value: String(capabilityTotal), label: "Capabilities detailed" },
          ]}
        />
      </PageHeader>

      {/* Jump links — the entries are long, so an index at the top is worth it. */}
      <nav
        aria-label="Jump to a project"
        className="border-b border-border px-6 py-5 sm:px-10 lg:px-14"
      >
        <ul className="flex flex-wrap gap-2">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/projects/${product.slug}`}
                className="hover-lift inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="divide-y divide-border">
        {products.map((product) => (
          <div key={product.slug} className="px-6 py-12 sm:px-10 lg:px-14">
            <ProjectEntry product={product} />
          </div>
        ))}
      </div>

      <Pager current="/projects" />
    </>
  );
}
