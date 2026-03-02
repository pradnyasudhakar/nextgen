import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-rounded" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  href?:      string;
  external?:  boolean;
  children:   React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  // Filled green — "Get Started", "Book an Appointment"
  primary: "inline-flex items-center justify-center gap-2 font-bold text-white rounded-full transition-all hover:opacity-90 bg-[var(--color-primary)] border-2 border-transparent",

  // Green border, rounded-full — "View All Services"
  outline: "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]",

  // Transparent bg, rounded-xl border — "Know More About Us"
  "outline-rounded": "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-light)]",

  // No border, no bg — "Read Article ›"
  ghost: "inline-flex items-center justify-center gap-2 font-bold text-[var(--color-primary)] transition-all hover:opacity-75 bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base font-bold px-4 py-2",
};

export function Button({
  variant  = "primary",
  size     = "md",
  href,
  external = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const cls = cn(variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}