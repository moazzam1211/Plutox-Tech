/**
 * Option lists for the contact enquiry form.
 *
 * Shared deliberately: the select fields on `/contact` and the Zod schema in
 * `src/lib/contact-schema.ts` both read from here, so a value can never be
 * offered in the UI that the API would then reject.
 *
 * `as const` matters — it gives the schema a literal union to validate against
 * rather than plain `string[]`.
 */

/** Options shown in the contact form's service select. */
export const serviceOptions = [
  "POS Software Development",
  "Restaurant POS",
  "Mart & Retail POS",
  "Pharmacy POS",
  "Hotel Management System",
  "ERP Development",
  "CRM Development",
  "Web Development",
  "Mobile Application",
  "Desktop Application",
  "Cloud & DevOps",
  "AI Automation",
  "API & Integrations",
  "Custom Software",
  "Something else",
] as const;

/** Budget bands shown in the contact form. */
export const budgetOptions = [
  "Under $2,500",
  "$2,500 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $75,000",
  "$75,000+",
  "Not sure yet",
] as const;
