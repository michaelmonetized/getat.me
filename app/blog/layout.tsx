import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | GetAt.Me Blog",
    default: "Blog | GetAt.Me",
  },
  description:
    "Tips, guides, and insights on personal branding, link-in-bio tools, and growing your creator business.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      {children}
    </main>
  );
}
