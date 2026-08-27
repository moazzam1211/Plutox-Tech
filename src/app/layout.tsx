import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

import { FloatingNav } from "@/components/layout/floating-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BackToTop } from "@/components/shared/back-to-top";
import { HelpButton } from "@/components/shared/help-button";
import { JsonLd } from "@/components/shared/json-ld";
import { SplashScreen } from "@/components/shared/splash-screen";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Fonts — self-hosted at build time by next/font, so there is no      */
/* runtime request to Google and no layout shift on first paint.       */
/* ------------------------------------------------------------------ */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

/**
 * A real monospace face rather than a fallback stack. The new layout uses mono
 * for route indices, spec figures and tech tags — it carries enough of the
 * design to be worth loading properly.
 */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  // No `site`/`creator` handle: there is no X account to attribute to. The
  // large-image card still renders correctly without them.
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Dark is listed first because it is now the default experience.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#f3ffff" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Required by next-themes: it stamps the theme class onto <html> before
      // React hydrates, which would otherwise be reported as a mismatch.
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh">
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Brand splash on first paint — removes itself on a timer. */}
            <SplashScreen />

            <FloatingNav />

            {/*
              The navbar is `fixed`, so it takes no layout space — hence the
              explicit top padding, which matches the bar's own height (h-16,
              condensing to h-14 on scroll) rather than the taller clearance the
              old inset pill needed.

              The shell is full-bleed: no 90rem cap, no centring. Each section
              owns its own horizontal padding, so content still keeps its
              distance from the glass while the rules, borders and background
              patterns run the whole width.

              `min-w-0` matters — without it a wide child (a screenshot
              gallery, a long row) can stretch the grid and reintroduce
              horizontal page scroll.
            */}
            <div className="min-w-0 pt-(--nav-h)">
              <main id="main" className="relative">
                {/*
                  Organisation / WebSite / ProfessionalService structured data.
                  Rendered inside <main>: in <head> or as the first child of
                  <body> it sits beside React's hydration markers and ends up
                  duplicated in the live DOM.
                */}
                <JsonLd data={organizationJsonLd()} />
                {children}
              </main>

              <SiteFooter />
            </div>

            {/*
              Bottom-right floating stack: back-to-top sits directly above
              Help & Support, one size smaller so the pair reads as a
              hierarchy rather than two equal buttons.
            */}
            <BackToTop />
            <HelpButton />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
