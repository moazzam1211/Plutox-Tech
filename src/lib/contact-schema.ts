import { z } from "zod";

import { budgetOptions, serviceOptions } from "@/data/blog";

/**
 * Contact form contract.
 *
 * Defined once and imported by both the client form and the API route, so the
 * browser and the server can never disagree about what a valid submission is.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is longer than we can store."),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    // Deliberately permissive: international formats vary far more than most
    // regexes assume, and rejecting a real number costs more than accepting a
    // malformed one.
    .min(7, "Enter a reachable phone number.")
    .max(24, "That number looks too long.")
    .regex(/^[\d\s()+.-]+$/, "Use digits, spaces and + ( ) - only."),
  service: z.enum(serviceOptions, {
    message: "Choose the service you're interested in.",
  }),
  budget: z.enum(budgetOptions, {
    message: "Pick an approximate budget range.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Give us a couple of sentences so we can respond usefully.")
    .max(4000, "Please keep it under 4000 characters."),
  /** Honeypot — must stay empty. Bots fill every field they find. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Newsletter subscribe payload, handled by the same endpoint. */
export const newsletterSchema = z.object({
  intent: z.literal("newsletter"),
  email: z.string().trim().toLowerCase().email(),
});
