import type { Metadata } from "next";
import "./fonts/max.css";
import "./globals.css";
import Providers from "@/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Get At Me",
  description: "Truly Engaging Link Pages",
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
