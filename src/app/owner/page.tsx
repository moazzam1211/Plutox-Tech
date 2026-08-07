import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { FounderPortrait } from "@/components/pages/founder-portrait";
import { JsonLd } from "@/components/shared/json-ld";
import {
  Block,
  DefRow,
  PageHeader,
  Pager,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { LinkedInIcon } from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { coreValues } from "@/data/company";
import { founder, founderSkills } from "@/data/founder";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Owner",
  description: `${founder.name} — ${founder.role} of Plutox Tech. Founder-led delivery: every engagement gets a technical review from the founder before a line is written.`,
  path: "/owner",
  keywords: [
    "Moazzam Naveed",
    "Plutox Tech founder",
    "software house owner Lahore",
  ],
});

/**
 * Owner — page 06.
 *
 * A person page, so the portrait leads and everything else supports it. The
 * `Person` JSON-LD makes the founder a first-class entity for search, linked to
 * the organisation node emitted in the root layout.
 */
export default function OwnerPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: "Founder, Owner & CEO",
    email: founder.contact.email,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    url: `${siteConfig.url}/owner`,
    knowsAbout: founderSkills.flatMap((group) => group.skills),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.countryCode,
    },
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Owner", path: "/owner" },
        ])}
      />
      <JsonLd data={personJsonLd} />

      <PageHeader
        eyebrow="Owner"
        title={
          <>
            The person{" "}
            <span className="text-primary">accountable for your project</span>
          </>
        }
        lede="No account managers relaying messages to an offshore team. You deal with the founder, who still reviews the architecture on every engagement."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          // Spread rather than concat: `highlights` is `as const`, so concat
          // narrows the element type to those exact literals.
          items={[
            ...founder.highlights.map((item) => ({
              value: item.value as string,
              label: item.label as string,
            })),
            { value: siteConfig.founded, label: "Founded Plutox Tech" },
          ]}
        />
      </PageHeader>

      {/* ---------------- Profile ---------------- */}
      <Block label="Profile" title={founder.name} description={founder.role}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
          <Reveal preset="fadeUp">
            <div className="lg:sticky lg:top-28">
              <FounderPortrait />

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${founder.contact.email}`}
                  className="group/mail inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <Mail className="size-3.5" />
                  Email directly
                  <ArrowUpRight className="size-3 transition-transform duration-200 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5" />
                </a>
                <a
                  href={founder.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal preset="fadeUp" delay={0.06}>
              <div className="flex flex-col gap-4">
                {founder.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* What he's shipped */}
            <Reveal preset="fadeUp" delay={0.12} className="mt-10">
              <p className="eyebrow text-muted-foreground">Shipped personally</p>
            </Reveal>

            <RevealGroup stagger={0.05} className="mt-4 flex flex-col">
              {products.map((product) => (
                <RevealItem key={product.slug}>
                  <Link
                    href={`/projects#${product.slug}`}
                    className="group/p flex items-baseline gap-4 border-b border-border py-3.5 pl-1 transition-[colors,padding] duration-300 first:border-t hover:bg-muted/40 hover:pl-2"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="text-sm font-semibold">
                        {product.name}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {product.category}
                      </span>
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover/p:translate-x-0.5 group-hover/p:-translate-y-0.5 group-hover/p:text-primary" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal preset="fadeUp" className="mt-8">
              <Button asChild variant="outline" size="md">
                <Link href="/skills">See the full skill set</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Block>

      {/* ---------------- How he works ---------------- */}
      <Block
        label="How he works"
        title="Operating principles"
        description="The commitments the company is run on — set by the founder, and the same ones you can hold us to."
        last
      >
        <RevealGroup stagger={0.04} className="flex flex-col">
          {coreValues.map((value) => (
            <RevealItem key={value.title}>
              <DefRow
                term={value.title}
                detail={value.description}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      <Pager current="/owner" />
    </>
  );
}
