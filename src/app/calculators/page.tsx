"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="py-14 px-6 text-center"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-2">
          Financial Tools
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
           Calculators
        </h1>
        <p className="text-white/80 text-base max-w-xl mx-auto">
          Estimate your borrowing power, monthly repayments, and property purchase costs instantly.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex-1 py-4 text-sm font-semibold transition-all duration-200 relative"
              style={{
                color: active === tab.id ? "var(--color-primary)" : "#6b7280",
              }}
            >
              {tab.label}
              {active === tab.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--color-primary)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {active === "borrowing" && <BorrowingCapacity />}
        {active === "repayments" && <Repayments />}
        {active === "property" && <PropertyFees />}
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          * Calculators are illustrative only and are calculated based on the accuracy of the information entered.
          They are not an offer or acceptance of loan eligibility. The figures shown do not constitute financial advice.
          Please consult a qualified finance broker for personalised advice.
        </p>
      </div>
    </div>
  );
}