import Link from "next/link";
import Image from "next/image";
import { H2, H3, P } from "@/components/ui/typography";
import type { Post } from "@/generated/prisma/client";
import { User } from "lucide-react";

const categoryColors: Record<string, string> = {
  "Home Loans": "bg-[#e8f4f0] text-[#0f6e56]",
  "Commercial Finance": "bg-[#e8eef8] text-[#1a3a6e]",
  "Asset Finance": "bg-[#fef3e8] text-[#b45309]",
  "SMSF Finance": "bg-[#f3e8fe] text-[#7c3aed]",
  "Development Finance": "bg-[#fee8e8] text-[#dc2626]",
};

// ← prop accept karo, prisma call hato
export default function BlogContent({ featuredPost }: { featuredPost: Post | null }) {
  if (!featuredPost) return null;


  return (
    <section className="w-full max-w-7xl mx-auto px-10 sm:px-16 lg:px-26  py-16">
      <div className="">
        <H2 className="font-[500] text-[1.4rem] mb-6 text-dark">
          Featured Post
        </H2>

        <Link href={`/blog/${featuredPost.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-md overflow-hidden  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-64 lg:h-full  overflow-hidden">
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
            <div className="bg-[#FBFBFB] p-8 border-b-4   border-b-primary lg:p-10 flex flex-col justify-center">
              {featuredPost.smallTitle && (
                <span
                  className={`inline-block text-[1rem] font-normal  capitalize  mb-4 w-fit ${
                    categoryColors[featuredPost.smallTitle] ?? " text-primary"
                  }`}
                >
                  {featuredPost.smallTitle}
                </span>
              )}

              <H3 className="text-[1.25rem] lg:text-[1.4rem] font-[600] text-dark leading-snug mb-3 group-hover:text-[#0f6e56] transition-colors duration-200">
                {featuredPost.title}
              </H3>

              {featuredPost.excerpt && (
                <P className="text-[#555555] text-[0.9rem] font-[500] leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </P>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8  flex items-center justify-center text-primary">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <P className="text-[1rem] flex gap-1 text-[#555555] mb-2 leading-none">
                      By 
                      <span className="font-[600]">
                        {featuredPost.writerName}
                      </span>
                    </P>

                    <P className="text-[0.72rem] flex gap-2 text-[#9C9C9C] mt-1 leading-none">
                      {new Date(featuredPost.postedDate).toLocaleDateString(
                        "en-AU",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}{" "}
                      <span>  | </span> {featuredPost.readTime} Min Read
                    </P>
                  </div>
                </div>

                <span className="text-[0.85rem] font-[600] text-primary ">
                  Read Article &#8594;
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
