"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const HEM_TABLE: Record<string, Record<string, number>> = {
  NSW: { "0": 2100, "1": 2700, "2": 3200, "3": 3700, "4": 4200 },
  VIC: { "0": 2000, "1": 2600, "2": 3100, "3": 3600, "4": 4100 },
  QLD: { "0": 1900, "1": 2500, "2": 3000, "3": 3500, "4": 4000 },
  WA:  { "0": 1950, "1": 2550, "2": 3050, "3": 3550, "4": 4050 },
  SA:  { "0": 1850, "1": 2450, "2": 2950, "3": 3450, "4": 3950 },
  TAS: { "0": 1800, "1": 2400, "2": 2900, "3": 3400, "4": 3900 },
  ACT: { "0": 2200, "1": 2800, "2": 3300, "3": 3800, "4": 4300 },
  NT:  { "0": 1800, "1": 2400, "2": 2900, "3": 3400, "4": 3900 },
};

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}
const PRIMARY     = "#00674E"; 

export default function BorrowingCapacity() {
  const [state, setState] = useState("NSW"); 
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
    const hem = HEM_TABLE[state]?.[dependants] ?? 1800;

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
  }, [joint, state, dependants, interestRate, loanTerm, incomeType, incomeFreq, income,
    partnerIncome, otherIncome, expenseFreq, living, loanRepayments, creditCard]);

  const inputCls = "w-full  border border-[#9C9C9C] rounded-[12px] px-3 py-2.5 text-sm text-[#555555] focus:outline-none focus:ring-2 bg-[#FBFBFB]";
  const selectCls = inputCls + " pr-10";
  const labelCls = "text-sm  mb-1 block";

  return (
    <div id="BorrowingCapacity" className="grid  lg:grid-cols-2 gap-6">
      {/* Left — Form */}
      <div className="bg-[#FBFBFB] rounded-2xl  shadow-lg p-6 space-y-5">
        <h2 className="text-xl font-black text-primary " >
          How much can I borrow?
        </h2>

        {/* Joint */}
        <div className="flex justify-between text-[#555555] align-middle " >
          <label className={labelCls + "tex-[#555555]" } >Joint application</label>
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
        <div>
          <label className={labelCls + "tex-[#555555]" } >No. of dependants</label>
          <select value={dependants} onChange={(e) => setDependants(e.target.value)} className={selectCls}>
            {["0", "1", "2", "3", "4"].map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>

        {/* Loan Details */}
        <div className="border-t border-[#9C9C9C] pt-4">
          <h2 className="text-xl mb-3 font-black text-primary " >
          Loan details
        </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls + " tex-[#555555]"}>Interest rate (%)*</label>
              <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className={inputCls} step="0.1" min="1" max="20" />
            </div>
            <div>
              <label className={labelCls + " tex-[#555555]"}>Loan term (yrs)*</label>
              <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className={inputCls} min="1" max="30" />
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="border-t border-[#9C9C9C] pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl mb-3 font-black text-primary " >
         Income
        </h2>
            
            <div className="flex gap-3">
              {["net", "gross"].map((t) => (
                <label key={t} className="flex items-center gap-1.5 text-sm tex-[#555555] cursor-pointer capitalize">
                  <input type="radio" checked={incomeType === t} onChange={() => setIncomeType(t as "net" | "gross")} className="accent-primary" />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className={labelCls + " tex-[#555555]"}>Frequency</label>
            <select value={incomeFreq} onChange={(e) => setIncomeFreq(e.target.value)} className={inputCls}>
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between " >
                <label className={labelCls + " tex-[#555555]"}>Your net income <span className="text-[#DA5400]" >*</span>  </label>
                <span className="tex-[#555555] tex-sm " >$</span>
              </div>
              <div className="relative">
                
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className={inputCls + " "} />
              </div>
            </div>
            {joint && (
              <div>
                <div className="flex justify-between " >
                <label className={labelCls + " tex-[#555555]"}>Partner&apos;s net income <span className="text-[#DA5400]" >*</span>  </label>
                <span className="tex-[#555555]" >$</span>
              </div>
                
                <div className="relative">
                 
                  <input type="number" value={partnerIncome} onChange={(e) => setPartnerIncome(e.target.value)} className={inputCls + " "} />
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between " >
                <label className={labelCls + " tex-[#555555]"}>Other net income<span className="text-[#DA5400]" >*</span>  </label>
                <span className="tex-[#555555]" >$</span>
              </div>
              
              <div className="relative">
                
                <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} className={inputCls + " "} />
              </div>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="border-t border-[#9C9C9C] pt-4">
          <h2 className="text-xl mb-3 font-black text-primary " >
        Expenses
        </h2>
          {/* State */}
         <div className="grid grid-cols-2 mb-3 gap-3">
  <div>
    <label className={labelCls + "tex-[#555555]" } >State</label>
    <select
      value={state}
      onChange={(e) => setState(e.target.value)}
      className={selectCls}
    >
      {["NSW","VIC","QLD","WA","SA","TAS","ACT","NT"].map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  </div>
  <div>
    <label className={labelCls + " tex-[#555555]"}>Frequency</label>
    <select value={expenseFreq} onChange={(e) => setExpenseFreq(e.target.value)} className={selectCls}>
      <option value="monthly">Monthly</option>
      <option value="fortnightly">Fortnightly</option>
      <option value="weekly">Weekly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>
</div>

          <div className="space-y-2  ">
            {[
              { label: "Living expenses", val: living, set: setLiving },
              { label: "Loan repayments", val: loanRepayments, set: setLoanRepayments },
              { label: "Credit card limit", val: creditCard, set: setCreditCard },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className={labelCls + " text-[#555555] flex justify-between "}>{label} <span>$</span> </label>
                <div className="relative">
                
                  <input type="number" value={val} onChange={(e) => set(e.target.value)} className={inputCls + "tex-[#555555]"} />
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-5 border-b border-[#9C9C9C]"></div>
          <div className="mt-5 flex items-center justify-between bg-[#DDDDDD] rounded-md px-3 py-3">
            <span className="text-sm text-[#555555]">Living expenses (HEM)</span>
            <span className="text-sm font-semibold text-[#555555]">{results.hem.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Right — Results */}
      <div className="space-y-4">
        {/* Result Cards */}
        <div className="grid border px-5 py-5  rounded-md  align-middle border-primary grid-cols-1 bg-[#EEF3F2] gap-4">
          <div className=" flex justify-between items-center    ">
            <p className="text-[1.1rem] max-w-60 text-[#555555] mb-1">You can borrow up to approximately</p>
            <p className="text-[2rem] font-[500] text-primary">
              {formatCurrency(results.borrowing)}
            </p>
          </div>
          <div className="border-b  border-primary  px-10 " ></div>
          <div className=" flex justify-between  items-center  ">
            <p className="text-[1.1rem] max-w-50 text-[#555555] mb-1">Your monthly repayments would be</p>
            <p className="text-[2rem] font-[500] text-primary" >
              {formatCurrency(results.monthlyRepayment)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#FBFBFB] rounded-md shadow-lg p-5">
          <h2 className="text-xl mb-10 font-black text-primary " >
       Loan balance over time 
        </h2>
          
          <ResponsiveContainer width="100%" height={340}>
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

       
      </div>
    </div>
  );
}