import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Hero from "@/app/blog/Hero";
import BlogContent from "./FeaturePost";
import { H2, P } from "@/components/ui/typography";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FAQPage from "./BlogFaqs";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { postedDate: "desc" },
  });

  return (
    <>
      <Hero />
      <BlogContent />

      <main className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-16">
        <H2 className="font-[500] text-[1.4rem] mb-6 text-dark">
          All Blogs
        </H2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden transition-shadow duration-300"
            >
              {post.coverImage && (
                <div className="relative rounded-md h-52 w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="py-4 flex flex-col flex-1">
                {post.smallTitle && (
                  <span className="text-xs hidden font-semibold text-primary uppercase tracking-wide mb-2">
                    {post.smallTitle}
                  </span>
                )}

                <P className="mb-3 group-hover:text-dark transition-colors duration-200">
                  {post.title}
                </P>

                <div className="flex-1" />

                <span className="text-[1rem] font-[500] flex items-center text-primary">
                  Read Article <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <FAQPage/>
    </>
  );
}