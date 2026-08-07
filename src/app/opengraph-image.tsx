import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

/**
 * Dynamic Open Graph card, generated at build time.
 *
 * `ImageResponse` renders via satori, which supports only flexbox and a subset
 * of CSS — no grid, no CSS variables, no external stylesheets. Everything here
 * is therefore inline flex with literal hex colours.
 *
 * Also serves the Twitter/X card, since `twitter-image` falls back to this.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#f3ffff",
          // Two overlapping radial washes stand in for the site's blobs.
          backgroundImage:
            "radial-gradient(900px 520px at 10% -10%, rgba(139,92,246,0.28), transparent 62%), radial-gradient(760px 480px at 102% 110%, rgba(139,92,246,0.2), transparent 62%)",
          fontFamily: "sans-serif",
          color: "#1a1a1a",
        }}
      >
        {/* ---- Top: brand lock-up ---- */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "#1a1a1a",
              fontSize: "34px",
              fontWeight: 800,
              color: "#f3ffff",
            }}
          >
            P
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Plutox Tech
            </span>
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "3px",
                color: "#5a6060",
                textTransform: "uppercase",
              }}
            >
              Smart Software Solutions
            </span>
          </div>
        </div>

        {/* ---- Middle: headline ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(139,92,246,0.45)",
              backgroundColor: "rgba(139,92,246,0.12)",
              fontSize: "17px",
              color: "#6d28d9",
            }}
          >
            POS · ERP · Hotel · Pharmacy · Web · Mobile · AI
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-3px",
              maxWidth: "980px",
            }}
          >
            We Build Software That Powers Businesses
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#5a6060",
              maxWidth: "860px",
              lineHeight: 1.4,
            }}
          >
            Custom point of sale, ERP, hospitality and AI automation platforms —
            engineered for businesses in 10+ countries.
          </div>
        </div>

        {/* ---- Bottom: proof strip ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "28px",
            borderTop: "1px solid rgba(26,26,26,0.12)",
          }}
        >
          <div style={{ display: "flex", gap: "44px" }}>
            {[
              ["100+", "Projects"],
              ["50+", "Clients"],
              ["10+", "Countries"],
              ["24/7", "Support"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span style={{ fontSize: "34px", fontWeight: 700 }}>{value}</span>
                <span style={{ fontSize: "16px", color: "#5a6060" }}>{label}</span>
              </div>
            ))}
          </div>

          <span style={{ fontSize: "22px", color: "#6d28d9" }}>
            plutoxtech.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
