"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form-field";
import {
  businessOptions,
  productOptions,
  restaurantTypeOptions,
  sizeFields,
} from "@/data/demo";
import { demoSchema, type DemoInput } from "@/lib/contact-schema";
import { EASE_OUT } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { toWhatsAppHref } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Book-a-free-demo form.
 *
 * Deliberately shorter than the enquiry form on `/contact`: this one exists to
 * get a call booked, so it asks only what changes the demo itself. The one piece
 * of conditional logic — restaurant type — is watched rather than always shown,
 * because a pharmacy has no use for "food truck or fine dining?".
 *
 * Validation comes from the same Zod schema the API route uses, so the browser
 * and the server cannot disagree about what a valid booking is.
 */
export function DemoForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverMessage, setServerMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    resetField,
    formState: { errors },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    mode: "onTouched",
    defaultValues: {
      intent: "demo",
      name: "",
      email: "",
      phone: "",
      business: "",
      outlets: "",
      branches: "",
      vehicles: "",
      users: "",
      restaurantType: "",
      message: "",
      website: "",
    },
  });

  /*
    `useWatch` rather than `watch()`. The latter returns a new function on every
    render, which the React Compiler cannot memoize — it then skips optimising the
    whole component and warns about it. These are real hooks, each subscribed to one
    field.

    Two levels of narrowing: the product decides whether an edition is asked at
    all, and the edition decides whether a restaurant type is.
  */
  const product = useWatch({ control, name: "product" });
  const business = useWatch({ control, name: "business" });
  const isServeSync = product === "ServeSync POS";
  const isRestaurant = isServeSync && business === "Restaurant";

  /*
    Clear whatever no longer applies. Without this, picking ServeSync → Restaurant
    → Café → StaySync would submit a hotel that is somehow also a café: hiding a
    field does not unregister it, so the stale value would still be posted.
  */
  React.useEffect(() => {
    if (!isServeSync) resetField("business", { defaultValue: "" });
  }, [isServeSync, resetField]);

  /*
    Same for the size fields. Switching Fleet Flow → StaySync must not leave a
    vehicle count attached to a hotel booking.
  */
  React.useEffect(() => {
    if (!product) return;
    const asked = new Set(sizeFields[product].map((field) => field.name));
    for (const name of ["outlets", "branches", "vehicles", "users"] as const) {
      if (!asked.has(name)) resetField(name, { defaultValue: "" });
    }
  }, [product, resetField]);

  React.useEffect(() => {
    if (!isRestaurant) resetField("restaurantType", { defaultValue: "" });
  }, [isRestaurant, resetField]);

  async function onSubmit(values: DemoInput) {
    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, intent: "demo" }),
      });

      const data: { ok: boolean; message?: string; error?: string } =
        await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Submission failed.");
      }

      setStatus("success");
      setServerMessage(
        data.message ??
          "Our team will contact you soon! Thanks for choosing ServeSync by Plutox.",
      );
      reset();
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call or WhatsApp us instead.",
      );
    }
  }

  /*
    On success the form is replaced rather than merely banner-topped: the job is
    done, and leaving eight empty fields under a thank-you invites a second
    submission nobody wants.
  */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        role="status"
        className="rounded-2xl border border-success/30 bg-success/8 p-8 text-center sm:p-10"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
          <CheckCircle2 className="size-6" />
        </span>
        <h2 className="font-display mt-5 text-xl font-semibold tracking-tight">
          Our team will contact you soon!
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for choosing ServeSync by Plutox. We usually reply within one
          business day — sooner if you WhatsApp us.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="md" variant="outline">
            <a
              href={toWhatsAppHref(
                siteConfig.contact.whatsapp,
                "Hi Plutox Tech — I just booked a ServeSync demo.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us now
            </a>
          </Button>
          <Button
            size="md"
            variant="ghost"
            onClick={() => {
              setStatus("idle");
              setServerMessage(null);
            }}
          >
            Book another demo
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-1"
    >
      {/* Honeypot — in the DOM, hidden from sight and from assistive tech. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="demo-website">Website</label>
        <input
          id="demo-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="name"
          required
          error={errors.name?.message}
        >
          <Input
            id="name"
            autoComplete="name"
            placeholder="Ayesha Karim"
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-message"
            {...register("name")}
          />
        </Field>

        <Field
          label="Phone / WhatsApp"
          htmlFor="phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 3XX XXX XXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-message"
            {...register("phone")}
          />
        </Field>
      </div>

      <Field
        label="Email address"
        htmlFor="email"
        required
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-message"
          {...register("email")}
        />
      </Field>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field
          label="Which product?"
          htmlFor="product"
          required
          error={errors.product?.message}
          hint="ServeSync runs tills; StaySync runs hotels; Fleet Flow runs trucks."
        >
          <Select
            id="product"
            defaultValue=""
            aria-invalid={Boolean(errors.product)}
            aria-describedby="product-message"
            {...register("product")}
          >
            <option value="" disabled>
              Select a product…
            </option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        {/*
          The size questions come from `sizeFields`, which the schema validates
          against too. ServeSync asks for outlets, StaySync for hotel branches,
          Fleet Flow for vehicles, users and branches — a carrier running a
          hundred trucks with six staff is a different conversation from twenty
          trucks with forty, and one generic "how many?" loses that.
        */}
        {(product ? sizeFields[product] : sizeFields["ServeSync POS"]).map(
          (field) => (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={field.name}
              required
              error={errors[field.name]?.message}
            >
              <Select
                id={field.name}
                defaultValue=""
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={`${field.name}-message`}
                {...register(field.name)}
              >
                <option value="" disabled>
                  Select a range…
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
          ),
        )}
      </div>

      {/*
        ServeSync's edition, asked only for ServeSync — StaySync and Fleet Flow
        have no editions, and offering the question anyway would imply they do.
      */}
      {isServeSync ? (
        <div className="animate-in fade-in slide-in-from-top-1 duration-300">
          <Field
            label="What do you run?"
            htmlFor="business"
            required
            error={errors.business?.message}
            hint="This picks the ServeSync edition we'll show you."
          >
            <Select
              id="business"
              defaultValue=""
              aria-invalid={Boolean(errors.business)}
              aria-describedby="business-message"
              {...register("business")}
            >
              <option value="" disabled>
                Select your business…
              </option>
              {businessOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      ) : null}

      {/*
        Restaurant type, revealed only for the restaurant edition.

        Mount-only animation, deliberately: an `AnimatePresence` exit here left
        the field on screen indefinitely whenever the tab wasn't compositing
        frames — so switching Restaurant → Pharmacy kept a restaurant-type select
        on a pharmacy booking. Unmounting is now synchronous and only the entrance
        animates, which is the half that can fail harmlessly.
      */}
      {isRestaurant ? (
        <div className="animate-in fade-in slide-in-from-top-1 duration-300">
          <Field
            label="What kind of restaurant?"
            htmlFor="restaurantType"
            required
            error={errors.restaurantType?.message}
            hint="A cloud kitchen and a fine-dining room need very different demos."
          >
            <Select
              id="restaurantType"
              defaultValue=""
              aria-invalid={Boolean(errors.restaurantType)}
              aria-describedby="restaurantType-message"
              {...register("restaurantType")}
            >
              <option value="" disabled>
                Select a type…
              </option>
              {restaurantTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      ) : null}

      <Field
        label="Anything we should know?"
        htmlFor="message"
        error={errors.message?.message}
        hint="What are you running today, and what is it costing you? A line or two is plenty."
      >
        <Textarea
          id="message"
          rows={4}
          placeholder="Three branches on two different tills, and no single stock report…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-message"
          {...register("message")}
        />
      </Field>

      {/*
        Mount-only here too. A stalled exit would leave a stale error banner over
        a retry that actually succeeded, which is worse than no animation at all.
      */}
      {serverMessage ? (
        <div
          role="alert"
          className="mb-3 flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/10 p-3.5 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {serverMessage}
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-2 w-full sm:w-auto sm:self-start sm:px-10"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <CalendarCheck className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted-foreground/70">
        The demo is free and there is nothing to install. We use your details
        only to arrange it — see our{" "}
        <a
          href="/privacy-policy"
          className="text-primary underline-offset-2 hover:underline"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
