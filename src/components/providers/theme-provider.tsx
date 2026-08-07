"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

/**
 * Wraps `next-themes`. Dark is the default: #1a1a1a is the mark's own ink and
 * suits a product-led, engineering-facing site. Light (#f3ffff, the logo's
 * canvas) is a full first-class alternative, not an inverted afterthought.
 *
 * `disableTransitionOnChange` prevents every element on the page from
 * animating its colours during a theme flip, which otherwise looks like a
 * rendering glitch.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="plutox-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
