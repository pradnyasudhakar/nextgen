import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { Small } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#EEF3F2" }}>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-16">

        {/* 4 col grid — same as Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.6fr_0.8fr] gap-10  justify-between  lg:gap-30">

          {/* COL 1 — Logo + address + links */}
          <div className="flex flex-col justify-between " >
            <Link href="/">
              <Image src="/images/nextgen-logo-1.png" width={220} height={60} alt="NextGen" />
            </Link>

            <p className="mt-10 leading-snug text-[0.9rem] text-[#555555]">
              © {new Date().getFullYear()} ZAK Consultancy Pty Ltd.
            </p>
            <p className="mt-0 flex items-center gap-2 leading-snug text-[0.9rem] text-[#555555]">
              <Image src="/images/location.png" alt="location" width={14} height={14} />
              PO Box 52, Vermont, VIC 3133
            </p>

            <div className="flex flex-row gap-3 mt-6 text-[0.8rem] text-[#555555] underline flex-wrap">
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
            <div className="flex flex-row md:-mt-3 gap-3  text-[0.8rem] text-[#555555] underline flex-wrap">
              <Link href="/compliments-concerns">Compliments and Concerns</Link>
            
            </div>
          </div>

          {/* COL 2 — Services */}
          <div>
            <p className="mb-5 font-[700] text-[0.9rem] text-primary tracking-wide">SERVICES</p>
            <ul className="space-y-3 text-[#555555] text-[0.95rem]">
              <li><Link href="/#services" className="hover:text-primary transition-colors">Home Finance</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Commercial Finance</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Business Finance</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Asset Finance</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Development Finance</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">SMSF Finance</Link></li>
            </ul>
          </div>

          {/* COL 3 — About / Blogs / FAQs */}
          <div>
            <div className="flex flex-col gap-5">
              <Link href="/about" className="font-[700] text-[0.9rem] text-primary tracking-wide uppercase hover:opacity-80">ABOUT Us</Link>
              <Link href="/#blog" className="font-[700] text-[0.9rem] text-primary tracking-wide uppercase hover:opacity-80">BLOGS</Link>
              <Link href="/faqs" className="font-[700] text-[0.9rem] text-primary tracking-wide uppercase hover:opacity-80">FAQS</Link>
            </div>
          </div>

          {/* COL 4 — Social icons + FBAA logo */}
          <div className=" lg:ml-10 flex flex-col justify-between gap-10">
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="https://mail.google.com/mail/?view=cm&to=admin@nextgenlg.com.au" target="_blank"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
                <Mail size={18} />
              </a>
              <a href="https://www.instagram.com/nextgenlg/" target="_blank"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/nextgen-lending-group/" target="_blank"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
                <Linkedin size={18} fill="currentColor" strokeWidth={0} />
              </a>
            </div>

            {/* FBAA Logo */}
            <Image src="/images/footer-logo.png" width={120} height={40} alt="FBAA" />
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 lg:mt-14 space-y-4">
          <p className="text-dark font-[500] leading-snug tracking-tight text-[1rem]">
            ZAK consultancy Pty Ltd <br />
            Credit Representative Number is 576217 and is authorised under Australian Credit Licence Number: 389328 | ABN: 92686717402
          </p>
          <Small className="text-[#555555] leading-[1.8]">
            Although we cover a range of products, providers and services, NextGen doesn&apos;t cover every product, provider or service available in the market. The information and products on this website do not constitute recommendations or suggestions to purchase or apply for any particular product. Any advice provided on this website is of a general nature only and does not take into account your needs, objectives or financial situation. Products referenced on this site may not suit your needs, objectives or financial situation. Please consider whether it is appropriate for your circumstances before making a decision to apply for or purchase any product.

            If you are considering acquiring any financial product, you should obtain and read the relevant Product Disclosure Statement (PDS) and Target Market Determination (TMD) and/or any other offer document prior to making a financial decision.
          </Small>
          <Small className="text-[#555555] leading-[1.8]">
            Designed &amp; Developed by SAAA Consultants Pvt. Ltd
          </Small>
        </div>

      </div>
    </footer>
  );
}