"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { routes } from "@/data/navigation";
import { useScrollState } from "@/hooks/use-scroll-state";
import { EASE_OUT } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { cn, toWhatsAppHref } from "@/lib/utils";

/**
 * Floating navigation bar.
 *
 * Detached from the viewport edges rather than pinned flush to the top: the
 * inset plus a border makes it read as an object over the page, which suits the
 * flat, panel-based layout better than a full-width bar would.
 *
 * Links show their names only. The site used to print a two-digit index here and
 * on every page header and pager; it is gone everywhere, because the number never
 * told the reader anything the label didn't. The reading order still exists — the
 * bar lists the pages in sequence and each page ends with a prev/next pager.
 *
 * Below `lg` the links collapse into a drawer and the bar shows the current
 * page's name.
 */
export function FloatingNav() {
  const pathname = usePathname();
  const { scrolled } = useScrollState(24);
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close the drawer on navigation, adjusted during render rather than in an
  // effect — an effect would paint one frame of the drawer over the new page.
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = routes.find((route) => route.href === pathname);

  return (
    <>
      {/*
        Skip link. Kept — WCAG 2.4.1 needs a way to bypass the repeated nav —
        but it is `sr-only-focusable`, so it is completely invisible until a
        keyboard user presses Tab. Mouse users never see it; the visible
        floating controls are the back-to-top and help buttons instead.
      */}
      <a
        href="#main"
        className="sr-only-focusable fixed top-24 left-1/2 z-90 -translate-x-1/2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lg"
      >
        Skip to main content
      </a>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-70 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto flex w-full max-w-6xl items-center gap-3 rounded-xl border border-border px-3 transition-all duration-300 ease-out",
            // Condense and gain a backdrop once the page scrolls.
            scrolled
              ? "h-14 bg-background/85 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md"
              : "h-16 bg-background/70 backdrop-blur-sm",
          )}
        >
          <Logo className="shrink-0" />

          {/* ---- Desktop route links ---- */}
          <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
            {routes.map((route) => {
              const active = pathname === route.href;

              return (
                /*
                  `group/item` is the hover *and* focus scope for the panel below.
                  Deliberately CSS-only: no open state, no outside-click handler, no
                  dependency. `focus-within` is what makes it keyboard-reachable —
                  a hover-only menu is unusable without a pointer, and the parent is
                  a real link, so the panel is a shortcut rather than the only route
                  in.
                */
                <li key={route.href} className="group/item relative">
                  <Link
                    href={route.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      // The pill marks the active page; the underline is the
                      // hover cue, so the two never read as the same state.
                      "group/nl relative flex items-center gap-1 rounded-md px-3.5 py-2 text-sm transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="link-underline font-medium">
                      {route.short}
                    </span>

                    {route.children ? (
                      <ChevronDown
                        aria-hidden
                        className="size-3 opacity-50 transition-transform duration-200 group-hover/item:rotate-180 group-focus-within/item:rotate-180"
                      />
                    ) : null}

                    {/* Shared pill that slides between links via layoutId. */}
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-md border border-border bg-muted/60"
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      />
                    ) : null}
                  </Link>

                  {route.children ? (
                    <div
                      className={cn(
                        "invisible absolute top-full left-1/2 z-10 w-64 -translate-x-1/2 pt-2 opacity-0",
                        "transition-[opacity,transform] duration-200 ease-out",
                        // The panel starts 4px high and settles — transform and
                        // opacity only, so it stays on the compositor.
                        "translate-y-1",
                        "group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100",
                        "group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100",
                      )}
                    >
                      <ul className="overflow-hidden rounded-lg border border-border bg-popover p-1.5 shadow-[0_20px_50px_-24px_rgb(0_0_0/0.5)]">
                        {route.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group/ci flex flex-col gap-0.5 rounded-md px-2.5 py-2 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                            >
                              <span className="text-[0.8125rem] font-medium transition-transform duration-200 group-hover/ci:translate-x-0.5">
                                {child.label}
                              </span>
                              <span className="text-[0.75rem] text-muted-foreground">
                                {child.hint}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* ---- Mobile: current position ---- */}
          {current ? (
            <span className="mx-auto min-w-0 truncate text-sm font-medium lg:hidden">
              {current.short}
            </span>
          ) : (
            <span aria-hidden className="mx-auto lg:hidden" />
          )}

          {/*
            ---- Right cluster ----
            No WhatsApp link here: the floating Help & Support button already
            offers WhatsApp, phone and email, so a second entry point in the
            navbar was redundant.
          */}
          <div className="flex shrink-0 items-center gap-2">
            {/*
              The one CTA in the bar, and the only accent-coloured thing in it.
              Hidden below `lg` because the bar has no room there — the drawer
              carries it instead, at the top where it is the first thing read.
            */}
            <Link
              href="/demo"
              aria-current={pathname === "/demo" ? "page" : undefined}
              className="hidden h-9 shrink-0 items-center gap-1.5 rounded-md bg-primary px-3.5 text-xs font-semibold text-primary-foreground transition-[filter,box-shadow,transform] duration-300 hover:brightness-110 hover:shadow-[0_10px_28px_-12px_rgb(139_92_246/0.85)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring outline-none lg:inline-flex"
            >
              <CalendarCheck className="size-3.5 shrink-0" aria-hidden />
              Book a free demo
            </Link>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none lg:hidden"
            >
              <Menu className="size-[1.125rem]" />
            </button>
          </div>
        </nav>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-100 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm animate-in fade-in duration-200"
          />

          <div
            ref={panelRef}
            tabIndex={-1}
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-[min(20rem,100%)] flex-col border-l border-border bg-background outline-none animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-[1.125rem]" />
              </button>
            </div>

            {/* The CTA the desktop bar shows, first in the drawer rather than buried. */}
            <div className="border-b border-border p-4">
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground"
              >
                <CalendarCheck className="size-4 shrink-0" aria-hidden />
                Book a free demo
              </Link>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto py-2">
              <ul className="flex flex-col">
                {routes.map((route) => {
                  const active = pathname === route.href;

                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group/dr flex border-l-2 py-3 pr-3 pl-4 transition-colors",
                          active
                            ? "border-primary bg-primary/8 text-foreground"
                            : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium transition-transform duration-300 group-hover/dr:translate-x-1">
                            {route.label}
                          </span>
                          <span className="mt-0.5 block text-[0.75rem] leading-tight text-muted-foreground/80">
                            {route.summary}
                          </span>
                        </span>
                      </Link>

                      {/*
                        The same sub-items, indented. The drawer has no hover, so
                        without this the desktop panel would be the only way to
                        reach them — which is the usual way a hover menu strands
                        half its destinations on a phone.
                      */}
                      {route.children ? (
                        <ul className="border-l-2 border-transparent pb-2 pl-4">
                          {route.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block py-1.5 pl-3 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-border p-4">
              <a
                href={toWhatsAppHref(
                  siteConfig.contact.whatsapp,
                  "Hi Plutox Tech — I'd like to discuss a project.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-md border border-success/35 px-3 py-2.5 text-xs font-medium text-success"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">
                  {siteConfig.contact.phone}
                </span>
                <ArrowUpRight className="size-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
