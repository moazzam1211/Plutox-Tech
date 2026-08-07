import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand assets — the supplied artwork, used verbatim.
 *
 * Each file ships with its background baked in (ink-on-paper for light, and
 * pale-on-ink for dark) rather than as a transparent cut-out. Two consequences
 * shape how these are used below:
 *
 * 1. A light/dark pair is needed for every surface, swapped with the `dark:`
 *    variant. The paired file's background matches the theme canvas exactly
 *    (`#f3ffff` / `#1a1a1a`), so it reads as seamless.
 * 2. The mark is placed inside a `rounded-lg` chip. Its baked square edge would
 *    otherwise be visible against the translucent scrolled navbar — framing it
 *    turns that constraint into a deliberate app-icon treatment.
 */
export const BRAND = {
  mark: "/images/brand/plutox-mark.png",
  markDark: "/images/brand/plutox-mark-dark.png",
  lockup: "/images/brand/plutox-lockup.png",
  lockupDark: "/images/brand/plutox-lockup-dark.png",
  splash: "/images/brand/plutox-splash.png",
  splashDark: "/images/brand/plutox-splash-dark.png",
} as const;

/**
 * The mark, framed as a rounded chip.
 *
 * Both theme variants are rendered and toggled with CSS — no JS, no `mounted`
 * guard, and therefore no wrong-logo flash on first paint.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block size-9 shrink-0 overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image
        src={BRAND.mark}
        alt=""
        fill
        sizes="72px"
        priority
        className="object-cover dark:hidden"
      />
      <Image
        src={BRAND.markDark}
        alt=""
        fill
        sizes="72px"
        priority
        className="hidden object-cover dark:block"
      />
    </span>
  );
}

/** The full supplied lock-up (mark above the wordmark). */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("relative block aspect-square w-32", className)}>
      <Image
        src={BRAND.lockup}
        alt={siteConfig.name}
        fill
        sizes="256px"
        className="object-contain dark:hidden"
      />
      <Image
        src={BRAND.lockupDark}
        alt=""
        aria-hidden
        fill
        sizes="256px"
        className="hidden object-contain dark:block"
      />
    </span>
  );
}

/**
 * Text wordmark — "PLUTO" in ink with a violet "X", matching the lock-up.
 *
 * Set in live text rather than cropped from the artwork so it stays crisp,
 * selectable, and scales with the type system.
 */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.0625rem] leading-none font-extrabold tracking-[0.02em]",
        className,
      )}
    >
      PLUTO<span className="text-primary">X</span>
    </span>
  );
}

interface LogoProps {
  /** Render only the mark chip, without the wordmark beside it. */
  markOnly?: boolean;
  /** Use the supplied stacked lock-up image instead of mark + text. */
  lockup?: boolean;
  className?: string;
}

/** Header/footer lock-up, linking home. */
export function Logo({ markOnly = false, lockup = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group/logo inline-flex items-center gap-2.5 rounded-md outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      {lockup ? (
        <LogoLockup className="transition-transform duration-500 ease-out group-hover/logo:-translate-y-0.5" />
      ) : (
        <>
          <LogoMark className="transition-transform duration-500 ease-out group-hover/logo:-translate-y-0.5" />
          {!markOnly ? <LogoWordmark /> : null}
        </>
      )}
    </Link>
  );
}
