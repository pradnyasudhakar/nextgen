import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "white" | "dark";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?:   boolean;
  href?:    string;
}

const variants: Record<CardVariant, string> = {
  default: "bg-white border border-[#e8eeec] rounded-2xl p-8",
  white:   "bg-white border border-[#e8eeec] rounded-2xl p-8 shadow-lg",
  dark:    "bg-[var(--color-dark)] border border-white/10 rounded-2xl p-8 text-white",
};

export function Card({ variant = "default", hover = true, href, className, children, ...props }: CardProps) {
  const cls = cn(
    variants[variant],
    hover && "transition-all duration-200 hover:shadow-[0_4px_20px_rgba(10,107,82,0.10)] hover:border-[var(--color-primary-light)]",
    className
  );

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return <div className={cls} {...props}>{children}</div>;
}

// ── Sub-components ──────────────────────────

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-semibold leading-snug text-dark", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-[#4a6460] mt-2", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex items-center", className)} {...props} />;
}

// ── Icon Card ────────────────────────────────

interface IconCardProps extends CardProps {
  icon: React.ReactNode;
}

export function IconCard({ icon, children, className, href, ...props }: IconCardProps) {
  const cls = cn(
    "bg-[#FBFBFB]  shadow-[0px_3px_30px_0px_rgba(0,0,0,0.06)] rounded-[12px] p-6 transition-all duration-200 hover:shadow-[0px_3px_30px_0px_rgba(0,103,78,0.12)] hover:border-[var(--color-primary-light)]",
    className
  );

  const content = (
    <>
      <div className="w-14 h-14 flex items-center justify-center mb-8 text-primary">
        {icon}
      </div>
      {children}
    </>
  );

  if (href) {
    return <Link href={href} className={cls}>{content}</Link>;
  }

  return <div className={cls} {...props}>{content}</div>;
}

// ── Number Card — Figma "How We Support" style ──

import { ArrowRight } from "lucide-react";
import { H3, P } from "./typography";

interface NumberCardProps extends CardProps {
  number: string;
  title:  string;
  description: string;
}

export function NumberCard({ number, title, description, href, className, ...props }: NumberCardProps) {
  const cls = cn(
    "bg-white border border-primary rounded-[12px] p-6 flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-[0_4px_20px_rgba(10,107,82,0.10)] hover:border-[var(--color-primary-light)]",
    "min-h-[340px]",
    className
  );

  const content = (
    <>
      {/* Top: title + description */}
      <div>
        <H3 className=" max-w-50 mb-4">
          {title}
        </H3>
        <P className="">
          {description}
        </P>
      </div>

      {/* Bottom: faded number + arrow */}
      <div className="flex items-end justify-between mt-8">
        <span
          className="text-[8rem] font-[700] leading-none select-none"
          style={{ color: "var(--color-primary-light)" }}
        >
          {number}
        </span>
        <div className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center shrink-0 mb-2">
          <ArrowRight size={16} />
        </div>
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className={cls}>{content}</Link>;
  }

  return <div className={cls} {...props}>{content}</div>;
}