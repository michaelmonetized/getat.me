import Avatar from "./avatar";
import { type User } from "@/hooks/user";
import { cn } from "@/lib/utils";
import Verified from "./badges/verified";
import Vetted from "./badges/vetted";
import Plan from "./badges/plan";

export default function Handle({
  user,
  withAvatar = true,
  className = "flex items-center gap-2 justify-start p-2",
  children,
  ...props
}: {
  user: User;
  withAvatar?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!user) {
    return null;
  }

  return (
    <div className={cn(className, "flex-col")} {...props}>
      <div className={cn(className)} {...props}>
        {withAvatar && <Avatar user={user} />}
        <span className="text-2xl font-black handle-heading">
          @{user.handle}
        </span>
        {user.verified && <Verified />}
        {user.vetted && <Vetted />}
        <Plan user={user} />
      </div>
      {children}
    </div>
  );
}
