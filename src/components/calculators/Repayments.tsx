"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

export default function Repayments() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("6.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [repaymentFreq, setRepaymentFreq] = useState("monthly");
  const [loanType, setLoanType] = useState<"principal" | "interestOnly">("principal");
  const [interestOnlyYears, setInterestOnlyYears] = useState("5");

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount || "0");
    const annualRate = parseFloat(interestRate || "0") / 100;
    const termYears = parseInt(loanTerm || "30");

    const freqPerYear = repaymentFreq === "weekly" ? 52 : repaymentFreq === "fortnightly" ? 26 : 12;
    const periodRate = annualRate / freqPerYear;
    const n = termYears * freqPerYear;

    let periodicRepayment = 0;
    if (loanType === "principal") {
      periodicRepayment = principal * (periodRate / (1 - Math.pow(1 + periodRate, -n)));
    } else {
      periodicRepayment = principal * periodRate; // interest only
    }

    const totalRepaid = periodicRepayment * n;
    const totalInterest = totalRepaid - principal;

    // Chart — yearly breakdown
    const chartData = [];
    let balance = principal;
    const monthlyRate = annualRate / 12;
    const monthlyPayment = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -(termYears * 12))));
    const ioMonths = parseInt(interestOnlyYears) * 12;

    for (let yr = 1; yr <= termYears; yr++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      const isIO = loanType === "interestOnly" && yr * 12 <= ioMonths;

      for (let m = 0; m < 12; m++) {
        if (balance <= 0) break;
        const interest = balance * monthlyRate;
        yearInterest += interest;
        if (!isIO) {
          const prin = monthlyPayment - interest;
          yearPrincipal += Math.min(prin, balance);
          balance -= prin;
        } else {
          balance -= 0; // interest only
        }
      }
      chartData.push({
        year: yr,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return { periodicRepayment, totalRepaid, totalInterest, chartData };
  }, [loanAmount, interestRate, loanTerm, repaymentFreq, loanType, interestOnlyYears]);

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white";
  const labelCls = "text-sm font-medium mb-1 block text-gray-500";

  const freqLabel = repaymentFreq === "weekly" ? "weekly" : repaymentFreq === "fortnightly" ? "fortnightly" : "monthly";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="text-xl font-black" style={{ color: "var(--color-primary)" }}>
          What are my repayments?
        </h2>

        <div>
          <label className={labelCls}>Loan amount*</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className={inputCls + " pl-7"} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Interest rate (%)*</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className={inputCls} step="0.1" />
          </div>
          <div>
            <label className={labelCls}>Loan term (yrs)*</label>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className={inputCls} min="1" max="30" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Repayment frequency</label>
          <select value={repaymentFreq} onChange={(e) => setRepaymentFreq(e.target.value)} className={inputCls}>
            <option value="monthly">Monthly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="border-t pt-4">
          <p className="font-bold text-sm mb-3" style={{ color: "var(--color-primary)" }}>Loan type</p>
          <div className="flex gap-4 mb-3">
            {[
              { val: "principal", label: "Principal & Interest" },
              { val: "interestOnly", label: "Interest Only" },
            ].map(({ val, label }) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" checked={loanType === val} onChange={() => setLoanType(val as "principal" | "interestOnly")} className="accent-purple-700" />
                {label}
              </label>
            ))}
          </div>
          {loanType === "interestOnly" && (
            <div>
              <label className={labelCls}>Interest only period (yrs)</label>
              <select value={interestOnlyYears} onChange={(e) => setInterestOnlyYears(e.target.value)} className={inputCls}>
                {["1","2","3","4","5","7","10"].map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total amount repaid</span>
            <span className="font-semibold text-gray-800">{formatCurrency(results.totalRepaid)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total interest paid</span>
            <span className="font-semibold" style={{ color: "var(--color-secondary)" }}>{formatCurrency(results.totalInterest)}</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-sm text-gray-400 mb-1">Your {freqLabel} repayments</p>
          <p className="text-4xl font-black" style={{ color: "var(--color-primary)" }}>
            {formatCurrency(results.periodicRepayment)}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-500 mb-4">Principal vs Interest breakdown</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={results.chartData} margin={{ top: 5, right: 10, bottom: 20, left: 10 }}>
              <defs>
                <linearGradient id="primGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10, fontSize: 12 }} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number | undefined, name: string | undefined) => [formatCurrency(v ?? 0), name === "principal" ? "Principal" : "Interest"]} labelFormatter={(l) => `Year ${l}`} />
              <Legend verticalAlign="top" />
              <Area type="monotone" dataKey="interest" name="interest" stroke="var(--color-secondary)" strokeWidth={2} fill="url(#secGrad)" />
              <Area type="monotone" dataKey="principal" name="principal" stroke="var(--color-primary)" strokeWidth={2} fill="url(#primGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <a
          href="/apply-now"
          className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        >
          Apply Now — Get Pre-Approved
        </a>
      </div>
    </div>
  );
}