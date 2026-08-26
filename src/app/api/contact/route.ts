import { NextResponse } from "next/server";
import { Resend } from "resend";

import { sizeFields } from "@/data/demo";
import {
  contactSchema,
  demoSchema,
  newsletterSchema,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

/**
 * Contact, demo-booking and newsletter endpoint.
 *
 * Validates with the same Zod schemas the client forms use, then delivers by
 * email through Resend. Every submission routes by intent:
 *
 *   demo booking → sales@   (buying intent — someone should chase it)
 *   enquiry      → info@    (project enquiries, could be anything)
 *   newsletter   → hello@
 *
 * The addresses live in `siteConfig.contact`, not here, and are deliberately
 * separate from the `hello@` printed on the contact page — where a form posts
 * and what a visitor is invited to write to are two different decisions.
 *
 * `replyTo` is the sender's own address, so hitting reply in the inbox answers
 * the person rather than the website.
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

/*
  Resend needs a verified sending domain. Until plutoxtech.com is verified in
  Resend, set MAIL_FROM to their sandbox sender (onboarding@resend.dev), which
  delivers only to the account owner's own address — enough to prove the wiring
  without pretending it is production-ready.
*/
const MAIL_FROM =
  process.env.MAIL_FROM ?? "Plutox Tech <onboarding@resend.dev>";

/*
  Constructed lazily and only when a key exists. Instantiating Resend without a
  key throws at import time, which would take the whole route down — including
  the validation that is useful even when mail is not configured.
*/
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Thrown when the provider rejected the send, so the caller can say so. */
class DeliveryError extends Error {}

/**
 * Send one submission by email.
 *
 * Always logs first. If Resend then fails — or is not configured at all — the
 * submission is still recoverable from the server log rather than gone, which is
 * the difference between a bad hour and a lost customer.
 */
async function deliver(
  subject: string,
  body: string,
  options: { to: string; replyTo?: string },
) {
  // Server-side only; never reaches the browser bundle. The recipient is logged
  // too: when someone reports a lead never arrived, the first question is which
  // inbox it was aimed at, and guessing from the code is slower than reading it.
  console.info(`[contact] → ${options.to} · ${subject}\n${body}`);

  if (!resend) {
    console.warn("[contact] RESEND_API_KEY is not set — logged only, not sent.");
    return;
  }

  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: options.to,
    replyTo: options.replyTo,
    subject,
    text: body,
  });

  if (error) {
    console.error(`[contact] Resend rejected the send: ${error.message}`);
    throw new DeliveryError(error.message);
  }
}

/**
 * Turn a failed send into an answer the visitor can act on.
 *
 * Deliberately not a success response: telling someone we got their message when
 * it never left the building is the one outcome worse than an error, because they
 * will sit and wait for a call that is not coming. The WhatsApp number is in the
 * message so the next step is obvious.
 */
function deliveryFailed() {
  return NextResponse.json(
    {
      ok: false,
      error: `We could not send that just now. Please WhatsApp us on ${siteConfig.contact.phone} and we will pick it up straight away.`,
    },
    { status: 502 },
  );
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
    try {
      await deliver(
        "Newsletter subscription",
        `Email: ${newsletter.data.email}`,
        { to: siteConfig.contact.email, replyTo: newsletter.data.email },
      );
    } catch {
      return deliveryFailed();
    }
    return NextResponse.json({ ok: true });
  }

  /* ---------------- Demo booking ---------------- */
  const demo = demoSchema.safeParse(json);
  if (demo.success) {
    const booking = demo.data;

    // Honeypot tripped — answer as success so the bot learns nothing.
    if (booking.website) return NextResponse.json({ ok: true });

    try {
      await deliver(
        [
          `Demo request — ${booking.product}`,
          booking.business ? ` · ${booking.business}` : "",
          booking.restaurantType ? ` (${booking.restaurantType})` : "",
        ].join(""),
        [
          `Name:     ${booking.name}`,
          `Email:    ${booking.email}`,
          `Phone:    ${booking.phone}`,
          `Product:  ${booking.product}`,
          `Edition:  ${booking.business || "—"}`,
          `Type:     ${booking.restaurantType || "—"}`,
          /*
            Only the size questions this product asked, in its own words — a
            hotel booking has no vehicle count and should not print an empty one.
          */
          ...sizeFields[booking.product].map(
            (field) =>
              `${(field.short + ":").padEnd(10)}${booking[field.name] || "—"}`,
          ),
          "",
          booking.message || "(no note)",
        ].join("\n"),
        // Buying intent — this one goes to whoever chases leads.
        { to: siteConfig.contact.salesEmail, replyTo: booking.email },
      );
    } catch {
      return deliveryFailed();
    }

    return NextResponse.json({
      ok: true,
      message:
        "Our team will contact you soon! Thanks for choosing ServeSync by Plutox.",
    });
  }

  /*
    A demo payload that failed validation must not fall through to the enquiry
    schema below — that would report the wrong field errors entirely. The intent
    literal is what separates them, so key off it.
  */
  if (
    typeof json === "object" &&
    json !== null &&
    (json as { intent?: unknown }).intent === "demo"
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        issues: demo.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
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

  try {
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
      // Project enquiries go to info@, kept separate from the hello@ printed on
      // the page so the routing and the published address can differ.
      { to: siteConfig.contact.enquiryEmail, replyTo: payload.email },
    );
  } catch {
    return deliveryFailed();
  }

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
