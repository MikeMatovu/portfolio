"use client";

import React from "react";
import Link from "next/link";
import { BlogPost, formatDate } from "@/lib/blog/utils";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-primary-color transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 line-clamp-3">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-color/10 text-primary-color"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
