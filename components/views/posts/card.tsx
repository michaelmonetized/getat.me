"use client";
import { useUser as useCurrentUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
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
import {
  PiTrashLight,
  PiHeartLight,
  PiHeartFill,
  PiChatCircleLight,
  PiArrowsClockwiseLight,
} from "react-icons/pi";
import { PostWithMeta } from "@/convex/posts";
import Handle from "../../profile/public/handle";
import { type User, useUser } from "@/hooks/user";

interface PostCardProps {
  post: PostWithMeta;
}

export function PostCard({ post }: PostCardProps) {
  const auth = useCurrentUser();
  const { toast } = useToast();
  const deletePost = useMutation(api.posts.deletePost);
  const toggleLike = useMutation(api.posts.toggleLike);
  const postUser: User | undefined = useUser(post.userId);
  const currentUser: User | undefined = useUser(auth?.user?.id ?? "");

  const isSignedIn = !!auth?.user?.id;
  const isMyPost = postUser?.userId === (currentUser?.id ?? "");

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
      <CardFooter className="flex items-center justify-between">
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

          {/* Reply count */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <PiChatCircleLight className="h-5 w-5" />
            {post.replyCount > 0 && <span>{post.replyCount}</span>}
          </div>

          {/* Repost count */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <PiArrowsClockwiseLight className="h-5 w-5" />
            {post.repostCount > 0 && <span>{post.repostCount}</span>}
          </div>
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
      </CardFooter>
    </Card>
  );
}
