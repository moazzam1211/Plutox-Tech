import { LegalLayout, type LegalSection } from "@/components/layout/legal-layout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms governing use of the ${siteConfig.name} website, our proposals and quotations, project delivery, intellectual property and support arrangements.`,
  path: "/terms",
});

/**
 * Template terms of service.
 *
 * Reflects the commercial model described elsewhere on the site — fixed
 * milestones, client source-code ownership, 30-day warranty. It is a starting
 * point, not legal advice; have counsel adapt it to your jurisdiction and
 * insurance position before relying on it.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    paragraphs: [
      `These terms govern your use of the ${siteConfig.url} website and any proposal, quotation or statement of work issued by ${siteConfig.legalName} ("Plutox Tech", "we", "us"). By using this site you accept these terms.`,
      "Where you engage us for a project, a signed statement of work will also apply. If a statement of work conflicts with these terms, the statement of work prevails for that engagement.",
    ],
  },
  {
    heading: "Website content",
    paragraphs: [
      "The content on this site is provided for general information. Product descriptions, client names, case-study figures and imagery shown here are illustrative and do not constitute a warranty, a specification, or an offer capable of acceptance.",
      "We may change or withdraw any part of the site at any time without notice.",
    ],
  },
  {
    heading: "Quotations and proposals",
    paragraphs: [
      "Prices shown on the site are indicative starting points, not a rate card. A binding price is only created by a written proposal signed by both parties.",
      "Proposals are valid for 30 days from issue unless stated otherwise. Estimates are prepared on the scope described at the time; changes to that scope are quoted separately as a written change order before work on them begins.",
    ],
  },
  {
    heading: "Project delivery and client responsibilities",
    paragraphs: [
      "We deliver in milestones, each with an agreed scope, price and date. A milestone is complete when it meets its written acceptance criteria.",
      "Timely delivery depends on your side too. You agree to:",
    ],
    bullets: [
      "Nominate one decision-maker empowered to approve designs and accept milestones.",
      "Provide content, data exports, credentials and third-party access when reasonably requested.",
      "Review deliverables and respond within five working days of a review request.",
      "Ensure any data you supply is lawfully held and may be processed for the project.",
    ],
  },
  {
    heading: "Fees and payment",
    paragraphs: [
      "Unless a statement of work says otherwise, milestones are invoiced on completion and payable within 14 days. A deposit may be required before work starts.",
      "Prices exclude taxes, duties and third-party costs such as hosting, licences, app-store fees and payment-gateway charges, which are passed through at cost.",
      "We may suspend work on materially overdue invoices after giving written notice. Late payments may attract interest at the statutory rate.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "On payment of all fees due for a project, ownership of the bespoke source code, database schema and design assets created specifically for you transfers to you outright. You receive the code, the documentation and the infrastructure credentials.",
      "We retain ownership of our pre-existing frameworks, internal libraries, tooling and product platforms, and of general know-how. Where any of these are embedded in your deliverable, you receive a perpetual, worldwide, royalty-free licence to use, modify and sublicense them as part of that deliverable.",
      "Third-party open-source components remain subject to their own licences, which we will list on request.",
    ],
  },
  {
    heading: "Confidentiality",
    paragraphs: [
      "Each party will keep the other's confidential information confidential, use it only for the purposes of the engagement, and protect it with at least the care it applies to its own. This obligation survives termination.",
      "We will sign your NDA before you share anything sensitive; if you would rather use ours, we can provide it.",
      "Unless you tell us otherwise in writing, we may name you as a client and describe the work in general terms. We will never publish figures, screenshots or data without your written approval.",
    ],
  },
  {
    heading: "Warranty and support",
    paragraphs: [
      "We warrant that deliverables will materially conform to their agreed acceptance criteria for 30 days after go-live, and we will fix conforming defects reported in that window at no charge.",
      "The warranty does not cover faults caused by changes made by you or a third party, by third-party service outages, by use outside the documented environment, or by defects in data you supplied.",
      "Ongoing support, monitoring and enhancement are provided under a separate support agreement.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
      "Subject to that, neither party is liable for indirect or consequential loss, loss of profit, loss of revenue, loss of anticipated savings, or loss or corruption of data where that data was not in our custody.",
      "Our total aggregate liability arising out of an engagement is limited to the total fees paid by you for that engagement in the 12 months preceding the claim.",
    ],
  },
  {
    heading: "Termination",
    paragraphs: [
      "Either party may terminate an engagement on 30 days' written notice, or immediately if the other commits a material breach that remains unremedied 14 days after written notice.",
      "On termination you pay for all work completed and work in progress up to the termination date. We will hand over the work product for milestones you have paid for in full.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      `These terms are governed by the laws of ${siteConfig.contact.address.country}, and the courts of ${siteConfig.contact.address.city} have exclusive jurisdiction, unless a signed statement of work specifies a different forum.`,
      "Before commencing proceedings, both parties agree to attempt in good faith to resolve any dispute through discussion between senior representatives.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about these terms: ${siteConfig.contact.email}. Postal address: ${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.region} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.country}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      description="How we quote, deliver, warrant and support the work — and who owns what when it's done."
      lastUpdated="6 August 2026"
      sections={SECTIONS}
    />
  );
}
