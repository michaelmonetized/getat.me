"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser as useCurrentUser } from "@clerk/nextjs";
import { useUser } from "@/hooks/user";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Post } from "@/convex/posts";
import { TiptapEditor } from "@/components/editor/tiptap-editor";

export default function EditPostForm({ post }: { post: Post }) {
  const auth = useCurrentUser();
  const postUser = useUser(post.userId);
  const { toast } = useToast();
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePost = useMutation(api.posts.updatePost);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.user?.id || !content.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePost({
        postId: post._id,
        content: content.trim(),
      });
      toast({
        title: "Post updated!",
        description: "Your post has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!postUser?.id) {
    return null;
  }

  if (postUser.id !== (auth?.user?.id ?? "")) {
    return null;
  }

  // Check if content has actual text (not just HTML tags)
  const hasContent = content.replace(/<[^>]*>/g, "").trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Edit your post..."
          editable={true}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !hasContent}>
          {isSubmitting ? "Updating..." : "Update Post"}
        </Button>
      </div>
    </form>
  );
}
