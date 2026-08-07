"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import * as React from "react";

/** Height of the sticky navbar, so anchor targets aren't hidden behind it. */
const NAV_OFFSET = -96;

/**
 * The live instance is held in a ref and read through a getter rather than
 * being stored in state.
 *
 * Consumers only need Lenis inside event handlers ("scroll to top" on click),
 * never during render — so publishing it as state would trigger a re-render of
 * the whole tree on mount for no benefit.
 */
type LenisGetter = () => Lenis | null;

const LenisContext = React.createContext<LenisGetter>(() => null);

/**
 * Access the live Lenis instance. Returns `null` before the provider has
 * mounted, or when smoothing is unavailable.
 *
 * Call it inside an event handler, not during render.
 */
export function useLenis(): LenisGetter {
  return React.useContext(LenisContext);
}

/**
 * Lenis smooth scrolling.
 *
 * Notes on the configuration:
 * - `autoRaf` lets Lenis own its own animation frame, so we don't run a second
 *   competing RAF loop.
 * - `anchors` makes `href="#section"` links glide instead of jumping, offset by
 *   the navbar height.
 * - `syncTouch` is intentionally **off**: hijacking touch scrolling on phones
 *   costs more in perceived responsiveness than the smoothing gains.
 * - `respectReducedMotion` defaults to true in Lenis, which disables smoothing
 *   for users who ask the OS for reduced motion.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = React.useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Stable identity, so context consumers never re-render.
  const getLenis = React.useCallback<LenisGetter>(() => lenisRef.current, []);

  React.useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch feels better than a simulated one.
      syncTouch: false,
      autoRaf: true,
      anchors: { offset: NAV_OFFSET, duration: 1.1 },
      // Don't fight scroll containers such as the mobile nav drawer.
      allowNestedScroll: true,
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent") ?? false,
    });

    lenisRef.current = instance;

    return () => {
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // App Router client navigations don't reset Lenis' internal target, so a new
  // page would otherwise animate down from the previous scroll position.
  React.useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return (
    <LenisContext.Provider value={getLenis}>{children}</LenisContext.Provider>
  );
}
