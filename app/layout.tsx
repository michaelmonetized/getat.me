import type { Metadata } from "next";
import "./fonts/max.css";
import "./globals.css";
import Providers from "@/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const siteUrl = "https://getat.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GetAt.Me — The Relationship-First Link-In-Bio",
    template: "%s | GetAt.Me",
  },
  description:
    "Turn attention into loyal relationships. The modern link-in-bio platform for creators, consultants, and service-led businesses.",
  keywords: [
    "link in bio",
    "creator platform",
    "personal branding",
    "booking",
    "reviews",
    "referrals",
    "payments",
  ],
  authors: [{ name: "GetAt.Me" }],
  creator: "GetAt.Me",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GetAt.Me",
    title: "GetAt.Me — The Relationship-First Link-In-Bio",
    description:
      "Turn attention into loyal relationships. The modern link-in-bio platform for creators, consultants, and service-led businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetAt.Me — The Relationship-First Link-In-Bio",
    description:
      "Turn attention into loyal relationships. The modern link-in-bio platform.",
    creator: "@MichaelH_rley",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GetAt.Me",
              url: siteUrl,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "The relationship-first link-in-bio platform for creators, consultants, and service-led businesses.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "GetAt.Me",
                url: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <div className="flex flex-col items-center justify-center min-h-dvh min-w-dvw max-w-dvw">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
