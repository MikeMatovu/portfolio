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

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return posts;

  const searchLower = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
}

export function getUniqueTagsFromPosts(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
