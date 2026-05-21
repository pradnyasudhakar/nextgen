import { requireAdminSession } from "@/lib/auth";
import PostForm from "@/components/admin/PostForm";
import Link from "next/link";

export const metadata = { title: "New Post — Admin" };

export default async function NewPostPage() {
  await requireAdminSession();

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex items-center gap-2 font-mono text-[11px] text-white/25 mb-6">
        <Link href="/admin" className="hover:text-white/60 transition-colors duration-150">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/posts" className="hover:text-white/60 transition-colors duration-150">
          Posts
        </Link>
        <span>/</span>
        <span className="text-emerald-400">New</span>
      </div>

      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-1">
          Create
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white/90">New Post</h1>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#070d14]/30 backdrop-blur-xl px-6 sm:px-8 py-8">
        <PostForm mode="create" />
      </div>
    </div>
  );
}
