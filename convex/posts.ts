import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPosts = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const createPost = mutation({
  args: {
    userId: v.string(),
    content: v.string(),
    media: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      userId: args.userId,
      content: args.content,
      media: args.media,
      createdAt: Date.now(),
    });
  },
});

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.postId);
  },
});

