"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

function calcNewTermMonths(principal: number, annualRate: number, baseMonthly: number, monthlyExtra: number): number {
  const r = annualRate / 12;
  if (r === 0) return principal > 0 ? Math.ceil(principal / (baseMonthly + monthlyExtra)) : 0;
  let bal = principal;
  let months = 0;
  const totalPayment = baseMonthly + monthlyExtra;
  while (bal > 0.01 && months < 600) {
    const interest = bal * r;
    bal -= (totalPayment - interest);
    months++;
  }
  return months;
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
    const r = annualRate / 12;

    // Base monthly repayment
    const baseMonthly = r === 0
      ? principal / termMonths
      : principal * (r / (1 - Math.pow(1 + r, -termMonths)));

    const periodicRepayment = loanType === "principal"
      ? baseMonthly * (12 / freqPerYear)
      : principal * (annualRate / freqPerYear);

    // Without extra
    const totalNoExtra = baseMonthly * termMonths;
    const totalInterestNoExtra = totalNoExtra - principal;

    // Monthly equivalent of extra repayment at chosen frequency
    const monthlyExtra = (extra * freqPerYear) / 12;

    // New term with extra repayments
    const newMonths = calcNewTermMonths(principal, annualRate, baseMonthly, monthlyExtra);
    const totalWithExtra = (baseMonthly + monthlyExtra) * newMonths;

    const totalSaving = Math.max(0, totalNoExtra - totalWithExtra);
    const monthsSaved = Math.max(0, termMonths - newMonths);
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remMonthsSaved = monthsSaved % 12;

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
          balance -= 0;
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
      totalNoExtra,
      totalInterestNoExtra,
      totalSaving,
      yearsSaved,
      remMonthsSaved,
      chartData,
    };
  }, [loanAmount, interestRate, loanTerm, repaymentFreq, loanType, interestOnlyYears, extraRepayment]);

  const inputCls = "w-full border border-[#9C9C9C] rounded-md px-3 py-2.5 text-sm   text-[#555555] focus:outline-none focus:ring-2 bg-[#FBFBFB]";
  const labelCls = "text-sm font-medium mb-1 block text-gray-500";

  const freqLabel = repaymentFreq === "weekly" ? "weekly" : repaymentFreq === "fortnightly" ? "fortnightly" : "monthly";

  return (
    <div id="repayments" className="grid lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-[#FBFBFB] rounded-md  h-117.5  shadow-lg p-6 space-y-5">
        <h2 className="text-xl  text-primary ">
        Extra repayments calculator
        </h2>

        <div>
          <div className="flex justify-between items-center text-sm   text-[#555555] " ><label className={labelCls}>Loan amount </label> <span>$</span></div>
          <div className="relative">
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className={inputCls + ""} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex justify-between items-center text-sm   text-[#555555] " ><label className={labelCls}>Loan term  </label><span>yrs</span></div>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className={inputCls} min="1" max="30" />
          </div>
        </div>

        <h2 className="text-xl  text-primary ">
        Extra repayments
        </h2>

        <div>
          <label className={labelCls}>Repayment frequency</label>
          <select value={repaymentFreq} onChange={(e) => setRepaymentFreq(e.target.value)} className={inputCls}>
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Extra repayment</label>
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
        <div className="bg-[#EEF3F2] rounded-md border border-primary  p-6 ">
          <div className="flex justify-between items-center " >
          <p className="text-[1.2rem] text-[#555555] max-w-60 ">Your approximate repayments would be</p>
          <p className="text-4xl font-black" style={{ color: "var(--color-primary)" }}>
            {formatCurrency(results.periodicRepayment)} <span className="text-sm" >({freqLabel})</span>
          </p>
          </div>
          <div className=" border-t border-[#9C9C9C] mt-4 " >

            <div className="flex justify-between items-center mt-2  " >
              <p className=" text-primary  " >Total repayments</p>
              <p className="text-primary  font-[700] text-right " >{formatCurrency(results.totalNoExtra)} <br />
                <span className="text-[#555555] font-normal text-sm " >({formatCurrency(results.totalInterestNoExtra)} total interest paid)</span>
              </p>
            </div>

            <p className=" text-primary mt-4 " >Extra repayments</p>

            <div className="flex justify-between items-center mt-2  " >
              <p className=" text-[#555555]  " >Total saving</p>
              <p className="text-primary  font-[700] text-right " >
                {results.totalSaving > 0 ? formatCurrency(results.totalSaving) : "$0"}
              </p>
            </div>

            <div className="flex justify-between items-center mt-2  " >
              <p className=" text-[#555555]  " >Years saved</p>
              <p className="text-primary  font-[700] text-right " >
                {results.yearsSaved > 0 || results.remMonthsSaved > 0
                  ? `${results.yearsSaved}y ${results.remMonthsSaved}m`
                  : "—"}
              </p>
            </div>

          </div>
        </div>

        <div className="bg-[#FBFBFB] rounded-md  shadow-lg p-6">
          <h2 className="text-xl  text-primary mb-4">Principal vs Interest breakdown</h2>
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
      </div>
    </div>
  );
}