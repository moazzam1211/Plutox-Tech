/**
 * Option lists for the "Book a free demo" form on `/demo`.
 *
 * Shared between the form and the Zod schema in `src/lib/contact-schema.ts`, so
 * the UI can never offer a value the API would reject. `as const` matters: it
 * gives the schema a literal union to validate rather than plain `string[]`.
 */

/** The three ServeSync editions, in the words a buyer would use. */
export const businessOptions = ["Restaurant", "Mart & Retail", "Pharmacy"] as const;

/**
 * Restaurant sub-types, revealed only when Restaurant is the business.
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

/** Outlet bands rather than a free number — nobody counts precisely at this stage. */
export const outletOptions = [
  "1 outlet",
  "2–5 outlets",
  "6–10 outlets",
  "11–25 outlets",
  "26+ outlets",
] as const;
