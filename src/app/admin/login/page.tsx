// src/app/admin/login/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials. Please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#070a0f] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "gridScroll 25s linear infinite",
        }}
      />

      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#070a0f_75%)]" />

      {/* Accent glow blobs */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />

      {/* Card */}
      <div
        className="relative w-full max-w-[420px] rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-10 shadow-2xl"
        style={{ animation: "cardIn 0.55s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Top-left corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-emerald-500/30 rounded-tl-2xl pointer-events-none" />
        {/* Bottom-right corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-emerald-500/10 rounded-br-2xl pointer-events-none" />

        {/* Brand */}
        <div className="mb-8" style={{ animation: "fadeUp 0.5s 0.1s both" }}>
          <div className="flex items-center gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/20" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.22em] text-emerald-400 uppercase mb-2">
            Nextgen CMS
          </p>
          <h1 className="text-[28px] font-bold tracking-tight text-white/90 leading-none mb-2">
            Admin Portal
          </h1>
          <p className="text-sm text-white/30 leading-relaxed">
            Restricted area — authorised personnel only.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"  
          className="flex flex-col gap-5"
          style={{ animation: "fadeUp 0.5s 0.18s both" }}
          noValidate
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40"
            >
              Email address
            </label>
            <div className="relative group">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-emerald-400 transition-colors duration-200 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M2.5 6l7.5 5 7.5-5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                autoComplete="off"  
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-white/85 placeholder:text-white/20 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/[0.04] focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40"
            >
              Password
            </label>
            <div className="relative group">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-emerald-400 transition-colors duration-200 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3.5"
                    y="8.5"
                    width="13"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M7 8.5V6a3 3 0 016 0v2.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="13" r="1.25" fill="currentColor" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-11 py-3 font-mono text-sm text-white/85 placeholder:text-white/20 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/[0.04] focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors duration-150"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M3 3l14 14"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-3"
              style={{ animation: "shake 0.35s cubic-bezier(.36,.07,.19,.97)" }}
            >
              <svg
                className="w-4 h-4 shrink-0 text-red-400"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M8 5v3.5M8 11h.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-mono text-xs text-red-300">{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending || !email || !password}
            className="group relative flex items-center justify-center gap-2.5 w-full mt-1 py-3.5 rounded-lg bg-emerald-400 text-[#070a0f] font-bold text-sm tracking-wide transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_28px_rgba(52,211,153,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-400 disabled:hover:shadow-none"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-[#070a0f]/30 border-t-[#070a0f] rounded-full animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <>
                <span>Sign in to Dashboard</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          className="mt-8 font-mono text-[10px] text-center tracking-widest text-white/15 uppercase"
          style={{ animation: "fadeUp 0.5s 0.3s both" }}
        >
          All access attempts are logged and monitored
        </p>
      </div>

      {/* Keyframes injected inline — works without extra CSS file */}
      <style>{`
        @keyframes gridScroll {
          from { transform: translateY(0); }
          to   { transform: translateY(48px); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-4px); }
          40%     { transform: translateX(4px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
