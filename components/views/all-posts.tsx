"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { PiTrashLight } from "react-icons/pi";
import { Post } from "@/convex/posts";
import { UserHandle } from "../user-handle";

export function AllPosts() {
  const { user } = useUser();
  const { toast } = useToast();
  const posts: Post[] | undefined = useQuery(api.posts.getAllPosts);
  const deletePost = useMutation(api.posts.deletePost);

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

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          const isMyPost = post.userId === (user?.id as string);
          return (
            <div key={post._id}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <UserHandle clerkUserID={post.userId} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </CardContent>
                <CardFooter>
                  {isMyPost && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(post._id)}
                    >
                      <PiTrashLight className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          );
        })}
    </>
  );
}
