import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      postedDate: "desc",
    },
  });

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">
        All Blogs
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-5">
              <p className="text-sm text-gray-500 mb-2">
                {post.smallTitle}
              </p>

              <h2 className="text-2xl font-semibold mb-3">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.writerName}</span>

                <span>{post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}