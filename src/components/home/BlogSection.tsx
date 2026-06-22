// app/components/sections/BlogSection.tsx  (or wherever your file lives)
import Link from "next/link";
import Image from "next/image";
import { Label, H2, Highlight, P } from "../ui/typography";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function BlogSection() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3, // only latest 3 for homepage
    select: {
      id: true,
      slug: true,
      title: true,
      coverImage: true,
    },
  });

  return (
    <section id="blog" className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">
        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <Label className="mb-4">BLOGS</Label>
            <H2>
              <Highlight>Latest</Highlight> {""} Financial Guides &amp; News
            </H2>
          </div>
          <Button href="/blog" className="md:block hidden" variant="outline-rounded">
            View More
          </Button>
        </div>

        {/* ── Blog Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="group">
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden mb-5 h-52 bg-gray-100">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Title */}
              <P className="h4 mb-4">{post.title}</P>

              {/* Read Article */}
              <Link
                href={`/blog/${post.slug}`}
                className="text-[1rem] flex items-center text-primary px-0"
              >
                Read Article{" "}
                <span>
                  <ChevronRight />
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile View More */}
        <div className="mt-10 text-center sm:hidden">
          <Button href="/blog" variant="outline-rounded">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}