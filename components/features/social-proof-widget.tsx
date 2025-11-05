"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export function SocialProofWidget() {
  const { user } = useUser();
  const recommendations = useQuery(
    api.recommendations.getRecommendations,
    user?.id ? { userId: user.id } : "skip"
  );
  const stats = useQuery(
    api.recommendations.getRecommendationStats,
    user?.id ? { userId: user.id } : "skip"
  );

  if (!user?.id) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Social Proof</CardTitle>
            <CardDescription>
              Manage your ratings and reviews
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats && (
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
                <div className="mt-1 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">
                    {stats.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Reviews</div>
                <div className="mt-1 text-2xl font-bold">{stats.count}</div>
              </div>
            </div>
          </div>
        )}

        {recommendations === undefined ? (
          <p className="text-center text-muted-foreground py-8">Loading...</p>
        ) : recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You {"don't"} have any reviews yet
          </p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= rec.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      {rec.review && (
                        <p className="text-sm">{rec.review}</p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

