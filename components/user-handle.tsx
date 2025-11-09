"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Link from "next/link";
import { PiCheckCircleLight, PiChecksLight } from "react-icons/pi";
import Image from "next/image";

export function UserHandle({ clerkUserID }: { clerkUserID: string }) {
  const user = useQuery(api.users.getUserByID, { userId: clerkUserID });
  const verified = useQuery(api.verifications.getVerification, {
    userId: clerkUserID,
    type: "verified",
  });
  const vetted = useQuery(api.verifications.getVerification, {
    userId: clerkUserID,
    type: "vetted",
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  const avatar = user.avatarUrl;
  let initials = "";

  if (!avatar) {
    initials =
      (user?.first?.charAt(0).toUpperCase() &&
        user?.last?.charAt(0).toUpperCase()) ||
      "";

    if (!initials) {
      return <div>Loading...</div>;
    }
  }

  const handle = user.handle;

  if (!handle) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={`/${handle}`} className="flex items-center gap-2">
      {avatar && (
        <span className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 block p-[5px]">
          <Image
            src={avatar}
            alt={`@${handle}`}
            width={20}
            height={20}
            className="w-full h-full object-cover"
          />
        </span>
      )}
      {!avatar && (
        <span className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 block p-[5px]">
          <span className="text-lg font-semibold text-center">{initials}</span>
        </span>
      )}
      <span>@{handle}</span>
      {verified && (
        <span className="bg-primary text-primary-foreground p-2 rounded-full">
          <PiCheckCircleLight className="h-4 w-4" />
        </span>
      )}
      {vetted && (
        <span className="bg-primary text-primary-foreground p-2 rounded-full">
          <PiChecksLight className="h-4 w-4" />
        </span>
      )}
    </Link>
  );
}
