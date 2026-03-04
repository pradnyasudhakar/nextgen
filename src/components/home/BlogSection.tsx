import Link from "next/link";
import Image from "next/image";
import { Label, H2, Highlight, P } from "../ui/typography";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const posts = [
  {
    slug: "home-loan-vs-investment-loan",
    title:
      "Home Loan vs Investment Loan: What's the difference, and which suits you?",
    image: "/images/blog-1.png",
  },
  {
    slug: "equipment-finance-101",
    title:
      "Equipment Finance 101: Buy vs lease, and how to get approved faster",
    image: "/images/blog-2.png",
  },
  {
    slug: "smsf-property-finance",
    title: "SMSF Property Finance: The rules and the biggest mistakes to avoid",
    image: "/images/blog-3.png",
  },
];

export default function BlogSection() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <Label className=" mb-4">BLOGS</Label>
            <H2 className="">
              <Highlight>Latest</Highlight> Financial Guides &amp; News
            </H2>
          </div>
          <Button href="/blog" variant="outline-rounded">
            View More
          </Button>
        </div>

        {/* ── Blog Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden mb-5 h-52 bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <P className="h4 mb-4">{post.title}</P>

              {/* Read Article */}
              <Link
                href={`/blog/${post.slug}`}
                className=" text-[1rem] flex items-center text-primary px-0"
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
          <Link href="/blog" className="btn-outline">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
