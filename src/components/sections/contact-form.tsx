"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Field, Input, Select, Textarea } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { budgetOptions, serviceOptions } from "@/data/enquiry";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { EASE_OUT } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Project enquiry form.
 *
 * `react-hook-form` + the shared Zod schema means validation rules live in
 * exactly one place and run identically in the browser and on the server.
 * Validation is deferred to blur (`mode: "onTouched"`) so the form doesn't
 * shout at people while they are still typing their name.
 */
export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverMessage, setServerMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { ok: boolean; message?: string; error?: string } =
        await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Submission failed.");
      }

      setStatus("success");
      setServerMessage(
        data.message ?? "Thanks — we'll reply within one business day.",
      );
      reset();
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email us directly.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-1"
    >
      {/*
        Honeypot. Hidden from sight and from assistive tech, but present in the
        DOM — automated form-fillers populate it, which the server rejects.
      */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
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
          label="Company"
          htmlFor="company"
          error={errors.company?.message}
        >
          <Input
            id="company"
            autoComplete="organization"
            placeholder="CareWell Pharmacies"
            aria-invalid={Boolean(errors.company)}
            aria-describedby="company-message"
            {...register("company")}
          />
        </Field>

        <Field
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-message"
            {...register("email")}
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
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 123 4567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-message"
            {...register("phone")}
          />
        </Field>

        <Field
          label="Service needed"
          htmlFor="service"
          required
          error={errors.service?.message}
        >
          <Select
            id="service"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby="service-message"
            {...register("service")}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Budget range"
          htmlFor="budget"
          required
          error={errors.budget?.message}
        >
          <Select
            id="budget"
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            aria-describedby="budget-message"
            {...register("budget")}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Tell us about the project"
        htmlFor="message"
        required
        error={errors.message?.message}
        hint="What are you running today, and what is it costing you? A few sentences is plenty."
      >
        <Textarea
          id="message"
          rows={5}
          placeholder="We run 9 grocery stores on three different systems and can't get a single stock report…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-message"
          {...register("message")}
        />
      </Field>

      {/* Result banner */}
      <AnimatePresence mode="wait">
        {serverMessage ? (
          <motion.div
            key={status}
            role={status === "error" ? "alert" : "status"}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div
              className={
                status === "success"
                  ? "mb-3 flex items-start gap-2.5 rounded-xl border border-success/25 bg-success/10 p-3.5 text-sm text-success"
                  : "mb-3 flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/10 p-3.5 text-sm text-destructive"
              }
            >
              {status === "success" ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
              )}
              {serverMessage}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
            Send enquiry
            <Send className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted-foreground/70">
        We use your details only to reply to this enquiry. No lists, no
        third-party sharing — see our{" "}
        <a href="/privacy-policy" className="text-primary underline-offset-2 hover:underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
