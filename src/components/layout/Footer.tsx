import Link from "next/link";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { Label, Small, Muted } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#eef0ee", color: "var(--color-dark)" }}>

      {/* ══ MAIN SECTION ══ */}
      <div className="flex    flex-col lg:flex-row">

        {/* ── LEFT COLUMN ── */}
        <div
          className="flex flex-row lg:flex-col w-full min-w-full  lg:min-w-75 lg:w-75 border-[rgba(0,0,0,0.08)] px-6 sm:px-10 lg:px-20 py-12 lg:py-16 justify-between  border-b lg:border-b-0 lg:border-r"
          
        >
          {/* Logo */}
          <Link href="/">
            <span className="text-[2rem] font-[600] text-primary  uppercase tracking-[0.04em]"
              >
              NEXTGEN
            </span>
          </Link>

          {/* Bottom info */}
          <div className="mt-0 lg:mt-0">
            <Small className="leading-7 text-dark " >
              © {new Date().getFullYear()} NextGen Pty Ltd.<br />
              104 Buckingham St, Surry Hills,<br />
              NSW 2010, Australia
            </Small>

            {/* Sitemap + Privacy */}
            <div className="flex gap-5 mt-6 mb-2">
              {[["Sitemap", "/sitemap"], ["Privacy policy", "/privacy-policy"]].map(([l, h]) => (
                <Link key={h} href={h}
                  className="text-sm underline underline-offset-2 hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-dark)" }}>
                  {l}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 mb-8">
              {[
                ["Disclaimer", "/disclaimer"],
                ["Compliments and Concerns", "/compliments"],
                ["Important Information", "/important-information"],
              ].map(([l, h]) => (
                <Link key={h} href={h}
                  className="text-sm underline underline-offset-2 hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-dark)" }}>
                  {l}
                </Link>
              ))}
            </div>

            <Small style={{ color: "var(--color-dark)", opacity: 0.45 }} className="leading-5">
              Designed &amp; Developed by<br />
              SAAA Consultants
            </Small>
          </div>
        </div>

        {/* ── RIGHT SECTION ── */}
        <div className="flex-1 px-6 sm:px-10 lg:px-20 py-12 lg:py-16">

          {/* Nav columns */}
          <div className="grid  grid-cols-4 sm:grid-cols-4 gap-0 lg:gap-10 mb-14">

            {/* Services */}
            <div>
              <Label className="mb-4 text-[1rem] tracking-[0.02em]  text-primary " >SERVICES</Label>
              <ul className="space-y-2">
                {[
                  ["Home Finance", "/services/home-finance"],
                  ["Commercial Finance", "/services/commercial-finance"],
                  ["Business Finance", "/services/business-finance"],
                  ["Asset Finance", "/services/asset-finance"],
                  ["Development Finance", "/services/development-finance"],
                  ["SMSF Finance", "/services/smsf-finance"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-sm hover:text-primary transition-colors"
                      style={{ color: "var(--color-dark)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators — hidden in Figma but kept for completeness, invisible column */}
            <div />

            {/* About / Blogs / FAQs */}
            <div className="flex flex-col gap-6">
              {[["ABOUT", "/about-us"], ["BLOGS", "/blog"], ["FAQS", "/faqs"]].map(([label, href]) => (
                <Link key={href} href={href}
                  className="text-[1rem] font-[600] tracking-[0.02em] uppercase text-primary hover:opacity-70 transition-opacity"
                 >
                  {label}
                </Link>
              ))}
            </div>

            {/* Social Icons — filled green circles like Figma */}
            <div className="flex sm:justify-end gap-3">
              {[
                { href: "mailto:admin@capitalex.com.au", Icon: Mail, label: "Email" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
                  aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          {/* <hr className="mb-10"  /> */}

          {/* Disclaimer */}
          <div className="space-y-4 max-w-4xl">
            <p className="text-[12px] font-light leading-relaxed" >
              NextGen respectfully acknowledges the Traditional Custodians of the land on which we live, learn and work.
            </p>
            <Small className=" text-[12px] text-gray-500 font-light leading-[1.8]" >
              Although we cover a range of products, providers and services, NextGen doesn&apos;t cover every product, provider or service available in the market. The information and products on this website do not constitute recommendations or suggestions to purchase or apply for any particular product. Any advice provided on this website is of a general nature only and does not take into account your needs, objectives or financial situation. Products referenced on this site may not suit your needs, objectives or financial situation. Please consider whether it is appropriate for your circumstances before making a decision to apply for or purchase any product.
            </Small>
            <Small className=" text-[12px] text-gray-500 font-light leading-[1.8]" >
              If you are considering acquiring a financial product, you should obtain and read the relevant Product Disclosure Statement (PDS) and Target Market Determination (TMD) and/or any other offer document prior to making a financial decision.
            </Small>
          </div>
        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="border-t px-8 lg:px-12 py-4 flex flex-wrap justify-between items-center gap-2"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <Muted style={{ color: "rgba(7,28,22,0.35)", fontSize: "0.7rem" }}>
          Credit Representative 560966 | Australian Credit Licence: 389328 | ABN: 73392149206
        </Muted>
        <Muted style={{ color: "rgba(7,28,22,0.35)", fontSize: "0.7rem" }}>
          © {new Date().getFullYear()} NextGen Financial Services. All rights reserved.
        </Muted>
      </div>

      {/* ══ ACCENT LINE ══ */}
      <div className="h-1.5" style={{ background: "var(--color-primary)" }} />

    </footer>
  );
}