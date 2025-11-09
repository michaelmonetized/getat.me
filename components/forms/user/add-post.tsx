"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function AddPostForm() {
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

  const createPost = useMutation(api.posts.createPost);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div data-color-mode={colorMode}>
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || "")}
            preview="edit"
            height={400}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
