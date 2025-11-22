"use server";

import { clerkClient, User } from "@clerk/nextjs/server";
import { type ClerkUser } from "@/lib/types";

export async function getClerkUser(clerkUserID: string): Promise<ClerkUser | null> {
  try {
    const client = await clerkClient();
    const user = (await client.users.getUser(clerkUserID)) as User;
    
    return {
      id: user.id,
      imageUrl: user.imageUrl,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (error) {
    console.error("Error fetching Clerk user:", error);
    return null;
  }
}

