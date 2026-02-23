"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const HEM_TABLE: Record<string, number> = {
  "0": 1800, "1": 2400, "2": 2900, "3": 3400, "4": 3900,
};

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

export default function BorrowingCapacity() {
  const [joint, setJoint] = useState(true);
  const [dependants, setDependants] = useState("0");
  const [interestRate, setInterestRate] = useState("6.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [incomeType, setIncomeType] = useState<"net" | "gross">("net");
  const [incomeFreq, setIncomeFreq] = useState("yearly");
  const [income, setIncome] = useState("80000");
  const [partnerIncome, setPartnerIncome] = useState("60000");
  const [otherIncome, setOtherIncome] = useState("0");
  const [expenseFreq, setExpenseFreq] = useState("monthly");
  const [living, setLiving] = useState("0");
  const [loanRepayments, setLoanRepayments] = useState("0");
  const [creditCard, setCreditCard] = useState("0");

  const freqMultiplier = (freq: string) =>
    freq === "weekly" ? 52 : freq === "fortnightly" ? 26 : 12;

  const results = useMemo(() => {
    const rate = parseFloat(interestRate) / 100;
    const term = parseInt(loanTerm);
    const assessmentRate = rate + 0.03; // 3% buffer
    const hem = HEM_TABLE[dependants] ?? 1800;

    const toAnnual = (val: string, freq: string) =>
      parseFloat(val || "0") * freqMultiplier(freq);

    let annualIncome = toAnnual(income, incomeFreq);
    if (incomeType === "gross") annualIncome *= 0.72;
    if (joint) {
      let partnerAnnual = toAnnual(partnerIncome, incomeFreq);
      if (incomeType === "gross") partnerAnnual *= 0.72;
      annualIncome += partnerAnnual;
    }
    annualIncome += toAnnual(otherIncome, incomeFreq);

    const annualExpenses =
      toAnnual(living, expenseFreq) +
      toAnnual(loanRepayments, expenseFreq) +
      parseFloat(creditCard || "0") * 0.038 * 12;

    const actualExpenses = Math.max(annualExpenses, hem * 12);
    const monthlyNDI = (annualIncome - actualExpenses) / 12;

    const monthlyRate = assessmentRate / 12;
    const n = term * 12;
    const borrowing = monthlyNDI * ((1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate);

    const actualMonthlyRate = rate / 12;
    const monthlyRepayment = borrowing * (actualMonthlyRate / (1 - Math.pow(1 + actualMonthlyRate, -n)));

    // Chart data — remaining balance over years
    const chartData = [];
    let balance = borrowing;
    for (let yr = 0; yr <= term; yr++) {
      chartData.push({ year: yr, balance: Math.max(0, Math.round(balance)) });
      for (let m = 0; m < 12; m++) {
        const interest = balance * actualMonthlyRate;
        balance -= monthlyRepayment - interest;
      }
    }

    return {
      borrowing: Math.max(0, borrowing),
      monthlyRepayment: Math.max(0, monthlyRepayment),
      hem,
      chartData,
    };
  }, [joint, dependants, interestRate, loanTerm, incomeType, incomeFreq, income,
    partnerIncome, otherIncome, expenseFreq, living, loanRepayments, creditCard]);

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white";
  const labelCls = "text-sm font-medium mb-1 block";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left — Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="text-xl font-black" style={{ color: "var(--color-primary)" }}>
          How much can I borrow?
        </h2>

        {/* Joint */}
        <div>
          <label className={labelCls} style={{ color: "var(--color-primary)" }}>Joint application</label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  checked={opt === "Yes" ? joint : !joint}
                  onChange={() => setJoint(opt === "Yes")}
                  className="accent-purple-700"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Dependants */}
        <div>
          <label className={labelCls} style={{ color: "var(--color-primary)" }}>No. of dependants</label>
          <select value={dependants} onChange={(e) => setDependants(e.target.value)} className={inputCls}>
            {["0", "1", "2", "3", "4"].map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>

        {/* Loan Details */}
        <div className="border-t pt-4">
          <p className="font-bold text-sm mb-3" style={{ color: "var(--color-primary)" }}>Loan details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls + " text-gray-500"}>Interest rate (%)*</label>
              <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className={inputCls} step="0.1" min="1" max="20" />
            </div>
            <div>
              <label className={labelCls + " text-gray-500"}>Loan term (yrs)*</label>
              <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className={inputCls} min="1" max="30" />
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>Income</p>
            <div className="flex gap-3">
              {["net", "gross"].map((t) => (
                <label key={t} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer capitalize">
                  <input type="radio" checked={incomeType === t} onChange={() => setIncomeType(t as "net" | "gross")} className="accent-purple-700" />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className={labelCls + " text-gray-500"}>Frequency</label>
            <select value={incomeFreq} onChange={(e) => setIncomeFreq(e.target.value)} className={inputCls}>
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="space-y-2">
            <div>
              <label className={labelCls + " text-gray-500"}>Your net income*</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className={inputCls + " pl-7"} />
              </div>
            </div>
            {joint && (
              <div>
                <label className={labelCls + " text-gray-500"}>Partner&apos;s net income</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} className={inputCls + " pl-7"} />
                </div>
              </div>
            )}
            <div>
              <label className={labelCls + " text-gray-500"}>Other net income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} className={inputCls + " pl-7"} />
              </div>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="border-t pt-4">
          <p className="font-bold text-sm mb-3" style={{ color: "var(--color-primary)" }}>Expenses</p>
          <div className="mb-3">
            <label className={labelCls + " text-gray-500"}>Frequency</label>
            <select value={expenseFreq} onChange={(e) => setExpenseFreq(e.target.value)} className={inputCls}>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="space-y-2">
            {[
              { label: "Living expenses", val: living, set: setLiving },
              { label: "Loan repayments", val: loanRepayments, set: setLoanRepayments },
              { label: "Credit card limit", val: creditCard, set: setCreditCard },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className={labelCls + " text-gray-500"}>{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" value={val} onChange={(e) => set(e.target.value)} className={inputCls + " pl-7"} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-500">Living expenses (HEM)</span>
            <span className="text-sm font-semibold text-gray-700">${results.hem.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Right — Results */}
      <div className="space-y-4">
        {/* Result Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">You can borrow up to approximately</p>
            <p className="text-3xl font-black" style={{ color: "var(--color-primary)" }}>
              {formatCurrency(results.borrowing)}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">Your monthly repayments would be</p>
            <p className="text-3xl font-black" style={{ color: "var(--color-secondary)" }}>
              {formatCurrency(results.monthlyRepayment)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-500 mb-4">Loan balance over time</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={results.chartData} margin={{ top: 5, right: 10, bottom: 20, left: 10 }}>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10, fontSize: 12 }} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number | undefined) => [formatCurrency(v ?? 0), "Balance"]} labelFormatter={(l) => `Year ${l}`} />
              <Area type="monotone" dataKey="balance" stroke="var(--color-primary)" strokeWidth={2} fill="url(#purpleGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CTA */}
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