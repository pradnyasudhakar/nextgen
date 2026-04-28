"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "business-finance", label: "Business Finance" },
  { id: "what-is-commercial-loan", label: "What is Business Finance?" },
  { id: "how-structured", label: "Types of Business Finance" },
  { id: "interest-repayments", label: "How Business Finance is Set Up" },
  { id: "reviewing-refinancing", label: "Steps to Securing Business Finance" },
  { id: "nextgen-lending-group", label: "Why Work With NextGen Lending Group" },
  { id: "who-is-this-for", label: "Who We Help" },
  { id: "commercial-property", label: "Ready to Fund Your Business Growth?" },
];

const relatedServices = [
 { label: "Home Loans", href: "/homeloan" },
      { label: "Commercial Loans", href: "/commercial-loan" },
      // { label: "Business Finance", href: "/business-finance" },
      { label: "Asset Finance", href: "/asset-finance" },
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
            <div id="business-finance" className="scroll-mt-24">
              <H2 className=" font-[500] mb-4">Business Finance</H2>
              <P className="mb-4">
                Running a business takes more than effort. It requires access to the right funding at the right time. Whether you are expanding operations, managing cash flow, or investing in new opportunities, the right business loan can help you move forward with clarity.
              </P>
              <P>
                At NextGen Lending Group, we help you choose business finance that matches your vision and supports your next big move.
              </P>
            </div>

            <div id="what-is-commercial-loan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                What is Business Finance?
              </H2>
              <P className="mb-4">
                Business finance is a loan or line of credit used to fund business-related activities, rather than property acquisition. Unlike commercial property lending, approvals are primarily based on how your business performs, including cash flow, profitability, and overall direction.
              </P>
              <P >
                Common uses include:
              
                
              </P>
                <ul className=" text-[#555555] styled space-y-1 mt-2 mb-2 ">
                  <li>Purchasing inventory or stock</li>
                  <li>Expanding operations (new locations, premises, or departments)</li>
                  <li>Acquiring machinery, vehicles, or equipment</li>
                  <li>Managing day-to-day cash flow</li>
                  <li>Relocating or renovating premises</li>
                  <li>Launching new products or services</li>
                </ul>
              <P className="mb-4">Business finance is not just about access to funds. It is about using that funding in a way that supports how your business grows.</P>
            </div>

            <div id="how-structured" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    Types of Business Finance
  </H2>
  <P className="mb-4">
    We match businesses with the right funding solution, depending on their goals and how they operate.
  </P>
  <div className="space-y-6">

    <P>
      <Highlight className="font-[700]">1. Term Loans</Highlight>
      <br />A lump sum loan repaid over a fixed period.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Asset purchases, business expansion, or large one-off investments
      <br /><Highlight className="font-[700]">Pros:</Highlight> Predictable repayments · Access to larger sums of capital
      <br /><Highlight className="font-[700]">Cons:</Highlight> Less flexibility compared to revolving options
    </P>

    <P>
      <Highlight className="font-[700]">2. Line of Credit / Business Overdraft</Highlight>
      <br />Flexible access to funds up to an approved limit.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Managing cash flow fluctuations or short-term working capital needs
      <br /><Highlight className="font-[700]">Pros:</Highlight> Pay interest only on the amount used · Ongoing access to funds when needed
      <br /><Highlight className="font-[700]">Cons:</Highlight> May have higher interest rates than term loans
    </P>

    <P>
      <Highlight className="font-[700]">3. Equipment & Asset Finance</Highlight>
      <br />Funding to purchase business-critical assets like machinery, vehicles, or technology.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Supporting operations without large upfront costs
      <br /><Highlight className="font-[700]">Pros:</Highlight> Preserves working capital · May offer tax advantages (please obtain independent advice)
      <br /><Highlight className="font-[700]">Cons:</Highlight> Secured against the asset
    </P>

    <P>
      <Highlight className="font-[700]">4. Invoice Financing / Receivables Finance</Highlight>
      <br />Borrow against outstanding invoices.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Businesses managing delayed payments from clients
      <br /><Highlight className="font-[700]">Pros:</Highlight> Improves cash flow without waiting for payments · Supports day-to-day operations
      <br /><Highlight className="font-[700]">Cons:</Highlight> Fees apply per invoice
    </P>

    <P>
      <Highlight className="font-[700]">5. Business Expansion Finance</Highlight>
      <br />Funding to open new locations, launch products, or invest in growth initiatives.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Businesses planning their next phase of growth
      <br /><Highlight className="font-[700]">Pros:</Highlight> Supports multiple growth initiatives · Enables forward planning
      <br /><Highlight className="font-[700]">Cons:</Highlight> Requires a clear plan and financial outlook
    </P>

    <P>
      <Highlight className="font-[700]">6. Bridging Finance / Relocation Loans</Highlight>
      <br />Short-term loans to manage business transitions, such as relocation or renovation.
      <br /><Highlight className="font-[700]">Best for:</Highlight> Businesses needing quick access to funds for time-sensitive decisions
      <br /><Highlight className="font-[700]">Pros:</Highlight> Fast access to capital · Flexible short-term options
      <br /><Highlight className="font-[700]">Cons:</Highlight> Typically higher interest rates
    </P>

  </div>
</div>

            <div id="interest-repayments" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    How Business Finance is Set Up
  </H2>
  <P className="mb-4">
    The way your business loan is set up can influence how it supports your operations and cash flow over time.
  </P>

  <P className="">
    <Highlight className="font-[700]">Loan Term</Highlight>
    <br />
   
  </P>
   <ul className=" text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Short-term: 3–12 months (bridging, working capital)</li>
      <li>Medium-term: 1–5 years (equipment, expansion)</li>
      <li>Long-term: 5+ years (larger investments and multi-location growth)</li>
    </ul>

  <P className="">
    <Highlight className="font-[700]">Interest Rate Options</Highlight>
    <br />
    
  </P>
  <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Variable rates for flexibility</li>
      <li>Fixed rates for predictable repayments</li>
    </ul>
  <P className="">
    <Highlight className="font-[700]">Repayment Types</Highlight>
    <br />
   
  </P>
   <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Principal & interest: Gradual reduction of the loan</li>
      <li>Interest-only: Lower repayments initially to support cash flow</li>
    </ul>

  <P className="">
    <Highlight className="font-[700] mb-1 ">Security</Highlight>
    <br />
    Business finance may be:
    
  </P>
  <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Secured against business assets (equipment, vehicles)</li>
      <li>Supported by personal or director guarantees</li>
      <li>Unsecured (typically for smaller facilities)</li>
    </ul>

  <P className="">
    <Highlight className="font-[700] mb-1 ">Cash Flow Assessment</Highlight>
    <br />Lenders typically look at:
    
  </P>
  <ul className=" text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Business revenue and profitability</li>
      <li>Existing financial commitments</li>
      <li>Receivable and payable cycles</li>
    </ul>
</div>

           <div id="reviewing-refinancing" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">Steps to Securing Business Finance</H2>
  <P className="mb-4">
    We keep the process clear so you can stay focused on running your business:
  </P>

  <P className="">
    <Highlight className="font-[700]">Step 1: Business Assessment & Goal Setting</Highlight>
    <br />We understand:
   
  </P>
   <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Your current cash flow and position</li>
      <li>Your plans and funding requirements</li>
      <li>Existing loans or commitments</li>
    </ul>

  <P className="">
    <Highlight className="font-[700]">Step 2: Loan Planning & Lender Matching</Highlight>
    <br />
    We identify:
   
  </P>
   <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Borrowing capacity</li>
      <li>Suitable loan types</li>
      <li>Lenders aligned to your needs</li>
    </ul>

  <P className="">
    <Highlight className="font-[700]">Step 3: Application Preparation</Highlight>
    <br />We prepare a complete submission including:
    
  </P>
  <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Financial statements</li>
      <li>Business plans or projections</li>
      <li>Supporting documents</li>
    </ul>

  <P className="">
    <Highlight className="font-[700]">Step 4: Approval & Terms Alignment</Highlight>
    <br />We work with lenders to secure:
    
  </P>
  <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Competitive rates</li>
      <li>Flexible repayment terms</li>
      <li>Conditions that suit your business</li>
    </ul>

  <P className="mb-4">
    <Highlight className="font-[700]">Step 5: Settlement & Fund Access</Highlight>
    <br />We coordinate the process so funds are available when you need them.
  </P>

  <P className="">
    <Highlight className="font-[700]">Step 6: Ongoing Support & Reviews</Highlight>
    <br />As your business evolves, we help you:
   
  </P>
   <ul className="text-[#555555] mb-4 styled space-y-1 mt-1">
      <li>Review and adjust your funding</li>
      <li>Access additional capital</li>
      <li>Plan your next steps</li>
    </ul>
</div>

           

            <div id="nextgen-lending-group" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Why Work With NextGen Lending Group?</H2>
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Access to multiple lenders and specialist providers
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Practical guidance aligned to your business goals
              </P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Efficient application process</P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Ongoing support beyond settlement</P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Clear communication at every stage</P>
            </div>
             <div id="who-is-this-for" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Who We Help</H2>
              <P className="">
                We work with:
               
              </P>
               <ul className="text-[#555555] styled space-y-1 mt-1 ">
                    <li>Small to medium business owners</li>
                    <li>Self-employed professionals</li>
                    <li>Startups needing working capital</li>
                    <li>Businesses expanding operations or acquiring assets</li>
                   
                </ul>
             
            </div>
             <div id="commercial-property" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Ready to Fund Your Business Growth?</H2>
              <P className="">
               Business finance can support day-to-day operations and future plans when used thoughtfully.
                
               
              </P>
              <ul className="text-[#555555] styled space-y-1 mt-1 ">
                    <li>Speak with a business finance specialist</li>
                    <li>Explore funding options suited to your business</li>
                    <li>Understand what you can access and how to use it</li>
                   
                   
                </ul>
                <P> Let’s begin with a solution that takes your business forward.</P>
             
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
