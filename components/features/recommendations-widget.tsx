"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface RecommendationsWidgetProps {
  userId: string;
  handle: string;
}

// Store recommendation state in sessionStorage for auth flow
const STORAGE_KEY = "pending_recommendation";

export function RecommendationsWidget({ userId }: RecommendationsWidgetProps) {
  const { user, isSignedIn } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user's existing recommendation
  const existingRecommendation = useQuery(
    api.recommendations.getUserRecommendation,
    user?.id && userId ? { recommendedUserId: userId, recommenderUserId: user.id } : "skip"
  );

  // Get all recommendations and stats
  const allRecommendations = useQuery(
    api.recommendations.getRecommendations,
    userId ? { userId } : "skip"
  );
  const stats = useQuery(
    api.recommendations.getRecommendationStats,
    userId ? { userId } : "skip"
  );

  const createRecommendation = useMutation(api.recommendations.createRecommendation);

  // Load pending recommendation from storage after sign-in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      const pending = sessionStorage.getItem(STORAGE_KEY);
      if (pending) {
        try {
          const data = JSON.parse(pending);
          if (data.userId === userId) {
            setRating(data.rating);
            setReview(data.review || "");
            sessionStorage.removeItem(STORAGE_KEY);
            // Auto-submit after sign-in
            handleSubmit(data.rating, data.review || "");
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user?.id, userId]);

  // Load existing recommendation
  useEffect(() => {
    if (existingRecommendation) {
      setRating(existingRecommendation.rating);
      setReview(existingRecommendation.review || "");
    }
  }, [existingRecommendation]);

  const handleSubmit = async (submitRating: number, submitReview: string) => {
    if (!user?.id) {
      // Store in sessionStorage and redirect to sign-up
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ userId, rating: submitRating, review: submitReview })
      );
      router.push("/register");
      return;
    }

    setIsSubmitting(true);
    try {
      await createRecommendation({
        recommendedUserId: userId,
        recommenderUserId: user.id,
        rating: submitRating,
        review: submitReview || undefined,
      });
      toast({
        title: "Recommendation submitted!",
        description: "Thank you for your recommendation.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit recommendation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }
    handleSubmit(rating, review);
  };

  // Get recommender avatars (limit to recent ones)
  const recommenderIds = allRecommendations?.slice(0, 12).map((rec) => rec.recommenderUserId) || [];

  return (
    <div className="space-y-6">
      {/* Recommendation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Recommend Me</CardTitle>
          <CardDescription>Leave a rating and review</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSignedIn ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  placeholder="Write a review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
              </div>
              <SignUpButton mode="modal">
                <Button type="submit" className="w-full" disabled={rating === 0}>
                  Submit Recommendation
                </Button>
              </SignUpButton>
            </form>
          ) : existingRecommendation ? (
            <div className="space-y-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              {review && <p className="text-sm text-muted-foreground">{review}</p>}
              <p className="text-xs text-muted-foreground">Your recommendation</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  placeholder="Write a review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={rating === 0 || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Recommendation"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Recommended By Section */}
      {stats && stats.count > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Recommended by {stats.count}</CardTitle>
            </div>
            <CardDescription>
              Average rating: {stats.averageRating.toFixed(1)} / 5.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {recommenderIds.map((recommenderId) => (
                <RecommenderAvatar key={recommenderId} userId={recommenderId} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RecommenderAvatar({ userId }: { userId: string }) {
  const user = useQuery(api.users.getUserByID, { userId });
  
  if (!user) {
    return <div className="w-10 h-10 rounded-full bg-muted" />;
  }
  
  return (
    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border-2 border-border">
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs font-semibold">
          {(user.handle || user.first || "?")[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}

