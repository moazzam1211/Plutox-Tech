/**
 * Option lists for the "Book a free demo" form on `/demo`.
 *
 * Shared between the form and the Zod schema in `src/lib/contact-schema.ts`, so
 * the UI can never offer a value the API would reject. `as const` matters: it
 * gives the schema a literal union to validate rather than plain `string[]`.
 */

/** The three platforms, matching the `slug`s in `products.ts`. */
export const productOptions = [
  "ServeSync POS",
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

/**
 * Size bands rather than a free number — nobody counts precisely at this stage.
 *
 * The values carry no noun because what is being counted depends on the product;
 * `unitNoun` supplies it, so a hotel is asked about properties rather than
 * outlets.
 */
export const outletOptions = ["1", "2–5", "6–10", "11–25", "26+"] as const;

/** What each product's size band is actually counting. */
export const unitNoun: Record<ProductOption, string> = {
  "ServeSync POS": "outlets",
  "StaySync Hotel ERP": "properties",
  "Fleet Flow": "vehicles",
};
