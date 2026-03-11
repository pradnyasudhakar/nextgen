"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us ", href: "/about" },
  {
    label: "Services",
    href: "/#services",
    children: [
      { label: "Home Loans", href: "/#services" },
      { label: "Commercial Loans", href: "/#servicess" },
      { label: "Business Finance", href: "/#services" },
      { label: "Asset Finance", href: "/#services" },
      { label: "Development Finance", href: "/#services" },
      { label: "SMSF Finance", href: "/#servicese" },
    ],
  },

  { label: "Blogs", href: "/#blog" },
  { label: "FAQs", href: "/faqs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<"phone" | "email" | null>(
    null,
  );
  const [navHeight, setNavHeight] = useState(80);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Track navbar height for drawer positioning
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const tooltipStyle = (visible: boolean) => ({
    transition: "opacity 0.25s ease, transform 0.25s ease",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(-6px)",
    pointerEvents: (visible
      ? "auto"
      : "none") as React.CSSProperties["pointerEvents"],
  });

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "sticky top-0 z-50 bg-[#FBFBFB] transition-all duration-300",
          scrolled ? "shadow-sm" : "",
        )}
      >
        <div className="px-6 sm:px-10 lg:px-20">
          <div
            className="flex items-center justify-between h-20"
            ref={dropdownRef}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-[2rem] text-primary font-[600] uppercase tracking-[0.04em]">
                <Image
                  src="/images/nextgen-logo-1.png"
                  className=" p-2"
                  width={200}
                  height={52}
                  alt=""
                />
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden text-[0.9rem] lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                const hasChildren = !!link.children;
                const isDropOpen = openDropdown === link.label;

                return (
                  <div key={link.label} className="relative">
                    {hasChildren ? (
                      <button
                        onClick={() =>
                          setOpenDropdown(isDropOpen ? null : link.label)
                        }
                        className="flex items-center gap-1 px-2 py-2 rounded-lg text-[0.9rem] transition-all duration-200 whitespace-nowrap"
                        style={{
                          color:
                            active || isDropOpen
                              ? "var(--color-primary)"
                              : "#002566",
                          background: isDropOpen ? "" : "transparent",
                          fontWeight:
                            active || isDropOpen
                              ? "var(--font-medium)"
                              : "var(--font-medium)",
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          style={{
                            transition:
                              "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                            transform: isDropOpen
                              ? "rotate(-180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center px-4 py-2 rounded-lg text-[0.9rem] transition-all duration-200 whitespace-nowrap"
                        style={{
                          color: active ? "var(--color-primary)" : "#002566",
                          fontWeight: active
                            ? "var(--font-medium)"
                            : "var(--font-medium)",
                        }}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Dropdown */}
                    <div
                      className="absolute top-full left-0 mt-2 w-42 bg-[#FBFBFB] rounded-md border z-50 overflow-hidden"
                      style={{
                        borderColor: "var(--color-primary-light)",
                        boxShadow: "var(--shadow-md)",
                        transition:
                          "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                        opacity: isDropOpen ? 1 : 0,
                        transform: isDropOpen
                          ? "translateY(0px) scaleY(1)"
                          : "translateY(-10px) scaleY(0.95)",
                        transformOrigin: "top center",
                        pointerEvents: isDropOpen ? "auto" : "none",
                      }}
                    >
                      <div className="py-1.5">
                        {link.children?.map((child) => (
                          <Link
                            key={`${link.label}-${child.label}`}
                            href={child.href}
                            className="block px-4 py-1.5 text-[0.9rem] transition-colors duration-150"
                            style={{ color: "#002566" }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color =
                                "var(--color-primary)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color =
                                "#002566";
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Icons + CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <div
                className="relative"
                onMouseEnter={() => setHoveredIcon("phone")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <a
                  href="tel:0424 687 866"
                  className="icon-btn"
                  aria-label="Call us"
                >
                  <Phone size={16} fill="currentColor" strokeWidth={0} />
                </a>
                <div
                  className="absolute top-full right-0 mt-4 w-64 bg-[#FBFBFB] rounded-md border px-3 py-2 z-50"
                  style={{
                    borderColor: "var(--color-primary-light)",
                    boxShadow: "var(--shadow-md)",
                    ...tooltipStyle(hoveredIcon === "phone"),
                  }}
                >
                  <p className="text-[0.9rem] text-dark">
                    Call us anytime at{" "}
                    <a
                      href="tel:0424 687 866"
                      className="text-primary font-medium"
                    >
                      0424 687 866
                    </a>
                  </p>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setHoveredIcon("email")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <a
                  href="mailto:admin@nextgenlg.com.au"
                  className="icon-btn"
                  aria-label="Email us"
                >
                  <Image
                    src="/images/mail.png"
                    alt="email icon"
                    width={16}
                    height={16}
                  />
                </a>
                <div
                  className="absolute top-full right-0 mt-4 w-72 bg-[#FBFBFB] rounded-md border px-3 py-2 z-50"
                  style={{
                    borderColor: "var(--color-primary-light)",
                    boxShadow: "var(--shadow-md)",
                    ...tooltipStyle(hoveredIcon === "email"),
                    pointerEvents: "none",
                  }}
                >
                  <p className="text-sm text-dark">
                    Have any Query? Email us at{" "}
                    <a
                      href="mailto:admin@nextgenlg.com.au"
                      className="text-primary font-medium"
                    >
                      admin@nextgenlg.com.au
                    </a>
                  </p>
                </div>
              </div>

              <Button
                href="/contact"
                className="text-[#FBFBFB] rounded-full px-4 py-1 text-[0.9rem]"
                variant="primary"
              >
                Get Started
              </Button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--color-primary)" }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  transition: "opacity 0.2s ease",
                  opacity: isOpen ? 0 : 1,
                  position: isOpen ? "absolute" : "relative",
                }}
              >
                <Menu size={22} />
              </span>
              <span
                style={{
                  transition: "opacity 0.2s ease",
                  opacity: isOpen ? 1 : 0,
                  position: isOpen ? "relative" : "absolute",
                }}
              >
                <X size={22} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer — fixed, hero ke upar overlay hoga ── */}
      <div
        className="lg:hidden fixed left-0 right-0 z-40 bg-[#FBFBFB] border-t shadow-lg"
        style={{
          top: `${navHeight}px`,
          borderColor: "var(--color-primary-light)",
          maxHeight: isOpen ? `calc(100dvh - ${navHeight}px)` : "0px",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition:
            "max-height 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease",
        }}
      >
        <div
          className="overflow-y-auto"
          style={{ maxHeight: `calc(100dvh - ${navHeight}px)` }}
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              const hasChildren = !!link.children;
              const isExpanded = mobileExpanded === link.label;

              return (
                <div
                  key={link.label}
                  style={{
                    transition: `opacity 0.2s ease ${i * 0.05}s, transform 0.2s ease ${i * 0.05}s`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                  }}
                >
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : link.label)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[0.9rem] transition-colors duration-200"
                        style={{
                          color: isExpanded
                            ? "var(--color-primary)"
                            : "#002566",
                          background: isExpanded
                            ? "var(--color-primary-light)"
                            : "",
                          fontWeight: isExpanded
                            ? "var(--font-semibold)"
                            : "var(--font-medium)",
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          style={{
                            transition:
                              "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                            transform: isExpanded
                              ? "rotate(-180deg)"
                              : "rotate(0deg)",
                            color: "var(--color-primary)",
                          }}
                        />
                      </button>
                      <div
                        className="ml-4 overflow-hidden"
                        style={{
                          maxHeight: isExpanded ? "300px" : "0px",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        <div className="flex flex-col gap-0.5 pt-1">
                          {link.children!.map((child) => (
                            <Link
                              key={`${link.label}-${child.label}`}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-2.5 rounded-lg text-[0.9rem] transition-colors duration-150"
                              style={{ color: "#002566" }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-[0.9rem] transition-colors duration-200"
                      style={
                        active
                          ? {
                              color: "var(--color-primary)",
                              background: "var(--color-primary-light)",
                              borderLeft: "3px solid var(--color-primary)",
                              fontWeight: "var(--font-semibold)",
                            }
                          : { color: "#002566" }
                      }
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}

            <div className="flex items-center gap-4 mt-3 px-4">
              <a
                href="tel:0424 687 866"
                className="link flex items-center gap-2 text-[0.9rem]"
              >
                <Phone size={14} fill="currentColor" strokeWidth={0} /> 0424 687
                866
              </a>
            </div>
            <div className="flex items-center gap-4 mt-3 px-4">
              <a
                href="https://mail.google.com/mail/?view=cm&to=admin@nextgenlg.com.au"
                target="_blank"
                className="link flex items-center gap-2 text-[0.9rem]"
              >
                <Image
                  src="/images/mail.png"
                  alt="email icon"
                  width={14}
                  height={14}
                />
                admin@nextgenlg.com.au
              </a>
            </div>

            <Button
              href="/contact"
              className="btn-primary mt-3 px-4 justify-center"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop — menu ke peeche click karne pe band ho */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/20"
          style={{ top: `${navHeight}px` }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
