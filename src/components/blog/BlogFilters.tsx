"use client";

import React, { useState } from "react";
import {
  BlogPost,
  getUniqueTagsFromPosts,
  filterPostsByTag,
  searchPosts,
} from "@/lib/blog/utils";

interface BlogFiltersProps {
  posts: BlogPost[];
  onFilterChange: (filteredPosts: BlogPost[]) => void;
}

export function BlogFilters({ posts, onFilterChange }: BlogFiltersProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tags = getUniqueTagsFromPosts(posts);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    applyFilters(tag, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(selectedTag, query);
  };

  const applyFilters = (tag: string, query: string) => {
    let filteredPosts = posts;

    // Filter by tag
    if (tag !== "all") {
      filteredPosts = filterPostsByTag(filteredPosts, tag);
    }

    // Filter by search query
    filteredPosts = searchPosts(filteredPosts, query);

    onFilterChange(filteredPosts);
  };

  return (
    <div className="mb-8 space-y-4">
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
          const count = filterPostsByTag(posts, tag).length;

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
  );
}
