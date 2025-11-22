import Image from "next/image";
import { PiUserLight } from "react-icons/pi";
import { type User } from "@/hooks/user";

export default function Avatar({ user }: { user: User }) {
  const avatar = user?.avatar || user?.imageUrl;

  return (
    <>
      {avatar ? (
        <Image
          src={avatar}
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
