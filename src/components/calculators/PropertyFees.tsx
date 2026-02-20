"use client";

import { useState, useMemo } from "react";

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

// Stamp duty thresholds per state (simplified, illustrative)
const STAMP_DUTY: Record<string, (price: number, fhb: boolean) => number> = {
  VIC: (price, fhb) => {
    if (fhb && price <= 600000) return 0;
    if (fhb && price <= 750000) {
      const full = calcVicDuty(price);
      const concession = full * ((750000 - price) / 150000);
      return full - concession;
    }
    return calcVicDuty(price);
  },
  NSW: (price, fhb) => {
    if (fhb && price <= 800000) return 0;
    if (price <= 14000) return price * 0.0125;
    if (price <= 30000) return 175 + (price - 14000) * 0.015;
    if (price <= 80000) return 415 + (price - 30000) * 0.0175;
    if (price <= 300000) return 1290 + (price - 80000) * 0.035;
    if (price <= 1000000) return 8990 + (price - 300000) * 0.045;
    if (price <= 3000000) return 40490 + (price - 1000000) * 0.055;
    return 150490 + (price - 3000000) * 0.07;
  },
  QLD: (price, fhb) => {
    if (fhb && price <= 550000) return 0;
    if (price <= 5000) return 0;
    if (price <= 75000) return (price - 5000) * 0.015;
    if (price <= 540000) return 1050 + (price - 75000) * 0.035;
    if (price <= 1000000) return 17325 + (price - 540000) * 0.045;
    return 38025 + (price - 1000000) * 0.0575;
  },
  WA: (price, fhb) => {
    if (fhb && price <= 430000) return 0;
    if (price <= 120000) return price * 0.019;
    if (price <= 150000) return 2280 + (price - 120000) * 0.0285;
    if (price <= 360000) return 3135 + (price - 150000) * 0.03;
    if (price <= 725000) return 9435 + (price - 360000) * 0.05;
    return 27685 + (price - 725000) * 0.051;
  },
  SA: (price) => {
    if (price <= 12000) return price * 0.01;
    if (price <= 30000) return 120 + (price - 12000) * 0.02;
    if (price <= 50000) return 480 + (price - 30000) * 0.03;
    if (price <= 100000) return 1080 + (price - 50000) * 0.035;
    if (price <= 200000) return 2830 + (price - 100000) * 0.04;
    if (price <= 250000) return 6830 + (price - 200000) * 0.0425;
    if (price <= 300000) return 8955 + (price - 250000) * 0.0475;
    if (price <= 500000) return 11330 + (price - 300000) * 0.05;
    return 21330 + (price - 500000) * 0.055;
  },
  ACT: (price) => {
    if (price <= 200000) return price * 0.006;
    if (price <= 300000) return 1200 + (price - 200000) * 0.023;
    if (price <= 500000) return 3500 + (price - 300000) * 0.028;
    if (price <= 750000) return 9100 + (price - 500000) * 0.038;
    if (price <= 1000000) return 18600 + (price - 750000) * 0.044;
    if (price <= 1455000) return 29600 + (price - 1000000) * 0.055;
    return 54625 + (price - 1455000) * 0.065;
  },
  TAS: (price) => {
    if (price <= 3000) return price * 0.01;
    if (price <= 25000) return 30 + (price - 3000) * 0.015;
    if (price <= 75000) return 360 + (price - 25000) * 0.0225;
    if (price <= 200000) return 1485 + (price - 75000) * 0.035;
    if (price <= 375000) return 5860 + (price - 200000) * 0.04;
    if (price <= 725000) return 12860 + (price - 375000) * 0.0425;
    return 27735 + (price - 725000) * 0.045;
  },
  NT: (price) => {
    const v = price / 1000;
    if (v <= 525) return Math.max(0, (0.06571441 * v * v + 15 * v) - 12000) * 0.01;
    return price * 0.049;
  },
};

function calcVicDuty(price: number) {
  if (price <= 25000) return price * 0.014;
  if (price <= 130000) return 350 + (price - 25000) * 0.024;
  if (price <= 440000) return 2870 + (price - 130000) * 0.05;
  if (price <= 550000) return 18370 + (price - 440000) * 0.06;
  if (price <= 960000) return 28970 + (price - 550000) * 0.06;
  if (price < 2000000) return 55000 + (price - 960000) * 0.055;
  return price * 0.065;
}

const FEE_ITEMS = [
  { key: "conveyancing", label: "Conveyancing / Legal fees", defaultVal: 2000 },
  { key: "building", label: "Building & pest inspection", defaultVal: 600 },
  { key: "lmi", label: "Lenders Mortgage Insurance (LMI)", defaultVal: 0 },
  { key: "other", label: "Other costs", defaultVal: 500 },
];

export default function PropertyFees() {
  const [price, setPrice] = useState("650000");
  const [state, setState] = useState("VIC");
  const [fhb, setFhb] = useState(false);
  const [deposit, setDeposit] = useState("20");
  const [fees, setFees] = useState<Record<string, string>>({
    conveyancing: "2000",
    building: "600",
    lmi: "0",
    other: "500",
  });

  const results = useMemo(() => {
    const purchasePrice = parseFloat(price || "0");
    const depositPct = parseFloat(deposit || "20") / 100;
    const depositAmt = purchasePrice * depositPct;
    const loanAmt = purchasePrice - depositAmt;

    const stampFn = STAMP_DUTY[state] ?? STAMP_DUTY["VIC"];
    const stampDuty = stampFn(purchasePrice, fhb);

    const transferReg = 150 + purchasePrice * 0.00002;
    const mortgageReg = 160;

    const extraFees = Object.values(fees).reduce((sum, v) => sum + parseFloat(v || "0"), 0);

    const totalUpfront = depositAmt + stampDuty + transferReg + mortgageReg + extraFees;

    const breakdown = [
      { label: "Deposit", amount: depositAmt },
      { label: "Stamp duty", amount: stampDuty },
      { label: "Transfer registration", amount: transferReg },
      { label: "Mortgage registration", amount: mortgageReg },
      { label: "Conveyancing / Legal", amount: parseFloat(fees.conveyancing || "0") },
      { label: "Building & pest inspection", amount: parseFloat(fees.building || "0") },
      { label: "LMI", amount: parseFloat(fees.lmi || "0") },
      { label: "Other costs", amount: parseFloat(fees.other || "0") },
    ];

    return { depositAmt, stampDuty, loanAmt, totalUpfront, breakdown, transferReg, mortgageReg };
  }, [price, state, fhb, deposit, fees]);

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none bg-white";
  const labelCls = "text-sm font-medium mb-1 block text-gray-500";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="text-xl font-black" style={{ color: "var(--color-primary)" }}>
          What are the property fees?
        </h2>

        <div>
          <label className={labelCls}>Purchase price*</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls + " pl-7"} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls}>
              {["VIC","NSW","QLD","WA","SA","ACT","TAS","NT"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Deposit (%)</label>
            <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className={inputCls} min="5" max="100" />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input type="checkbox" checked={fhb} onChange={(e) => setFhb(e.target.checked)} className="accent-purple-700 w-4 h-4" />
            First Home Buyer (stamp duty concession may apply)
          </label>
        </div>

        <div className="border-t pt-4">
          <p className="font-bold text-sm mb-3" style={{ color: "var(--color-primary)" }}>Additional fees</p>
          <div className="space-y-2">
            {FEE_ITEMS.map(({ key, label }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={fees[key]}
                    onChange={(e) => setFees((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={inputCls + " pl-7"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Total */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        >
          <p className="text-white/70 text-sm mb-1">Total upfront costs</p>
          <p className="text-4xl font-black">{formatCurrency(results.totalUpfront)}</p>
          <p className="text-white/60 text-xs mt-2">Loan amount: {formatCurrency(results.loanAmt)}</p>
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-500 mb-4">Cost breakdown</p>
          <div className="space-y-2.5">
            {results.breakdown.map(({ label, amount }) => {
              const pct = results.totalUpfront > 0 ? (amount / results.totalUpfront) * 100 : 0;
              return (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(amount)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-xs text-amber-700 leading-relaxed">
            ⚠️ Stamp duty figures are indicative only and based on simplified calculations. Actual amounts may vary. Please verify with your state revenue office or solicitor.
          </p>
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