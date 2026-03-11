"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { H2, Label, Highlight, P } from "@/components/ui/typography";

const faqs = [
  {
    question: "What does NextGen Lending Group do?",
    answer: "NextGen Lending Group is a mortgage broking firm that helps individuals and businesses access finance solutions. We work with a wide panel of lenders to find loans suited to your specific needs — whether for a home, investment property, business, or asset.",
  },
  {
    question: "Why should I use a mortgage broker instead of going directly to a bank?",
    answer: "A mortgage broker gives you access to <strong>multiple lenders and loan products</strong>, not just one bank. This means we can:",
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
    answer: "In most cases, our service is free to you. We are paid a commission by the lender when your loan settles. We will always disclose any fees upfront so there are no surprises.",
  },
  {
    question: "How much can I borrow?",
    answer: "Your borrowing capacity depends on factors such as your income, expenses, existing debts, credit history, and the type of loan you're seeking. We assess your full financial picture to give you a clear and accurate picture of what's achievable.",
  },
  {
    question: "Do you work with self-employed clients?",
    answer: "Yes. We regularly assist self-employed borrowers and understand the unique documentation and lending requirements involved. We work with lenders who offer flexible assessment criteria for business owners and contractors.",
  },
  {
    question: "Can you help first-home buyers?",
    answer: "Absolutely. We guide first-home buyers through the entire process — from understanding your borrowing capacity and government grants to selecting the right loan and managing settlement. We make the process straightforward and stress-free.",
  },
  {
    question: "What is loan pre-approval?",
    answer: "Pre-approval is a conditional indication from a lender that they are willing to lend you a specified amount, subject to formal assessment. It gives you confidence when searching for a property and shows sellers you are a serious buyer.",
  },
  {
    question: "How do I get started?",
    answer: "Simply reach out to us via our contact form or call us directly. We'll arrange a conversation to understand your situation and walk you through the next steps. There's no obligation — just clear, straightforward guidance.",
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
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-md overflow-hidden"
                style={{
                  background: "#FBFBFB",
                  border: isOpen ? "1.5px solid #9C9C9C" : "1.5px solid #00674E",
                  boxShadow: isOpen ? "0 2px 16px rgba(0,103,78,0.08)" : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
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
                  <div className="mx-6 border-t border-[#e0eeea]" />

                  <div className="px-6 py-5 space-y-3">
                    <P
                      className="text-[#555555] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    {faq.bullets && (
                      <ul className="space-y-1.5 pl-1">
                        {faq.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-[0.9rem] text-[#555555]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-primary)" }} />
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