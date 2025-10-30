import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const createLink = mutation({
  args: {
    anchor: v.string(),
    href: v.string(),
    weight: v.optional(v.number()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  returns: v.id("links"),
  handler: async (ctx, args) => {
    // Try to get user from auth if userId not provided
    let userId = args.userId;

    if (!userId) {
      const user = await getCurrentUser(ctx, true);
      if (user && typeof user === "string") {
        userId = user;
      }
    }

    if (!userId) {
      throw new Error("User not found. Please sign in.");
    }

    return await ctx.db.insert("links", {
      userId,
      anchor: args.anchor,
      href: args.href,
      weight: args.weight,
      color: args.color,
      icon: args.icon,
    });
  },
});

export const getUserLinksByHandle = query({
  args: {
    handle: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db
      .query("links")
      .filter((q) => q.eq(q.field("userId"), user.userId))
      .collect();
  },
});

export const updateLink = mutation({
  args: {
    id: v.id("links"),
    anchor: v.optional(v.string()),
    href: v.optional(v.string()),
    weight: v.optional(v.number()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Try to get user from auth if userId not provided
    let userId = args.userId;

    if (!userId) {
      const user = await getCurrentUser(ctx, true);
      if (user && typeof user === "string") {
        userId = user;
      }
    }

    if (!userId) {
      throw new Error("User not found. Please sign in.");
    }

    const link = await ctx.db.get(args.id);

    if (!link) {
      throw new Error("Link not found");
    }

    if (link.userId !== userId) {
      throw new Error("Link not found");
    }

    const { id, userId: _, ...updateData } = args;

    await ctx.db.patch(args.id, updateData);
    return null;
  },
});

export const deleteLink = mutation({
  args: {
    id: v.id("links"),
    userId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Try to get user from auth if userId not provided
    let userId = args.userId;

    if (!userId) {
      const user = await getCurrentUser(ctx, true);
      if (user && typeof user === "string") {
        userId = user;
      }
    }

    if (!userId) {
      throw new Error("User not found. Please sign in.");
    }

    const link = await ctx.db.get(args.id);

    if (!link) {
      throw new Error("Link not found");
    }

    if (link.userId !== userId) {
      throw new Error("Link not found");
    }

    await ctx.db.delete(args.id);
    return null;
  },
});
