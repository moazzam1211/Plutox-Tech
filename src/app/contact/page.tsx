import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Block, PageHeader, Pager, Panel } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import {
  DribbbleIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/shared/social-icons";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { toTelHref, toWhatsAppHref } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Talk to Plutox Tech about POS, ERP, hotel or custom software. Free 30-minute scoping call, reply within one business day. Email ${siteConfig.contact.salesEmail} or WhatsApp ${siteConfig.contact.phone}.`,
  path: "/contact",
  keywords: [
    "contact software company",
    "free software consultation",
    "POS software quote",
    "hire software developers Pakistan",
  ],
});

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: siteConfig.social.github, Icon: GitHubIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Dribbble", href: siteConfig.social.dribbble, Icon: DribbbleIcon },
] as const;

/** One contact channel as a labelled row. */
function Channel({
  label,
  value,
  href,
  external = false,
  icon: Icon,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
  /**
   * Accepts both Lucide icons and our own plain-SVG social components, so
   * `typeof Mail` (a forwardRef exotic component) is too narrow.
   */
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  const body = (
    <>
      <span
        className={
          accent
            ? "grid size-9 shrink-0 place-items-center rounded-md border border-success/30 text-success"
            : "grid size-9 shrink-0 place-items-center rounded-md border border-border text-primary"
        }
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6875rem] text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm leading-relaxed font-medium">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-start gap-3.5">{body}</div>;
  }

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="group/ch flex items-start gap-3.5 transition-colors hover:text-primary"
    >
      {body}
    </a>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;
  const { address } = contact;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Intro", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what&apos;s broken.{" "}
            <span className="text-primary">
              We&apos;ll tell you what it takes.
            </span>
          </>
        }
        lede="A 30-minute call with the engineer who would build it — not a salesperson. You get an honest read on scope, cost and timeline whether or not you go ahead with us."
      />

      {/* ---------------- Channels ---------------- */}
      <Block
        label="Reach us"
        title="Direct channels"
        description="WhatsApp is fastest. Email if you'd rather write it all down."
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <Reveal preset="fadeUp">
            <div className="flex flex-col gap-5">
              <Channel
                label="WhatsApp"
                value={contact.phone}
                href={toWhatsAppHref(
                  contact.whatsapp,
                  "Hi Plutox Tech — I'd like to discuss a project.",
                )}
                external
                icon={WhatsAppIcon}
                accent
              />
              <Channel
                label="Phone"
                value={contact.phone}
                href={toTelHref(contact.phone)}
                icon={Phone}
              />
              <Channel
                label="Sales"
                value={contact.salesEmail}
                href={`mailto:${contact.salesEmail}`}
                icon={Mail}
              />
              <Channel
                label="General"
                value={contact.email}
                href={`mailto:${contact.email}`}
                icon={Mail}
              />
            </div>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.08}>
            <div className="flex flex-col gap-5">
              <Channel
                label="Office"
                value={
                  <>
                    {address.street}
                    <br />
                    {address.city}, {address.region} {address.postalCode}
                    <br />
                    {address.country}
                  </>
                }
                icon={MapPin}
              />
              <Channel label="Hours" value={contact.hours} icon={Clock} />

              <div>
                <p className="text-[0.6875rem] text-muted-foreground">
                  Follow along
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${label}`}
                        className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Block>

      {/* ---------------- Enquiry form ---------------- */}
      <Block
        label="Or write to us"
        title="Project enquiry"
        description="A couple of sentences about what you're running today is enough to start."
      >
        <Reveal preset="fadeUp">
          <Panel className="p-6 sm:p-8">
            <ContactForm />
          </Panel>
        </Reveal>
      </Block>

      {/* ---------------- Location ---------------- */}
      <Block label="Find us" title={`${address.city}, ${address.country}`} last>
        <Reveal preset="fadeUp">
          <figure className="overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/misc/map-lahore.svg"
              alt={`Map showing the ${siteConfig.name} office in ${address.city}, ${address.country}`}
              width={1200}
              height={700}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 60rem"
              className="h-56 w-full object-cover sm:h-72"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
              <span className="text-xs text-muted-foreground">
                {address.street}
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${address.street}, ${address.city}, ${address.country}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                Open in Maps
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </Block>

      <Pager current="/contact" />
    </>
  );
}
