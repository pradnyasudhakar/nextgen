import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  // Fetch quick stats
  const [totalPosts, publishedPosts, draftPosts, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, published: true, createdAt: true, slug: true },
    }),
  ]);

  const stats = [
    { label: "Total Posts",    value: totalPosts,     color: "text-emerald-400" },
    { label: "Published",      value: publishedPosts, color: "text-sky-400" },
    { label: "Drafts",         value: draftPosts,     color: "text-amber-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Page header */}
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-2">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white/90 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-white/30 font-mono">{session.email}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-6 py-5"
          >
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/35 mb-2">
              {label}
            </p>
            <p className={`text-4xl font-bold tabular-nums ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-400 text-[#070a0f] font-bold text-sm hover:bg-emerald-300 transition-colors duration-150"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          New Post
        </Link>
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 font-mono text-sm hover:bg-white/[0.06] hover:text-white/80 transition-colors duration-150"
        >
          View all posts
        </Link>
      </div>

      {/* Recent posts */}
      <div>
        <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 mb-4">
          Recent posts
        </h2>
        {recentPosts.length === 0 ? (
          <div className="rounded-xl border cursor-pointer border-white/[0.07] bg-white/[0.02] px-6 py-10 text-center">
            <p className="text-white/25 font-mono text-sm">No posts yet.</p>
            <Link
              href="/admin/posts/new"
              className="inline-block mt-4 text-emerald-400 font-mono text-xs hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.07] overflow-hidden">
            {recentPosts.map((post, i) => (
              <div
                key={post.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  i !== recentPosts.length - 1 ? "border-b border-white/[0.05]" : ""
                } hover:bg-white/[0.025] transition-colors duration-100`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white/75 truncate">{post.title}</p>
                  <p className="font-mono text-[11px] text-white/25 mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <span
                    className={`font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-full border ${
                      post.published
                        ? "text-emerald-400 border-emerald-400/25 bg-emerald-400/10"
                        : "text-amber-400 border-amber-400/25 bg-amber-400/10"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-mono text-[11px] text-white/30 cursor-pointer hover:text-emerald-400 transition-colors duration-150"
                  >
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}