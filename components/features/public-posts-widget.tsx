"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PublicPostsWidgetProps {
  userId: string;
}

export function PublicPostsWidget({ userId }: PublicPostsWidgetProps) {
  const posts = useQuery(
    api.posts.getPosts,
    userId ? { userId } : "skip"
  );

  if (posts === undefined) {
    return null;
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Posts</CardTitle>
            <CardDescription>Latest updates and thoughts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="border-b last:border-b-0 pb-6 last:pb-0">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

