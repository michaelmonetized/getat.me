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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GetAt.Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetAt.Me — The Relationship-First Link-In-Bio",
    description:
      "Turn attention into loyal relationships. The modern link-in-bio platform.",
    images: ["/og-image.png"],
    creator: "@MichaelH_rley",
  },
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
