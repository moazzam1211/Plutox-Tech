import { Download, ShieldAlert, Store, Cross, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader, Pager, Panel, StatStrip } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { posBuilds } from "@/data/downloads";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Download ServeSync POS",
  description:
    "Windows installers for all three ServeSync editions — restaurant, mart and pharmacy — each with its version, size and SHA-256 so you can verify the file before you run it.",
  path: "/downloads",
  keywords: [
    "POS software download",
    "restaurant POS installer",
    "pharmacy POS download",
    "supermarket POS Windows installer",
    "ServeSync download",
  ],
});

const ICONS: Record<string, LucideIcon> = {
  restaurant: UtensilsCrossed,
  mart: Store,
  pharmacy: Cross,
};

const mb = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;

/**
 * Installer downloads for the three POS editions.
 *
 * The binaries are served from `admin.plutoxtech.com` — the same host the tills
 * already pull updates from — rather than from this repo. Three 105 MB files
 * would exceed GitHub's per-blob limit and sit in git history forever.
 *
 * Every figure comes from `npm run downloads`, which reads electron-builder's
 * manifest and hashes the real artefact. Nothing on this page is typed by hand,
 * because a wrong size is a nuisance and a wrong checksum is a lie.
 */
export default function DownloadsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Downloads", path: "/downloads" },
        ])}
      />

      <PageHeader
        eyebrow="Downloads"
        title={
          <>
            Install ServeSync,{" "}
            <span className="text-primary">pick your edition</span>
          </>
        }
        lede="One Windows installer per edition — restaurant, mart or pharmacy. Each bundles its own server and runtime, so a single shop needs nothing else on the machine. Install, and the POS keeps itself current from the update channel after that."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(posBuilds.length), label: "Editions" },
            { value: "Windows", label: "Platform" },
            { value: "Included", label: "Server & runtime" },
            { value: "SHA-256", label: "Every file" },
          ]}
        />
      </PageHeader>

      <div className="divide-y divide-border">
        {posBuilds.map((build) => {
          const Icon = ICONS[build.slug] ?? Download;

          return (
            <section
              key={build.slug}
              id={build.slug}
              className="px-6 py-12 sm:px-10 lg:px-14"
            >
              <Reveal preset="fadeUp">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                  {/* `min-w-0` so the checksum below can never widen the column. */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-primary" />
                      <h2 className="font-display text-2xl font-semibold">
                        {build.name}
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {build.tagline}
                    </p>
                    <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted-foreground">
                      {build.blurb}
                    </p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {build.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span aria-hidden className="text-primary">
                            —
                          </span>
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Panel className="min-w-0 p-6">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Version</dt>
                        <dd className="font-medium">{build.version}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Size</dt>
                        <dd className="font-medium">{mb(build.bytes)}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Released</dt>
                        <dd className="font-medium">{build.releasedAt}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Platform</dt>
                        <dd className="font-medium">Windows 10/11 · 64-bit</dd>
                      </div>
                    </dl>

                    <Button asChild className="mt-6 w-full">
                      {/*
                        A plain anchor, not next/link: this leaves the site for a
                        binary on another host, so client-side routing has nothing
                        to prefetch and would only get in the way.
                      */}
                      <a href={build.href} download>
                        <Download className="size-4" />
                        Download {mb(build.bytes)}
                      </a>
                    </Button>

                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-[0.75rem] text-muted-foreground">
                        SHA-256 — verify before running:
                      </p>
                      {/*
                        `break-all` rather than a scroll box: a 64-character hash
                        that has to be scrolled is a hash nobody checks, and
                        `min-w-0` above stops it stretching the grid column.
                      */}
                      <code className="mt-1 block break-all font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
                        {build.sha256}
                      </code>
                      <p className="mt-2 text-[0.6875rem] text-muted-foreground">
                        <code className="font-mono">
                          certutil -hashfile {build.filename} SHA256
                        </code>
                      </p>
                    </div>
                  </Panel>
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>

      {/*
        Said plainly rather than buried. These builds carry no code-signing
        certificate, so Windows SmartScreen will interrupt the first run — a
        client who hits that unwarned reasonably assumes the file is unsafe.
        The checksums above are what actually verify the download.
      */}
      <section className="border-t border-border px-6 py-12 sm:px-10 lg:px-14">
        <Reveal preset="fadeUp">
          <Panel className="flex max-w-3xl gap-4 p-6">
            <ShieldAlert className="size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 className="font-display text-base font-semibold">
                Windows will warn you on first run
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These installers are not code-signed yet, so SmartScreen shows
                &ldquo;Windows protected your PC&rdquo;. Choose{" "}
                <span className="text-foreground">More info</span> →{" "}
                <span className="text-foreground">Run anyway</span>. If you would
                rather confirm the file first, check its SHA-256 against the value
                listed above — that is the check that actually proves you have the
                build we published.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not sure which edition fits, or want it set up for you?{" "}
                <Link href="/demo" className="text-primary hover:underline">
                  Book a free demo
                </Link>{" "}
                and we will walk through it on your own data.
              </p>
            </div>
          </Panel>
        </Reveal>
      </section>

      <Pager current="/downloads" />
    </>
  );
}
