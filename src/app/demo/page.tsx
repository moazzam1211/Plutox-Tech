import { Clock, MonitorPlay, ShieldCheck, Wallet } from "lucide-react";

import { DemoForm } from "@/components/sections/demo-form";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader, Panel, StatStrip } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { toWhatsAppHref } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Book a Free Demo",
  description:
    "See ServeSync POS, StaySync Hotel ERP or Fleet Flow running on your own kind of business. Free demo, nothing to install, and our team calls you back within one business day.",
  path: "/demo",
  keywords: [
    "free POS demo",
    "restaurant POS demo",
    "pharmacy POS demo",
    "supermarket POS demo",
    "hotel ERP demo",
    "fleet management demo",
    "book POS demo Pakistan",
  ],
});

/** What the demo actually covers, so booking one is not a leap of faith. */
const PROMISES = [
  {
    icon: MonitorPlay,
    title: "Your edition, not a generic tour",
    detail:
      "We open the product you picked — and for ServeSync, the edition too — with the modules that apply to it and nothing that doesn't.",
  },
  {
    icon: Clock,
    title: "Thirty minutes, on a call",
    detail:
      "Long enough to punch an order, print a bill and run a stock report. Short enough to fit between two shifts.",
  },
  {
    icon: Wallet,
    title: "Free, and no install",
    detail:
      "Nothing to download and nothing to pay. We drive; you watch and interrupt whenever something matters to you.",
  },
  {
    icon: ShieldCheck,
    title: "No pressure to buy",
    detail:
      "If ServeSync is the wrong fit for how you work, we would rather tell you on the call than after an invoice.",
  },
] as const;

/**
 * Book a free demo.
 *
 * A separate, shorter path than `/contact`: that page is for scoping a build,
 * this one is for getting a call booked. The form asks only what changes the
 * demo, and the restaurant sub-type appears only for restaurants.
 */
export default function DemoPage() {
  const servesync = products.find((product) => product.slug === "servesync-pos");
  const moduleCount =
    servesync?.specs.find((spec) => /module/i.test(spec.label))?.value ?? "33";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Book a Demo", path: "/demo" },
        ])}
      />

      <PageHeader
        eyebrow="Book a free demo"
        title={
          <>
            See it running on{" "}
            <span className="text-primary">your kind of business</span>
          </>
        }
        lede="Pick a product and tell us how big you are, and we will show you the thing itself — a restaurant floor, a pharmacy counter, a mart checkout, a hotel front desk or a dispatch board. Thirty minutes, nothing to install, no cost."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: "3", label: "Products" },
            { value: moduleCount, label: "Modules" },
            { value: "30 min", label: "Typical demo" },
            { value: "Free", label: "Cost to you" },
          ]}
        />
      </PageHeader>

      <section className="border-b border-border px-6 py-12 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          {/* ---------------- The form ---------------- */}
          <Reveal preset="fadeUp">
            <h2 className="eyebrow text-primary">Your details</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A handful of fields. We only ask what changes what we show you.
            </p>
            <div className="mt-7 max-w-xl">
              <DemoForm />
            </div>
          </Reveal>

          {/* ---------------- What you get ---------------- */}
          <Reveal preset="fadeUp" delay={0.08} className="min-w-0">
            <h2 className="eyebrow text-primary">What the demo covers</h2>
            <ul className="mt-4 grid gap-3">
              {PROMISES.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <Panel className="flex gap-3.5 p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {title}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {detail}
                      </span>
                    </span>
                  </Panel>
                </li>
              ))}
            </ul>

            <Panel className="mt-4 p-4">
              <p className="text-sm font-semibold">In a hurry?</p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                WhatsApp{" "}
                <a
                  href={toWhatsAppHref(
                    siteConfig.contact.whatsapp,
                    "Hi Plutox Tech — I'd like to book a free ServeSync demo.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>{" "}
                and we will usually reply the same hour.
              </p>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
