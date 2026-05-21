import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      smallTitle: true,
      writerName: true,
      postedDate: true,
      readTime: true,
      slug: true,
      excerpt: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, smallTitle, writerName, postedDate, readTime, content, excerpt, coverImage, published } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  // Ensure unique slug
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const post = await prisma.post.create({
    data: {
      title,
      smallTitle: smallTitle ?? "",
      writerName: writerName ?? "Admin",
      postedDate: postedDate ? new Date(postedDate) : new Date(),
      readTime: readTime ? parseInt(readTime, 10) : 2,
      slug,
      content,
      excerpt: excerpt ?? null,
      coverImage: coverImage ?? null,
      published: Boolean(published),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
