import Link from "next/link";
import { ArrowRight, Clock, CalendarDays,ContactIcon } from "lucide-react";

const posts = [
  {
    slug: "first-home-buyer-guide",
    title: "Complete Guide for First Home Buyers in 2024",
    excerpt: "Everything you need to know before buying your first home — from pre-approval to settlement day.",
    category: "Home Loans",
    date: "Mar 10, 2024",
    author: "xyz",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    slug: "investment-loan-tips",
    title: "Top 5 Tips for Getting the Best Investment Loan",
    excerpt: "How to structure your investment loan to maximise returns and minimise your tax liability.",
    category: "Investment",
    date: "Feb 28, 2024",
    author: "xyz",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80",
  },
  {
    slug: "refinancing-when-to-do-it",
    title: "When Should You Refinance Your Home Loan?",
    excerpt: "Key signs it is time to refinance and how to navigate the process without unnecessary stress.",
    category: "Refinancing",
    date: "Feb 14, 2024",
    author: "xyz",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    slug: "interest-rates-explained",
    title: "Fixed vs Variable Interest Rates Explained",
    excerpt: "Understand the key differences and choose the rate type that suits your financial situation.",
    category: "Education",
    date: "Jan 30, 2024",
    author: "xyz",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  // {
  //   slug: "commercial-loans-guide",
  //   title: "Everything You Need to Know About Commercial Loans",
  //   excerpt: "A complete breakdown of commercial lending — types, eligibility criteria, and how to apply.",
  //   category: "Commercial",
  //   date: "Jan 15, 2024",
  //   readTime: "7 min read",
  //   image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  // },
  // {
  //   slug: "borrowing-capacity-tips",
  //   title: "How to Increase Your Borrowing Capacity",
  //   excerpt: "Practical steps you can take right now to improve your borrowing power before applying.",
  //   category: "Tips",
  //   date: "Jan 5, 2024",
  //   readTime: "5 min read",
  //   image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  // },
];

const categories = ["All", "Home Loans", "Investment", "Refinancing", "Commercial", "Education", "Tips"];

const categoryColors: Record<string, string> = {
  "Home Loans": "#3b1fa3",
  Investment: "#059669",
  Refinancing: "#d97706",
  Education: "#0284c7",
  Commercial: "#7c3aed",
  Tips: "#db2777",
  All: "#3b1fa3",
};

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Page Header ── */}
      <div className="border-b border-gray-100 py-14 bg-white">
        <div className="max-w-7xl mx-auto px-16 ">
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#6c47d9" }}>
            Our Blog
          </p>
          <h1 className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: "#0f0a1e" }}>
            Insights on Finance &amp; Mortgages
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Expert tips, guides and market updates to help you make confident
            financial decisions at every stage.
          </p>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-16 ">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 border"
                style={i === 0
                  ? { backgroundColor: "#3b1fa3", color: "white", borderColor: "#3b1fa3" }
                  : { backgroundColor: "white", color: "#6b7280", borderColor: "#e5e7eb" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <div className="max-w-7xl mx-auto px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-50 transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-gray-50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: categoryColors[post.category] ?? "#3b1fa3" }}
                >
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={11} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ContactIcon size={11} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-sm font-bold leading-snug mb-2 group-hover:text-purple-700 transition-colors"
                  style={{ color: "#0f0a1e" }}>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-150 hover:gap-2.5"
                  style={{ color: "#3b1fa3" }}
                >
                  Read More <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl border-2 transition-colors hover:text-purple-700 hover:border-purple-300"
            style={{ borderColor: "#e0d9ff", color: "#3b1fa3" }}
          >
            Load More Articles
          </button>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="border-t border-gray-100 py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-black mb-2" style={{ color: "#0f0a1e" }}>
            Have a question about your loan?
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Speak to one of our expert brokers — free consultation, zero obligation.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3 rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #3b1fa3, #6c47d9)" }}
          >
            Book a Free Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </div>

    </div>
  );
}