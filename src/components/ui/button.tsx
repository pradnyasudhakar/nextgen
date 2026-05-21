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
  // Green bg → hover: white fill from bottom-left, green text
  primary: [
    "inline-flex items-center justify-center gap-2 font-bold rounded-full",
    "border border-[var(--color-primary)]",
    "text-white bg-[var(--color-primary)]",
    "relative overflow-hidden",
    "before:content-[''] before:absolute before:inset-0 before:rounded-full",
    "before:bg-white",
    "before:scale-0 before:origin-bottom-left",
    "before:transition-transform before:duration-400 before:ease-out",
    "hover:before:scale-100",
    "hover:text-[var(--color-primary)]",
    "transition-colors duration-400",
    "[&>span]:relative [&>span]:z-10",
    "[&>svg]:relative [&>svg]:z-10",
  ].join(" "),

  // Transparent → hover: green fill from bottom-left, white text
  outline: [
    "inline-flex items-center justify-center gap-2 font-bold rounded-full",
    // "border-1 border-[var(--color-primary)]",
    "text-[var(--color-primary)] bg-transparent",
    "relative overflow-hidden",
    "before:content-[''] before:absolute before:inset-0 before:rounded-full",
    "before:bg-[var(--color-primary)]",
    "before:scale-0 before:origin-bottom-left",
    "before:transition-transform before:duration-400 before:ease-out",
    "hover:before:scale-100",
    "hover:text-white",
    "transition-colors duration-400",
    "[&>span]:relative [&>span]:z-10",
    "[&>svg]:relative [&>svg]:z-10",
  ].join(" "),

  // Same as outline
  "outline-rounded": [
    "inline-flex items-center justify-center gap-2 font-[500] rounded-full",
    "border border-[var(--color-primary)]",
    "text-[var(--color-primary)] bg-transparent",
    "relative overflow-hidden",
    "before:content-[''] before:absolute before:inset-0 before:rounded-full",
    "before:bg-[var(--color-primary)]",
    "before:scale-0 before:origin-bottom-left",
    "before:transition-transform before:duration-400 before:ease-out",
    "hover:before:scale-100",
    "hover:text-white",
    "transition-colors duration-400",
    "[&>span]:relative [&>span]:z-10",
    "[&>svg]:relative [&>svg]:z-10",
  ].join(" "),

  // ghost — simple
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
      <Link href={href} className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      <span>{children}</span>
    </button>
  );
}