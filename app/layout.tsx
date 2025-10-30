import type { Metadata } from "next";
import "./fonts/max.css";
import "./globals.css";
import Providers from "@/context";
import { SetHandleModal } from "@/components/set-handle-modal";
import { Navbar } from "@/components/navbar";

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
          {children}
          <SetHandleModal />
        </Providers>
      </body>
    </html>
  );
}
