import Image from "next/image";
import { PiUserLight } from "react-icons/pi";
import { type User } from "@/hooks/user";

type UserWithAvatarUrl = User & { avatarUrl?: string };

export default function Avatar({ user }: { user: User }) {
  if (!user) {
    return <PiUserLight className="w-16 h-16 rounded-full object-cover" />;
  }

  // avatarUrl is the URL from Convex storage (added by getUserByID query)
  // imageUrl is from Clerk
  // avatar is the storage ID, not a URL, so we skip it
  const userWithAvatar = user as UserWithAvatarUrl;
  const avatarUrl = userWithAvatar?.avatarUrl || user?.imageUrl;

  // Validate that avatarUrl is a valid URL before using it
  // Next.js Image requires absolute URLs (http:// or https://) or paths starting with /
  const isValidUrl =
    avatarUrl &&
    typeof avatarUrl === "string" &&
    (avatarUrl.startsWith("http://") ||
      avatarUrl.startsWith("https://") ||
      avatarUrl.startsWith("/"));

  return (
    <>
      {isValidUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
          width={64}
          height={64}
        />
      ) : (
        <PiUserLight className="w-16 h-16 rounded-full object-cover" />
      )}
    </>
  );
}
