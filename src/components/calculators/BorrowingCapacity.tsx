"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ─── HEM FORMULA (CapitalEx reverse engineered) ───────────────────────────────
function calculateHEM(
  netAnnualIncome: number,
  joint: boolean,
  dependants: string,
  incomeFreq: string
): number {
  const dep = parseInt(dependants);
  const isYearly = incomeFreq === "yearly";

  const BASE = joint
    ? (isYearly ? 1320.16 : 902.16)
    : (isYearly ?  402.07 : -15.93);

  const INCOME_FACTOR = 0.022099;

  const DEP_EXTRA_SOLO  = [0, 442, 929, 1416, 1903];
  const DEP_EXTRA_JOINT = [0, 399, 706,  950, 1195];
  const depExtra = joint
    ? (DEP_EXTRA_JOINT[dep] ?? 1195)
    : (DEP_EXTRA_SOLO[dep]  ?? 1903);

  return Math.round(BASE + netAnnualIncome * INCOME_FACTOR + depExtra);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

function freqMultiplier(freq: string): number {
  if (freq === "weekly")      return 52;
  if (freq === "fortnightly") return 26;
  if (freq === "monthly")     return 12;
  return 1;
}

const PRIMARY = "#00674E";

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BorrowingCapacity() {
  const [state,          setState]          = useState("NSW");
  const [joint,          setJoint]          = useState(true);
  const [dependants,     setDependants]     = useState("0");
  const [interestRate,   setInterestRate]   = useState("6.0");
  const [loanTerm,       setLoanTerm]       = useState("30");
  const [incomeType,     setIncomeType]     = useState<"net" | "gross">("net");
  const [incomeFreq,     setIncomeFreq]     = useState("yearly");
  const [income,         setIncome]         = useState("50000");
  const [partnerIncome,  setPartnerIncome]  = useState("40000");
  const [otherIncome,    setOtherIncome]    = useState("0");
  const [expenseFreq,    setExpenseFreq]    = useState("monthly");
  const [living,         setLiving]         = useState("0");
  const [loanRepayments, setLoanRepayments] = useState("0");
  const [creditCard,     setCreditCard]     = useState("0");

  const results = useMemo(() => {
    const rate = parseFloat(interestRate) / 100;
    const term = parseInt(loanTerm);
    const assessmentRate = rate + 0.03;

    // ── 1. Income → Net Annual ──
    const toAnnual = (val: string, freq: string) =>
      parseFloat(val || "0") * freqMultiplier(freq);

    let annualIncome = toAnnual(income, incomeFreq);
    if (incomeType === "gross") annualIncome *= 0.865;

    if (joint) {
      let partnerAnnual = toAnnual(partnerIncome, incomeFreq);
      if (incomeType === "gross") partnerAnnual *= 0.72;
      annualIncome += partnerAnnual;
    }
    annualIncome += toAnnual(otherIncome, incomeFreq);

    // ── 2. HEM (formula-based) ──
    const hem = calculateHEM(annualIncome, joint, dependants, incomeFreq);

    // ── 3. Expenses ──
    const annualExpenses =
      toAnnual(living,         expenseFreq) +
      toAnnual(loanRepayments, expenseFreq) +
      parseFloat(creditCard || "0") * 0.038 * 12;

    const actualExpenses = Math.max(annualExpenses, hem * 12);

    // ── 4. Monthly NDI ──
    const monthlyNDI = (annualIncome - actualExpenses) / 12;

    // ── 5. Borrowing (assessment rate) ──
    const r = assessmentRate / 12;
    const n = term * 12;
    const borrowing = Math.max(
      0,
      monthlyNDI * ((1 - Math.pow(1 + r, -n)) / r)
    );

    // ── 6. Monthly Repayment (actual rate) ──
    const ar = rate / 12;
    const monthlyRepayment = Math.max(
      0,
      borrowing * (ar / (1 - Math.pow(1 + ar, -n)))
    );

    // ── 7. Chart data ──
    const chartData: { year: number; balance: number }[] = [];
    let balance = borrowing;
    for (let yr = 0; yr <= term; yr++) {
      chartData.push({ year: yr, balance: Math.max(0, Math.round(balance)) });
      for (let m = 0; m < 12; m++) {
        const interest = balance * ar;
        balance -= monthlyRepayment - interest;
      }
    }

    return {
      borrowing,
      monthlyRepayment,
      hem,
      annualIncome,
      actualExpenses,
      monthlyNDI,
      assessmentRate: assessmentRate * 100,
      chartData,
    };
  }, [
    joint, state, dependants, interestRate, loanTerm,
    incomeType, incomeFreq, income, partnerIncome, otherIncome,
    expenseFreq, living, loanRepayments, creditCard,
  ]);

  const inputCls  = "w-full border border-[#9C9C9C] rounded-[12px] px-3 py-2.5 text-sm text-[#9C9C9C] font-[400] focus:outline-none bg-[#FBFBFB]";
  const selectCls = inputCls + " pr-10";
  const labelCls  = "text-sm mb-1 block";

  return (
    <div id="BorrowingCapacity" className="grid px-10 md:px-0 lg:grid-cols-2 gap-6">

      {/* ── LEFT: Inputs ── */}
      <div className="bg-[#FBFBFB] rounded-2xl shadow-lg p-6 space-y-5">
        <h2 className="text-xl font-black text-primary">How much can I borrow?</h2>

        {/* Joint application */}
        <div className="flex justify-between text-[#555555] align-middle">
          <label className={labelCls}>Joint application</label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-[#555555]">
                <input
                  type="radio"
                  checked={opt === "Yes" ? joint : !joint}
                  onChange={() => setJoint(opt === "Yes")}
                  style={{ accentColor: PRIMARY }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Dependants */}
        <div className="text-[#555555]">
          <label className={labelCls}>No. of dependants</label>
          <select
            value={dependants}
            onChange={(e) => setDependants(e.target.value)}
            className={selectCls}
          >
            {["0", "1", "2", "3", "4"].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Loan Details */}
        <div className="border-t text-[#555555] border-[#9C9C9C] pt-4">
          <h2 className="text-xl mb-3 font-black text-primary">Loan details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>
                Interest rate <span className="text-[#DA5400]">*</span>
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className={inputCls}
                step="0.1" min="1" max="20"
              />
            </div>
            <div>
              <label className={labelCls}>
                Loan term (years) <span className="text-[#DA5400]">*</span>
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className={inputCls}
                min="1" max="40"
              />
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="border-t text-[#555555] border-[#9C9C9C] pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-primary">Income</h2>
            <div className="flex gap-3">
              {["net", "gross"].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-1.5 text-sm text-[#555555] cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={incomeType === t}
                    onChange={() => setIncomeType(t as "net" | "gross")}
                    style={{ accentColor: PRIMARY }}
                  />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className={labelCls}>Frequency</label>
            <select
              value={incomeFreq}
              onChange={(e) => setIncomeFreq(e.target.value)}
              className={selectCls}
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <label className={labelCls}>
                  Your {incomeType} income <span className="text-[#DA5400]">*</span>
                </label>
                <span className="text-sm">$</span>
              </div>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className={inputCls}
              />
            </div>

            {joint && (
              <div>
                <div className="flex justify-between">
                  <label className={labelCls}>
                    Partner&apos;s {incomeType} income <span className="text-[#DA5400]">*</span>
                  </label>
                  <span className="text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={partnerIncome}
                  onChange={(e) => setPartnerIncome(e.target.value)}
                  className={inputCls}
                />
              </div>
            )}

            <div>
              <div className="flex justify-between">
                <label className={labelCls}>Other {incomeType} income</label>
                <span className="text-sm">$</span>
              </div>
              <input
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="border-t text-[#555555] border-[#9C9C9C] pt-4">
          <h2 className="text-xl mb-3 font-black text-primary">Expenses</h2>
          <div className="grid grid-cols-2 mb-3 gap-3">
            <div>
              <label className={labelCls}>State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={selectCls}
              >
                {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Frequency</label>
              <select
                value={expenseFreq}
                onChange={(e) => setExpenseFreq(e.target.value)}
                className={selectCls}
              >
                <option value="monthly">Monthly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Living expenses",   val: living,         set: setLiving },
              { label: "Loan repayments",   val: loanRepayments, set: setLoanRepayments },
              { label: "Credit card limit", val: creditCard,     set: setCreditCard },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className={`${labelCls} text-[#555555] flex justify-between`}>
                  {label} <span>$</span>
                </label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className={inputCls}
                />
              </div>
            ))}
          </div>

          {/* HEM Display */}
          <div className="mt-5 border-b border-[#9C9C9C]" />
          <div className="mt-5 flex items-center justify-between bg-[#DDDDDD] rounded-md px-3 py-3">
            <span className="text-sm text-[#555555]">Living expenses (HEM benchmark)</span>
            <span className="text-sm font-semibold text-[#555555]">
              {(results.hem)}
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Results ── */}
      <div className="space-y-4">

        {/* Result Summary */}
        <div className="grid border px-5 py-5 rounded-md border-primary grid-cols-1 bg-[#EEF3F2] gap-4">
          <div className="flex justify-between items-center">
            <p className="text-[1rem] max-w-60 text-[#555555] mb-1">
              You can borrow up to approximately
            </p>
            <p className="text-[2rem] font-[500] text-primary">
              {formatCurrency(results.borrowing)}
            </p>
          </div>
          <div className="border-b border-primary" />
          <div className="flex justify-between items-center">
            <p className="text-[1rem] max-w-45 text-[#555555] mb-1">
              Your monthly repayments would be
            </p>
            <p className="text-[2rem] font-[500] text-primary">
              {formatCurrency(results.monthlyRepayment)}
            </p>
          </div>
        </div>

        {/* Calculation Breakdown */}
        {/* <div className="bg-[#FBFBFB] rounded-md shadow-lg p-5 space-y-2">
          <h2 className="text-xl mb-3 font-black text-primary">How it&apos;s calculated</h2>
          {[
            {
              title: "Assessment rate",
              value: `${results.assessmentRate.toFixed(2)}%`,
              sub: `${interestRate}% actual + 3% RBA buffer`,
            },
            {
              title: "Total net annual income",
              value: formatCurrency(results.annualIncome),
              sub: incomeType === "gross"
                ? "Primary ×86.5%, Partner ×72% (gross→net)"
                : "Net income — no shading applied",
            },
            {
              title: "HEM benchmark (monthly)",
              value: formatCurrency(results.hem) + "/mo",
              sub: `Formula: BASE + income×2.21% + dep extra | ${joint ? "Joint" : "Solo"} | ${incomeFreq} | dep: ${dependants}`,
            },
            {
              title: "Actual expenses used by lender",
              value: formatCurrency(results.actualExpenses),
              sub: "MAX(declared expenses, HEM × 12)",
            },
            {
              title: "Monthly net disposable income",
              value: `${formatCurrency(results.monthlyNDI)}/mo`,
              sub: "(Net income − Actual expenses) ÷ 12",
            },
          ].map(({ title, value, sub }) => (
            <div key={title} className="bg-[#EEF3F2] rounded-md px-4 py-3">
              <p className="text-xs text-[#888] uppercase tracking-wide mb-1">{title}</p>
              <p className="text-base font-medium text-primary">{value}</p>
              <p className="text-xs text-[#888] mt-0.5">{sub}</p>
            </div>
          ))}
        </div> */}

        {/* Chart */}
        <div className="bg-[#FBFBFB] rounded-md shadow-lg p-5">
          <h2 className="text-xl mb-10 font-black text-primary">Loan balance over time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={results.chartData}
              margin={{ top: 5, right: 10, bottom: 20, left: 10 }}
            >
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={PRIMARY} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={PRIMARY} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                label={{ value: "Year", position: "insideBottom", offset: -10, fontSize: 12 }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(v: number | undefined) => [formatCurrency(v ?? 0), "Balance"]}
                labelFormatter={(l) => `Year ${l}`}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke={PRIMARY}
                strokeWidth={2}
                fill="url(#greenGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}