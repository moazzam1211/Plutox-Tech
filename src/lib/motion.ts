import type { Transition, Variants } from "framer-motion";

/**
 * Shared animation vocabulary.
 *
 * Keeping easing curves and variants in one module is what makes the whole
 * site feel like a single product rather than a pile of components: every
 * reveal uses the same curve and the same distance.
 */

/** Custom cubic-bezier — a soft "expo out". The house easing curve. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Snappier curve for interactive feedback (hover, tap, toggles). */
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 0.6,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.5,
};

/** Fade + rise. The default entrance for headings and copy. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Scale-in used by cards, badges and media frames. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/**
 * Parent variant that staggers its children.
 * Pair with `fadeUp` (or any child variant) on each item.
 */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Per-word/per-letter reveal used by <TextReveal />. */
export const textRevealChild: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -35 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

/**
 * Default `whileInView` config. `amount: 0.2` triggers once a fifth of the
 * element is visible, which reads as "just in time" rather than "too late".
 */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Interactive card lift shared by service/product/portfolio cards. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.35, ease: EASE_SNAP } },
} satisfies Variants;
