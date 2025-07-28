import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostContent, getAllPosts } from "@/lib/blog/server";
import { BlogPostClient } from "@/components/blog/BlogPostClient";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Mike's Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await getPostContent(params.slug);
  const allPosts = getAllPosts();

  // Get related posts based on tags
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <BlogPostClient post={post} content={content} relatedPosts={relatedPosts} />
  );
}
