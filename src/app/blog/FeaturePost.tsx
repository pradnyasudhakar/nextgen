import Link from "next/link";
import Image from "next/image";
import { H2, H3, P } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";

const categoryColors: Record<string, string> = {
  "Home Loans": "bg-[#e8f4f0] text-[#0f6e56]",
  "Commercial Finance": "bg-[#e8eef8] text-[#1a3a6e]",
  "Asset Finance": "bg-[#fef3e8] text-[#b45309]",
  "SMSF Finance": "bg-[#f3e8fe] text-[#7c3aed]",
  "Development Finance": "bg-[#fee8e8] text-[#dc2626]",
};

export default async function BlogContent() {
  const featuredPost = await prisma.post.findFirst({
    where: { published: true },
    orderBy: { postedDate: "desc" },
  });

  if (!featuredPost) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-16">
      <div className="">
        <H2 className="font-[500] text-[1.4rem] mb-6 text-[#002566]">
          Featured Post
        </H2>

        <Link href={`/blog/${featuredPost.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[12px] overflow-hidden border border-[#e5e7eb] hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-64 lg:h-80 bg-[#d1d5db] overflow-hidden">
              {featuredPost.coverImage ? (
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#c5cdd8]" />
              )}
            </div>

            {/* Content */}
            <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
              {featuredPost.smallTitle && (
                <span
                  className={`inline-block text-[0.75rem] font-[600] px-3 py-1 rounded-full mb-4 w-fit ${
                    categoryColors[featuredPost.smallTitle] ?? "bg-[#e8f4f0] text-primary"
                  }`}
                >
                  {featuredPost.smallTitle}
                </span>
              )}

              <H3 className="text-[1.25rem] lg:text-[1.4rem] font-[600] text-[#002566] leading-snug mb-3 group-hover:text-[#0f6e56] transition-colors duration-200">
                {featuredPost.title}
              </H3>

              {featuredPost.excerpt && (
                <P className="text-[#555555] text-[0.9rem] leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </P>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[0.75rem] font-[700]">
                    {featuredPost.writerName?.charAt(0) ?? "A"}
                  </div>
                  <div>
                    <P className="text-[0.78rem] font-[600] text-[#1a1a1a] mb-0 leading-none">
                      {featuredPost.writerName}
                    </P>
                   
                    <P className="text-[0.72rem] text-[#9ca3af] mt-0.5 leading-none">
                      {new Date(featuredPost.postedDate).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      <span>{" "} | {" "}</span>  {featuredPost.readTime} Min Read
                    </P>
                  </div>
                </div>

                <span className="text-[0.85rem] font-[600] text-[#0f6e56] group-hover:underline">
                  View All Posts &#8594;
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}