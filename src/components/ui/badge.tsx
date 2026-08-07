import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/60 text-muted-foreground",
        /** Violet accent — the brand highlight. */
        brand: "border-primary/25 bg-primary/10 text-primary",
        /** Solid ink, for the one badge that must dominate. */
        ink: "border-transparent bg-foreground text-background",
        success: "border-success/25 bg-success/10 text-success",
        outline: "border-border bg-transparent text-muted-foreground",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[0.6875rem]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
