import Link from "next/link";

import { ProjectEntry } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { Pager, PageHeader, StatStrip } from "@/components/shared/page-shell";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "ServeSync POS, StaySync Hotel ERP and Fleet Flow — three platforms designed and built by Plutox Tech, all shipped and running, with full module detail and screenshots from the running software. ServeSync alone runs restaurants, pharmacies and marts from one codebase.",
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
            Three platforms,{" "}
            <span className="text-primary">all of them shipped</span>
          </>
        }
        lede="Every figure below — module counts, endpoint counts, payment rails — comes from the products' own documentation, and every screenshot is from the running software. Nothing here is a mockup. ServeSync is one of the three and runs all of restaurants, pharmacies and marts: the pharmacy and mart products were folded into it as editions rather than kept as separate codebases."
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
