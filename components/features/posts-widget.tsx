"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { PiShootingStarLight, PiTrashLight } from "react-icons/pi";
import AddPostForm from "@/components/forms/user/add-post";

export function PostsWidget() {
  const { user } = useUser();
  const { toast } = useToast();

  const posts = useQuery(
    api.posts.getPosts,
    user?.id ? { userId: user.id } : "skip"
  );

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

  if (!user?.id) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <CardTitle>Rich Media Posts</CardTitle>
            <CardDescription>Create and manage your posts</CardDescription>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <PiShootingStarLight className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <AddPostForm />

        {/* Posts List */}
        <div className="space-y-4">
          {posts === undefined ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              You {"haven't"} created any posts yet
            </p>
          ) : (
            posts.map((post) => (
              <Card key={post._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {post.content}
                        </ReactMarkdown>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <PiTrashLight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
