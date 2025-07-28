import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  content?: string;
  readingTime?: string;
}

export function getAllPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const stats = fs.statSync(fullPath);

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || stats.birthtime.toISOString().split("T")[0],
        description: data.description || "",
        tags: data.tags || [],
        author: data.author || "Mike Matovu",
        readingTime: calculateReadingTime(fileContents),
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const stats = fs.statSync(fullPath);
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || stats.birthtime.toISOString().split("T")[0],
      description: data.description || "",
      tags: data.tags || [],
      author: data.author || "Mike Matovu",
      content,
      readingTime: calculateReadingTime(fileContents),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getPostContent(slug: string): Promise<string> {
  const post = getPostBySlug(slug);
  if (!post || !post.content) {
    return "";
  }

  const processedContent = await remark().use(html).process(post.content);

  return processedContent.toString();
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
