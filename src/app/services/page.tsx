import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

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
import { Button } from "@/components/ui/button";
import {
  consultancyPrograms,
  engagementModels,
  launchJourney,
} from "@/data/consultancy";
import { services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "POS system consultancy, cloud kitchen setup and food business consultancy in Lahore — for restaurants, cafés, QSR, bakeries and multi-outlet groups. Feasibility, licensing, site selection, kitchen layout, equipment, menu costing, POS and aggregator setup, hiring, training and launch. Everything needed to take a food business from scratch to running smoothly, plus sixteen software services.",
  path: "/services",
  keywords: [
    "POS consultancy Pakistan",
    "cloud kitchen setup Lahore",
    "restaurant POS consultant",
    "how to start a cloud kitchen",
    "POS system implementation",
    "restaurant setup consultancy Lahore",
    "how to open a café in Pakistan",
    "QSR business consultant",
    "food business consultancy",
    "restaurant menu costing and engineering",
    "business setup consultancy Lahore",
  ],
});

/**
 * Services — consultancy first, software second.
 *
 * Split out of `/about`, which had become two pages wearing one URL. The page
 * leads with the three end-to-end programmes because that is what someone opening
 * an outlet is actually looking for; the sixteen build services sit underneath
 * for the visitor who already knows what they want built.
 */
export default function ServicesPage() {
  const totalPhases = consultancyPrograms.reduce(
    (sum, program) => sum + program.phases.length,
    0,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="Services"
        title={
          <>
            From an idea to a business{" "}
            <span className="text-primary">that runs without you</span>
          </>
        }
        lede="Three end-to-end programmes — POS system consultancy, cloud kitchen setup and food business consultancy for restaurants, cafés and QSR — plus the software we build around them. We start well before the software: the unit economics, the licences, the site, the layout, the equipment and the menu. Then the system that ties it together, the hiring, the training, the launch, and the monthly review that keeps it honest."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            {
              value: String(consultancyPrograms.length),
              label: "Consultancy programmes",
            },
            { value: String(totalPhases), label: "Phases, all named" },
            { value: String(launchJourney.length), label: "Stages to launch" },
            { value: String(services.length), label: "Software services" },
          ]}
        />
      </PageHeader>

      {/* ---------------- The consultancy programmes ---------------- */}
      {consultancyPrograms.map((program) => {
        const Icon = program.icon;

        return (
          <section
            key={program.slug}
            id={program.slug}
            className="scroll-mt-24 border-b border-border px-6 py-14 sm:px-10 lg:px-14 lg:py-20"
          >
            <Reveal preset="fadeUp">
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-md border"
                  style={{
                    borderColor: `${program.brandColor}55`,
                    color: program.brandColor,
                  }}
                >
                  <Icon className="size-4" />
                </span>
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: program.brandColor }}
                />
                <span className="eyebrow text-muted-foreground">
                  Consultancy programme
                </span>
              </div>

              <h2 className="mt-6 max-w-3xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {program.name}
              </h2>

              <p
                className="mt-3 max-w-3xl font-display text-lg font-semibold tracking-tight"
                style={{ color: program.brandColor }}
              >
                {program.tagline}
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {program.summary}
              </p>

              <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Who it&rsquo;s for</span>{" "}
                — {program.audience}
              </p>
            </Reveal>

            {/* ---- Phases ---- */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
              {/* `min-w-0`: a grid item defaults to `min-width: auto`, so the
                  long deliverable chips push the column past the viewport
                  without it — a 3px horizontal scroll on phones. */}
              <div className="min-w-0">
                <Reveal preset="fadeUp">
                  <p className="eyebrow text-muted-foreground">
                    How the engagement runs
                  </p>
                </Reveal>

                <RevealGroup stagger={0.04} className="mt-5 flex flex-col">
                  {program.phases.map((phase) => (
                    <RevealItem key={phase.title}>
                      {/*
                        Each phase names what you get at the end of it. A phase
                        without a deliverable is just a meeting, and this list is
                        the difference between consultancy and a conversation.
                      */}
                      <div className="group/ph relative border-b border-border py-5 pl-4 transition-colors last:border-0 hover:bg-muted/30">
                        <span
                          aria-hidden
                          className="absolute top-6 left-0 h-4 w-0.5 origin-center scale-y-0 transition-transform duration-200 group-hover/ph:scale-y-100"
                          style={{ backgroundColor: program.brandColor }}
                        />
                        <h3 className="text-sm font-semibold transition-transform duration-300 group-hover/ph:translate-x-0.5">
                          {phase.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {phase.detail}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {phase.deliverables.map((item) => (
                            <li
                              key={item}
                              className="rounded border border-border px-2 py-0.5 font-mono text-[0.5625rem] text-muted-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              {/* ---- What's included, timeline, outcome ---- */}
              <Reveal
                preset="fadeUp"
                delay={0.08}
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <Panel className="p-6">
                  <p className="eyebrow text-muted-foreground">
                    What&rsquo;s included
                  </p>
                  <ul className="mt-4 grid gap-2.5">
                    {program.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0"
                          style={{ color: program.brandColor }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 flex flex-col gap-4 border-t border-border pt-5">
                    <div>
                      <dt className="eyebrow text-muted-foreground">
                        Typical timeline
                      </dt>
                      <dd className="mt-1.5 text-sm">{program.timeline}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-muted-foreground">
                        What you end up with
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {program.outcome}
                      </dd>
                    </div>
                  </dl>

                  {/*
                    Deliberately short. Buttons are `whitespace-nowrap`, so on a
                    phone — where both grid items share one auto-sized track —
                    a label like "Talk about Cloud Kitchen Setup" sets the track
                    to its min-content width and pushes the whole page sideways.
                    The heading directly above already names the programme.
                  */}
                  <Button asChild size="md" className="mt-6 w-full">
                    <Link href="/contact">
                      Book a consultation
                      <ArrowRight />
                    </Link>
                  </Button>
                </Panel>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ---------------- Scratch to running ---------------- */}
      <Block
        label="Start to finish"
        title="Scratch to running smoothly"
        description="The stages every new outlet goes through, and who does the work at each one. We are a software house — we can prepare your licensing pack, but the signature has to be yours, and the table says so."
      >
        <RevealGroup stagger={0.04} className="flex flex-col">
          {launchJourney.map((stage) => {
            const Icon = stage.icon;

            return (
              <RevealItem key={stage.title}>
                <div className="group/js grid gap-2 border-b border-border py-5 transition-colors last:border-0 hover:bg-muted/30 sm:grid-cols-[2.5rem_13rem_minmax(0,1fr)_9rem] sm:items-start sm:gap-6">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-[color,transform,border-color] duration-300 group-hover/js:-translate-y-0.5 group-hover/js:border-primary/40 group-hover/js:text-primary">
                    <Icon className="size-3.5" />
                  </span>

                  <h3 className="text-sm font-semibold">{stage.title}</h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {stage.detail}
                  </p>

                  {/*
                    The one place on the page that says what we do *not* do.
                    Rendered as data rather than a footnote so it can't be lost.
                  */}
                  <span className="justify-self-start rounded border border-border px-2 py-0.5 font-mono text-[0.5625rem] whitespace-nowrap text-muted-foreground sm:justify-self-end">
                    {stage.owner}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Block>

      {/* ---------------- Engagement models ---------------- */}
      <Block
        label="How we work together"
        title="Four ways to engage"
        description="Take the report and run it yourself, or hand us the whole thing. Both are fine — the advisory engagement is deliberately useful on its own."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {engagementModels.map((model, position) => {
            const Icon = model.icon;

            return (
              <Reveal
                key={model.title}
                preset="fadeUp"
                delay={position * 0.06}
                className="h-full"
              >
                <Panel interactive className="h-full p-6">
                  <span className="grid size-9 place-items-center rounded-md border border-border text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
                    {model.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {model.detail}
                  </p>
                </Panel>
              </Reveal>
            );
          })}
        </div>
      </Block>

      {/* ---------------- Software services ---------------- */}
      <Block
        label="What we build"
        title={`${services.length} software services`}
        description="Once the consultancy is done, this is the work itself — one team, one contract, no hand-offs between vendors."
      >
        <RevealGroup stagger={0.03} className="flex flex-col">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <DefRow term={service.title} detail={service.description} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="fadeUp" className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="md">
            <Link href="/contact">
              Start a conversation
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/skills">See the stack we build on</Link>
          </Button>
        </Reveal>
      </Block>

      <Pager current="/services" />
    </>
  );
}
