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

type UseUserResult = {
  user: User;
  isLoading: boolean;
  error: Error | null;
};

function useUserVerified(userId: string) {
  return useQuery(
    api.verifications.getVerification,
    userId ? { userId, type: "verified" } : "skip"
  );
}

function useUserVetted(userId: string) {
  return useQuery(
    api.verifications.getVerification,
    userId ? { userId, type: "vetted" } : "skip"
  );
}

function useUser(userId: string): UseUserResult {
  const userFromConvex = useQuery(
    api.users.getUserByID,
    userId ? { userId } : "skip"
  );
  const [userFromClerk, setUserFromClerk] = useState<ClerkUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingClerk, setIsLoadingClerk] = useState(false);
  const userVerified = useUserVerified(userId);
  const userVetted = useUserVetted(userId);

  useEffect(() => {
    if (!userId) return;

    let canceled = false;
    setIsLoadingClerk(true);
    setError(null);

    async function fetchClerkUser() {
      try {
        const user = await getClerkUser(userId);
        if (!canceled) {
          setUserFromClerk(user);
        }
      } catch (err) {
        if (!canceled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!canceled) {
          setIsLoadingClerk(false);
        }
      }
    }

    fetchClerkUser();

    return () => {
      canceled = true;
    };
  }, [userId]);

  if (!userId) {
    return { user: null, isLoading: false, error: null };
  }

  if (error) {
    return { user: null, isLoading: false, error };
  }

  const isLoading =
    userFromConvex === undefined || isLoadingClerk;

  if (isLoading) {
    return { user: null, isLoading: true, error: null };
  }

  if (!userFromConvex || !userFromClerk) {
    return { user: null, isLoading: false, error: null };
  }

  const user: User = {
    ...userFromConvex,
    ...userFromClerk,
    verified: userVerified ? true : false,
    vetted: userVetted ? true : false,
  };

  return { user, isLoading: false, error: null };
}

function useUserByHandle(handle: string): UseUserResult {
  const convexUser = useQuery(
    api.users.getUserByHandle,
    handle ? { handle } : "skip"
  );
  return useUser(convexUser?.userId ?? "");
}

export {
  useUserVerified,
  useUserVetted,
  useUser,
  useUserByHandle,
  type User,
  type UseUserResult,
};
