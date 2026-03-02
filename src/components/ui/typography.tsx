import * as React from "react";
import { cn } from "@/lib/utils";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEADINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Display({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-[1.5rem] sm:text-[1.5rem] lg:text-[2.5rem]  leading-[1.15] tracking-tight text-dark", className)}
      {...props}
    />
  );
}

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-dark", className)}
      {...props}
    />
  );
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-[1.8rem] sm:text-[1.8rem] font-semibold leading-snug tracking-tight text-dark", className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl sm:text-2xl font-semibold leading-snug text-dark", className)}
      {...props}
    />
  );
}

export function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("text-lg font-semibold leading-snug text-dark", className)}
      {...props}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PARAGRAPH / TEXT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-base leading-tight text-[#4a6460]", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[1rem]  leading-tight text-[#4a6460]", className)}
      {...props}
    />
  );
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-[#4a6460]", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[0.7rem] font-[700] text-[#808180] uppercase tracking-[0.26em] ", className)}
      {...props}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INLINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Highlight({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-primary font-semibold", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-sm text-[#4a6460]", className)}
      {...props}
    />
  );
}