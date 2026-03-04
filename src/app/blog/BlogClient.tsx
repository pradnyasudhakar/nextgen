"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, ContactIcon } from "lucide-react";
import { H1, Label, Small, Highlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Home Loans",
  "Investment",
  "Refinancing",
  "Commercial",
  "Education",
  "Tips",
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogClient({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Page Header ── */}
      <div className="border-b border-gray-100 py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <Label className="mb-3">Our Blog</Label>
          <H1 className="mb-3">
            Insights on <Highlight>Finance</Highlight> & Mortgages
          </H1>
          <Small className="max-w-xl">
            Expert tips, guides and market updates to help you make confident
            financial decisions at every stage.
          </Small>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border-2"
                style={
                  activeCategory === cat
                    ? {
                        backgroundColor: "var(--color-primary)",
                        color: "#ffffff",
                        borderColor: "var(--color-primary)",
                      }
                    : {
                        backgroundColor: "white",
                        color: "var(--color-dark)",
                        borderColor: "var(--color-primary-light)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <Small>No blog posts found in this category.</Small>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: any) => {
              const image = post.coverImage?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.coverImage.url}`
                : "";

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e8eeec] hover:border-primary-light hover:shadow-[0_4px_20px_rgba(10,107,82,0.10)] transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-50">
                    {image && (
                      <img
                        src={image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {post.category && (
                      <span
                        className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs mb-3 flex-wrap"
                      style={{ color: "var(--color-accent)", opacity: 0.7 }}>
                      {post.publishedDate && (
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={11} />
                          {formatDate(post.publishedDate)}
                        </span>
                      )}
                      {post.author && (
                        <span className="flex items-center gap-1.5">
                          <ContactIcon size={11} />
                          {post.author}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      className="text-sm font-bold leading-snug mb-2 group-hover:text-primary transition-colors"
                      style={{ color: "var(--color-dark)" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs leading-relaxed mb-4 flex-1"
                      style={{ color: "#4a6460" }}>
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <Button href={`/blog/${post.slug}`} variant="ghost" className="px-0 text-xs justify-start">
                      Read More <ArrowRight size={13} />
                    </Button>

                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}