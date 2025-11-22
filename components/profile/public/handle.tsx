import PublicAvatar from "./avatar";
import { User } from "@/hooks/user";
import VerifiedBadge from "./badges/verified";
import VettedBadge from "./badges/vetted";
import { cn } from "@/lib/utils";
import PlanBadge from "./badges/plan";

export default function PublicHandle({
  user,
  withAvatar = true,
  className = "flex items-center gap-2 justify-start p-2",
  children,
  ...props
}: {
  user: User;
  withAvatar: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!user) {
    return null;
  }

  return (
    <div className={cn(className, "flex-col")} {...props}>
      <div className={cn(className)} {...props}>
        {withAvatar && <PublicAvatar user={user} />}
        <span className="text-2xl font-black handle-heading">
          @{user.handle}
        </span>
        {user.verified && <VerifiedBadge />}
        {user.vetted && <VettedBadge />}
        <PlanBadge user={user} />
      </div>
      {children}
    </div>
  );
}
