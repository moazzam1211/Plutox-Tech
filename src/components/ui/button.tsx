import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Button — the site's primary interactive primitive.
 *
 * `primary` is solid ink (the logo's own black), `accent` is the violet and is
 * reserved for the single most important action on a page. Everything else is
 * deliberately quiet, so a section never has two competing calls to action.
 *
 * Radii are `rounded-lg` rather than pills: squarer corners sit better beside
 * the geometric wordmark.
 */
const buttonVariants = cva(
  [
    "group/btn relative inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg font-medium tracking-tight",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-300",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Solid ink — the logo's own colour. Confident without a gradient.
        primary: [
          "bg-foreground text-background shadow-[0_10px_30px_-14px_rgb(26_26_26/0.6)]",
          "hover:shadow-[0_16px_40px_-14px_rgb(26_26_26/0.75)]",
          "active:scale-[0.98]",
        ],
        // The violet accent, reserved for the single most important action.
        accent: [
          "bg-primary text-primary-foreground shadow-[0_10px_30px_-14px_rgb(139_92_246/0.8)]",
          "hover:brightness-110 hover:shadow-[0_16px_40px_-14px_rgb(139_92_246/0.9)]",
          "active:scale-[0.98]",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:opacity-90 active:scale-[0.98]",
        ],
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:border-primary/50 hover:bg-primary/5 hover:text-foreground",
          "active:scale-[0.98]",
        ],
        glass: [
          "glass text-foreground",
          "hover:border-primary/40 hover:bg-primary/5",
          "active:scale-[0.98]",
        ],
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white hover:brightness-110 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-[1.125rem]",
        icon: "size-10 rounded-lg [&_svg]:size-[1.125rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as the single child element instead of a `<button>`. */
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {/*
        `Slottable` is what makes an extra child safe alongside `asChild`: it
        tells Slot which child to merge props onto. Without it, Slot sees two
        roots and throws.
      */}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
