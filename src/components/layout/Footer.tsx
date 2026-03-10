import Link from "next/link";

import Image from "next/image";
import { Mail, Instagram, Linkedin } from "lucide-react";
import {  Small } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#00674E0D" }}>
      
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-28 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0">

          {/* LEFT */}
          <div>
            <Link href="/">
              <Image
                src="/images/nextgen-logo-1.png"
                width={220}
                height={60}
                alt="NextGen"
              />
            </Link>

            <p className=" mt-10 leading-snug text-[0.9rem] text-[#555555">
              © {new Date().getFullYear()}  ZAK Consultancy Pty Ltd.  
            </p>
            <p className=" mt-2 flex gap-2 leading-snug text-[0.9rem] text-[#555555">
              <Image
                                 src="/images/location.png"
                                 alt="email icon"
                                 width={14}
                                 height={14}
                               /> PO Box 52, Vermont, VIC 3133
            </p>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-6 text-[0.9rem] text-[#555555] underline">
             
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              
            </div>

            <div className="flex flex-col lg:flex-row gap-2 mt-2 text-[0.9rem] text-[#555555] underline">
              <Link href="/compliments-concerns">Compliments and Concerns</Link>
              <Link href="/disclaimer">Important Information</Link>
              {/* <Link href="/important-information">Important Information</Link> */}
            </div>
          </div>

          {/* SERVICES */}
          <div className="flex flex-col justify-end lg:ml-16 " >
            <p  className="mb-4 font-[700] text-[1rem] text-primary">SERVICES</p>

            <ul className="space-y-3 text-[#555555] text-[1rem]">
              <li><Link href="/#services">Home Finance</Link></li>
              <li><Link href="/#services">Commercial Finance</Link></li>
              <li><Link href="/#services">Business Finance</Link></li>
              <li><Link href="/#">Asset Finance</Link></li>
              <li><Link href="/#">Development Finance</Link></li>
              <li><Link href="/#services">SMSF Finance</Link></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="justify-between">

            <div className="flex justify-between ">

              <div className="flex  flex-col gap-6 mb-6">
                <Link href="/#about" className="font-[700] text-[1rem] text-primary">ABOUT</Link>
                <Link href="/#blog" className="font-[700] text-[1rem] text-primary">BLOGS</Link>
                <Link href="/#" className="font-[700] text-[1rem] text-primary">FAQS</Link>
              </div>

              <div className="flex flex-col gap-10 justify-between ">
               <div className="flex gap-3 mb-10" >
                 <a
                  href="https://mail.google.com/mail/?view=cm&to=admin@nextgenlg.com.au" target="_blank"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
                >
                  <Mail size={20} />
                </a>

                <a
                  href="https://www.instagram.com/nextgenlg/" target="_blank"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
                >
                  <Instagram size={20}  />
                </a>

                <a
                  href="https://www.linkedin.com/company/nextgen-lending-group/" target="_blank"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
                >
                  <Linkedin size={20} fill="currentColor" strokeWidth={0} />
                </a>
               </div>
                <div className=" mt-10 " >
                  {/* FBAA Logo */}
            <Image
              src="/images/footer-logo.png"
              width={120}
              height={40}
              alt="FBAA"
            />
                </div>
              </div>

            </div>

            

          </div>

        </div>

        {/* Bottom Disclaimer */}

        <div className=" mt-8 lg:mt-14  space-y-4">
          <p className="text-dark font-[500]  leading-snug tracking-tight text-[1rem] ">
            ZAK consultancy Pty Ltd <br />
            Credit Representative Number is 576217 and is authorised under Australian Credit Licence Number: 389328 | ABN: 92686717402
          </p>

          <Small className="text-[#555555] leading-[1.8]">
          Although we cover a range of products, providers and services, NextGen doesn’t cover every product, provider or service available in the market. The information and products on this website do not constitute recommendations or suggestions to purchase or apply for any particular product. Any advice provided on this website is of a general nature only and does not take into account your needs, objectives or financial situation. Products referenced on this site may not suit your needs, objectives or financial situation. Please consider whether it is appropriate for your circumstances before making a decision to apply for or purchase any product.

If you are considering acquiring any financial product, you should obtain and read the relevant Product Disclosure Statement (PDS) and Target Market Determination (TMD) and/or any other offer document prior to making a financial decision.

          </Small>

          <Small className="text-[#555555] leading-[1.8]">
            Designed & Developed by SAAA Consultants Pvt. Ltd
          </Small>
        </div>

      </div>

      {/* <div className="h-2"
        style={{ background: "linear-gradient(270deg,#00674E 0%,#3F9F9F 100%)" }}
      /> */}

    </footer>
  );
}