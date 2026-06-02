import { prisma } from "@/lib/prisma";
import BlogFaqsClient from "./BlogFaqsClient";

type Props = {
  postId: string; // ← add karo
};

export default async function FAQPage({ postId }: Props) {
  const faqs = await prisma.faq.findMany({  // ← directly faq model se fetch karo
    where: { postId },                       // ← sirf is post ke FAQs
    orderBy: { order: "asc" },
  });

  return <BlogFaqsClient faqs={faqs} />;
}