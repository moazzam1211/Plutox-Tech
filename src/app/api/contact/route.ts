import { NextResponse } from "next/server";

import { contactSchema, newsletterSchema } from "@/lib/contact-schema";

/**
 * Contact + newsletter endpoint.
 *
 * Validates with the same Zod schema the client form uses, then hands off to a
 * delivery function. Delivery is a deliberate no-op placeholder: wiring a
 * specific mail provider is an infrastructure decision, and the integration
 * point is isolated to one function so it is a five-line change.
 *
 * To go live, install a provider and replace `deliver()` — for example:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "website@plutoxtech.com",
 *     to: siteConfig.contact.salesEmail,
 *     replyTo: payload.email,
 *     subject: `New enquiry — ${payload.service}`,
 *     text: body,
 *   });
 */

/** Never cache a mutation endpoint. */
export const dynamic = "force-dynamic";

/**
 * Very small in-memory rate limiter, keyed by client IP.
 *
 * Adequate for a single-instance marketing site and enough to blunt casual
 * form spam. Behind multiple instances or a serverless platform this must be
 * replaced with a shared store (Upstash, Redis) — the map is per-process.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [existingKey, timestamps] of hits) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) hits.delete(existingKey);
    }
  }

  return false;
}

/** Replace with a real mail/CRM provider — see the note above. */
async function deliver(subject: string, body: string) {
  // Server-side only; never reaches the browser bundle.
  console.info(`[contact] ${subject}\n${body}`);
}

export async function POST(request: Request) {
  // `x-forwarded-for` is set by any sane proxy; fall back to a constant so the
  // limiter still applies (globally) in local development.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  /* ---------------- Newsletter ---------------- */
  const newsletter = newsletterSchema.safeParse(json);
  if (newsletter.success) {
    await deliver(
      "Newsletter subscription",
      `Email: ${newsletter.data.email}`,
    );
    return NextResponse.json({ ok: true });
  }

  /* ---------------- Full enquiry ---------------- */
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        // Field-level messages so the client can map them back onto inputs.
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const payload = parsed.data;

  // Honeypot tripped — respond as success so the bot doesn't learn anything.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  await deliver(
    `New enquiry — ${payload.service}`,
    [
      `Name:     ${payload.name}`,
      `Company:  ${payload.company || "—"}`,
      `Email:    ${payload.email}`,
      `Phone:    ${payload.phone}`,
      `Service:  ${payload.service}`,
      `Budget:   ${payload.budget}`,
      "",
      payload.message,
    ].join("\n"),
  );

  return NextResponse.json({
    ok: true,
    message: "Thanks — we'll reply within one business day.",
  });
}

/** Explicitly reject everything else rather than 405-ing with no context. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to submit the contact form." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
