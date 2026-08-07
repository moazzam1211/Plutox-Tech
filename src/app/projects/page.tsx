import Link from "next/link";

import { ProjectEntry } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { Pager, PageHeader, StatStrip } from "@/components/shared/page-shell";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "ServeSync POS, PharmaSync POS, Vendeez POS and StaySync Hotel ERP — four platforms designed, built and deployed by Plutox Tech, with full module detail and screenshots from the running software.",
  path: "/projects",
  keywords: [
    "restaurant POS software",
    "pharmacy POS software",
    "supermarket POS software",
    "hotel ERP software",
  ],
});

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
        index="02"
        eyebrow="Projects"
        title={
          <>
            Four platforms,{" "}
            <span className="text-primary">built and deployed</span>
          </>
        }
        lede="Every figure below — module counts, endpoint counts, payment rails — comes from the products' own documentation, and every screenshot is from the running software. Nothing here is a mockup."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: "4", label: "Products" },
            { value: "60+", label: "Live modules" },
            { value: "289+", label: "REST endpoints" },
            { value: "81", label: "Capabilities detailed" },
          ]}
        />
      </PageHeader>

      {/* Jump links — with four long entries, an index at the top is worth it. */}
      <nav
        aria-label="Jump to a project"
        className="border-b border-border px-6 py-5 sm:px-10 lg:px-14"
      >
        <ul className="flex flex-wrap gap-2">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Link
                href={`#${product.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <span className="font-mono text-[0.625rem] text-muted-foreground/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <div key={product.slug} className="px-6 py-12 sm:px-10 lg:px-14">
            <ProjectEntry product={product} position={index + 1} />
          </div>
        ))}
      </div>

      <Pager current="/projects" />
    </>
  );
}
