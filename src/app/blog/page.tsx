"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/lib/blog/utils";
import { BlogGrid } from "@/components/blog/BlogGrid";
import AOS from "aos";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    // Fetch posts from API
    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data: BlogPost[]) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts");
        setLoading(false);
      });
  }, []);

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    applyFilters(tag, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(selectedTag, query);
  };

  const applyFilters = (tag: string, query: string) => {
    let filtered = posts;

    // Filter by tag
    if (tag !== "all") {
      filtered = filtered.filter((post) =>
        post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
      );
    }

    // Filter by search query
    if (query.trim()) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredPosts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-300">
            Loading blog posts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            Error Loading Posts
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="flex flex-row items-center justify-center mb-6">
            <span className="w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]"></span>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Blog
            </h1>
            <span className="w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]"></span>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            My random thoughts....
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4" data-aos="fade-up" data-aos-delay="400">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md leading-5 bg-white dark:bg-zinc-800 placeholder-zinc-500 focus:outline-none focus:placeholder-zinc-400 focus:ring-1 focus:ring-primary-color focus:border-primary-color text-zinc-900 dark:text-white"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTagChange("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === "all"
                  ? "bg-primary-color text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              All ({posts.length})
            </button>
            {tags.map((tag) => {
              const count = posts.filter((post) =>
                post.tags.some(
                  (postTag) => postTag.toLowerCase() === tag.toLowerCase()
                )
              ).length;

              return (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-primary-color text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Grid */}
        <div data-aos="fade-up" data-aos-delay="600">
          <BlogGrid posts={filteredPosts} />
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && posts.length > 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="text-zinc-500 dark:text-zinc-400">
              <svg
                className="mx-auto h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                No posts match your filters
              </h3>
              <p className="text-sm">
                Try adjusting your search or tag filters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
