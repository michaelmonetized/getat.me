import { Badge } from "@/components/ui/badge";
import { type User } from "@/hooks/user";

export default function Plan({ user }: { user: User }) {
  return (
    <>
      {user?.subscriptionPlan && (
        <Badge variant="outline">{user.subscriptionPlan}</Badge>
      )}
    </>
  );
}
