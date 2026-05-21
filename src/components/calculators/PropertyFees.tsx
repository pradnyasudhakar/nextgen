"use client";

import { useState, useMemo } from "react";

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

// ─── STAMP DUTY TABLE ────────────────────────────────────────────────────────
const STAMP_DUTY: Record<
  string,
  (price: number, fhb: boolean, propertyPurpose: string, securityType: string, primaryResidence: boolean, foreignBuyer: boolean) => number
> = {
  VIC: (price, fhb, _purpose, _type, primaryResidence, foreignBuyer) => {
    let duty = 0;
    if (fhb && price <= 600000) {
      duty = 0;
    } else if (fhb && price <= 750000) {
      const full = calcVicDuty(price);
      const concession = full * ((750000 - price) / 150000);
      duty = full - concession;
    } else {
      duty = calcVicDuty(price);
    }
    if (!primaryResidence && !fhb) {
      if (price > 300000) duty += price * 0.005;
    }
    if (foreignBuyer) duty += price * 0.08;
    return duty;
  },

  NSW: (price, fhb, _purpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = 0;
    if (fhb && price <= 800000) {
      duty = 0;
    } else if (fhb && price <= 1000000) {
      const full = calcNswDuty(price);
      const concession = full * ((1000000 - price) / 200000);
      duty = full - concession;
    } else {
      duty = calcNswDuty(price);
    }
    if (foreignBuyer) duty += price * 0.08;
    return duty;
  },

  QLD: (price, fhb, _purpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = 0;
    if (fhb && price <= 550000) {
      duty = 0;
    } else if (fhb && price <= 600000) {
      const full = calcQldDuty(price);
      duty = full * ((price - 550000) / 50000);
    } else {
      duty = calcQldDuty(price);
    }
    if (foreignBuyer) duty += price * 0.07;
    return duty;
  },

  WA: (price, fhb, _purpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = 0;
    if (fhb && price <= 430000) {
      duty = 0;
    } else if (fhb && price <= 530000) {
      const full = calcWaDuty(price);
      duty = full * ((price - 430000) / 100000);
    } else {
      duty = calcWaDuty(price);
    }
    if (foreignBuyer) duty += price * 0.07;
    return duty;
  },

  SA: (price, _fhb, _purpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = calcSaDuty(price);
    if (foreignBuyer) duty += price * 0.07;
    return duty;
  },

  // ✅ ACT: separate rate tables for owner-occupier ("tolive") vs investment
  ACT: (price, fhb, propertyPurpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = 0;
    if (fhb) {
      duty = 0;
    } else if (propertyPurpose === "investment") {
      duty = calcActDutyInvestment(price);
    } else {
      duty = calcActDutyOO(price);
    }
    if (foreignBuyer && !fhb) duty += price * 0.07;
    return duty;
  },

  TAS: (price, _fhb, _purpose, securityType, _primaryResidence, _foreignBuyer) => {
    let duty = calcTasDuty(price);
    if (securityType === "new") duty *= 0.5;
    return duty;
  },

  NT: (price, _fhb, _purpose, _type, _primaryResidence, foreignBuyer) => {
    let duty = calcNtDuty(price);
    if (foreignBuyer) duty += price * 0.005;
    return duty;
  },
};

// ─── STATE DUTY CALCULATION HELPERS ─────────────────────────────────────────

function calcVicDuty(price: number): number {
  if (price <= 25000) return price * 0.014;
  if (price <= 130000) return 350 + (price - 25000) * 0.024;
  if (price <= 440000) return 2870 + (price - 130000) * 0.05;
  if (price <= 550000) return 18370 + (price - 440000) * 0.06;
  if (price <= 960000) return 28970 + (price - 550000) * 0.06;
  if (price < 2000000) return 55000 + (price - 960000) * 0.055;
  return price * 0.065;
}

function calcNswDuty(price: number): number {
  if (price <= 14000) return price * 0.0125;
  if (price <= 30000) return 175 + (price - 14000) * 0.015;
  if (price <= 80000) return 415 + (price - 30000) * 0.0175;
  if (price <= 300000) return 1290 + (price - 80000) * 0.035;
  if (price <= 1000000) return 8990 + (price - 300000) * 0.045;
  if (price <= 3000000) return 40490 + (price - 1000000) * 0.055;
  return 150490 + (price - 3000000) * 0.07;
}

function calcQldDuty(price: number): number {
  if (price <= 5000) return 0;
  if (price <= 75000) return (price - 5000) * 0.015;
  if (price <= 540000) return 1050 + (price - 75000) * 0.035;
  if (price <= 1000000) return 17325 + (price - 540000) * 0.045;
  return 38025 + (price - 1000000) * 0.0575;
}

function calcWaDuty(price: number): number {
  if (price <= 120000) return price * 0.019;
  if (price <= 150000) return 2280 + (price - 120000) * 0.0285;
  if (price <= 360000) return 3135 + (price - 150000) * 0.03;
  if (price <= 725000) return 9435 + (price - 360000) * 0.05;
  return 27685 + (price - 725000) * 0.051;
}

function calcSaDuty(price: number): number {
  if (price <= 12000) return price * 0.01;
  if (price <= 30000) return 120 + (price - 12000) * 0.02;
  if (price <= 50000) return 480 + (price - 30000) * 0.03;
  if (price <= 100000) return 1080 + (price - 50000) * 0.035;
  if (price <= 200000) return 2830 + (price - 100000) * 0.04;
  if (price <= 250000) return 6830 + (price - 200000) * 0.0425;
  if (price <= 300000) return 8955 + (price - 250000) * 0.0475;
  if (price <= 500000) return 11330 + (price - 300000) * 0.05;
  return 21330 + (price - 500000) * 0.055;
}

// ✅ ACT Owner-Occupier / "To live in" duty rates
function calcActDutyOO(price: number): number {
  if (price <= 200000) return price * 0.006;
  if (price <= 300000) return 1200 + (price - 200000) * 0.017;
  if (price <= 500000) return 2900 + (price - 300000) * 0.0242;
  if (price <= 750000) return 7740 + (price - 500000) * 0.0615;
  if (price <= 1000000) return 18490 + (price - 750000) * 0.047;
  return 30240 + (price - 1000000) * 0.055;
}

// ✅ ACT Investment duty rates (higher tiered rates)
function calcActDutyInvestment(price: number): number {
  if (price <= 200000) return price * 0.012;
  if (price <= 300000) return 2400 + (price - 200000) * 0.022;
  if (price <= 500000) return 4600 + (price - 300000) * 0.034;
  if (price <= 750000) return 11400 + (price - 500000) * 0.0432;
  if (price <= 1000000) return 22200 + (price - 750000) * 0.059;
  return 36925 + (price - 1000000) * 0.0685;
}

function calcTasDuty(price: number): number {
  if (price <= 3000) return price * 0.01;
  if (price <= 25000) return 30 + (price - 3000) * 0.015;
  if (price <= 75000) return 360 + (price - 25000) * 0.0225;
  if (price <= 200000) return 1485 + (price - 75000) * 0.035;
  if (price <= 375000) return 5860 + (price - 200000) * 0.04;
  if (price <= 725000) return 12860 + (price - 375000) * 0.0425;
  return 27735 + (price - 725000) * 0.045;
}

function calcNtDuty(price: number): number {
  const v = price / 1000;
  if (v <= 525) return Math.max(0, (0.06571441 * v * v + 15 * v - 12000) * 0.01);
  return price * 0.049;
}

const inputCls =
  "w-full border border-[#9C9C9C] rounded-md px-3 py-2.5 text-sm text-[#555555] focus:outline-none focus:ring-2 bg-[#FBFBFB]";
const labelCls = "text-sm font-medium mb-1 block text-gray-500";

type RadioGroupProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
};

function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="flex gap-6 mt-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-[#555555]">
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-primary w-4 h-4"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function PropertyFees() {
  const [price, setPrice] = useState("400000");
  const [state, setState] = useState("ACT");
  const [propertyPurpose, setPropertyPurpose] = useState("investment");
  const [securityType, setSecurityType] = useState("new");
  const [transactionType, setTransactionType] = useState("purchase");
  const [homeBuyerConcession, setHomeBuyerConcession] = useState(true);
  const [primaryResidence, setPrimaryResidence] = useState(false);
  const [foreignBuyer, setForeignBuyer] = useState(false);

  const results = useMemo(() => {
    const purchasePrice = parseFloat(price || "0");
    const isFhb = homeBuyerConcession;

    const stampFn = STAMP_DUTY[state] ?? STAMP_DUTY["VIC"];
    const stampDuty =
      transactionType === "refinance"
        ? 0
        : stampFn(purchasePrice, isFhb, propertyPurpose, securityType, primaryResidence, foreignBuyer);

    // ✅ Transfer fee: flat $463 government registration fee
    const transferFee = 463;

    const mortgageRegFee = 172;

    const totalGovtFees = stampDuty + transferFee + mortgageRegFee;

    const foreignSurchargeRate: Record<string, number> = {
      VIC: 0.08, NSW: 0.08, QLD: 0.07, WA: 0.07, SA: 0.07, ACT: 0.07, TAS: 0, NT: 0.005,
    };
    const foreignSurcharge = foreignBuyer
      ? Math.round(purchasePrice * (foreignSurchargeRate[state] ?? 0))
      : 0;

    return { stampDuty, transferFee, mortgageRegFee, totalGovtFees, foreignSurcharge };
  }, [price, state, propertyPurpose, securityType, transactionType, homeBuyerConcession, primaryResidence, foreignBuyer]);

  return (
    <div id="propertyfees" className="grid px-10 md:px-0 lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-[#FBFBFB] rounded-md shadow-lg p-6 space-y-5">
        <h2 className="text-xl text-primary">Property fees</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>State/Territory</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls}>
              {["VIC", "NSW", "QLD", "WA", "SA", "ACT", "TAS", "NT"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex justify-between items-center text-sm text-[#555555]">
              <label className={labelCls}>Purchase price</label>
              <span>$</span>
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <RadioGroup
          label="Property purpose"
          options={[
            { value: "investment", label: "Investment" },
            { value: "tolive", label: "To live in" },
          ]}
          value={propertyPurpose}
          onChange={setPropertyPurpose}
        />

        <RadioGroup
          label="Security type"
          options={[
            { value: "new", label: "New home" },
            { value: "established", label: "Established home" },
            { value: "vacant", label: "Vacant land" },
          ]}
          value={securityType}
          onChange={setSecurityType}
        />

        <RadioGroup
          label="Transaction type"
          options={[
            { value: "purchase", label: "Purchase" },
            { value: "refinance", label: "Refinance" },
          ]}
          value={transactionType}
          onChange={setTransactionType}
        />

        <div className="space-y-2.5">
          {[
            { label: "Home buyer concession", value: homeBuyerConcession, set: setHomeBuyerConcession },
            { label: "Primary residence", value: primaryResidence, set: setPrimaryResidence },
            { label: "Foreign buyer", value: foreignBuyer, set: setForeignBuyer },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#555555]">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => set(e.target.checked)}
                  className="accent-primary w-4 h-4"
                />
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="bg-[#EEF3F2] rounded-md border border-primary p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[1rem] text-[#555555]">Total Government Fees</p>
              <p className="text-[0.85rem] text-[#555555]">(due on settlement)</p>
            </div>
            <p className="text-4xl font-black" style={{ color: "var(--color-primary)" }}>
              {formatCurrency(results.totalGovtFees)}
            </p>
          </div>

          <div className="border-t border-[#9C9C9C] pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-primary text-sm">Stamp duty</p>
              <p className="text-primary font-[700]">{formatCurrency(results.stampDuty)}</p>
            </div>

            {foreignBuyer && results.foreignSurcharge > 0 && (
              <div className="flex justify-between items-center ml-4">
                <p className="text-[#555555] text-xs">↳ incl. foreign buyer surcharge</p>
                <p className="text-[#555555] text-xs">{formatCurrency(results.foreignSurcharge)}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <p className="text-primary text-sm">Transfer fee</p>
              <p className="text-primary font-[700]">{formatCurrency(results.transferFee)}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-primary text-sm">Mortgage registration fee</p>
              <p className="text-primary font-[700]">{formatCurrency(results.mortgageRegFee)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}