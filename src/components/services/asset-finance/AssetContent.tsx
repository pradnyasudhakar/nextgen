"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "commercial-loans", label: "Asset Finance" },
  {
    id: "what-is-commercial-loan",
    label: "What is Asset & Equipment Finance?",
  },
  { id: "how-structured", label: "Types of Asset & Equipment Financ" },
  { id: "interest-repayments", label: "How Asset & Equipment Finance Works" },
  {
    id: "reviewing-refinancing",
    label: "Steps to Securing Asset & Equipment Finance",
  },
  // { id: "home-buying-process", label: "Home Buying Process" },
  { id: "nextgen-lending-group", label: "Why Work With NextGen Lending Group" },
  { id: "who-is-this-for", label: "Who We Help" },
  {
    id: "commercial-property",
    label: "Ready to Fund Your Next Asset or Equipment Purchase?",
  },
];

const relatedServices = [
  { label: "Home Loans", href: "/homeloan" },
      { label: "Commercial Loans", href: "/commercial-loan" },
      { label: "Business Finance", href: "/business-finance" },
      // { label: "Asset Finance", href: "/asset-finance" },
      { label: "Development Finance", href: "/development-finance" },
      { label: "SMSF Finance", href: "/smsf-finance" },
];

export default function HomeContent() {
  const [activeId, setActiveId] = useState("home-loans");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
          {/* ── LEFT — Main Content ── */}
          <div className="space-y-20">
            <div id="commercial-loans" className="scroll-mt-24">
              <H2 className=" font-[500] mb-4">Asset Finance</H2>
              <P className="mb-4">
                Upgrading equipment or adding new assets should not slow your
                business down. With asset and equipment finance, you can move
                ahead with what you need now and pay over time, keeping your
                cash available for day-to-day operations.
              </P>
              <P>
                At NextGen Lending Group, we help you find the right way to fund
                your assets based on how your business runs and what you need
                next.
              </P>
            </div>

            <div id="what-is-commercial-loan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                What is Asset & Equipment Finance?
              </H2>
              <P className="mb-4">
                Asset and equipment finance allows you to purchase or access
                essential business assets without paying the full amount
                upfront.
              </P>
              <P className="">
                Common uses include:
                
               
              </P>
              <ul className="  text-[#555555] styled space-y-1 mt-2 mb-2 ">
                  <li>Vehicles (cars, trucks, vans, UTEs)</li>
                  <li>Machinery and plant equipment</li>
                  <li>Technology and office equipment</li>
                  <li>Medical and healthcare equipment</li>
                  <li>Specialised tools and industry-specific vehicles</li>
                </ul>
                <P> Because the asset itself is used as security, approvals are
                often quicker and more straightforward compared to other types
                of business funding.</P>
            </div>

            <div id="how-structured" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Types of Asset & Equipment Financ
              </H2>
              <P className="mb-4">
                We offer personalised options based on your documentation,
                business operations, and borrowing needs:
              </P>
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">
                    1. Full Documentation (Full-Doc) Loans
                  </Highlight>{" "}
                  <br /> The standard option for businesses with complete
                  financial records.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Established businesses with clear financials <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  More competitive interest rates, Higher borrowing capacity,
                  Flexible repayment options
                </P>
                <P>
                  <Highlight className="font-[700]">
                    2. Low Documentation (Low-Doc) Loans
                  </Highlight>{" "}
                  <br /> Designed for business owners who may not have full
                  financial records ready.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Self-employed or small business owners <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Faster turnaround ,Simpler application process ,Slightly
                  higher rates compared to full-doc loans
                </P>
                <P>
                  <Highlight className="font-[700]">
                    3. No Documentation (No-Doc) Loans
                  </Highlight>{" "}
                  <br /> For situations where speed matters most.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight> Quick
                  purchases or non-standard income situations <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Minimal paperwork ,Fast approvals ,Shorter-term options
                </P>
              </div>
            </div>

            <div id="interest-repayments" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                How Asset & Equipment Finance Works
              </H2>
              <P className="mb-4">
                There are different ways to set this up depending on whether you
                want ownership, flexibility, or lower repayments:
              </P>

              <P className="mb-4">
                <Highlight className="font-[700]">
                  Loan / Hire Purchase
                </Highlight>{" "}
                <br />
                
              </P>
              <P className="">
                <Highlight className="font-[700]">Chattel Mortgage</Highlight>{" "}
               
              </P>
               
                <ul className="text-[#555555] styled space-y-1 mt-1 mb-4 ">
                  <li>Ownership from the beginning</li>
                  <li>Loan secured against the asset</li>
                  <li>GST may be claimable upfront</li>
                </ul>
              <P className="">
                <Highlight className="font-[700]">
                  Operating Lease / Rental Agreement
                </Highlight>{" "}
                
              </P>
              
                <ul className="text-[#555555] styled space-y-1 mt-1 mb-4 ">
                  <li>Use the asset without owning it</li>
                  <li>Fixed payments over a set period</li>
                  <li>Suitable for short-term needs or frequent upgrades</li>
                </ul>
              <P className="">
                <Highlight className="font-[700]">Balloon Payments</Highlight>{" "}
                
              </P>
             
                <ul className=" text-[#555555] styled space-y-1 mt-1 mb-4 ">
                  <li>Larger payment at the end of the term</li>
                  <li>Lower regular repayments</li>
                  <li>Helps manage cash flow during the loan period</li>
                </ul>
              <P className="">
                <Highlight className="font-[700] mb-1 ">
                  Loan Term & Repayment
                </Highlight>{" "}
                <br />
                For investment properties, lenders assess:
                
              </P>
              <ul className=" text-[#555555] styled space-y-1 mt-1 mb-4">
                  <li>Typically 1–7 years, depending on the asset</li>
                  <li>Weekly, fortnightly, or monthly repayments</li>
                  <li>
                    Can be aligned with how your business generates income
                  </li>
                </ul>
            </div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Steps to Securing Asset & Equipment Finance
              </H2>
              <P className="mb-4">
                We keep things simple so you can continue to focus on running
                your business:
              </P>
              <P className=" mt-2 ">
                <Highlight className="font-[700] mb-1 ">
                  Step 1: Asset & Requirement Assessment
                </Highlight>{" "}
                <br />
                We look at:
                
              </P>
              <ul className=" text-[#555555] mb-4 styled space-y-1 mt-1 ">
                  <li>What you need to purchase</li>
                  <li>Cost and expected usage</li>
                  <li>How it fits into your business</li>
                </ul>
              <P className=" ">
                <Highlight className="font-[700] mb-1 ">
                  Step 2: Loan Planning & Lender Matching
                </Highlight>{" "}
                <br />
                We identify:
                
              </P>
              <ul className="text-[#555555] mb-4 styled space-y-1 mt-1 ">
                  <li>The most suitable option (full-doc, low-doc, no-doc)</li>
                  <li>A repayment plan that works for you</li>
                  <li>Lenders suited to your situation</li>
                </ul>
              <P className=" ">
                <Highlight className="font-[700] mb-1 ">
                 Step 3: Application Preparation
                </Highlight>{" "}
                <br />
                We manage documentation based on your option:
                
              </P>
              <ul className="text-[#555555] mb-4 styled space-y-1 mt-1 ">
                  <li>Full-doc: financials and tax returns</li>
                  <li>Low-doc: bank statements and invoices</li>
                  <li>No-doc: minimal documentation</li>
                </ul>
              <P className="mb-4 ">
                <Highlight className="font-[700] mb-1 ">
                  Step 4: Approval & Final Terms
                </Highlight>{" "}
                <br />
                We work with lenders to get terms that are practical and workable for your business.
                
              </P>
              <P className="mb-4 ">
                <Highlight className="font-[700] mb-1 ">
                  Step 5: Asset Acquisition
                </Highlight>{" "}
                <br />
                Funds are released so you can move ahead without delay
                
              </P>
              <P className=" ">
                <Highlight className="font-[700] mb-1 ">
                  Step 6: Ongoing Support
                </Highlight>{" "}
                <br />
               We help you:
               
              </P>
              <ul className="text-[#555555] mb-4 styled space-y-1 mt-1 " >
                <li>Stay on track with repayments</li>
                <li>Review options when needed</li>
                <li>Plan future purchases</li>
               </ul>
            </div>

            <div id="nextgen-lending-group" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Why Work With NextGen Lending Group?
              </H2>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>Access to a wide range of lenders
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>Options across full-doc, low-doc, and no-doc
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> Quick and simple application process
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> Practical guidance based on your business needs
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> Support beyond the initial loan
              </P>
            </div>
            <div id="who-is-this-for" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Who We Help</H2>
              <P className="">
                We work with:
               
              </P>
               <ul className="text-[#555555] mb-4 styled space-y-1  mt-1 ">
                  <li>Small to medium business owners</li>
                  <li>Self-employed professionals</li>
                  <li>Businesses upgrading equipment</li>
                  <li>Startups needing flexible funding options</li>
                </ul>
            </div>
            <div id="commercial-property" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
               Ready to Fund Your Next Asset or Equipment Purchase?
              </H2>
              <P className="">
                Getting the right equipment should feel straightforward, not complicated.
               
                
              </P>
               <ul className=" text-[#555555] styled space-y-1 mt-2 mb-2  ">
                  <li>Speak with an asset finance specialist</li>
                  <li>Explore options that suit your situation</li>
                  <li>Move ahead with the assets your business needs</li>
                </ul>
                <P>Let’s move ahead with the right assets in place</P>
            </div>
          </div>

          {/* ── RIGHT — Sidebar ── */}
          <div className="hidden lg:flex flex-col gap-5 sticky top-28">
            {/* Table of Contents */}
            <div
              className="bg-[#FBFBFB] border border-[#9C9C9C] border-t-4 border-t-[#0f6e56] rounded-[5px] overflow-hidden px-4 py-4"
              style={{ boxShadow: "0px 3px 5px 0px #0000001A" }}
            >
              <div className="px-2 py-2">
                <H3 className="text-[1.1rem] font-[500] text-primary">
                  Content
                </H3>
              </div>
              <div className="space-y-1">
                {tableOfContents.map(({ id, label }, index) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="w-full text-left text-[0.75rem] px-2 py-1 transition-colors flex items-start gap-2"
                    style={{
                      color:
                        activeId === id ? "var(--color-primary)" : "#555555",
                      fontWeight: activeId === id ? 700 : 400,
                    }}
                  >
                    <span
                      style={{
                        color:
                          activeId === id ? "var(--color-primary)" : "#555555",
                        minWidth: "18px",
                      }}
                    >
                      {index + 1}.
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Services */}
            <div
              className="bg-[#FBFBFB] border border-[#9C9C9C] border-t-4 border-t-[#0f6e56] rounded-[5px] overflow-hidden px-4 py-4"
              style={{ boxShadow: "0px 3px 5px 0px #0000001A" }}
            >
              <div className="px-2 pb-3">
                <H3 className="text-[1.1rem] font-[500] text-primary mb-1">
                  Related Services
                </H3>
                <P className="text-[0.82rem] text-[#555555]">
                  Finance Solutions Designed for What&apos;s Next
                </P>
              </div>
              <div>
                {relatedServices.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block text-[0.88rem] px-2 py-2 text-[#555555] hover:text-primary border-b border-[#e5e7eb] transition-colors last:border-b-0"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
