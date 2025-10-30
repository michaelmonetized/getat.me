"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Navbar() {
  const { user, isSignedIn } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Get At Me
        </Link>

        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
}
