import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import Link from "next/link";

export const metadata = { title: "Edit Post — Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  await requireAdminSession();

  const { id } = await params;
 const post = await prisma.post.findUnique({
  where: { id },
  include: { faqs: { orderBy: { order: "asc" } } },
});

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-white/25 mb-6">
        <Link href="/admin" className="hover:text-white/60 transition-colors duration-150">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/posts" className="hover:text-white/60 transition-colors duration-150">
          Posts
        </Link>
        <span>/</span>
        <span className="text-emerald-400 truncate max-w-50">{post.title}</span>
      </div>

      {/* Page title */}
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-1">
          Edit
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white/90 truncate">{post.title}</h1>
        <p className="font-mono text-xs text-white/25 mt-1">
          Slug: <span className="text-white/40">/{post.slug}</span>
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#070d14]/30 backdrop-blur-xl px-6 sm:px-8 py-8">
        <PostForm
          mode="edit"
          initialData={{
            id: post.id,
            title: post.title,
            smallTitle: post.smallTitle,
            writerName: post.writerName,
            postedDate: post.postedDate,
            readTime: post.readTime,
            slug: post.slug,
            description: post.description,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            published: post.published,
            faqs: post.faqs,
          }}
        />
      </div>
    </div>
  );
}
