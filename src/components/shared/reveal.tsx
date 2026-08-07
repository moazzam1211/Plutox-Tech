"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

import {
  blurIn,
  fadeIn,
  fadeUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRESETS = {
  fadeUp,
  fadeIn,
  scaleIn,
  blurIn,
  left: slideInLeft,
  right: slideInRight,
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof PRESETS;

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  /** Which entrance animation to use. */
  preset?: RevealPreset;
  /** Delay in seconds before the animation starts. */
  delay?: number;
}

/**
 * Scroll-triggered entrance wrapper.
 *
 * Animates once, when ~20% of the element enters the viewport. Every reveal on
 * the site funnels through here so the timing and easing stay identical
 * section to section — that consistency is most of what reads as "polished".
 */
export function Reveal({
  preset = "fadeUp",
  delay = 0,
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={PRESETS[preset]}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends React.ComponentProps<typeof motion.div> {
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds before the first child animates. */
  delay?: number;
}

/**
 * Parent for a staggered list. Direct children should be `<RevealItem />`
 * (or any `motion` element using the `hidden`/`visible` variant names).
 */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  className,
  children,
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delay)}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Inherits its trigger from `<RevealGroup />`. */
export function RevealItem({
  preset = "fadeUp",
  className,
  children,
  ...props
}: Omit<RevealProps, "delay">) {
  return (
    <motion.div variants={PRESETS[preset]} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
