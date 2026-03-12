"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { H2, Label, Highlight, P } from "@/components/ui/typography";

const faqs = [
  {
    question: "What does NextGen Lending Group do?",
    answer: "At NextGen Lending Group, we help individuals, families, and businesses find the right finance solutions. This includes home loans, refinancing, investment loans, and other lending options. We work with a panel of lenders to compare options and guide you through the entire loan process from application to settlement.",
  },
  {
    question: "Why should I use a mortgage broker instead of going directly to a bank?",
    answer: "A mortgage broker gives you access to multiple lenders and loan products, not just one bank. This means we can:",
    bullets: [
      "Compare loan options for you",
      "Find competitive interest rates",
      "Match loans to your personal financial goals",
      "Handle the paperwork and negotiations",
    ],
    footer: "Our goal is to make the process simpler and help you secure the most suitable loan for your situation.",
  },
  {
    question: "Does it cost anything to use your services?",
    answer: "Brokers get paid a commission by the lender for bringing new business to them, but this does not impact your interest rate. Some brokers charge a fee for their service. They must disclose this fee upfront to you so that you know what it will cost if you engage their services.",
  },
  {
    question: "How much can I borrow?",
    answer: "The amount you can borrow depends on several factors including:",
     bullets: [
      "Your income",
      "Existing debts",
      "Living expenses",
      "Deposit amount",
      "Employment status / position",
    ],
     footer:"Our borrowing calculator can give you a rough idea of how much you may be able to borrow. For a more accurate assessment, please give us a call and we can go into your options and discuss your circumstances in more detail.",
  },
  {
    question: "Do you work with self-employed clients?",
    answer: "Yes. We regularly assist self-employed borrowers and understand the unique documentation and lending requirements involved. We work with lenders who offer flexible assessment criteria for business owners and contractors.",
    text:"We can help structure your application using the right documentation and identify lenders who specialise in self-employed lending.",
  },
  {
    question: "Can you help first-home buyers?",
    answer: "Absolutely. We regularly assist first-home buyers with:",
     bullets:[
        "Understanding borrowing capacity",
        "Explaining the home buying process",
        "Accessing government incentives or grants",
        "Choosing the right loan structure",
            ],
    footer:"Our goal is to make your first home purchase as smooth as possible.",        
  },
  {
    question: "What is loan pre-approval?",
    answer: "Loan pre-approval (also called conditional approval) is an indication from a lender that they are willing to lend you a certain amount based on your financial situation. It helps buyers:",
     bullets:[
        "Understand their budget",
        "Strengthen offers when purchasing property",
        "Move quickly when they find the right property",

     ],
     
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy.Simply:",
     bullets:[
        "Contact us for an initial consultation",
        "We assess your borrowing capacity",
        "Compare suitable loan options",
        "Guide you through the application process",

     ],
    footer:"You can reach out to our team anytime to begin your finance journey.", 
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-16">

        {/* Header */}
        <div className="mb-10">
          <Label className="mb-3">FAQS</Label>
          <H2 className="mb-3">
           Frequently Asked <Highlight>Questions</Highlight> 
          </H2>
          <P className="max-w-md">
            Find clear, straightforward answers to all your home and investment loan questions.
          </P>
        </div>

        {/* Accordion */}
        <div className="space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-md overflow-hidden"
                style={{
                  background: "#FBFBFB",
                  border: isOpen ? "1.5px solid #00674E" : "1.5px solid #9C9C9C",
                  boxShadow: isOpen ? "0 2px 16px rgba(0,103,78,0.08)" : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-6 text-left"
                >
                  <span
                    className="text-[1.2rem] font-[500] pr-4 transition-colors duration-300"
                    style={{ color: isOpen ? "#002566" : "#555555" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0"
                    style={{
                      color: "var(--color-primary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {/* Divider */}
                  <div className="mx-6 border-t border-[#9C9C9C]" />

                  <div className="px-6 py-5 space-y-3">
                    <P
                      className="text-[#555555] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    {faq.bullets && (
                      <ul className="space-y-1.5 pl-1">
                        {faq.bullets.map((b, j) => (
                          <li key={j} className="flex items-center gap-2 text-[0.9rem] text-[#555555]">
                            <span className=" flex items-center justify-center w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-primary)" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {faq.footer && (
                      <P className="text-[#555555] leading-relaxed">{faq.footer}</P>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}