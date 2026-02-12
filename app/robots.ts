import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/account/",
          "/onboarding/",
          "/login",
          "/register",
          "/sentry-example-page/",
        ],
      },
    ],
    sitemap: "https://getat.me/sitemap.xml",
  };
}
