import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact Us", href: "/contact-us" },
];

const legalLinks = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Compliments & Concerns", href: "/compliments" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f0a1e" }} className="text-white">

     

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3b1fa3, #6c47d9)" }}>
                <span className="text-white font-black text-sm leading-none">N</span>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Next<span style={{ color: "#a78bfa" }}>Gen</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted finance broker helping you achieve your financial
              goals with tailored, expert solutions.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-purple-700"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <Facebook size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-purple-700"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs  font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-purple-400" />
                PO Box 1026, Mitcham, VIC 3132
              </li>
              <li>
                <a href="tel:0478250003"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors duration-150">
                  <Phone size={15} className="shrink-0 text-purple-400" />
                  0478 250 003
                </a>
              </li>
              <li>
                <a href="mailto:admin@nextgen.com"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors duration-150">
                  <Mail size={15} className="shrink-0 text-purple-400" />
                  admin@nextgen.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 py-6 text-center text-gray-600 text-xs leading-relaxed">
          <p>Credit Representative 560966 | Australian Credit Licence: 389328 | ABN: 73392149206</p>
          <p className="mt-1">© {new Date().getFullYear()} NextGen Financial Services. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}