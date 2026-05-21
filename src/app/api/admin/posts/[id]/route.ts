import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// GET /api/admin/posts/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

// PATCH /api/admin/posts/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, smallTitle, writerName, postedDate, readTime, content, excerpt, coverImage, published } = body;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Re-slug only if title changed
  let slug = existing.slug;
  if (title && title !== existing.title) {
    const baseSlug = slugify(title);
    slug = baseSlug;
    let counter = 1;
    while (true) {
      const conflict = await prisma.post.findUnique({ where: { slug } });
      if (!conflict || conflict.id === id) break;
      slug = `${baseSlug}-${counter++}`;
    }
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(title !== undefined && { title, slug }),
      ...(smallTitle !== undefined && { smallTitle }),
      ...(writerName !== undefined && { writerName }),
      ...(postedDate !== undefined && { postedDate: postedDate ? new Date(postedDate) : existing.postedDate }),
      ...(readTime !== undefined && { readTime: readTime ? parseInt(readTime, 10) : existing.readTime }),
      ...(content !== undefined && { content }),
      ...(excerpt !== undefined && { excerpt }),
      ...(coverImage !== undefined && { coverImage }),
      ...(published !== undefined && { published: Boolean(published) }),
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/admin/posts/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
