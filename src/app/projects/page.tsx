import Link from "next/link";

import { ProjectEntry } from "@/components/pages/project-entry";
import { JsonLd } from "@/components/shared/json-ld";
import { Pager, PageHeader, StatStrip } from "@/components/shared/page-shell";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "ServeSync POS, PharmaSync POS, Vendeez POS, StaySync Hotel ERP and Fleet Flow — five platforms designed and built by Plutox Tech, four of them shipped and running, with full module detail and screenshots from the running software.",
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
            <span className="text-primary">four of them shipped</span>
          </>
        }
        lede="Every figure below — module counts, endpoint counts, payment rails — comes from the products' own documentation, and every screenshot is from the running software. Nothing here is a mockup — and the one platform still in build carries its delivery roadmap alongside the screens, so what is not finished yet is on the page too."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: "5", label: "Platforms" },
            { value: "60+", label: "Live modules" },
            { value: "449+", label: "REST endpoints" },
            { value: "120", label: "Capabilities detailed" },
          ]}
        />
      </PageHeader>

      {/* Jump links — with five long entries, an index at the top is worth it. */}
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
