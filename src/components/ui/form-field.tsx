import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Form primitives shared by the contact form.
 *
 * Each control is styled once here rather than repeated per field, and every
 * one wires up `aria-invalid` plus `aria-describedby` so errors are announced
 * rather than only coloured red.
 */

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  /** Marks the field visually and for assistive tech. */
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
      >
        {label}
        {required ? (
          <span className="text-primary" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-muted-foreground/50">(optional)</span>
        )}
      </label>

      {children}

      {/* Error takes precedence over the hint; both live in one region so the
          layout doesn't jump when an error appears. */}
      <p
        id={`${htmlFor}-message`}
        aria-live="polite"
        className={cn(
          "min-h-4 text-[0.6875rem] leading-tight",
          error ? "text-destructive" : "text-muted-foreground/70",
        )}
      >
        {error ?? hint ?? ""}
      </p>
    </div>
  );
}

const controlClasses = [
  "w-full rounded-xl border bg-card/50 px-4 text-sm backdrop-blur-sm",
  "transition-colors duration-300 outline-none",
  "placeholder:text-muted-foreground/60",
  "focus:border-primary/60 focus:ring-2 focus:ring-primary/15",
  "aria-[invalid=true]:border-destructive/60 aria-[invalid=true]:focus:ring-destructive/15",
  "disabled:opacity-60",
].join(" ");

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(controlClasses, "h-11 border-input", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        controlClasses,
        "min-h-32 resize-y border-input py-3 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Native `<select>` rather than a custom listbox: it is fully accessible for
 * free, uses the platform picker on mobile, and adds nothing to the bundle.
 * The chevron is drawn as a background image so the arrow matches the theme.
 */
export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClasses,
          "h-11 appearance-none border-input pr-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
