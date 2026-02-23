"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, ContactIcon } from "lucide-react";

const categories = [
  "All",
  "Home Loans",
  "Investment",
  "Refinancing",
  "Commercial",
  "Education",
  "Tips",
];

const categoryColors: Record<string, string> = {
  "Home Loans": "#3b1fa3",
  Investment: "#059669",
  Refinancing: "#d97706",
  Education: "#0284c7",
  Commercial: "#7c3aed",
  Tips: "#db2777",
  All: "#3b1fa3",
};

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
        <div className="max-w-7xl mx-auto px-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#6c47d9" }}
          >
            Our Blog
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: "#0f0a1e" }}
          >
            Insights on Finance & Mortgages
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Expert tips, guides and market updates to help you make confident
            financial decisions at every stage.
          </p>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-16">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 border"
                style={
                  activeCategory === cat
                    ? {
                        backgroundColor: categoryColors[cat],
                        color: "white",
                        borderColor: categoryColors[cat],
                      }
                    : {
                        backgroundColor: "white",
                        color: "#6b7280",
                        borderColor: "#e5e7eb",
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
      <div className="max-w-7xl mx-auto px-16 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              No blog posts found in this category.
            </p>
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
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-50 transition-all duration-300 flex flex-col group"
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
                        style={{
                          backgroundColor:
                            categoryColors[post.category] ?? "#3b1fa3",
                        }}
                      >
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-3 flex-wrap">
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

                    <h2
                      className="text-sm font-bold leading-snug mb-2 group-hover:text-purple-700 transition-colors"
                      style={{ color: "#0f0a1e" }}
                    >
                      {post.title}
                    </h2>

                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:gap-2.5"
                      style={{ color: "#3b1fa3" }}
                    >
                      Read More <ArrowRight size={13} />
                    </Link>
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