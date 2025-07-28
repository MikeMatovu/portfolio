import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-6xl font-bold text-primary-color mb-4">404</div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-md">
          The blog post you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-color hover:bg-secondary-color text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          <div>
            <Link
              href="/"
              className="text-primary-color hover:text-secondary-color transition-colors duration-300"
            >
              Or go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
