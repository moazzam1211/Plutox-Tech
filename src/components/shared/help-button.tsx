"use client";

import { ArrowUpRight, Check, Loader2, Mail, Phone, X } from "lucide-react";
import * as React from "react";

import { WhatsAppIcon } from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn, toTelHref, toWhatsAppHref } from "@/lib/utils";

type State = "idle" | "sending" | "sent" | "error";

const WHATSAPP_MESSAGE = "Hi Plutox Tech — I need some help.";

/**
 * Floating Help & Support button.
 *
 * Mirrors the pattern used across the Plutox products (StaySync, ServeSync,
 * ServeSync): a circular question-mark FAB bottom-right with a hover tooltip,
 * opening a panel offering WhatsApp, phone, email and a short ticket form.
 * Keeping it consistent with the products means a client who has used one
 * already knows where to look here.
 *
 * The ticket posts to the same `/api/contact` handler as the full enquiry form,
 * so there is one validated endpoint rather than two.
 */
export function HelpButton() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<State>("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Escape closes the panel. No scroll lock — this is a small popover, not a
  // full-screen dialog, and locking the page behind it would feel heavy.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          // The support form is deliberately short, so the fields the full
          // enquiry form collects are filled with sensible defaults here.
          phone: String(data.get("phone") ?? "0000000"),
          service: "Something else",
          budget: "Not sure yet",
          message: String(data.get("message") ?? ""),
          company: "",
          website: "",
        }),
      });

      const body: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || !body.ok) throw new Error(body.error ?? "Failed");

      setState("sent");
      setMessage("Ticket received — we'll reply by email shortly.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Couldn't send. Please use WhatsApp instead.",
      );
    }
  }

  return (
    <>
      {/* ---------------- FAB ---------------- */}
      <div className="group fixed right-5 bottom-5 z-80 sm:right-6 sm:bottom-6">
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 translate-x-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Help &amp; Support
        </span>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Help and support"
          aria-expanded={open}
          className="grid size-13 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            /* Question mark, drawn to match the products' own help icon. */
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M9.2 9.3a2.9 2.9 0 0 1 5.6 1c0 1.9-2.9 2.9-2.9 2.9" />
              <line x1="12" y1="17.2" x2="12" y2="17.2" />
            </svg>
          )}
        </button>
      </div>

      {/* ---------------- Panel ---------------- */}
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Help and support"
          className="fixed right-4 bottom-22 z-80 w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 sm:right-6"
        >
          <div className="border-b border-border p-4">
            <p className="text-sm font-semibold">Help &amp; Support</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" />
              Typically replies within a few minutes
            </p>
          </div>

          {/* Direct channels first — most people want the fastest route out. */}
          <div className="flex flex-col gap-1.5 border-b border-border p-3">
            <a
              href={toWhatsAppHref(siteConfig.contact.whatsapp, WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-success/35 px-3 py-2.5 text-xs font-medium text-success transition-colors hover:bg-success/10"
            >
              <WhatsAppIcon className="size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">
                WhatsApp {siteConfig.contact.phone}
              </span>
              <ArrowUpRight className="size-3 shrink-0" />
            </a>

            <div className="grid grid-cols-2 gap-1.5">
              <a
                href={toTelHref(siteConfig.contact.phone)}
                className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Phone className="size-3.5" />
                Call
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Mail className="size-3.5" />
                Email
              </a>
            </div>
          </div>

          {/* Ticket form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3">
            <p className="text-[0.6875rem] text-muted-foreground">
              Or raise a ticket
            </p>

            <label htmlFor="help-name" className="sr-only">
              Your name
            </label>
            <input
              id="help-name"
              name="name"
              required
              minLength={2}
              placeholder="Your name"
              autoComplete="name"
              className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />

            <label htmlFor="help-email" className="sr-only">
              Your email
            </label>
            <input
              id="help-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
              className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />

            <label htmlFor="help-message" className="sr-only">
              How can we help?
            </label>
            <textarea
              id="help-message"
              name="message"
              required
              minLength={20}
              rows={3}
              placeholder="How can we help? (a couple of sentences)"
              className="resize-y rounded-md border border-input bg-background px-3 py-2 text-xs leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />

            <Button
              type="submit"
              size="sm"
              variant="accent"
              disabled={state === "sending" || state === "sent"}
              className="w-full"
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending…
                </>
              ) : state === "sent" ? (
                <>
                  <Check />
                  Sent
                </>
              ) : (
                "Send ticket"
              )}
            </Button>

            {/* Live region so the outcome is announced without moving focus. */}
            <p
              aria-live="polite"
              className={cn(
                "min-h-4 text-[0.6875rem] leading-tight",
                state === "error" ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {message ?? ""}
            </p>
          </form>
        </div>
      ) : null}
    </>
  );
}
