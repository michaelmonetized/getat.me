import { auth } from "@clerk/nextjs/server";

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

