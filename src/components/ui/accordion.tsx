"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Accordion built on Radix. The height transition uses Radix's
 * `--radix-accordion-content-height` variable, animated by `tw-animate-css`
 * keyframes, so it stays smooth without measuring in JS.
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group overflow-hidden rounded-2xl border border-border/70 bg-card/50 backdrop-blur-sm transition-colors",
        "hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:bg-card/80",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 p-5 text-left sm:p-6",
          "font-display text-base font-semibold tracking-tight transition-colors",
          "hover:text-primary data-[state=open]:text-primary",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary/40 group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary"
        >
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
