import * as React from "react";
import { cn } from "@/lib/utils";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEADINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Display({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(" 2xl:text-[3rem] 2xl:tracking-normal 2xl:leading-[1.2] text-[1.5rem] sm:text-[1.5rem] lg:text-[2.5rem] font-light leading-[1.1] tracking-tight text-[#FBFBFB]", className)}
      {...props}
    />
  );
}

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#0F0F0F]", className)}
      {...props}
    />
  );
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-[1.5rem] sm:text-[1.9rem] font-normal leading-[1.2] tracking-normal  text-dark", className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-[1.4rem] sm:text-[1.4rem] font-normal leading-snug text-dark", className)}
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
      className={cn("text-base font-normal leading-tight text-[#555555]", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[1rem] 2xl:text-[1.3rem]  leading-tight text-[#4a6460]", className)}
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
      className={cn("text-[0.7rem]  font-extrabold text-[#9C9C9C] uppercase tracking-[0.26em] ", className)}
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
      className={cn("text-primary font-[500]", className)}
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