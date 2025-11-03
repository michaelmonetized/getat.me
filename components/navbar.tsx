"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { user, isSignedIn } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Get At Me
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <Link href="/features" className="text-sm hover:underline">
              Features
            </Link>
            <Link href="/faq" className="text-sm hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
          {isSignedIn && userProfile?.handle ? (
            <Link
              href={`/${userProfile.handle}`}
              className="text-sm hover:underline"
            >
              View Profile
            </Link>
          ) : null}
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent focus:outline-hidden focus:ring-2 focus:ring-ring"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute top-14 left-0 right-0 bg-background/98 border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link
                href="/pricing"
                className="rounded-md px-3 py-2 text-base hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/features"
                className="rounded-md px-3 py-2 text-base hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/faq"
                className="rounded-md px-3 py-2 text-base hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-base hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              {isSignedIn && userProfile?.handle ? (
                <Link
                  href={`/${userProfile.handle}`}
                  className="rounded-md px-3 py-2 text-base hover:bg-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  View Profile
                </Link>
              ) : null}
              <div className="pt-2 px-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
