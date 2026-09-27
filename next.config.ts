import type { NextConfig } from "next";

/**
 * Next.js configuration — Plutox Tech
 *
 * Tuned for a static-first marketing site: aggressive package-import
 * optimisation for the two largest client dependencies, modern image
 * formats, and hardened security headers.
 */
const nextConfig: NextConfig = {
  // Don't advertise the framework version.
  poweredByHeader: false,

  // Gzip/brotli the HTML + RSC payloads when self-hosting.
  compress: true,

  reactStrictMode: true,

  images: {
    /**
     * Optimisation OFF, deliberately.
     *
     * Vercel meters `/_next/image` transformations, and this site blew through
     * the allowance: 235 images, each needing a variant per device size. Once the
     * quota is gone the endpoint answers 402 and every image that had not already
     * been transformed and cached simply fails to load — which is exactly what
     * happened to the founder portrait the moment its filename changed and
     * invalidated the cached variant.
     *
     * Turning it off costs very little here, because the work is already done at
     * build time rather than per request: every raster in `public/images` is
     * WebP (see `npm run brand-webp`), they average 47 KB, and the largest is
     * 241 KB. What is actually lost is per-device downscaling and AVIF — a phone
     * now gets the same file a desktop does. That is a fair trade against images
     * that do not render at all, and it makes the page cost predictable instead
     * of dependent on a monthly counter.
     *
     * To re-enable on a paid plan, delete `unoptimized` — the settings below are
     * the ones that were tuned for it and are otherwise ignored.
     */
    unoptimized: true,
    // AVIF first, WebP fallback — both far smaller than PNG/JPEG.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    // The brand PNGs are 4800px squares; these cover every rendered size.
    imageSizes: [32, 48, 64, 72, 96, 128, 256, 304, 384],
    // Only 75 is allowed by default in Next 16; declare what we actually use.
    qualities: [70, 75, 90],
  },

  /**
   * Barrel-file tree-shaking. `lucide-react` alone exports 1500+ icons —
   * without this, importing 20 of them can pull in the whole module graph.
   *
   * `framer-motion` is deliberately NOT in this list: it registers its gesture
   * and viewport features as import side effects, and rewriting the barrel into
   * deep imports drops them — `whileInView` then silently never fires.
   */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Immutable, content-hashed font files.
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
