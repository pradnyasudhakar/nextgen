import RenderContent from "@/components/RenderContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { P, Display } from "@/components/ui/typography";
import { Mail, Instagram, Linkedin, PhoneCall, Twitter, Facebook } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";
import FAQPage from "../BlogFaqs";



type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ Yeh ADD karo - existing function se PEHLE
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description?.split("\n")[0] ?? "Read on NextGen Lending Group",
    openGraph: {
      title: post.title,
      description: post.description?.split("\n")[0] ?? "Read on NextGen Lending Group",
      url: `https://nextgenlg.com.au/blog/${post.slug}`,
      siteName: "NextGen Lending Group",
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [],
      type: "article",
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  // Latest posts for sidebar
  const latestPosts = await prisma.post.findMany({
    where: { published: true, NOT: { slug } },
    orderBy: { postedDate: "desc" },
    take: 3,
  });

  // Extract h2 headings from markdown for Table of Contents
  const tableOfContents = post.content
  .split("\n")
  .filter((line) => line.startsWith("## "))
  .map((line) => {
    const raw = line.replace("## ", "").trim();
    const clean = raw.replace(/\*\*/g, "");
    return {
      text: clean,
      id: clean.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
  });

  return (
    <>
      <section className="w-full px-3 overflow-hidden" >
        {/* Hero Image */}
      {post.coverImage && (
        <div className=" w-full h-100 sm:h-90 lg:h-100  relative">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-md bg-cover bg-center bg-no-repeat relative "
            priority
          />
          {/* Dark overlay */}
          <div className="absolute rounded-md w-full h-130 sm:h-90 lg:h-100   inset-0 bg-black/40" />

          {/* Title overlay on image */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end mx-auto px-10 sm:px-16 lg:px-26 py-16 max-w-7xl">
            {post.smallTitle && (
             
              <P className="text-[#FBFBFB] capitalize font-normal">
              {post.smallTitle}
            </P>
            )}
            
            <Display className="text-[#FBFBFB] max-w-120 lg:max-w-160  [word-spacing:8px] leading-8 lg:leading-12  mt-4 mb-4">
                          <span className="font-[700]">
                            {post.title}
                          </span>
                        </Display>
            <div className="flex flex-wrap gap-3 text-[#FFFFFF] text-sm">
              <span className="flex gap-1.5" >By <b className="" >{post.writerName}</b></span>
              <span className="text-white/70" >|</span>
              <span className="flex gap-1.5">{new Date(post.postedDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="text-white/70">|</span>
              <span className="flex gap-1.5">{post.readTime} Min Read</span>
            </div>
          </div>
        </div>
      )}
      </section>

      {/* Body */}
      <div className="max-w-7xl bg-[#FFFFF] mx-auto px-6 md:px-10 lg:px-26  lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
{/* Intro Description - paragraph wise */}
{post.description && (
  <div className="mb-6 mt-6 md:mt-0 lg:mt-0 ">
    {post.description.split("\n").filter(Boolean).map((para, i) => (
      <p key={i} className="text-[#555555] text-[1rem] leading-relaxed mb-4">
        {para}
      </p>
    ))}
  </div>
)}
            {/* Excerpt blockquote */}
            {post.excerpt && (
              
             <div className="flex items-center gap-6 bg-[#EEF3F2] rounded-md px-6 py-6 mb-8">
  <img src="/images/queote.png" alt="quote" className="w-10 h-10 shrink-0" />
  <h1 className="text-[1rem] font-[700] text-[#555555] ">
    {post.excerpt}
  </h1>
</div>
            )}

            {/* Article body */}
            <article className="prose prose-lg max-w-none prose-headings:font-[500] prose-headings:text-[#002566] prose-headings:font-bold prose-a:text-[#002566]">
              <RenderContent content={post.content} path={post.slug} />
            </article>
          </div>
          

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-75 shrink-0 space-y-8 lg:sticky lg:top-6 lg:self-start">

             {/* Share */}
            {/* Share */}
<div className="border border-[#9C9C9C] shadow-md bg-[#FBFBFB] rounded-[5px] p-4">
  <p className="text-sm font-normal text-[#555555] tracking-wide mb-3">
    Share this article
  </p>
  <div className="flex gap-3">

    {/* Facebook */}
    
     <a href={`https://www.facebook.com/sharer/sharer.php?u=https://nextgenlg.com.au/blog/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Facebook"
      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
    >
      <Facebook fill="currentColor" strokeWidth={0} className="w-4 h-4 text-[#FFFFFF]" />
    </a>

    {/* Twitter */}
    {/* <a
      href={`https://twitter.com/intent/tweet?url=https://nextgenlg.com.au/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Twitter"
      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
    >
      <Twitter fill="currentColor" strokeWidth={0} className="w-4 h-4 text-[#FFFFFF]" />
    </a> */}

    {/* LinkedIn */}
    
    <a  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://nextgenlg.com.au/blog/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on LinkedIn"
      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
    >
      <Linkedin fill="currentColor" strokeWidth={0} className="w-4 h-4 text-[#FFFFFF]" />
    </a>

    {/* WhatsApp */}
    
    <a  href={`https://wa.me/?text=${encodeURIComponent(post.title + " - https://nextgenlg.com.au/blog/" + post.slug)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on WhatsApp"
      className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
    >
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.135 1.535 5.879L.057 23.882a.5.5 0 0 0 .61.641l6.188-1.453A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 0 1-5.031-1.378l-.361-.214-3.733.877.947-3.645-.235-.374A9.867 9.867 0 0 1 2.106 12C2.106 6.533 6.533 2.106 12 2.106c5.467 0 9.894 4.427 9.894 9.894 0 5.467-4.427 9.894-9.894 9.894z"/>
      </svg>
    </a>

  </div>
</div>

           
             {/* Table of Contents */}
           <TableOfContents items={tableOfContents} />
            {/* Latest Posts */}
            <div className="border-[#9C9C9C] shadow-lg border rounded-[5px] p-4 " >
              <h3 className="text-base font-[700] text-primary mb-4 pb-2 ">
                Latest Posts
              </h3>
              <div className="space-y-4 border-[#9C9C9C] border-b pb-4 ">
                {latestPosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="flex gap-3 group"
                  >
                    {p.coverImage && (
                      <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div>
                      {post.smallTitle && (
                  <span className="text-xs font-semibold text-[#0f6e56] capitalize tracking-wide mb-2">
                    {post.smallTitle}
                  </span>
                )}

                      <p className="text-sm font-medium text-dark leading-snug group-hover:text-dark transition-colors line-clamp-2">
                        {p.title}
                      </p>
                      <div className="text-[#9C9C9C] text-sm">
             
              
              <span>{new Date(post.postedDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span >|</span>
              <span>{post.readTime} Min Read</span>
            </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1 mt-4 text-sm font-[700] text-primary hover:underline"
              >
                View All Posts →
              </Link>
            </div>

            {/* CTA Card */}
            <div className="bg-primary rounded-[5px]  p-6 text-[#FBFBFB]">
              <div className="text-center flex justify-center mb-4 " ><PhoneCall /></div>
              <p className="text-xs font-[700] uppercase text-center tracking-widest text-[#FBFBFB] mb-4">
                Talk to a Broker Today
              </p>
              <p className="text-sm mt-2  text-center font-[500] text-[#FBFBFB] mb-5 leading-tight">
                Get personalised advice on the right financial solution — no <br /> obligation.
              </p>
              <Link
                href="/contact"
                className="block text-center border-[#FBFBFB] border  bg-transparent text-[#FBFBFB] text-sm font-[500] py-2.5 px-4 rounded-full hover:bg-gray-100 hover:text-black transition-colors"
              >
                Book Appointment
              </Link>
            </div>

          </aside>
        </div>
        
      </div>
     <FAQPage postId={post.id} />
    </>
  );
}