import { ArrowUpRight, Download, ExternalLink, Smartphone } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/shared/json-ld";
import {
  PageHeader,
  Pager,
  Panel,
  StatStrip,
} from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { downloadGroups } from "@/data/downloads";
import { products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Downloads",
  description:
    "Windows installers and Android apps for ServeSync POS, PharmaSync POS and Vendeez POS — with the SHA-256 of every build so you can verify what you downloaded before you run it.",
  path: "/downloads",
  keywords: [
    "POS software download",
    "restaurant POS installer",
    "pharmacy POS download",
    "retail POS Windows installer",
    "POS Android app",
  ],
});

const mb = (bytes: number) =>
  bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;

/**
 * Client downloads.
 *
 * Two tiers, and the page says which is which rather than hiding it: small builds
 * are served from here, and the 48–96 MB desktop installers link to that product's
 * GitHub Releases. Serving a quarter of a gigabyte of binaries from a marketing
 * site would be slow for the client and permanent in git history.
 *
 * Every size and checksum comes from `npm run downloads`, which reads the real
 * artefact. A hand-typed checksum is worse than none — it looks like assurance and
 * verifies nothing.
 */
export default function DownloadsPage() {
  const hosted = downloadGroups.flatMap((group) =>
    group.files.filter((file) => file.hosted),
  ).length;
  const android = downloadGroups.flatMap((group) =>
    group.files.filter((file) => file.platform === "Android"),
  ).length;

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
            Installers and apps,{" "}
            <span className="text-primary">with a checksum for each</span>
          </>
        }
        lede="Windows builds and Android apps for the three shipped point-of-sale systems. Every entry carries its real size and SHA-256, read off the build itself — so you can verify a file before you run it on a till."
      >
        <StatStrip
          className="max-w-2xl border-t pt-4"
          items={[
            { value: String(downloadGroups.length), label: "Products" },
            {
              value: String(downloadGroups.flatMap((g) => g.files).length),
              label: "Builds",
            },
            { value: String(android), label: "Android apps" },
            { value: String(hosted), label: "Served from here" },
          ]}
        />
      </PageHeader>

      {downloadGroups.map((group) => {
        const product = products.find((entry) => entry.slug === group.slug);

        return (
          <section
            key={group.slug}
            id={group.slug}
            data-product={group.slug}
            style={
              product
                ? ({
                    "--product": product.brandColor,
                    "--product-line": `color-mix(in oklab, ${product.brandColor} 34%, transparent)`,
                  } as React.CSSProperties)
                : undefined
            }
            className="scroll-mt-24 border-b border-border px-6 py-12 sm:px-10 lg:px-14"
          >
            <Reveal preset="fadeUp">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-8"
                    style={{ backgroundColor: "var(--product)" }}
                  />
                  <h2
                    className="font-display text-lg font-semibold tracking-tight"
                    style={{ color: "var(--product-ink)" }}
                  >
                    {group.name}
                  </h2>
                  <span className="rounded border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                    v{group.version}
                  </span>
                </div>

                <Link
                  href={`/projects/${group.slug}`}
                  className="group/l inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  What it does
                  <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {group.files.map((file, index) => (
                <Reveal
                  key={file.filename}
                  preset="fadeUp"
                  delay={Math.min(index, 5) * 0.04}
                  className="h-full"
                >
                  <Panel className="flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-sm font-semibold">
                          {file.platform === "Android" ? (
                            <Smartphone
                              className="size-3.5 shrink-0"
                              style={{ color: "var(--product-ink)" }}
                              aria-hidden
                            />
                          ) : (
                            <Download
                              className="size-3.5 shrink-0"
                              style={{ color: "var(--product-ink)" }}
                              aria-hidden
                            />
                          )}
                          {file.label}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                          {file.note}
                        </p>
                      </div>

                      <span className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[0.5625rem] text-muted-foreground">
                        {file.platform}
                      </span>
                    </div>

                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.6875rem]">
                      <div className="flex gap-1.5">
                        <dt className="text-muted-foreground">Size</dt>
                        <dd className="font-mono">{mb(file.bytes)}</dd>
                      </div>
                      <div className="flex min-w-0 gap-1.5">
                        <dt className="text-muted-foreground">SHA-256</dt>
                        {/*
                          First 16 characters, with the full digest in `title` and
                          selectable. Enough to compare at a glance, and the whole
                          thing is there for anyone actually running the check.
                        */}
                        <dd
                          className="truncate font-mono select-all"
                          title={file.sha256}
                        >
                          {file.sha256.slice(0, 16)}…
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center gap-3 pt-0">
                      <Button asChild size="sm" variant="outline">
                        {/*
                          `download` on a same-origin file makes the browser save
                          rather than navigate. On the Releases link it would do
                          nothing, so it is only set where the file is ours.
                        */}
                        <a
                          href={file.href}
                          {...(file.hosted
                            ? { download: file.filename }
                            : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {file.hosted ? "Download" : "Get from Releases"}
                          {file.hosted ? <Download /> : <ExternalLink />}
                        </a>
                      </Button>

                      {!file.hosted ? (
                        <p className="text-[0.625rem] text-muted-foreground">
                          {mb(file.bytes)} — too large to serve from this site
                        </p>
                      ) : null}
                    </div>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* ---------------- Verifying, and what is not here ---------------- */}
      <section className="border-b border-border px-6 py-12 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/*
            `min-w-0` matters here: a grid item defaults to `min-width: auto`, so
            the track would size to the widest unbreakable line in the <pre> —
            98px of horizontal page scroll at 375px, even though the <pre> itself
            scrolls. The scroll belongs inside the block, not on the page.
          */}
          <Reveal preset="fadeUp" className="min-w-0">
            <h2 className="eyebrow text-primary">Check it before you run it</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Compare the digest above against the file you downloaded. If they
              differ, the file is not the one we built — delete it and tell us.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[0.6875rem] leading-relaxed">
              <code>
                {"# Windows (PowerShell)\n"}
                {"Get-FileHash .\\ServeSync-POS-Setup-DotNet.exe -Algorithm SHA256\n\n"}
                {"# macOS / Linux\n"}
                {"shasum -a 256 ServeSync-POS-Setup-DotNet.exe"}
              </code>
            </pre>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.08}>
            <h2 className="eyebrow text-primary">Two things to expect</h2>
            <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Windows will warn you.
                </span>{" "}
                These builds are not code-signed yet, so SmartScreen shows
                &ldquo;unrecognised app&rdquo;. That is the certificate missing,
                not a verdict on the file — which is exactly why the checksum is
                published.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  The Android apps are not on Play.
                </span>{" "}
                They install from the file, so Android asks you to allow
                installing from an unknown source once. These builds are signed
                with a development key rather than a release one, so Play
                Protect may warn as well — ask us for a release-signed build if
                you are rolling out to a whole team.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  StaySync and Fleet Flow are not here.
                </span>{" "}
                They are server applications rather than desktop installs — we
                deploy those for you.
              </li>
            </ul>

            <Button asChild size="md" className="mt-6">
              <Link href="/contact">Need help installing?</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <Pager current="/downloads" />
    </>
  );
}
