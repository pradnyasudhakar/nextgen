"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { H2, Label, Highlight, P } from "@/components/ui/typography";

type Faq = { id: string; question: string; answer: string };

export default function BlogFaqsClient({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-26 py-20">
        <div className="mb-10">
          <Label className="mb-3">FAQS</Label>
       {/* <p>test</p> */}
          <H2 className="mb-3">
            Frequently Asked <Highlight>Questions</Highlight>
          </H2>
          <P className="max-w-md">
            Find clear, straightforward answers to all your home and investment loan questions.
          </P>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.id}
                className="rounded-md overflow-hidden"
                style={{
                  background: "#FBFBFB",
                  border: isOpen ? "1.5px solid #00674E" : "1.5px solid #9C9C9C",
                  boxShadow: isOpen ? "0 2px 16px rgba(0,103,78,0.08)" : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
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

                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div className="mx-6 border-t border-[#9C9C9C]" />
                  <div className="px-6 py-5">
                    <P className="text-[#555555] leading-relaxed">{faq.answer}</P>
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