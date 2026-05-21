import RenderContent from "@/components/RenderContent";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-8"
        />
      )}

      {/* Small Title */}
      {post.smallTitle && (
        <p className="text-blue-600 font-medium mb-3">
          {post.smallTitle}
        </p>
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-gray-500 mb-10">
        <span>{post.writerName}</span>

        <span>
          {new Date(post.postedDate).toDateString()}
        </span>

        <span>{post.readTime} min read</span>
      </div>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-10">
          {post.excerpt}
        </p>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <RenderContent content={post.content} path={post.slug} />
      </article>
    </main>
  );
}