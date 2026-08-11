import * as React from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

/**
 * True below the `md` breakpoint.
 *
 * Uses `useSyncExternalStore` rather than the shadcn default of an effect that
 * calls `setState` on mount. That pattern trips `react-hooks/set-state-in-effect`,
 * and it also renders one frame at the wrong value before correcting itself. The
 * server snapshot returns `false`, which is the desktop-first assumption the
 * layout already makes.
 */
export function useIsMobile() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const list = window.matchMedia(QUERY)
    list.addEventListener("change", onStoreChange)
    return () => list.removeEventListener("change", onStoreChange)
  }, [])

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
