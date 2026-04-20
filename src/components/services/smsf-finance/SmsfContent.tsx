"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "commercial-loans", label: "SMSF Finance" },
  {
    id: "what-is-commercial-loan",
    label: "What is SMSF Finance?",
  },
  { id: "smsf-property", label: "How SMSF Property Investment Works" },
  { id: "how-structured", label: "Types of SMSF Loans" },
  { id: "interest-repayments", label: "How SMSF Finance Works" },
  {
    id: "reviewing-refinancing",
    label: "Steps to Securing SMSF Finance",
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
  { label: "Commercial Loans", href: "#" },
  { label: "Business Finance", href: "#" },
  { label: "Asset Finance", href: "#" },
  { label: "Development Finance", href: "#" },
  { label: "SMSF Finance", href: "#" },
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
              <H2 className=" font-[500] mb-4">SMSF Finance</H2>
              <P className="mb-4">
               Investing through your Self-Managed Super Fund can open up new opportunities, but it also comes with rules that need to be followed closely.
              </P>
              <P>
                At NextGen Lending Group, we help you navigate SMSF finance in a way that keeps things clear, compliant, and aligned with what you are trying to build over time.
              </P>
            </div>

            <div id="what-is-commercial-loan" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">What is SMSF Finance?</H2>
  <P className="mb-4">
    SMSF finance is a loan taken by your Self-Managed Super Fund to invest in
    property or other approved assets.
  </P>
  <P className="mb-4">
    Unlike a standard loan, this sits within a regulated environment, where
    every decision must support your retirement goals.
  </P>
  <P className="mb-2">SMSF finance can be used for:</P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Residential investment property</li>
    <li>Commercial property (offices, retail, industrial)</li>
    <li>Development-ready land (in some cases)</li>
  </ul>
  <P className="mb-4">
    The key difference is simple. The investment sits inside your fund, and
    everything around it must follow superannuation rules.
  </P>
</div>
<div id="smsf-property" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">How SMSF Property Investment Works</H2>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Your SMSF borrows through a Limited Recourse Borrowing Arrangement (LRBA)</li>
    <li>The property is purchased in the name of the SMSF</li>
    <li>If the loan defaults, the lender can only claim against that property</li>
    <li>Rental income and any value growth remain within the fund</li>
  </ul>
  <P className="mb-4">
    <Highlight className="font-[700]">Important:</Highlight> All purchases
    must meet Australian Taxation Office (ATO) requirements, including leasing
    rules, related party restrictions, and the sole purpose test.
  </P>
</div>
            <div id="how-structured" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Types of SMSF Loans
              </H2>
              
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">
                   1. Residential SMSF Loans
                  </Highlight>{" "}
                  <br /> For purchasing houses, apartments, or townhouses through your SMSF.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                   Long-term property investment within your fund <br />
                  <Highlight className="font-[700]">
                    Key considerations:
                  </Highlight>{" "}
                  Must follow strict related party rules,Usually requires a higher deposit (20–30%+).
                </P>
                <P>
                  <Highlight className="font-[700]">
                    2. Commercial SMSF Loans
                  </Highlight>{" "}
                  <br /> For offices, retail, industrial, or other income-generating properties.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Stable rental income within the fund <br />
                  <Highlight className="font-[700]">
                    Key considerations:
                  </Highlight>{" "}
                  Loan-to-value ratios typically range between 60–80%
                </P>
                
              </div>
            </div>

            <div id="interest-repayments" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">How SMSF Finance Works</H2>
  <P className="mb-4">
    SMSF lending operates differently because it needs to meet regulatory
    requirements at every stage.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">
      Limited Recourse Borrowing Arrangement (LRBA)
    </Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Loan is taken by the SMSF</li>
    <li>Lender's claim is limited to the purchased property</li>
    <li>Other assets in the fund remain protected</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Loan Term</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Typically 10–25 years depending on lender and property</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Loan-to-Value Ratio (LVR)</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Usually between 60–80%</li>
    <li>Depends on property type and fund position</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Repayment Types</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Principal & Interest: Gradual reduction of the loan</li>
    <li>Interest-Only: Helps manage cash flow within the fund</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Security</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>The property is the main security</li>
    <li>Additional fund assets or buffers may be required</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Compliance Considerations</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Property must meet the sole purpose test</li>
    <li>Related party rules must be followed</li>
    <li>All income and expenses must go through the SMSF</li>
  </ul>
</div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">Steps to Securing SMSF Finance</H2>
  <P className="mb-4">
    We guide you through each stage so everything is handled correctly from
    the start:
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 1: SMSF Review & Direction</Highlight>
    <br />
    We look at:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Current fund balance</li>
    <li>Retirement goals</li>
    <li>Property plans</li>
    <li>Compliance position</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 2: Borrowing Capacity & Planning</Highlight>
    <br />
    We determine:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>How much your SMSF can borrow</li>
    <li>Suitable loan options</li>
    <li>Lenders that work with SMSFs</li>
  </ul>

  <P className="mb-4">
    <Highlight className="font-[700]">Step 3: Pre-Approval</Highlight>
    <br />
    Gives your SMSF the ability to act when the right property becomes
    available.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 4: Property & Compliance Checks</Highlight>
    <br />
    We review:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Market value and rental potential</li>
    <li>ATO compliance requirements</li>
    <li>Lease and ownership rules</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 5: Application & Documentation</Highlight>
    <br />
    We prepare:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>SMSF trust documentation</li>
    <li>Financials and fund details</li>
    <li>Property information</li>
  </ul>

  <P className="mb-4">
    <Highlight className="font-[700]">Step 6: Approval & Settlement</Highlight>
    <br />
    Loan is approved under LRBA guidelines, and the SMSF acquires the
    property.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 7: Ongoing Support</Highlight>
    <br />
    We help you:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Review your loan and property</li>
    <li>Manage cash flow within the fund</li>
    <li>Plan future investments</li>
  </ul>
</div>

            <div id="nextgen-lending-group" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Why Work With NextGen Lending Group?
              </H2>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>
                Experience working with SMSF lending and LRBA requirements
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>
                Access to lenders who understand SMSF structures
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> 
                Clear guidance around compliance and investment decisions
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> 
                Support throughout the entire process
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> 
                Ongoing help as your SMSF evolves
              </P>
            </div>
            <div id="who-is-this-for" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Who We Help</H2>
              <P className="mb-2">
                We work with:
               
              </P>
               <ul className="text-[#555555]  styled space-y-1  ">
                  <li> SMSF trustees</li>
                  <li>Investors using their super for property</li>
                  <li>SMSFs expanding their property holdings</li>
                  <li>SMSFs planning compliant development or upgrades</li>
                </ul>
            </div>
            <div id="commercial-property" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    Ready to Explore Property Through Your SMSF?
  </H2>
  <P className="mb-2">
    SMSF property investment works best when both the funding and compliance
    are handled carefully from the start.
  </P>
  <ul className="text-[#555555] styled space-y-1  mb-2">
    <li>Speak with an SMSF finance specialist</li>
    <li>Explore options that suit your fund</li>
    <li>Understand what your SMSF can access</li>
  </ul>
  <P>Let&apos;s take your SMSF strategy forward with confidence.</P>
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
