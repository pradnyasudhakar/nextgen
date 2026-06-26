import RenderContent from "@/components/RenderContent";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { P, Display } from "@/components/ui/typography";
import { Mail, Instagram, Linkedin, PhoneCall, Twitter } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";
import FAQPage from "../BlogFaqs";

type Props = {
  params: Promise<{ slug: string }>;
};

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
            <div className="border border-[#9C9C9C]  shadow-md bg-[#FBFBFB] rounded-[5px] p-4">
              <p className="text-sm font-normal text-[#555555]  tracking-wide mb-3">
                Share this article
              </p>
              <div className="flex gap-3">
                {/* <a 
  href="https://mail.google.com/mail/?view=cm&to=admin@nextgenlg.com.au" 
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Email" 
  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors"
>
  <Mail className="w-4 h-4 text-[#FFFFFF]" />
</a> */}
                {/* <a href="https://www.instagram.com/nextgenlg/" target="_blank" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors">
                  <Instagram className="w-4 h-4 hover:text-primary text-[#FFFFFF]" />
                </a> */}
                <a href="https://www.Twitter.com/company/nextgen-lending-group/" target="_blank" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors">
                  <Twitter fill="currentColor" strokeWidth={0} className="w-4 h-4 hover:text-primary text-[#FFFFFF]" />
                </a>
                <a href="https://www.linkedin.com/company/nextgen-lending-group/" target="_blank" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-[#9C9C9C] transition-colors">
                  <Linkedin fill="currentColor" strokeWidth={0} className="w-4 h-4 hover:text-primary text-[#FFFFFF]" />
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