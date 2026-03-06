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
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <div className={cls} {...props}>{children}</div>;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-5", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold leading-snug text-dark", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-[#4a6460] mt-2", className)} {...props} />;
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
    "bg-[#FBFBFB] shadow-[0px_3px_30px_0px_#0000001A] rounded-[12px] p-5",
    "transition-all duration-200",
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
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <div className={cls} {...props}>{content}</div>;
}

// ── Number Card ──────────────────────────────


import { H3, P } from "./typography";

interface NumberCardProps extends CardProps {
  number:      string;
  titleParts?: { text: string; green?: boolean }[];
  title:       string;
  description: string;
}

export function NumberCard({ number, titleParts, title, description, href, className, ...props }: NumberCardProps) {
  const cls = cn(
    "group",
    "bg-[#FBFBFB] border border-primary rounded-[12px] p-6",
    "flex flex-col justify-between overflow-hidden",
    "transition-all duration-300",
    "hover:border-[var(--color-primary)] hover:shadow-[0_4px_24px_rgba(0,103,78,0.13)] hover:-translate-y-5",
    "max-h-[260px]",
    className
  );

  const content = (
    <>
      {/* Top: title + description */}
      <div>
        <H3 className="max-w-65 mb-4 text-dark  transition-colors duration-300">
          {titleParts
            ? titleParts.map((part, i) =>
                part.green
                  ? <span key={i} style={{ color: "var(--color-primary)" }}>{part.text}</span>
                  : <span key={i}>{part.text}</span>
              )
            : title}
        </H3>
        <P>{description}</P>
      </div>

      {/* Bottom: number + arrow */}
      <div className="flex items-end justify-end mt-5">
        <span className="text-[5rem] font-[700] leading-none select-none transition-colors duration-300 text-[#dceee9] group-hover:text-primary">
          {number}
        </span>
        
      </div>
    </>
  );

  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <div className={cls} {...props}>{content}</div>;
}