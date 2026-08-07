"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Dark / light toggle.
 *
 * Both icons are always rendered and swapped purely with the `dark:` variant,
 * driven by the class `next-themes` writes onto `<html>` before hydration.
 *
 * That avoids the usual `mounted` state guard entirely: there is no server /
 * client mismatch to paper over, no setState in an effect, and the correct
 * icon is painted on the very first frame instead of appearing a tick late.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    // `resolvedTheme` is always defined by the time a user can click.
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle between light and dark mode"
      className={cn(
        "group relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg",
        "border border-border/80 bg-card/50 text-muted-foreground backdrop-blur-sm",
        "transition-colors duration-300 hover:border-primary/40 hover:text-foreground",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* Hover wash in the accent hue. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Sun — shown in light mode, rotates out in dark. */}
      <Sun
        aria-hidden
        className="absolute size-[1.15rem] rotate-0 scale-100 transition-transform duration-400 ease-out dark:-rotate-90 dark:scale-0"
      />
      {/* Moon — the inverse. */}
      <Moon
        aria-hidden
        className="absolute size-[1.05rem] rotate-90 scale-0 transition-transform duration-400 ease-out dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
