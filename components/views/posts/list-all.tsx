"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Post } from "@/convex/posts";
import { type User } from "@/hooks/user";
import { PostCard } from "./card";

export function PostsList({ user = undefined }: { user?: User }) {
  const userPosts: Post[] | undefined = useQuery(api.posts.getPosts, {
    userId: user?.id ?? "",
  });
  const allPosts: Post[] | undefined = useQuery(api.posts.getAllPosts);

  const posts = user ? userPosts : allPosts;

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
