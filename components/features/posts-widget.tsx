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
import { Label } from "@/components/ui/label";
import { Sparkles, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export function PostsWidget() {
  const { user } = useUser();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  // Detect dark mode from document
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setColorMode(isDark ? "dark" : "light");
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);
    return () => mediaQuery.removeEventListener("change", checkDarkMode);
  }, []);

  const posts = useQuery(
    api.posts.getPosts,
    user?.id ? { userId: user.id } : "skip"
  );
  const createPost = useMutation(api.posts.createPost);
  const deletePost = useMutation(api.posts.deletePost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !content.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        userId: user.id,
        content: content.trim(),
      });
      setContent("");
      toast({
        title: "Post created!",
        description: "Your post has been published.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-content">Post Content (Markdown)</Label>
            <div data-color-mode={colorMode}>
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                preview="edit"
                height={400}
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </form>

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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                      <Trash2 className="h-4 w-4" />
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
