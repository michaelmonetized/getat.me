"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser as useCurrentUser, useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import {
  PiTrashLight,
  PiHeartLight,
  PiHeartFill,
  PiChatCircleLight,
  PiChatCircleFill,
  PiArrowsClockwiseLight,
  PiArrowsClockwiseFill,
} from "react-icons/pi";
import { PostWithMeta } from "@/convex/posts";
import Handle from "../../profile/public/handle";
import { type User, useUser } from "@/hooks/user";

interface PostCardProps {
  post: PostWithMeta;
  onReplyCreated?: () => void;
}

export function PostCard({ post, onReplyCreated }: PostCardProps) {
  const router = useRouter();
  const auth = useCurrentUser();
  const { has } = useAuth();
  const { toast } = useToast();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deletePost = useMutation(api.posts.deletePost);
  const toggleLike = useMutation(api.posts.toggleLike);
  const createPost = useMutation(api.posts.createPost);
  const repost = useMutation(api.posts.repost);
  const undoRepost = useMutation(api.posts.undoRepost);

  const postUser: User | undefined = useUser(post.userId);
  const currentUser: User | undefined = useUser(auth?.user?.id ?? "");

  const isSignedIn = !!auth?.user?.id;
  const isMyPost = postUser?.userId === (currentUser?.id ?? "");
  // ProMax users can reply and repost (dev mode bypasses)
  const canReplyRepost =
    process.env.NODE_ENV === "development" ||
    (has?.({ plan: "promax" }) ?? false);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost({ postId: postId as Id<"posts"> });
      toast({
        title: "Post deleted",
        description: "Your post has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (!isSignedIn || !auth?.user?.id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts.",
        action: (
          <ToastAction altText="Sign in" onClick={() => router.push("/login")}>
            Sign in
          </ToastAction>
        ),
      });
      return;
    }

    try {
      await toggleLike({
        userId: auth.user.id,
        postId: post._id,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleReply = async () => {
    if (!isSignedIn || !auth?.user?.id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to reply.",
        action: (
          <ToastAction altText="Sign in" onClick={() => router.push("/login")}>
            Sign in
          </ToastAction>
        ),
      });
      return;
    }

    if (!canReplyRepost) {
      toast({
        title: "ProMax required",
        description: "Upgrade to ProMax to reply to posts.",
        action: (
          <ToastAction altText="View pricing" onClick={() => router.push("/pricing")}>
            View pricing
          </ToastAction>
        ),
      });
      return;
    }

    setShowReplyForm(!showReplyForm);
  };

  const submitReply = async () => {
    if (!replyContent.trim() || !auth?.user?.id) return;

    setIsSubmitting(true);
    try {
      await createPost({
        userId: auth.user.id,
        content: replyContent.trim(),
        parentId: post._id,
      });
      setReplyContent("");
      setShowReplyForm(false);
      onReplyCreated?.();
      toast({
        title: "Reply posted",
        description: "Your reply has been added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRepost = async () => {
    if (!isSignedIn || !auth?.user?.id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to repost.",
        action: (
          <ToastAction altText="Sign in" onClick={() => router.push("/login")}>
            Sign in
          </ToastAction>
        ),
      });
      return;
    }

    if (!canReplyRepost) {
      toast({
        title: "ProMax required",
        description: "Upgrade to ProMax to repost.",
        action: (
          <ToastAction altText="View pricing" onClick={() => router.push("/pricing")}>
            View pricing
          </ToastAction>
        ),
      });
      return;
    }

    try {
      if (post.isRepostedByUser) {
        await undoRepost({
          userId: auth.user.id,
          postId: post._id,
        });
        toast({
          title: "Repost removed",
        });
      } else {
        await repost({
          userId: auth.user.id,
          postId: post._id,
        });
        toast({
          title: "Reposted!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repost",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Handle user={postUser} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Like button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-1 text-muted-foreground hover:text-red-500"
            >
              {post.isLikedByUser ? (
                <PiHeartFill className="h-5 w-5 text-red-500" />
              ) : (
                <PiHeartLight className="h-5 w-5" />
              )}
              {post.likeCount > 0 && <span>{post.likeCount}</span>}
            </Button>

            {/* Reply button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReply}
              className={`flex items-center gap-1 text-muted-foreground hover:text-blue-500 ${
                showReplyForm ? "text-blue-500" : ""
              }`}
            >
              {showReplyForm ? (
                <PiChatCircleFill className="h-5 w-5 text-blue-500" />
              ) : (
                <PiChatCircleLight className="h-5 w-5" />
              )}
              {post.replyCount > 0 && <span>{post.replyCount}</span>}
            </Button>

            {/* Repost button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRepost}
              className={`flex items-center gap-1 text-muted-foreground hover:text-green-500 ${
                post.isRepostedByUser ? "text-green-500" : ""
              }`}
            >
              {post.isRepostedByUser ? (
                <PiArrowsClockwiseFill className="h-5 w-5 text-green-500" />
              ) : (
                <PiArrowsClockwiseLight className="h-5 w-5" />
              )}
              {post.repostCount > 0 && <span>{post.repostCount}</span>}
            </Button>
          </div>

          {/* Delete button - only for owner */}
          {isMyPost && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(post._id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <PiTrashLight className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyContent("");
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={submitReply}
                disabled={!replyContent.trim() || isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Reply"}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
