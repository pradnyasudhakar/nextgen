"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { H2, H3, P, Highlight } from "@/components/ui/typography";

const tableOfContents = [
  { id: "commercial-loans", label: "Commercial Loans" },
  { id: "who-is-this-for", label: "Who is This For" },
  { id: "what-is-commercial-loan", label: "What is a Commercial Property Loan?" },
  { id: "how-structured", label: "Types of Commercial Property Loans" },
  { id: "interest-repayments", label: "How Commercial Property Loans Are Structured" },
  { id: "reviewing-refinancing", label: "What Lender Look At" },
  { id: "home-buying-process", label: "Steps to Secure a Commercial Property Loan" },
  { id: "nextgen-lending-group", label: "Why Work With NextGen Lending Group" },
  { id: "commercial-property", label: "Ready to Invest in Commercial Property?" },
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
              <H2 className=" font-[500] mb-4">Commercial Property Loans</H2>
              <P className="mb-4">
                Whether you&#39;re purchasing an office, warehouse, retail space, or industrial asset, commercial property lending works differently from residential finance. It involves a more considered 
              </P>
              <P>
                approach, where the structure of the loan plays an important role in how the investment performs over time.
              </P>
              <P>At NextGen Lending Group, we focus on structuring commercial property loans that align with your investment approach, cash flow, and long-term plans.</P>
            </div>
<div id="who-is-this-for" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Who is This For
              </H2>
              <P className="mb-4">
                This is suited for individuals and businesses looking to purchase or invest in commercial property.

              </P>
              <P className="mb-4">
                We work with:
                <ul className=" styled space-y-1 mt-1 ">
                  <li>Commercial property investors</li>
                  <li>Business owners purchasing premises</li>
                  <li>Developers acquiring completed assets</li>
                  <li>SMSF investors purchasing commercial property</li>
                  
                </ul>
              </P>
             
            </div>
            <div id="what-is-commercial-loan" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                What is a Commercial Property Loan?
              </H2>
              <P className="mb-4">
                A commercial property loan is finance used to purchase or refinance commercial real estate, either as an investment or for your own business use. It helps you acquire or hold property while spreading the cost over time, rather than using all your capital upfront.
              </P>
              <P className="mb-4">
                This includes assets such as :
                <ul className=" styled space-y-1 mt-1 ">
                  <li>Office buildings</li>
                  <li>Retail shops & shopping strips</li>
                  <li>Warehouses & industrial facilities</li>
                  <li>Medical suites & specialist-use properties</li>
                  <li>Mixed-use developments</li>
                </ul>
              </P>
              <P>
                Unlike residential lending, commercial loans are assessed based
                on :
                <ul className=" styled space-y-1 mt-1 ">
                  <li>The strength of the asset</li>
                  <li>Rental income (if tenanted)</li>
                  <li>Lease terms</li>
                  <li>Borrower profile and experience</li>
                </ul>
               
              </P>
            </div>

            <div id="how-structured" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
                Types of Commercial Property Loans
              </H2>
              <P className="mb-4">
                Commercial property loans can be structured differently depending on how you plan to use the property and what you want it to support over time.
              </P>
              <P className="mb-4">
                We tailor solutions based on how you plan to use the property:
              </P>
              <div className="space-y-3">
                <P>
                  <Highlight className="font-[700]">
                    1. Owner-Occupied Commercial Loans
                  </Highlight>{" "}
                  <br /> For businesses purchasing their own premises.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Business owners who want their independent space <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Build equity instead of paying rent
                </P>
                <P>
                  <Highlight className="font-[700]">
                    2. Investment Commercial Loans
                  </Highlight>{" "}
                  <br /> For investors purchasing income-producing properties.{" "}
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Passive income and long-term capital growth <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Rental income supports loan servicing
                </P>
                <P>
                  <Highlight className="font-[700]">
                    3. Industrial Property Loans
                  </Highlight>{" "}
                  <br /> For warehouses, factories, and logistics assets
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Strong-yielding, long-term tenancies <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Stable income supported by long-term lease agreements.
                </P>
                <P>
                  <Highlight className="font-[700]">
                    4. Retail Property Loans
                  </Highlight>{" "}
                  <br /> For shops, strip retail, or commercial units.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  High-foot-traffic locations <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Consistent rental demand in well-positioned areas
                </P>
                <P>
                  <Highlight className="font-[700]">
                    5. Office Property Loans
                  </Highlight>{" "}
                  <br /> For commercial office spaces.
                  <br />
                  <Highlight className="font-[700]">Best for:</Highlight>{" "}
                  Professional tenants and long-term leases <br />
                  <Highlight className="font-[700]">
                    Key benefit:
                  </Highlight>{" "}
                  Predictable income from established tenant profiles
                </P>
              </div>
              <P className="mt-4">
                <Highlight className="font-[700]">
                   6. Specialised Commercial Properties
                  </Highlight>{" "} <br />Includes:
                  <ul className=" styled space-y-1 mt-1 ">
                    <li>Medical centres</li>
                    <li>Childcare facilities</li>
                    <li>Service stations</li>
                    <li>Hospitality venues</li>
                  </ul>
        

                
              </P>
              <P className="mt-4" > <Highlight className="font-[700]" >Note:</Highlight> These require a more personalized lending approach due to their specialised nature</P>
            </div>

            <div id="interest-repayments" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">
               How Commercial Property Loans Are Structured
              </H2>
              <P className="mb-4">
              Commercial property loans can be structured in different ways depending on the property, the tenant profile, and how you plan to hold the asset. While they offer flexibility, they also require a more considered approach than residential loans.
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]" >Loan Term</Highlight> <br />
                Typically 15–30 years, with shorter review periods (e.g. 3–5 years)
              </P>
              <P className="mb-4">
              <Highlight className="font-[700]">Loan-to-Value Ratio (LVR)</Highlight> <br />Generally, 60%–80% depending on:
              <ul className=" styled space-y-1 mt-1 ">
                <li>Property type</li>
                <li>Lease strength</li>
                <li>Borrower profile</li>
              </ul>
              </P>
              <P className="mb-4">
              <Highlight className="font-[700]">Interest Rates</Highlight> <br />
              <ul className=" styled space-y-1 mt-1 ">
                <li>Mostly variable rates</li>
                <li>Fixed options available (usually shorter terms)</li>
              </ul>
              </P>
              <P className="mb-4">
              <Highlight className="font-[700]">Repayment Types</Highlight> <br />
              <ul className=" styled space-y-1 mt-1 ">
                <li>Principal & Interest (common for owner-occupiers)</li>
                <li>Interest-Only (common for investors)</li>
              </ul>
              </P>
              <P className="mb-4">
              <Highlight className="font-[700]">Security</Highlight> <br />Typically secured against:
              <ul className=" styled space-y-1 mt-1 ">
                <li>The commercial property being purchased</li>
                <li>Sometimes additional property (if required)</li>
              </ul>
              </P>
              <P className="mb-4">
              <Highlight className="font-[700]">Lease & Income Assessment</Highlight> <br />For investment properties, lenders assess:
              <ul className=" styled space-y-1 mt-1 ">
                <li>Rental income</li>
                <li>Lease length</li>
                <li>Tenant quality</li>
                <li>Vacancy risk</li>
              </ul>
              </P>
              <P><Highlight className="font-[700]">Balloon Payments</Highlight><br />
Some commercial loans include a balloon (residual) payment at the end of the term or review period.</P>
            </div>

            <div id="reviewing-refinancing" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">What Lender Look At</H2>
              <P className="mb-4">When assessing a commercial property loan, lenders look at a few key aspects to understand both the strength of the property and your overall position.</P>
              <P className="mb-4">
                To tailor the right solutions, lenders assess:
                <ul className=" styled space-y-1 mt-1 ">
                    <li>Property location & type</li>
                    <li>Lease agreements and tenant strength</li>
                    <li>Your financial position</li>
                    <li>Your experience (especially for investors)</li>
                    <li>Deposit/equity contribution</li>
                </ul>
              </P>
             
            </div>

            <div id="home-buying-process" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Steps to Secure a Commercial Property Loan</H2>
              <P className="mb-4 ">Securing a commercial property loan involves a few structured steps. We guide you through each stage so the process remains clear and manageable.</P>
              <P className="mb-4 mt-2 ">
               <Highlight className="font-[700] mb-1 " >Step 1: Strategy & Property Assessment</Highlight> <br />
               We understand:
               <ul className=" styled space-y-1 mt-1 ">
                <li>Your goals (owner-occupied vs investment)</li>
                <li>Target property type</li>
                <li>Budget and deposit</li>
               </ul>
              </P>
              <P className="mb-4 ">
               <Highlight className="font-[700] mb-1 " >Step 2: Borrowing Capacity & Structuring</Highlight> <br />
               We determine:
               <ul className=" styled space-y-1 mt-1 ">
                <li>How much you can borrow</li>
                <li>The loan structure</li>
                <li>Suitable lenders for your scenario</li>
               </ul>
              </P>
              <P className="mb-4 ">
                <Highlight className="font-[700] mb-1 " >Step 3: Pre-Approval (Where Applicable)</Highlight> <br />Provides clarity when negotiating and making offers.

              </P>
               <P className="mb-4 ">
               <Highlight className="font-[700] mb-1 " >Step 4: Property & Lease Review</Highlight> <br />
               We assess:
               <ul className=" styled space-y-1 mt-1 ">
                <li>Rental income</li>
                <li>Lease terms</li>
                <li>Property risks</li>
               </ul>
              </P>
              <P className="mb-4 ">
               <Highlight className="font-[700] mb-1 " >Step 5: Application & Submission</Highlight> <br />
              We prepare the application including:
               <ul className=" styled space-y-1 mt-1 ">
                <li>Financials</li>
                <li>Property details</li>
                <li>Supporting documents</li>
               </ul>
              </P>
              <P className="mb-4 ">
                <Highlight className="font-[700] mb-1 " >Step 6: Approval & Credit Assessment</Highlight> <br />We work with lenders to secure appropriate terms and conditions.

              </P>
              <P className="mb-4 ">
                <Highlight className="font-[700] mb-1 " >Step 7: Settlement</Highlight> <br />We coordinate with all parties to ensure a smooth settlement process.


              </P>
              <P className="mb-4 ">
               <Highlight className="font-[700] mb-1 " >Step 8: Ongoing Portfolio Support</Highlight> <br />
             We help you:
               <ul className=" styled space-y-1 mt-1 ">
                <li>Review your loan regularly</li>
                <li>Reassess when needed</li>
                <li>Plan future property decisions</li>
               </ul>
              </P>
            </div>

            <div id="nextgen-lending-group" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Why Work With NextGen Lending Group?</H2>
              <P className="mb-4">Helping you structure your commercial property decisions with clarity.</P>
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Access to major banks & specialist commercial property lenders
              </P>
              <P className="mb-4">
                <Highlight className="font-[700]" >✔</Highlight> Strong understanding of commercial real estate lending
              </P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Structuring aligned with long-term plans</P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Experience across complex and specialised properties</P>
              <P className="mb-4"><Highlight className="font-[700]" >✔</Highlight> Ongoing support beyond settlement</P>
            </div>
             
             <div id="commercial-property" className="scroll-mt-24">
              <H2 className="font-[500] mb-4">Ready to Invest in Commercial Property?</H2>
              <P className="mb-4">
               Commercial property can be a strong long-term investment when the structure is aligned with your plans and cash flow.
                <ul className="styled space-y-1 mt-2 mb-2">
                    <li>Speak to a commercial lending specialist</li>
                    <li>Get a tailored borrowing approach</li>
                    <li>Understand your purchasing capacity</li>
                   
                   
                </ul>
                Let’s take the next step with clarity!
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
