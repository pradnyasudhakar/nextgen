import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, User } from "lucide-react";

export const dynamic = "force-dynamic";

/* ---------------- FETCH SINGLE BLOG ---------------- */
async function getBlog(slug: string) {
  const res = await fetch(
    `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.[0] ?? null;
}

/* ---------------- PAGE ---------------- */
export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getBlog(slug);

  if (!post) notFound();

  const { title, author, publishedDate, content, coverImage } = post;

  return (
    <div className="bg-white min-h-screen">
      {/* ── Top Bar ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:opacity-80"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
          {publishedDate && (
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} />
              {publishedDate}
            </span>
          )}
          {author && (
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {author}
            </span>
          )}
        </div>

        {/* Cover Image */}
        {coverImage?.url && (
          <div className="relative w-full h-[220px] sm:h-[360px] mb-8 rounded-2xl overflow-hidden bg-gray-100">
            <img
  src={`http://localhost:1337${coverImage.url}`}
  alt={title}
  className="w-full h-full object-cover"
/>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-6 text-gray-900">
          {title}
        </h1>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-8" />

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-base leading-relaxed">
          {content && content.length > 0 ? (
            content.map((block: any, index: number) => {
              if (block.__component === "blog.paragraph") {
                return <p key={index}>{block.text}</p>;
              }

              // future components support
              return null;
            })
          ) : (
            <p className="text-gray-400">No content available.</p>
          )}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="border-t border-gray-100 bg-gray-50 mt-14">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h3 className="text-xl font-black mb-2 text-gray-900">
            Need help with finance decisions?
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Talk to our expert team and get personalised guidance.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-xl bg-purple-700 text-white text-sm font-bold px-8 py-3 hover:opacity-90 transition"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}