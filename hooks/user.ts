"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { User as ConvexUser } from "@/convex/schema";
import { type ClerkUser } from "@/lib/types";
import { getClerkUser } from "@/app/actions/clerk-user";
import { useEffect, useState } from "react";

type User =
  | (ConvexUser &
      ClerkUser & {
        verified: boolean | null;
        vetted: boolean | null;
      })
  | null;

function useUserVerified(userId: string) {
  return useQuery(api.verifications.getVerification, {
    userId: userId,
    type: "verified",
  });
}

function useUserVetted(userId: string) {
  return useQuery(api.verifications.getVerification, {
    userId: userId,
    type: "vetted",
  });
}

function useUser(userId: string) {
  const userFromConvex = useQuery(api.users.getUserByID, { userId });
  const [userFromClerk, setUserFromClerk] = useState<ClerkUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const userVerified = useUserVerified(userId);
  const userVetted = useUserVetted(userId);

  useEffect(() => {
    if (!userId) return;

    let canceled = false;

    async function fetchClerkUser() {
      try {
        const user = await getClerkUser(userId);
        if (!canceled) {
          setUserFromClerk(user);
        }
      } catch (err) {
        if (!canceled) {
          setError(err as Error);
        }
      }
    }

    fetchClerkUser();

    return () => {
      canceled = true;
    };
  }, [userId]);

  if (error) {
    throw error;
  }

  if (!userFromConvex || !userFromClerk) {
    return null;
  }

  return {
    ...userFromConvex,
    ...userFromClerk,
    verified: userVerified ? true : false,
    vetted: userVetted ? true : false,
  };
}

function useUserByHandle(handle: string) {
  const convexUser = useQuery(api.users.getUserByHandle, { handle });
  const user = useUser(convexUser?.userId ?? "");

  return user ?? null;
}

export { useUserVerified, useUserVetted, useUser, useUserByHandle, type User };
