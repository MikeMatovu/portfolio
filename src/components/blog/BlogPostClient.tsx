"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog/utils";
import { formatDate } from "@/lib/blog/utils";
import AOS from "aos";

interface BlogPostClientProps {
  post: BlogPost;
  content: string;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({
  post,
  content,
  relatedPosts,
}: BlogPostClientProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-16">
        {/* Back Button */}
        <div className="mb-8" data-aos="fade-up">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-color hover:text-primary-color/80 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-12" data-aos="fade-up" data-aos-delay="200">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-color/10 text-primary-color rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-6">
                {post.description}
              </p>
              <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readingTime && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-zinc dark:prose-invert max-w-none mb-12"
            data-aos="fade-up"
            data-aos-delay="400"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Article Footer */}
          <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div
              className="flex items-center justify-between"
              data-aos="fade-up"
            >
              <p className="text-zinc-600 dark:text-zinc-300">
                Thank you for reading! If you enjoyed this post, please share
                it.
              </p>
              <div className="flex space-x-4">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(
                    `${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                    }/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-primary-color transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                    }/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-primary-color transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-16" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary-color/20 dark:hover:border-primary-color/20 transition-colors">
                    <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-primary-color transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                      {relatedPost.description}
                    </p>
                    <div className="flex items-center text-xs text-zinc-400">
                      <time dateTime={relatedPost.date}>
                        {formatDate(relatedPost.date)}
                      </time>
                      {relatedPost.readingTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.readingTime}</span>
                        </>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
