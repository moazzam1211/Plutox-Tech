import { z } from "zod";

import {
  businessOptions,
  productOptions,
  restaurantTypeOptions,
  siteOptions,
  sizeFields,
  userOptions,
  vehicleOptions,
} from "@/data/demo";
import { budgetOptions, serviceOptions } from "@/data/enquiry";

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

/**
 * Demo-booking payload from `/demo`, handled by the same endpoint.
 *
 * Shorter than the enquiry on purpose: this form's whole job is to get a call
 * booked, so it asks only what shapes the demo — who you are, which product, how
 * big, and then narrows: ServeSync asks which edition, and the restaurant edition
 * asks what kind of restaurant. `message` is optional here, where the enquiry
 * form insists on it.
 */
export const demoSchema = z
  .object({
    intent: z.literal("demo"),
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(80, "That name is longer than we can store."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a reachable phone number.")
      .max(24, "That number looks too long.")
      .regex(/^[\d\s()+.-]+$/, "Use digits, spaces and + ( ) - only."),
    product: z.enum(productOptions, {
      message: "Which product would you like to see?",
    }),
    /** Required when `product` is ServeSync — the other two have no editions. */
    business: z.enum(businessOptions).optional().or(z.literal("")),
    /*
      Every size field is optional here and made required per product below, so
      one schema covers all three without a discriminated union per product.
    */
    outlets: z.enum(siteOptions).optional().or(z.literal("")),
    branches: z.enum(siteOptions).optional().or(z.literal("")),
    vehicles: z.enum(vehicleOptions).optional().or(z.literal("")),
    users: z.enum(userOptions).optional().or(z.literal("")),
    /** Required when `business` is Restaurant, ignored otherwise. */
    restaurantType: z.enum(restaurantTypeOptions).optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .max(2000, "Please keep it under 2000 characters.")
      .optional()
      .or(z.literal("")),
    /** Honeypot — must stay empty. Bots fill every field they find. */
    website: z.string().max(0).optional().or(z.literal("")),
  })
  /*
    The conditionals live in the schema rather than only in the component, so a
    ServeSync booking with no edition, or a restaurant with no type, is rejected
    by the server too — a form rule enforced on one side only is not a rule.
  */
  .superRefine((value, ctx) => {
    /*
      The size questions a product actually asks are required; the rest are left
      alone. Driven off the same `sizeFields` table the form renders from, so the
      two can never ask for different things.
    */
    if (value.product) {
      for (const field of sizeFields[value.product]) {
        if (!value[field.name]) {
          ctx.addIssue({
            code: "custom",
            path: [field.name],
            message: "Roughly how many?",
          });
        }
      }
    }

    if (value.product === "ServeSync POS" && !value.business) {
      ctx.addIssue({
        code: "custom",
        path: ["business"],
        message: "Which kind of business — restaurant, mart or pharmacy?",
      });
    }

    if (value.business === "Restaurant" && !value.restaurantType) {
      ctx.addIssue({
        code: "custom",
        path: ["restaurantType"],
        message: "Which kind of restaurant?",
      });
    }
  });

export type DemoInput = z.infer<typeof demoSchema>;

/** Newsletter subscribe payload, handled by the same endpoint. */
export const newsletterSchema = z.object({
  intent: z.literal("newsletter"),
  email: z.string().trim().toLowerCase().email(),
});
