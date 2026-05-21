"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center justify-center cursor-pointer gap-2 px-4 py-1.5 rounded-md font-mono text-sm text-red-400/80 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <span className="w-3 h-3 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
          <span>Signing out…</span>
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M10 5l3 3-3 3M13 8H6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Sign out</span>
        </>
      )}
    </button>
  );
}
