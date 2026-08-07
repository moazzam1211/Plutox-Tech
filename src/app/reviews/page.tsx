import { Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/shared/json-ld";
import {
  Block,
  PageHeader,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reviews",
  description:
    "What Plutox Tech clients say — operations directors, pharmacists, controllers and founders running their businesses on software we built.",
  path: "/reviews",
  keywords: ["Plutox Tech reviews", "POS software reviews", "client testimonials"],
});

export default function ReviewsPage() {
  const average =
    testimonials.reduce((sum, item) => sum + item.rating, 0) /
    testimonials.length;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      {/* FAQ rich-result schema, from the same data the list renders. */}
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        index="05"
        eyebrow="Reviews"
        title={
          <>
            What they say when{" "}
            <span className="text-primary">we&apos;re not in the room</span>
          </>
        }
        lede="Quotes from the people who actually use the software daily — not curated one-liners. Each one names the person, their role and their company."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: average.toFixed(1), label: "Average rating" },
            { value: String(testimonials.length), label: "Reviews" },
            { value: "100%", label: "Would recommend" },
            { value: "24/7", label: "Support availability" },
          ]}
        />
      </PageHeader>

      {/* ---------------- All reviews ---------------- */}
      <Block
        label="Client voices"
        title="In their words"
        description="Listed in full rather than rotated in a carousel — a review you can't finish reading isn't proof of anything."
      >
        <RevealGroup stagger={0.06} className="grid gap-4 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <RevealItem key={item.author} className="h-full">
              <Panel className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        aria-hidden
                        className={
                          star < item.rating
                            ? "size-3.5 fill-amber-400 text-amber-400"
                            : "size-3.5 text-muted-foreground/30"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[0.625rem] text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <Quote
                  aria-hidden
                  className="mt-5 size-5 text-primary/40"
                  strokeWidth={1.5}
                />

                <blockquote className="mt-3 flex-1 text-sm leading-relaxed">
                  {item.quote}
                </blockquote>

                <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={160}
                    height={160}
                    unoptimized
                    className="size-9 shrink-0 rounded-full"
                  />
                  <div className="min-w-0">
                    <cite className="block text-xs font-semibold not-italic">
                      {item.author}
                    </cite>
                    <span className="block text-[0.6875rem] text-muted-foreground">
                      {item.role} · {item.company}
                    </span>
                  </div>
                  <span className="ml-auto grid size-7 shrink-0 place-items-center rounded border border-border font-mono text-[0.5625rem] text-muted-foreground">
                    {item.companyMark}
                  </span>
                </footer>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="fadeUp" className="mt-8">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Client names and companies on this page are illustrative placeholders
            pending written approval to publish real ones.
          </p>
        </Reveal>
      </Block>

      {/* ---------------- Common questions ---------------- */}
      <Block
        label="Before you ask"
        title="Common questions"
        description="Straight answers on timelines, pricing, ownership and support."
        last
      >
        <RevealGroup stagger={0.03} className="flex flex-col">
          {faqs.map((item, index) => (
            <RevealItem key={item.question}>
              <details className="group/faq border-b border-border py-4">
                <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[0.625rem] text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-sm font-semibold transition-colors group-hover/faq:text-primary">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-0.5 font-mono text-xs text-muted-foreground transition-transform duration-200 group-open/faq:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pl-0 text-sm leading-relaxed text-muted-foreground sm:pl-[calc(0.625rem+1rem)]">
                  {item.answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="fadeUp" className="mt-8">
          <Button asChild variant="outline" size="md">
            <Link href="/contact">Ask something else</Link>
          </Button>
        </Reveal>
      </Block>

      <Pager current="/reviews" />
    </>
  );
}
