"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

// ─── EXTRA REPAYMENT SAVINGS LOGIC ────────────────────────────────────────────
// Simulates period-by-period (weekly/fortnightly/monthly) loan balance
// when extra repayment is added, until balance reaches zero.
//
function calcNewTermPeriods(
  principal: number,
  rPeriodic: number,
  basePeriodicPayment: number,
  extraPerPeriod: number,
  maxPeriods: number
): number {
  const total = basePeriodicPayment + extraPerPeriod;
  let bal = principal;
  let periods = 0;
  while (bal > 0.01 && periods < maxPeriods * 2) {
    const interest = bal * rPeriodic;
    bal -= total - interest;
    periods++;
  }
  return periods;
}

export default function Repayments() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("6.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [repaymentFreq, setRepaymentFreq] = useState("weekly");
  const [loanType, setLoanType] = useState<"principal" | "interestOnly">("principal");
  const [interestOnlyYears, setInterestOnlyYears] = useState("5");
  const [extraRepayment, setExtraRepayment] = useState("100");

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount || "0");
    const annualRate = parseFloat(interestRate || "0") / 100;
    const termYears = parseInt(loanTerm || "30");
    const extra = parseFloat(extraRepayment || "0");

    const freqPerYear = repaymentFreq === "weekly" ? 52 : repaymentFreq === "fortnightly" ? 26 : 12;
    const termMonths = termYears * 12;
    const totalPeriods = termYears * freqPerYear;
    const r = annualRate / 12;

    // ─── BASE MONTHLY REPAYMENT ─────────────────────────────────────────────
    const baseMonthly =
      r === 0
        ? principal / termMonths
        : principal * (r / (1 - Math.pow(1 + r, -termMonths)));

    // ─── PERIODIC REPAYMENT (displayed to user) ─────────────────────────────
    const periodicRepayment =
      loanType === "principal"
        ? baseMonthly * (12 / freqPerYear)
        : principal * (annualRate / freqPerYear);

    // ─── TOTALS WITHOUT EXTRA ───────────────────────────────────────────────
    const totalNoExtra = baseMonthly * termMonths;

    // ─── TOTALS WITH EXTRA — simulate period-by-period ──────────────────────
    // "Total repayments" & "Total interest" shown = WITH extra repayment
    // This matches how the reference site displays these values.
    //
    const rPeriodic = annualRate / freqPerYear;
    const basePeriodicPayment = baseMonthly * (12 / freqPerYear);

    const newPeriods = calcNewTermPeriods(
      principal,
      rPeriodic,
      basePeriodicPayment,
      extra,
      totalPeriods
    );

    // Total paid = (base + extra) × new periods
    const totalWithExtra = (basePeriodicPayment + extra) * newPeriods;
    const totalInterestWithExtra = Math.max(0, totalWithExtra - principal);

    // Saving = total_without_extra − total_with_extra
    const totalSaving = Math.max(0, totalNoExtra - totalWithExtra);

    const periodsSaved = Math.max(0, totalPeriods - newPeriods);
    const monthsSaved = Math.round(periodsSaved * 12 / freqPerYear);
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remMonthsSaved = monthsSaved % 12;

    // ─── CHART — YEARLY PRINCIPAL vs INTEREST BREAKDOWN ────────────────────
    const chartData = [];
    let balance = principal;
    const monthlyRate = annualRate / 12;
    const monthlyPayment =
      r === 0
        ? principal / termMonths
        : principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -(termYears * 12))));
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
        }
      }

      chartData.push({
        year: yr,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      periodicRepayment,
      totalWithExtra,
      totalInterestWithExtra,
      totalSaving,
      yearsSaved,
      remMonthsSaved,
      chartData,
    };
  }, [loanAmount, interestRate, loanTerm, repaymentFreq, loanType, interestOnlyYears, extraRepayment]);

  const inputCls =
    "w-full border border-[#9C9C9C] rounded-md px-3 py-2.5 text-sm text-[#555555] focus:outline-none focus:ring-2 bg-[#FBFBFB]";
  const labelCls = "text-sm font-medium mb-1 block text-gray-500";
  const freqLabel =
    repaymentFreq === "weekly" ? "weekly" : repaymentFreq === "fortnightly" ? "fortnightly" : "monthly";

  return (
    <div id="repayments" className="grid px-10 md:px-0 lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-[#FBFBFB] rounded-md shadow-lg p-6 space-y-5">
        <h2 className="text-xl text-primary">Extra repayments calculator</h2>

        <div>
          <div className="flex justify-between items-center text-sm text-[#555555]">
            <label className={labelCls}>Loan amount</label>
            <span>$</span>
          </div>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Interest rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className={inputCls}
              step="0.1"
              min="0.1"
              max="20"
            />
          </div>
          <div>
            <div className="flex justify-between items-center text-sm text-[#555555]">
              <label className={labelCls}>Loan term</label>
              <span>yrs</span>
            </div>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className={inputCls}
              min="1"
              max="30"
            />
          </div>
        </div>

        <h2 className="text-xl text-primary">Extra repayments</h2>

        <div>
          <label className={labelCls}>Repayment frequency</label>
          <select
            value={repaymentFreq}
            onChange={(e) => setRepaymentFreq(e.target.value)}
            className={inputCls}
          >
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Extra repayment amount ($)</label>
          <input
            type="number"
            value={extraRepayment}
            onChange={(e) => setExtraRepayment(e.target.value)}
            className={inputCls}
            min="0"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-[#EEF3F2] rounded-md border border-primary p-6">
          <div className="flex justify-between items-center">
            <p className="text-[1.2rem] text-[#555555] max-w-60">Your approximate repayments would be</p>
            <p className="text-4xl font-black" style={{ color: "var(--color-primary)" }}>
              {formatCurrency(results.periodicRepayment)}{" "}
              <span className="text-sm">({freqLabel})</span>
            </p>
          </div>

          <div className="border-t border-[#9C9C9C] mt-4">
            <div className="flex justify-between items-center mt-2">
              <p className="text-primary">Total repayments</p>
              <p className="text-primary font-[700] text-right">
                {formatCurrency(results.totalWithExtra)}
                <br />
                <span className="text-[#555555] font-normal text-sm">
                  ({formatCurrency(results.totalInterestWithExtra)} total interest paid)
                </span>
              </p>
            </div>

            <p className="text-primary mt-4">Extra repayments</p>

            <div className="flex justify-between items-center mt-2">
              <p className="text-[#555555]">Total saving</p>
              <p className="text-primary font-[700] text-right">
                {results.totalSaving > 0 ? formatCurrency(results.totalSaving) : "$0"}
              </p>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-[#555555]">Years saved</p>
              <p className="text-primary font-[700] text-right">
                {results.yearsSaved > 0 || results.remMonthsSaved > 0
                  ? `${results.yearsSaved}y ${results.remMonthsSaved}m`
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FBFBFB] rounded-md shadow-lg p-6">
          <h2 className="text-xl text-primary mb-4">Principal vs Interest breakdown</h2>
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
              <XAxis
                dataKey="year"
                label={{ value: "Year", position: "insideBottom", offset: -10, fontSize: 12 }}
                tick={{ fontSize: 11 }}
              />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number | undefined, name: string | undefined) => [
                  formatCurrency(v ?? 0),
                  name === "principal" ? "Principal" : "Interest",
                ]}
                labelFormatter={(l) => `Year ${l}`}
              />
              <Legend verticalAlign="top" />
              <Area type="monotone" dataKey="interest" name="interest" stroke="var(--color-secondary)" strokeWidth={2} fill="url(#secGrad)" />
              <Area type="monotone" dataKey="principal" name="principal" stroke="var(--color-primary)" strokeWidth={2} fill="url(#primGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}