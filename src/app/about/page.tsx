import { JsonLd } from "@/components/shared/json-ld";
import {
  Block,
  DefRow,
  PageHeader,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { coreValues, mission, timeline, vision } from "@/data/company";
import { processSteps } from "@/data/process";
import { services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About & Services",
  description: `Founded in ${siteConfig.founded} in Lahore, Plutox Tech is a founder-led software house. Our mission, values, delivery process and the sixteen services we offer — POS, ERP, CRM, web, mobile, cloud and AI automation.`,
  path: "/about",
  keywords: [
    "software house in Lahore",
    "POS software development company",
    "ERP development services",
    "custom software development services",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "About & Services", path: "/about" },
        ])}
      />

      <PageHeader
        eyebrow="About & Services"
        title={
          <>
            A software house that behaves like{" "}
            <span className="text-primary">your engineering department</span>
          </>
        }
        lede={`Founded in ${siteConfig.founded} in Lahore with one developer and a single restaurant POS contract. Deliberately small — small enough that the founder owns your project, established enough to still be supporting it years from now.`}
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: siteConfig.founded, label: "Founded" },
            { value: "4", label: "Products shipped" },
            { value: "16", label: "Services offered" },
            { value: "7", label: "Delivery stages" },
          ]}
        />
      </PageHeader>

      {/* ---------------- Mission & vision ---------------- */}
      <Block label="Why we exist" title="Mission & vision">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal preset="fadeUp">
            <Panel className="h-full p-6">
              <p className="eyebrow text-primary">Mission</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {mission}
              </p>
            </Panel>
          </Reveal>
          <Reveal preset="fadeUp" delay={0.08}>
            <Panel className="h-full p-6">
              <p className="eyebrow text-primary">Vision</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {vision}
              </p>
            </Panel>
          </Reveal>
        </div>
      </Block>

      {/* ---------------- Services ---------------- */}
      <Block
        label="What we build"
        title="Sixteen services"
        description="From the till at the counter to the ledger in the cloud. One team, one contract, no hand-offs between vendors."
      >
        <RevealGroup stagger={0.03} className="flex flex-col">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <DefRow
                term={service.title}
                detail={service.description}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      {/* ---------------- Process ---------------- */}
      <Block
        label="How we work"
        title="Seven stages"
        description="You see working software every two weeks and always know which stage you're in."
      >
        <RevealGroup stagger={0.05} className="flex flex-col">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
            <RevealItem key={step.step}>
              {/*
                The stage used to lead with its number. The icon carries the same
                slot now — the stages are already in order down the page, so the
                figure was only repeating what the position said.
              */}
              <div className="group/st grid gap-2 border-b border-border py-5 transition-colors last:border-0 hover:bg-muted/30 sm:grid-cols-[3rem_11rem_minmax(0,1fr)] sm:gap-6">
                <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-[color,transform,border-color] duration-300 group-hover/st:-translate-y-0.5 group-hover/st:border-primary/40 group-hover/st:text-primary">
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.5625rem] text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </RevealItem>
            );
          })}
        </RevealGroup>
      </Block>

      {/* ---------------- Values ---------------- */}
      <Block
        label="How we behave"
        title="Core values"
        description="Six commitments we can be measured against, not six adjectives."
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

      {/* ---------------- Timeline ---------------- */}
      <Block
        label="The story"
        title={`Since ${siteConfig.founded}`}
        description="How the company actually grew — including the stretches that were mostly hard work and no headlines."
        last
      >
        <RevealGroup stagger={0.05} className="flex flex-col">
          {timeline.map((entry) => (
            <RevealItem key={`${entry.year}-${entry.title}`}>
              <div className="grid gap-2 border-b border-border py-5 last:border-0 sm:grid-cols-[3rem_11rem_minmax(0,1fr)] sm:gap-6">
                <span className="font-mono text-[0.6875rem] text-primary">
                  {entry.year}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{entry.title}</h3>
                  <p className="mt-1.5 text-[0.6875rem] text-muted-foreground">
                    {entry.milestone}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Block>

      <Pager current="/about" />
    </>
  );
}
