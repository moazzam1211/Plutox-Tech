import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Panel } from "@/components/shared/page-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { routes } from "@/data/navigation";

/**
 * 404.
 *
 * Because the site is a finite, numbered set of seven pages, the most useful
 * thing a not-found page can do is show that whole index — the visitor can see
 * everything that exists and pick, rather than guess.
 */
export default function NotFound() {
  return (
    <div className="px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <Reveal preset="fadeUp">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.25em] text-primary">
            404
          </span>
          <span className="h-px w-16 bg-border" />
          <span className="eyebrow text-muted-foreground">Not found</span>
        </div>
      </Reveal>

      <Reveal preset="fadeUp" delay={0.06}>
        <h1 className="mt-10 max-w-3xl text-display-lg font-semibold">
          This page didn&apos;t make it to production.
        </h1>
      </Reveal>

      <Reveal preset="fadeUp" delay={0.12}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          The URL you followed doesn&apos;t exist — it may have moved, or the link
          may have a typo. The whole site is seven pages, listed below.
        </p>
      </Reveal>

      <Reveal preset="fadeUp" delay={0.18}>
        <div className="mt-9">
          <Button asChild variant="accent" size="lg">
            <Link href="/">Back to the intro</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal preset="fadeUp" delay={0.24}>
        <ul className="mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href} className="block h-full">
                <Panel
                  interactive
                  className="group/idx flex h-full flex-col p-4"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {route.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {route.summary}
                    </span>
                  </span>
                  <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover/idx:translate-x-0.5 group-hover/idx:-translate-y-0.5 group-hover/idx:text-primary" />
                </Panel>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
