import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { H1, H3, Label, Small, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getBlog(slug: string) {
  const res = await fetch(
    `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] ?? null;
}

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
      <div className="border-b border-[#e8eeec]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-4">
          <Button href="/blog" variant="ghost" className="px-0 gap-2">
            <ArrowLeft size={14} /> Back to Blog
          </Button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4"
          style={{ color: "var(--color-accent)", opacity: 0.7 }}>
          {publishedDate && (
            <span className="flex items-center gap-1.5 text-xs">
              <CalendarDays size={12} /> {publishedDate}
            </span>
          )}
          {author && (
            <span className="flex items-center gap-1.5 text-xs">
              <User size={12} /> {author}
            </span>
          )}
        </div>

        {/* Cover Image */}
        {coverImage?.url && (
          <div className="relative w-full h-55 sm:h-90 mb-8 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={`http://localhost:1337${coverImage.url}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <H1 className="mb-6">{title}</H1>

        {/* Divider */}
        {/* <hr className="divider mb-8" /> */}

        {/* Content */}
        <div className="space-y-6">
          {content && content.length > 0 ? (
            content.map((block: any, index: number) => {
              if (block.__component === "blog.paragraph") {
                return <P key={index}>{block.text}</P>;
              }
              return null;
            })
          ) : (
            <Small>No content available.</Small>
          )}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="border-t border-[#e8eeec] mt-14"
        style={{ backgroundColor: "var(--color-light)" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12 text-center">
          <H3 className="mb-2">Need help with finance decisions?</H3>
          <Small className="mb-6 max-w-md mx-auto">
            Talk to our expert team and get personalised guidance.
          </Small>
          <Button href="/contact-us" variant="primary" size="lg">
            Book Free Consultation
          </Button>
        </div>
      </div>

    </div>
  );
}