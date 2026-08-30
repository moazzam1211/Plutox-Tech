/**
 * Option lists for the "Book a free demo" form on `/demo`.
 *
 * Shared between the form and the Zod schema in `src/lib/contact-schema.ts`, so
 * the UI can never offer a value the API would reject. `as const` matters: it
 * gives the schema a literal union to validate rather than plain `string[]`.
 */

/** The three platforms, matching the `slug`s in `products.ts`. */
export const productOptions = [
  "ServeSync ERP",
  "StaySync Hotel ERP",
  "Fleet Flow",
] as const;

export type ProductOption = (typeof productOptions)[number];

/**
 * ServeSync's three editions, in the words a buyer would use.
 *
 * Only asked when ServeSync is the product — StaySync and Fleet Flow have no
 * editions to choose between.
 */
export const businessOptions = ["Restaurant", "Mart & Retail", "Pharmacy"] as const;

/**
 * Restaurant sub-types, revealed only when Restaurant is the edition.
 *
 * A cloud kitchen and a fine-dining room want very different demos — one cares
 * about aggregator orders and rider dispatch, the other about table service and
 * covers — so asking here saves the first ten minutes of the call.
 */
export const restaurantTypeOptions = [
  "Café",
  "Bar",
  "Fast food",
  "Fine dining",
  "Cloud kitchen",
  "Quick service (QSR)",
  "Food truck",
  "Cart / kiosk",
  "Bakery",
  "Other",
] as const;

/* ------------------------------------------------------------------ */
/* How big are you — asked in each product's own terms                */
/* ------------------------------------------------------------------ */

/** Sites: outlets for a POS client, branches for a hotel group or a carrier. */
export const siteOptions = ["1", "2–5", "6–10", "11–25", "26+"] as const;

/** Vehicles. A fleet of six is a different product conversation from sixty. */
export const vehicleOptions = ["1–5", "6–20", "21–50", "51–100", "100+"] as const;

/** Named users — drivers, dispatchers and office staff who will each sign in. */
export const userOptions = ["1–5", "6–20", "21–50", "51+"] as const;

/** One size question: which field it fills, what it asks, and its bands. */
export interface SizeField {
  name: "outlets" | "branches" | "vehicles" | "users";
  /** The question, as the form asks it. */
  label: string;
  /** Noun phrase for the email body, where a question mark reads oddly. */
  short: string;
  options: readonly string[];
}

/**
 * The size questions each product actually needs.
 *
 * A POS client is sized by outlets and nothing else. A hotel group is sized by
 * branches. A carrier needs three numbers, because a hundred trucks run by six
 * people is a different quote from twenty trucks run by forty — one generic
 * "how many?" would have flattened all of that into a number nobody can price.
 */
export const sizeFields: Record<ProductOption, SizeField[]> = {
  "ServeSync ERP": [
    { name: "outlets", label: "How many outlets?", short: "Outlets", options: siteOptions },
  ],
  "StaySync Hotel ERP": [
    {
      name: "branches",
      label: "How many hotel branches?",
      short: "Branches",
      options: siteOptions,
    },
  ],
  "Fleet Flow": [
    { name: "vehicles", label: "How many vehicles?", short: "Vehicles", options: vehicleOptions },
    { name: "users", label: "How many users?", short: "Users", options: userOptions },
    { name: "branches", label: "How many branches?", short: "Branches", options: siteOptions },
  ],
};
