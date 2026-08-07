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
