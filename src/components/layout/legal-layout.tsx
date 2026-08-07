import * as React from "react";

import { PageHeader, Pager } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Shared shell for the privacy policy and terms pages.
 *
 * Both are long-form prose with identical structure, so the layout is factored
 * out and each page supplies only content. The measure is capped at ~68ch:
 * legal text is the one thing on the site people genuinely read line by line, so
 * line length matters more here than anywhere else.
 *
 * These sit outside the numbered seven-page sequence, so the pager returns the
 * reader to the intro rather than pretending they're mid-sequence.
 */
export function LegalLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalLayoutProps) {
  return (
    <>
      <PageHeader index="—" eyebrow={eyebrow} title={title} lede={description}>
        <p className="inline-flex rounded-md border border-border px-3 py-1.5 font-mono text-[0.6875rem] text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </PageHeader>

      <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[68ch]">
          {/* Table of contents — long documents need a way in. */}
          <Reveal preset="fadeUp">
            <nav aria-label="On this page">
              <h2 className="eyebrow text-muted-foreground">On this page</h2>
              <ol className="mt-4 flex flex-col">
                {sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#section-${index + 1}`}
                      className="flex items-baseline gap-4 border-b border-border py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-mono text-[0.625rem] text-muted-foreground/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((section, index) => (
              <Reveal
                key={section.heading}
                preset="fadeUp"
                id={`section-${index + 1}`}
                className="scroll-mt-24"
              >
                <h2 className="flex items-baseline gap-4 font-display text-lg font-semibold tracking-tight">
                  <span className="font-mono text-[0.6875rem] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>

                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="flex flex-col gap-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden
                            className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Pager current="/" />
    </>
  );
}
