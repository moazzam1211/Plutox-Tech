import * as React from "react";

/**
 * Social glyphs.
 *
 * `lucide-react` v1 removed all brand icons, so these are drawn in-house from
 * geometric primitives — each is a faithful reduction of the platform's mark
 * rather than a traced copy. They inherit `currentColor`, share one 24×24
 * viewBox for optical consistency, and add zero bytes of icon-font or
 * third-party asset weight.
 */
type IconProps = React.ComponentProps<"svg">;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** LinkedIn — rounded tile with the "in" lettermark. */
export function LinkedInIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.5 10.5v6" />
      <circle cx="7.5" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
    </Svg>
  );
}

/** GitHub — the repository fork/branch graph, GitHub's other core symbol. */
export function GitHubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="7" cy="5.5" r="2.2" />
      <circle cx="7" cy="18.5" r="2.2" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M7 7.7v8.6" />
      <path d="M17 11.2v1.3a3.5 3.5 0 0 1-3.5 3.5H9.2" />
    </Svg>
  );
}

/** X (formerly Twitter) — the crossed strokes. */
export function XIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M4 4l7.2 8.6L4.6 20" />
      <path d="M20 20l-7.2-8.6L19.4 4" />
    </Svg>
  );
}

/** Instagram — rounded tile, lens and flash dot. */
export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Facebook — circle enclosing the "f". */
export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 8.2h-1.4a2 2 0 0 0-2 2V21M9.6 13.2h4.6" />
    </Svg>
  );
}

/** YouTube — rounded screen with a play triangle. */
export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.6 9.4l4.6 2.6-4.6 2.6V9.4z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Dribbble — ball with its three signature seam arcs. */
export function DribbbleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.3 7.4c3.7 0 8.4 1.1 11.4 5.4" />
      <path d="M8.6 3.7c3 3.3 5.4 8.2 6.1 15.1" />
      <path d="M20.8 13.4c-4.6-1.2-9.4.1-12.6 5.6" />
    </Svg>
  );
}

/** WhatsApp — speech bubble with a handset. */
export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M9.2 9.1c.2 1.9 2 3.9 4.1 4.5l1-1.2 1.7.9-.5 1.6c-2.4.5-6.6-2.6-7.2-5.5l1.5-.8Z" />
    </Svg>
  );
}
