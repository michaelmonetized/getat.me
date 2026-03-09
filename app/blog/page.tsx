import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and insights on personal branding, link-in-bio tools, and growing your creator business.",
};

const posts = [
  {
    slug: "best-link-in-bio-alternatives-2026",
    title: "Best Link in Bio Alternatives in 2026",
    description:
      "We compared the top link-in-bio tools for 2026 — Linktree, Beacons, Stan Store, Koji, and GetAt.Me — so you can pick the right one.",
    date: "March 9, 2026",
    category: "Creator Tools",
  },
];

export default function BlogIndex() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-lg text-neutral-500">
        Guides and insights for creators who want to grow.
      </p>
      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-neutral-200 p-6 transition hover:border-blue-400 hover:shadow-md dark:border-neutral-800 dark:hover:border-blue-500"
          >
            <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
              {post.category}
            </p>
            <h2 className="mt-1 text-2xl font-bold">{post.title}</h2>
            <p className="mt-2 text-neutral-500">{post.description}</p>
            <p className="mt-3 text-sm text-neutral-400">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
