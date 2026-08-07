import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import {
  DribbbleIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/shared/social-icons";
import { legalRoutes, routes } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { toTelHref } from "@/lib/utils";

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: siteConfig.social.github, Icon: GitHubIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Dribbble", href: siteConfig.social.dribbble, Icon: DribbbleIcon },
] as const;

/**
 * Site footer.
 *
 * Needed once the side rail was replaced by a floating navbar — the rail used to
 * carry the legal links, contact number and copyright, and a floating bar has no
 * room for them. Kept flat and compact so it reads as a closing rule rather than
 * a second navigation layer.
 *
 * A server component: nothing here is interactive.
 */
export function SiteFooter() {
  const { contact } = siteConfig;
  const { address } = contact;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-14">
        {/* Brand + contact */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.shortDescription}
          </p>

          <ul className="mt-6 flex flex-col gap-2.5 text-sm">
            <li>
              <a
                href={toTelHref(contact.phone)}
                className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-3.5 shrink-0 text-primary" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-3.5 shrink-0 text-primary" />
                {contact.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-muted-foreground">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>
                {address.city}, {address.region}
                <br />
                {address.country}
              </span>
            </li>
          </ul>
        </div>

        {/* The numbered index again, for people who scroll to the bottom. */}
        <nav aria-label="All pages">
          <p className="eyebrow text-muted-foreground">Pages</p>
          <ul className="mt-4 flex flex-col gap-2">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="group/f inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="link-underline">{route.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal + social */}
        <div>
          <p className="eyebrow text-muted-foreground">Legal</p>
          <ul className="mt-4 flex flex-col gap-2">
            {legalRoutes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8 text-muted-foreground">Follow</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${label}`}
                  className="hover-lift press group/so grid size-9 place-items-center rounded-md border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4 transition-transform duration-300 group-hover/so:scale-110" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p className="font-mono text-[0.6875rem] text-muted-foreground/70">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
