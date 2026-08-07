"use client";

import * as React from "react";

/**
 * Subscribe to a CSS media query.
 *
 * Uses `useSyncExternalStore` so the value is correct on the very first
 * client render (no hydration flash) while still returning `false` during SSR,
 * where no matchMedia exists.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // server snapshot
  );
}

/** True when the viewport is below the `lg` breakpoint. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 1023px)");
}

/** True when the user has asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on devices whose primary input cannot hover (phones, tablets). */
export function useIsTouchDevice() {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}
