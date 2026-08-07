import * as React from "react";

/**
 * Renders a structured-data payload as a `<script type="application/ld+json">`.
 *
 * Two details this centralises:
 *
 * 1. `<` is escaped to its unicode form. `JSON.stringify` does not sanitise
 *    markup, so a string containing `</script>` inside the payload would
 *    otherwise break out of the tag — the escape closes that hole.
 * 2. The tag is rendered in the component body rather than inside an explicit
 *    `<head>`. React 19 hoists it for us; emitting it inside `<head>` in a
 *    layout results in the tag appearing twice in the served HTML.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
