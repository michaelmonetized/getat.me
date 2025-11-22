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
import { PiTrashLight } from "react-icons/pi";
import { Post } from "@/convex/posts";
import Handle from "../../profile/public/handle";
import { type User, useUser } from "@/hooks/user";

export function PostCard({ post }: { post: Post }) {
  const auth = useCurrentUser();
  const { toast } = useToast();
  const deletePost = useMutation(api.posts.deletePost);
  const postUser: User | undefined = useUser(post.userId);
  const currentUser: User | undefined = useUser(auth?.user?.id ?? "");

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

  const isMyPost = postUser?.userId === (currentUser?.id ?? "");

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
      <CardFooter>
        {isMyPost && (
          <Button variant="destructive" onClick={() => handleDelete(post._id)}>
            <PiTrashLight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
