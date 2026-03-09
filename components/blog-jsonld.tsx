import Script from "next/script";

interface BlogJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
}

export function BlogJsonLd({
  title,
  description,
  slug,
  publishedTime,
}: BlogJsonLdProps) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `https://getat.me/blog/${slug}`,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Organization",
      name: "GetAt.Me",
      url: "https://getat.me",
    },
    publisher: {
      "@type": "Organization",
      name: "GetAt.Me",
      url: "https://getat.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://getat.me/blog/${slug}`,
    },
  }).replace(/</g, "\\u003c");

  return (
    <Script
      id={`blog-jsonld-${slug}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
