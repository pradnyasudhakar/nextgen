"use client";

import { useState, useEffect, useRef } from "react";
import { Display, Lead } from "@/components/ui/typography";
import BorrowingCapacity from "../../components/calculators/BorrowingCapacity";
import Repayments from "../../components/calculators/Repayments";
import PropertyFees from "../../components/calculators/PropertyFees";

const tabs = [
  { id: "borrowing", label: "Borrowing Capacity" },
  { id: "repayments", label: "Repayments" },
  { id: "property", label: "Property Fees" },
];

export default function CalculatorsPage() {
  const [active, setActive] = useState("borrowing");
  const [displayed, setDisplayed] = useState("borrowing");
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTabChange = (id: string) => {
    if (id === active || phase !== "idle") return;

    setPhase("out");

    timeoutRef.current = setTimeout(() => {
      setDisplayed(id);
      setActive(id);
      setPhase("in");

      timeoutRef.current = setTimeout(() => {
        setPhase("idle");
      }, 400);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const contentStyle: React.CSSProperties =
    phase === "out"
      ? { opacity: 0, transform: "scale(0.97) translateY(6px)", filter: "blur(2px)" }
      : phase === "in"
      ? { opacity: 1, transform: "scale(1) translateY(0px)", filter: "blur(0px)" }
      : { opacity: 1, transform: "scale(1) translateY(0px)", filter: "blur(0px)" };

  return (
    <>
      <style>{`
        .tab-content {
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform, filter;
        }
        .tab-btn {
          position: relative;
          overflow: hidden;
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-primary);
          opacity: 0;
          border-radius: 6px;
          transition: opacity 0.2s ease;
        }
        .tab-btn:hover::after {
          opacity: 0.06;
        }
        .tab-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 999px;
          background: var(--color-primary);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }
      `}</style>

      <div className="min-h-screen bg-[#FBFBFB]">
        {/* Hero */}
        <section className="w-full px-3 overflow-hidden">
          <div
            className="w-full h-130 sm:h-90 lg:h-100 rounded-[20px]
            bg-[url('/images/calculator.png')] bg-black/20 bg-blend-overlay bg-position-[65%] lg:bg-cover bg-no-repeat"
          >
            <div className="flex items-center h-130 sm:h-90 lg:h-100 max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">
              <div className="max-w-120 lg:max-w-160 2xl:max-w-200">
                <Display className="text-[#FBFBFB] [word-spacing:8px] leading-8 lg:leading-12 font-light mb-6">
                  <span className="font-[700]">Calculators</span>
                </Display>
                <Lead className="text-[#FBFBFB] max-w-90 2xl:max-w-110 font-extralight mb-4">
                  Estimate your borrowing power, monthly repayments, and property purchase costs instantly.
                </Lead>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Bar */}
        <div className="sticky pt-20 z-40 bg-[#FBFBFB]">
          <div className="max-w-5xl border-b border-[#9C9C9C] mx-auto flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="tab-btn py-3 px-4 text-[1rem] font-[500] transition-colors duration-200"
                style={{
                  color: active === tab.id ? "var(--color-primary)" : "#555555",
                }}
              >
                {tab.label}
                <span
                  className="tab-underline"
                  style={{
                    transform: active === tab.id ? "scaleX(1)" : "scaleX(0)",
                    opacity: active === tab.id ? 1 : 0,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Content */}
        <div className="max-w-5xl mx-auto py-10">
          <div className="tab-content" style={contentStyle}>
            {displayed === "borrowing" && <BorrowingCapacity />}
            {displayed === "repayments" && <Repayments />}
            {displayed === "property" && <PropertyFees />}
          </div>
        </div>
      </div>
    </>
  );
}