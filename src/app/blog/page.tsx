import BlogClient from "./BlogClient";

// Strapi se data fetch
async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*&sort=publishedAt:desc`,
      {
        next: { revalidate: 60 },
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch (error) {
    console.error("Strapi fetch error:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();
  return <BlogClient posts={posts} />;
}