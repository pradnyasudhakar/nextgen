"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isMounted = useRef(false); // ✅ useRef — no re-render, no linter warning

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 bg-white border-b border-gray-100 transition-all duration-300",
        scrolled ? "shadow-md" : ""
      )}
    >
      <div className="px-6 mx-auto sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <span className="text-white font-black text-sm leading-none">N</span>
            </div>
            <span className="text-lg font-black tracking-tight" style={{ color: "var(--color-dark)" }}>
              Next<span style={{ color: "var(--color-primary)" }}>Gen</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap",
                    active ? "font-semibold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  )}
                  style={
                    active
                      ? { color: "var(--color-primary)", background: "var(--color-primary-light)" }
                      : {}
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/apply-now"
              className="hidden lg:inline-flex items-center text-sm font-bold text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              Apply Now
            </Link>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 bg-white",
          isOpen ? "max-h-125" : "max-h-0"
        )}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  active ? "font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                style={
                  active
                    ? {
                        color: "var(--color-primary)",
                        background: "var(--color-primary-light)",
                        borderLeft: "3px solid var(--color-primary)",
                      }
                    : {}
                }
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/apply-now"
            className="mt-4 text-center text-sm font-bold text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}