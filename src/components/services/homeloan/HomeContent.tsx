"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "home-loans", label: "Home Loans" },
  { id: "what-is-home-loan", label: "What is a Home Loan?" },
  { id: "how-structured", label: "How Your Loan Can Be Structured" },
  { id: "interest-repayments", label: "Understanding Interest and Repayments" },
  { id: "reviewing-refinancing", label: "Reviewing and Refinancing" },
  { id: "home-buying-process", label: "Home Buying Process" },
  { id: "choosing-right", label: "Choosing the Right Structure" },
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
            <div id="home-loans" className="scroll-mt-24">
              <H2 className=" font-[500] mb-4">Home Loans</H2>
              <P className="mb-4">
                Whether you are buying your first home, refinancing an existing property, or purchasing an investment, the right financial structure makes all the difference. A home purchase is one of the most significant financial commitments you will take on. It deserves clarity, careful planning, and steady guidance from the beginning.
              </P>
              <P>
                Our role is to understand your goals, your financial position, and your long-term plans before shaping a solution. The focus is not just approval. It is building a structure that remains sustainable and flexible over time.
              </P>
            </div>

            <div id="what-is-home-loan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">What is a Home Loan?</H2>
              <P className="mb-4">
                A home loan, also known as a mortgage, is a secured financial solution that allows you to purchase, build, or renovate residential property. The property acts as security for the lender.
              </P>
              <P>
               In Australia, most home loans are structured over 25 to 30 years. Repayments typically include both principal and interest, although interest-only periods may apply in some circumstances. How the loan is structured will influence cash flow, flexibility, and overall cost.

              </P>
            </div>

            <div id="how-structured" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                How Your Loan Can Be Structured
              </H2>
              <P className="mb-4">
                Every borrower’s situation is different. The structure of your loan will depend on several key factors:
              </P>
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">Purpose:</Highlight> Whether the property is owner-occupied or an investment.
                </P>
                <P>
                  <Highlight className="font-[700]">Interest Type:</Highlight>{" "}
                  Variable rates move with the market. Fixed rates provide certainty for a defined period. Some borrowers choose a split structure to balance both.
                </P>
                <P>
                  <Highlight className="font-[700]">Interest Type:</Highlight>{" "}
                  Principal and interest reduce the loan balance over time. Interest only lowers short-term repayments but does not reduce the principal during that period.
                </P>
                <P>
                  <Highlight className="font-[700]">
                    Repayment Method:
                  </Highlight>{" "}
                  Principal and interest reduce the loan balance over time. Interest only lowers short-term repayments but does not reduce the principal during that period.
                </P>
                <P>
                  <Highlight className="font-[700]">
                    Features and Flexibility:
                  </Highlight>{" "}
                  Options such as offset accounts, redraw facilities, and additional repayments can significantly influence how your loan performs over the long term.
                </P>
              </div>
              <P className="mt-4">
                A well-structured loan should reflect not only your current position but also where you expect to be in the coming years.

              </P>
            </div>

            <div id="interest-repayments" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Understanding Interest and Repayments
              </H2>
              <P className="mb-4">
                Each repayment consists of two components. Principal is the amount borrowed. Interest is the cost of borrowing.
              </P>
              <P className="mb-4">
                Over time, regular repayments reduce the loan balance and the total interest payable. Making additional repayments, even small ones, can shorten the loan term and reduce long-term costs.
              </P>
              <P className="mb-4">
                If you choose an interest-only period, repayments may be lower initially. However, when that period ends, repayments will increase because you will begin repaying both principal and interest.
              </P>
              <P>
                Understanding these mechanics early helps avoid surprises later.
              </P>
            </div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Reviewing and Refinancing</H2>
              <P className="mb-4">
                A loan should not remain untouched for decades. Circumstances change. Rates move. Financial goals evolve.
              </P>
              <P className="mb-4">
                Refinancing involves replacing your current plan with a new one, either with the same lender or a different institution. This may provide access to more competitive pricing, improved features, or a structure better suited to your current situation.
              </P>
              <P>When reviewing a refinance, it is important to look beyond the headline rate. Fees, comparison rates, and overall structure determine the true cost over time.</P>
            </div>

            <div id="home-buying-process" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Home Buying Process</H2>
              <P className="mb-4">
                The process can feel complex, but it becomes manageable when broken into stages:
              </P>
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">Pre-Approval :</Highlight> Understanding borrowing capacity before committing to a property.
                </P>
                <P>
                  <Highlight className="font-[700]">Search and Contract :</Highlight>{" "}
                  Making an offer and navigating contract terms.
                </P>
                <P>
                  <Highlight className="font-[700]">Application and Approval :</Highlight>{" "}
                 Managing documentation, lender requirements, and formal approval.
                </P>
                <P>
                  <Highlight className="font-[700]">
                   Settlement and Ongoing Review :

                  </Highlight>{" "}
                  Completing the purchase and continuing to review the structure as your circumstances evolve.
                  <br />
                  Our involvement does not end at settlement. Ongoing review ensures the structure continues to support your goals.
                </P>
                
              </div>
             
            </div>

            <div id="choosing-right" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Choosing the Right Structure</H2>
              <P className="mb-4">
                There is no single loan that suits everyone. First home buyers, owner occupiers, investors, and refinancers all have different priorities.

              </P>
              <P>
                The objective is not simply to secure funding. It is to ensure the financial solution supports your lifestyle, risk tolerance, and long-term plans.
              </P>
              <P>When structured correctly, a home loan becomes a stable foundation rather than a source of stress.</P>
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
