"use client";

import Image from "next/image";
import * as React from "react";

import { founder } from "@/data/founder";

/**
 * Founder portrait with a graceful fallback.
 *
 * A client component purely so `onError` can swap in the generated placeholder
 * if the real photo hasn't been added yet — a missing portrait degrades to
 * something on-brand rather than a broken-image icon.
 *
 * The 4:5 crop means a replacement photo of any aspect ratio fills the frame
 * without distorting.
 */
export function FounderPortrait() {
  const [src, setSrc] = React.useState<string>(founder.photo);

  return (
    // `image-zoom` supplies the overflow clip plus a slow scale on hover.
    <figure className="image-zoom rounded-lg border border-border bg-card">
      <div className="relative aspect-4/5">
        <Image
          src={src}
          alt={founder.photoAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 20rem"
          className="object-cover"
          onError={() => setSrc(founder.photoFallback)}
        />
      </div>

      <figcaption className="border-t border-border p-4">
        <p className="font-display text-base font-semibold tracking-tight">
          {founder.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{founder.role}</p>
      </figcaption>
    </figure>
  );
}
