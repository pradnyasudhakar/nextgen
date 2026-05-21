"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "home-loans", label: "Home Loans" },
  { id: "what-is-home-loan", label: "What is a Home Loan?" },
  { id: "types-of-homeloan", label: "Types of Home Loans" },
  { id: "how-structured", label: "How a Home Loan is Set Up" },
  { id: "interest-repayments", label: "Repayment Frequency" },
  { id: "reviewing-refinancing", label: "Steps Involved in Getting a Home Loan"},
  
  { id: "choosing-right", label: "Why Work With NextGen Lending Group?" },
  { id: "get-started", label: "Ready to Get Started?" },
];

const relatedServices = [
//  { label: "Home Loans", href: "/homeloan" },
      { label: "Commercial Loans", href: "/commercial-loan" },
      { label: "Business Finance", href: "/business-finance" },
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
            <div id="home-loans" className="scroll-mt-24">
              <H2 className=" font-[500] mb-4">Home Loans</H2>
              <P className="mb-4">
Whether you&#39;re buying your first home, upgrading, or investing, a home loan goes beyond approval. It is about making informed decisions early so you are not second-guessing them later.
              </P>
              <P>
                At NextGen Lending Group, we help you move forward with a clear understanding of your options, so your loan works in line with your plans.
              </P>
            </div>

            <div id="what-is-home-loan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">What is a Home Loan?</H2>
              <P className="mb-4">
               A home loan, also known as a mortgage, is money borrowed from a lender to purchase a property. You repay this amount over time, usually across 25 to 30 years, along with interest.
              </P>
              <P>
              For most people, this becomes one of the largest financial commitments they take on. That is why the way the loan is set up, the terms it includes, and how it is managed over time can make a meaningful difference.

              </P>
            </div>
            <div id="types-of-homeloan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Types of Home Loans
              </H2>
              <P className="mb-4">
              Understanding your options helps you make more informed decisions:
              </P>
              
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">
                    1. Owner-Occupied Commercial Loans
                  </Highlight>{" "}
                  <br /> For people buying or living in their own home.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  First home buyers, upgraders <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Typically lower interest rates than investment loans
                </P>
                <P>
                  <Highlight className="font-[700]">
                    2. Investment Loans
                  </Highlight>{" "}
                  <br /> Designed for purchasing rental or investment properties.{" "}
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Property investors <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Potential tax benefits (speak to your accountant)
                </P>
                <P>
                  <Highlight className="font-[700]">
                    3. Fixed Rate Loans
                  </Highlight>{" "}
                  <br /> Your interest rate stays the same for a set period (e.g. 1–5 years).
                  <br />
                  <Highlight className="font-[700]">Pros:</Highlight>{" "}
                  Predictable repayments,
                  Protection from rate increases <br />
                  <Highlight className="font-[700]">
                    Cons:
                  </Highlight>{" "}
                  Less flexibility, Limited extra repayments
                </P>
                <P>
                  <Highlight className="font-[700]">
                    4. Variable Rate Loans
                  </Highlight>{" "}
                  <br /> Your interest rate can move up or down over time.
                  <br />
                  <Highlight className="font-[700]">Pros:</Highlight>{" "}
                  More flexibility, Access to features like offset/redraw <br />
                  <Highlight className="font-[700]">
                    Cons:
                  </Highlight>{" "}
                  Repayments can change over time
                </P>
                <P>
                  <Highlight className="font-[700]">
                    5. Split Loans
                  </Highlight>{" "}
                  <br /> A combination of fixed and variable loans.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                   Balancing stability and flexibility<br />
                 
                </P>
                <P>
                  <Highlight className="font-[700]">
                    6. Interest-Only Loans
                  </Highlight>{" "}
                  <br /> You only pay the interest for a set period.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                 Investors or short-term cash flow strategies <br />
                  <Highlight className="font-[700]">
                   Note:
                  </Highlight>{" "}
                  Repayments increase later when principal repayments begin
                </P>
              </div>
              <P className="mt-4">
                <Highlight className="font-[700]">
                   7. Low Doc Loans
                  </Highlight>{" "} <br />For self-employed borrowers with limited financial documentation.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                 Business owners <br />
                  <Highlight className="font-[700]">
                   Note:
                  </Highlight>{" "}
                 Usually, higher interest rates
                  
        

                
              </P>
             
              
            </div>

           <div id="how-structured" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">How a Home Loan is Set Up</H2>
  <P className="mb-6">
    The way your loan is arranged can influence how manageable it feels and
    how it performs over time.
  </P>

  <div className="space-y-6">
    {/* Loan Term */}
    <div>
      <P>
        <Highlight className="font-[700]">Loan Term</Highlight>
      </P>
      <P className="mt-1">
        Typically 25–30 years, but can be adjusted depending on your approach
        and priorities.
      </P>
    </div>

    {/* Principal & Interest vs Interest-Only */}
    <div>
      <P>
        <Highlight className="font-[700]">
          Principal & Interest vs Interest-Only
        </Highlight>
      </P>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li>
          <span className="font-[600]">Principal & Interest:</span> You
          gradually repay the loan while covering interest.
        </li>
        <li>
          <span className="font-[600]">Interest-Only:</span> Lower repayments
          initially, with higher repayments later.
        </li>
      </ul>
    </div>

    {/* Offset Account */}
    <div>
      <P>
        <Highlight className="font-[700]">Offset Account</Highlight>
      </P>
      <P className="mt-1">
        A transaction account linked to your loan that reduces the interest
        you pay.
      </P>
      <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <P className="text-sm text-gray-500 font-[600] mb-1">Example</P>
        <P className="text-sm">
          If you have $20,000 in your offset account, you only pay interest on
          your loan balance minus $20,000.
        </P>
      </div>
    </div>

    {/* Redraw Facility */}
    <div>
      <P>
        <Highlight className="font-[700]">Redraw Facility</Highlight>
      </P>
      <P className="mt-1">
        Allows you to access extra repayments you have made if needed.
      </P>
    </div>

    {/* LVR */}
    <div>
      <P>
        <Highlight className="font-[700]">Loan-to-Value Ratio (LVR)</Highlight>
      </P>
      <P className="mt-1">
        The percentage of the property value you borrow.
      </P>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li>
          <span className="font-[600]">80% or less</span> = may avoid LMI
          (Lenders Mortgage Insurance)
        </li>
        <li>
          <span className="font-[600]">Above 80%</span> = LMI may apply
        </li>
      </ul>
    </div>

   
  </div>

  <P className="mt-6">
    A well-structured loan should reflect not only your current position but
    also where you expect to be in the coming years.
  </P>
</div>

            <div id="interest-repayments" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Repayment Frequency
              </H2>
              <P className="mb-4">
              Weekly, fortnightly, or monthly. Choosing the right frequency can help
        manage repayments more effectively over time.
              </P>
              <P className="mb-4">
                A well-structured loan should reflect not only your current position but
    also where you expect to be in the coming years.
              </P>
              
            
            </div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">Steps Involved in Getting a Home Loan</H2>
  <P className="mb-6">
    We guide you through each stage so the process remains clear and manageable:
  </P>

  <div className="space-y-4">
    {[
      {
        step: 1,
        title: "Discovery & Strategy Session",
        description: "We understand your:",
        bullets: [
          "Financial position",
          "Goals (home vs investment)",
          "Borrowing capacity",
        ],
      },
      {
        step: 2,
        title: "Borrowing Capacity Assessment",
        description:
          "We calculate how much you can borrow and identify suitable lenders for your situation.",
      },
      {
        step: 3,
        title: "Loan Recommendation",
        description: "We present options based on:",
        bullets: ["Rates", "Features", "Flexibility", "Long-term fit"],
      },
      {
        step: 4,
        title: "Pre-Approval",
        description:
          "We secure conditional approval so you can move forward with clarity when searching for a property.",
      },
      {
        step: 5,
        title: "Property Purchase",
        description:
          "Once you find a property, we move towards formal approval.",
      },
      {
        step: 6,
        title: "Formal Approval",
        description:
          "The lender completes final checks and confirms your loan.",
      },
      {
        step: 7,
        title: "Settlement",
        description: "Funds are released, and ownership is transferred.",
      },
      {
        step: 8,
        title: "Ongoing Support & Reviews",
        description: "We continue to support you by helping:",
        bullets: [
          "Review your loan regularly",
          "Reassess when needed",
          "Adjust your structure as your situation evolves",
        ],
      },
    ].map(({ step, title, description, bullets }) => (
      <div key={step} className="flex gap-4">
        {/* Step Number */}
        {/* <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00674E] text-white text-sm font-[600] flex items-center justify-center">
          {step}
        </div> */}

        {/* Content */}
        <div className="pb-4 border-b border-gray-100 flex-1">
          <P className="font-[600] text-[#00674E] mb-1">{title}</P>
          <P className="text-[gray-600]">{description}</P>
          {bullets && (
            <ul className="mt-2 space-y-1 list-disc list-inside text-[gray-600]">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

            

            <div id="choosing-right" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Why Work With NextGen Lending Group?</H2>
             
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Access to multiple lenders, not just one bank
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Loan structuring aligned with your situation
              </P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Ongoing reviews rather than a set-and-forget approach</P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Clear, straightforward guidance throughout</P>
             
            </div>
            <div id="get-started" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Ready to Get Started?
</H2>
             
              <P className="mb-4">
                Your home loan should fit your life, not the other way around.
Speak with us to explore your options
Get a clear understanding of your borrowing position
Review whether your current loan still fits your needs
Let’s take the next step with confidence.
              </P>
              
             
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
