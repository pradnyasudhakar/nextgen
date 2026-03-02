"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "About", href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Home Loans", href: "/services/home-loans" },
      { label: "Investment Loans", href: "/services/investment-loans" },
      { label: "Refinancing", href: "/services/refinancing" },
      { label: "Commercial Loans", href: "/services/commercial-loans" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "Borrowing Capacity", href: "/calculators#borrowing" },
      { label: "Repayments", href: "/calculators#repayments" },
      { label: "Property Fees", href: "/calculators#property" },
    ],
  },
  { label: "Blogs", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const isMounted = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { isMounted.current = true; }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setIsOpen(false); setOpenDropdown(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 bg-white border-b transition-all duration-300",
        scrolled ? "shadow-sm" : ""
      )}
      style={{ borderColor: scrolled ? "var(--color-primary-light)" : "#f0f0f0" }}
    >
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="flex items-center justify-between h-16" ref={dropdownRef}>

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-[2rem] font-[600]  uppercase tracking-[0.04em]"
              style={{ color: "var(--color-primary)" }}>
              NextGen
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              const hasChildren = !!link.children;
              const isDropOpen = openDropdown === link.label;

              return (
                <div key={link.href} className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => setOpenDropdown(isDropOpen ? null : link.label)}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-all duration-150 whitespace-nowrap"
                      style={{
                        color: active || isDropOpen ? "var(--color-primary)" : "#000",
                        background: active || isDropOpen ? "var(--color-primary-light)" : "transparent",
                        fontWeight: active || isDropOpen ? "var(--font-semibold)" : "var(--font-medium)",
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14}
                        className="transition-transform duration-200"
                        style={{ transform: isDropOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150 whitespace-nowrap"
                      style={{
                        color: active ? "var(--color-primary)" : "#000",
                        background: active ? "var(--color-primary-light)" : "transparent",
                        fontWeight: active ? "var(--font-semibold)" : "var(--font-medium)",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {hasChildren && isDropOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border py-1.5 z-50"
                      style={{
                        borderColor: "var(--color-primary-light)",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      {link.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm transition-colors"
                          style={{ color: "#000000" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--color-primary-light)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "";
                            (e.currentTarget as HTMLElement).style.color = "#000000";
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Right: Icons + CTA ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="tel:0478250003" className="icon-btn" aria-label="Call us">
              <Phone size={15} />
            </a>
            <a href="mailto:admin@capitalex.com.au" className="icon-btn" aria-label="Email us">
              <Mail size={15} />
            </a>
            <Link href="/apply-now" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "var(--color-primary)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white border-t",
          isOpen ? "max-h-150" : "max-h-0"
        )}
        style={{ borderColor: "var(--color-primary-light)" }}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const hasChildren = !!link.children;
            const isExpanded = mobileExpanded === link.label;

            return (
              <div key={link.href}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors"
                      style={{
                        color: isExpanded ? "var(--color-primary)" : "#000",
                        background: isExpanded ? "var(--color-primary-light)" : "",
                        fontWeight: isExpanded ? "var(--font-semibold)" : "var(--font-medium)",
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14}
                        className="transition-transform duration-200"
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          color: "var(--color-primary)",
                        }}
                      />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-1 flex flex-col gap-0.5">
                        {link.children!.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="px-4 py-2.5 rounded-lg text-sm transition-colors"
                            style={{ color: "#000" }}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-sm transition-colors"
                    style={active ? {
                      color: "var(--color-primary)",
                      background: "var(--color-primary-light)",
                      borderLeft: "3px solid var(--color-primary)",
                      fontWeight: "var(--font-semibold)",
                    } : { color: "#000" }}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}

          {/* Mobile phone */}
          <div className="flex items-center gap-3 mt-3 px-4">
            <a href="tel:0478250003" className="link flex items-center gap-2 text-sm">
              <Phone size={14} /> 0478 250 003
            </a>
          </div>

          <Link href="/apply-now" className="btn-primary mt-3 justify-center">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}