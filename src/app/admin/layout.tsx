import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export const metadata = {
  title: "Admin — Nextgen CMS",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#070a0f] text-white/90 flex flex-col md:flex-row">
      {session && (
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] bg-[#080d14]/70 backdrop-blur-xl flex flex-col justify-between p-6">
          <div className="space-y-8">
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/20" />
              </div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-400 font-bold">
                Nextgen CMS
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-row md:flex-col gap-1.5" aria-label="Admin sidebar navigation">
              {[
                {
                  href: "/admin",
                  label: "Dashboard",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                    </svg>
                  ),
                },
                {
                  href: "/admin/posts",
                  label: "All Posts",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  ),
                },
                {
                  href: "/admin/posts/new",
                  label: "New Post",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-mono text-xs text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-150 group"
                >
                  <span className="text-white/30 group-hover:text-emerald-400 transition-colors">{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User & Logout section */}
          <div className="hidden md:flex flex-col gap-4 pt-6 border-t border-white/[0.05]">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] tracking-wider text-white/20 uppercase">Logged in as</span>
              <span className="font-mono text-xs text-white/50 truncate" title={session.email}>
                {session.email}
              </span>
            </div>
            <LogoutButton />
          </div>
        </aside>
      )}

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Header for mobile logouts/email */}
        {session && (
          <header className="md:hidden flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-[#080d14]/30">
            <span className="font-mono text-[10px] text-white/40 truncate max-w-[150px]">{session.email}</span>
            <LogoutButton />
          </header>
        )}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
