import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, TrendingUp, Shield, Users } from "lucide-react";

const points = [
  "Access to 40+ Leading Lenders",
  "Free Initial Consultation",
  "Fast Pre-Approval Process",
];

const stats = [
  { icon: TrendingUp, value: "40+", label: "Lenders" },
  { icon: Shield, value: "100%", label: "Licensed" },
  { icon: Users, value: "500+", label: "Clients Helped" },
];

export default function Hero() {
  return (
    <section className="bg-white  py-8">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16">

          {/* Left */}
          <div className="flex-1 min-w-0">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
              style={{ borderColor: "#e0d9ff", backgroundColor: "#f5f3ff", color: "#3b1fa3" }}
            >
               Melbourne&apos;s Trusted Finance Broker
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6"
              style={{ color: "#0f0a1e" }}
            >
              Finance Made{" "}
              <span className="relative inline-block">
                <span style={{ color: "#3b1fa3" }}>Simple</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                  <path d="M0 5 Q100 0 200 5" stroke="#6c47d9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              for You
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
              We connect you with the right loan from 40+ leading lenders —
              tailored to your situation, goals and budget.
            </p>

            <ul className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={15} style={{ color: "#3b1fa3" }} className="shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply-now"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #3b1fa3, #6c47d9)" }}
              >
                Apply Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
              >
                <Phone size={15} /> Book a Free Call
              </Link>
            </div>
          </div>

          {/* Right — Card */}
          <div className="w-full lg:w-80 shrink-0">
            <div
              className="rounded-2xl p-8 bg-white"
              style={{ border: "1px solid #ede9ff", boxShadow: "0 20px 60px rgba(59,31,163,0.1)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#6c47d9" }}>
                Why Choose NextGen?
              </p>

              <div className="flex flex-col divide-y divide-gray-50">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-4 py-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#f5f3ff" }}
                      >
                        <Icon size={19} style={{ color: "#3b1fa3" }} />
                      </div>
                      <div>
                        <div className="text-2xl font-black" style={{ color: "#0f0a1e" }}>{s.value}</div>
                        <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/calculators"
                className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl border-2 hover:border-purple-300 hover:text-purple-700 transition-colors"
                style={{ borderColor: "#e0d9ff", color: "#3b1fa3" }}
              >
                Try Our Calculator <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}