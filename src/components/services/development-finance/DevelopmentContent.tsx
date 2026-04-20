"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "commercial-loans", label: "Development Finance" },
  {
    id: "what-is-commercial-loan",
    label: "What is Development & Construction Finance?",
  },
  { id: "how-structured", label: "Types of Development & Construction Finance" },
  { id: "interest-repayments", label: "How Development & Construction Finance Works" },
  {
    id: "reviewing-refinancing",
    label: "Steps to Securing Development & Construction Finance",
  },
  { id: "nextgen-lending-group", label: "Why Work With NextGen Lending Group" },
  { id: "who-is-this-for", label: "Who We Help" },
  {
    id: "commercial-property",
    label: "Ready to Move Forward with Your Development Project?",
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
              <H2 className=" font-[500] mb-4">Development Finance</H2>
              <P className="mb-4">
               Property development is not just about securing capital. It is about having funding that keeps pace with your project, from the first step through to completion and exit.
              </P>
              <P>
                At NextGen Lending Group, we help you access development finance that fits your project timeline, funding needs, and overall direction, so you can move forward with clarity at every stage.
              </P>
            </div>

            <div id="what-is-commercial-loan" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    What is Development & Construction Finance?
  </H2>
  <P className="mb-4">
    Development or construction finance is a specialised loan used to fund property projects, including land purchase, construction, and redevelopment.
  </P>
  <P className="mb-4">
    Unlike standard lending, this type of finance is based on how the project is expected to progress and what it will be worth once completed.
  </P>
  <P className="mb-2">It typically takes into account:</P>
  <ul className="text-[#555555] styled space-y-1 mt-2 mb-4">
    <li>Total project costs, including land, construction, and approvals</li>
    <li>Project timelines and build stages</li>
    <li>Estimated value on completion</li>
  </ul>
  <P className="mb-4">
    This type of funding is designed to support the full lifecycle of a project, from acquisition through to completion and final outcome, whether that is sale, refinance, or long-term hold.
  </P>
</div>

            <div id="how-structured" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    Types of Development & Construction Finance
  </H2>

  <div className="space-y-3">
    <P>
      <Highlight className="font-[700]">1. Land Acquisition Loans</Highlight>
      <br /> Funding to secure land for future development.
      <br />
      <Highlight className="font-[700]">Best for:</Highlight> Developers
      preparing to move on a site
      <br />
      <Highlight className="font-[700]">Key benefit:</Highlight> Allows you to
      secure opportunities without tying up available capital
    </P>

    <P>
      <Highlight className="font-[700]">2. Construction Loans</Highlight>
      <br /> Funding for the build phase of a project.
      <br />
      <Highlight className="font-[700]">Best for:</Highlight> Residential or
      commercial projects under construction
      <br />
      <Highlight className="font-[700]">Key benefit:</Highlight> Funds released
      in stages as work progresses, Interest charged only on the amount used,
      Requires clear plans and cost estimates
    </P>

    <div>
      <P className="mb-1">
        <Highlight className="font-[700]">3. Development Loans</Highlight>
        <br /> Covers the full project scope, including:
      </P>
      <ul className="text-[#555555] styled space-y-1 mt-1 mb-2">
        <li>Land purchase</li>
        <li>Construction costs</li>
        <li>Professional fees and approvals</li>
      </ul>
      <P>
        <Highlight className="font-[700]">Best for:</Highlight> Multi-stage or
        larger-scale developments
        <br />
        <Highlight className="font-[700]">Key benefit:</Highlight> Funding
        aligned with each stage of the project
      </P>
    </div>

    <div>
      <P className="mb-1">
        <Highlight className="font-[700]">4. Bridging / Pre-Sale Finance</Highlight>
        <br /> Short-term funding used to:
      </P>
      <ul className="text-[#555555] styled space-y-1 mt-1 mb-2">
        <li>Secure land before approvals</li>
        <li>Bridge the gap before long-term funding is in place</li>
        <li>Support pre-sale or leasing phases</li>
      </ul>
      <P>
        <Highlight className="font-[700]">Best for:</Highlight> Time-sensitive
        opportunities
        <br />
        <Highlight className="font-[700]">Key benefit:</Highlight> Quick access
        to funds when timing matters
      </P>
    </div>

    <P>
      <Highlight className="font-[700]">
        5. Residential vs Commercial Development Loans
      </Highlight>
      <br />
      <Highlight className="font-[700]">Residential:</Highlight> Townhouses,
      apartments, housing estates
      <br />
      <Highlight className="font-[700]">Commercial:</Highlight> Office, retail,
      industrial, mixed-use
      <br />
      Each project type is assessed differently based on scale, demand, and
      expected outcomes.
    </P>
  </div>
</div>

            <div id="interest-repayments" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    How Development & Construction Finance Work
  </H2>
  <P className="mb-4">
    Development finance is designed to follow the progress of your project
    rather than operate as a single lump sum loan.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Loan Term</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Typically 12–36 months for most projects</li>
    <li>May extend depending on project complexity</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Interest Rates</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Usually variable</li>
    <li>Interest often applies only to funds that have been used</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Drawdown Schedule</Highlight>
    <br />
    Funds are released in stages:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Land purchase</li>
    <li>Site preparation</li>
    <li>Construction milestones (foundation, framing, completion)</li>
    <li>Final stage or settlement</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Loan-to-Cost / Loan-to-Value Ratio</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-2">
    <li>Loan-to-Cost (LTC): Percentage of total project cost funded</li>
    <li>Loan-to-Value (LVR): Percentage of projected end value</li>
  </ul>
  <P className="mb-4">
    Funding levels typically range between 60–80%, depending on the project
    and borrower profile.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Security & Guarantees</Highlight>
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Secured against the property being developed</li>
    <li>May include additional guarantees</li>
    <li>Some lenders may require pre-sales or deposits</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Project Assessment</Highlight>
    <br />
    Lenders review:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Project feasibility and budget</li>
    <li>Market demand and comparable sales</li>
    <li>Developer experience</li>
    <li>Exit plan</li>
  </ul>
</div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    Steps to Securing Development & Construction Finance
  </H2>
  <P className="mb-4">
    We guide you through each stage so your project can move forward without
    unnecessary delays:
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 1: Project & Strategy Review</Highlight>
    <br />
    We assess:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Project type, scale, and location</li>
    <li>Budget and timeline</li>
    <li>Exit plan (sale, refinance, or hold)</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 2: Borrowing Capacity & Planning</Highlight>
    <br />
    We determine:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>How much you can access</li>
    <li>Suitable loan type</li>
    <li>Lenders aligned with your project</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 3: Pre-Approval / Conditional Offer</Highlight>
    <br />
    Gives you clarity when:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Securing land</li>
    <li>Planning construction</li>
    <li>Negotiating terms</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 4: Application Preparation</Highlight>
    <br />
    We prepare:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Construction plans and costings</li>
    <li>Feasibility reports</li>
    <li>Financials and supporting documents</li>
  </ul>

  <P className="mb-4">
    <Highlight className="font-[700]">Step 5: Approval & Fund Release Plan</Highlight>
    <br />
    Funding is approved and aligned with project stages.
  </P>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 6: Project Completion & Exit</Highlight>
    <br />
    At completion:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Project is finalised</li>
    <li>Property is sold, refinanced, or retained</li>
  </ul>

  <P className="mb-1">
    <Highlight className="font-[700]">Step 7: Ongoing Support</Highlight>
    <br />
    We help you:
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-1 mb-4">
    <li>Plan future projects</li>
    <li>Review funding options</li>
    <li>Move into the next development cycle</li>
  </ul>
</div>

            <div id="nextgen-lending-group" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Why Work With NextGen Lending Group?
              </H2>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>Access to lenders experienced in development finance
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>Guidance across different project types
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>  Funding aligned with project timelines
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight> Efficient approvals and staged funding
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]">✔</Highlight>  Support from acquisition through to completion
              </P>
            </div>
            <div id="who-is-this-for" className="scroll-mt-24">
  <H2 className="font-[500] mb-2">Who We Help</H2>
  <P className="mb-2">We work with:</P>
  <ul className="text-[#555555] styled space-y-1 ">
    <li>Property developers (residential, commercial, mixed-use)</li>
    <li>Builders and construction companies</li>
    <li>Investors undertaking development projects</li>
    <li>SMSF investors developing property</li>
  </ul>
</div>
            <div id="commercial-property" className="scroll-mt-24">
  <H2 className="font-[500] mb-4">
    Ready to Move Forward with Your Development Project?
  </H2>
  <P className="mb-2">
    Development finance works best when it supports how your project actually progresses.
  </P>
  <ul className="text-[#555555] styled space-y-1 mt-2  mb-2">
    <li>Speak with a development finance specialist</li>
    <li>Explore funding options for your project</li>
    <li>Understand what you can access and how it fits</li>
  </ul>
  <P>Let&apos;s bring your development plans into motion.</P>
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
