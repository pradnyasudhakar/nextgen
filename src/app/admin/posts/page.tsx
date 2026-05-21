import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";
import { Pencil } from "lucide-react";

export const metadata = { title: "Posts — Admin" };

export default async function AdminPostsPage() {
  await requireAdminSession();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-1">
            Content
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white/90">All Posts</h1>
        </div>
        <Link
          id="new-post-btn"
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-400 text-[#070a0f] font-bold text-sm hover:bg-emerald-300 transition-colors duration-150"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-white/25 font-mono text-sm mb-4">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="inline-block text-emerald-400 font-mono text-xs hover:underline"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.07] overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_160px_100px] gap-4 px-5 py-3 border-b border-white/[0.06] bg-white/[0.015]">
            {["Title", "Status", "Date", "Actions"].map((h) => (
              <span key={h} className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
                {h}
              </span>
            ))}
          </div>

          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`grid grid-cols-[1fr_120px_160px_100px] gap-4 items-center px-5 py-4 ${
                i !== posts.length - 1 ? "border-b border-white/[0.05]" : ""
              } hover:bg-white/[0.025] transition-colors duration-100`}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white/80 truncate">{post.title}</p>
                <p className="font-mono text-[11px] text-white/25 truncate mt-0.5">/{post.slug}</p>
              </div>

              <span
                className={`inline-flex w-fit font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-full border ${
                  post.published
                    ? "text-emerald-400 border-emerald-400/25 bg-emerald-400/10"
                    : "text-amber-400 border-amber-400/25 bg-amber-400/10"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>

              <span className="font-mono text-[11px] text-white/30">
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <div className="flex items-center gap-3">
                <Link
                  id={`edit-post-${post.id}`}
                  href={`/admin/posts/${post.id}`}
                  className="font-mono text-[11px] text-white/35 hover:text-emerald-400 transition-colors duration-150"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
