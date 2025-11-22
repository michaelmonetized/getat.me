import { auth, User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
export type ClerkUser = {
  id: string;
  imageUrl?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export async function clerkUser({ clerkUserID }: { clerkUserID: string }) {
  const client = await clerkClient();
  return (await client.users.getUser(clerkUserID)) as User;
}

export const userHas = async ({
  plan,
  feature,
}: {
  plan?: string;
  feature?: string;
}) => {
  const { has } = await auth();

  if (plan) {
    return has({ plan });
  }

  if (feature) {
    return has({ feature });
  }

  return false;
};
