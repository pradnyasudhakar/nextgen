"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

interface AdminHeaderProps {
  session: {
    email: string;
    role: string;
  };
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  const pathname = usePathname();

  // If path is exactly /admin, hide the navbar and footer (header serves as navbar)
  if (pathname === "/admin") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06] bg-[#070a0f]/90 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/20" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-emerald-400">
          Nextgen CMS
        </span>
      </div>

      <nav
        className="hidden md:flex items-center gap-1"
        aria-label="Admin navigation"
      >
        {[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/posts", label: "Posts" },
          { href: "/admin/posts/new", label: "New Post" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1.5 rounded-md font-mono text-xs text-white/40 hover:text-white/80 hover:bg-white/[0.05] transition-colors duration-150"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block font-mono text-xs text-white/25 truncate max-w-[180px]">
          {session.email}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}
