import { v } from "convex/values";
import {
  ActionCtx,
  MutationCtx,
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";

export async function getCurrentUser(
  ctx: QueryCtx | MutationCtx | ActionCtx,
  id?: boolean
) {
  const user = await ctx.auth.getUserIdentity();

  if (id) {
    return user?.subject;
  }

  return user;
}

export const getUserByID = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const getUserByHandle = query({
  args: {
    handle: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      userId: v.string(),
      handle: v.optional(v.string()),
      first: v.optional(v.string()),
      last: v.optional(v.string()),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      avatar: v.optional(v.id("_storage")),
      cover: v.optional(v.id("_storage")),
      bio: v.optional(v.string()),
      theme: v.optional(v.string()),
      avatarUrl: v.optional(v.string()),
      coverUrl: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    if (!profile) {
      return null;
    }

    // Get URLs for avatar and cover
    const avatarUrl = profile.avatar
      ? await ctx.storage.getUrl(profile.avatar)
      : undefined;
    const coverUrl = profile.cover
      ? await ctx.storage.getUrl(profile.cover)
      : undefined;

    return {
      ...profile,
      avatarUrl: avatarUrl ?? undefined,
      coverUrl: coverUrl ?? undefined,
    };
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUserByPhone = query({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
  },
});

export const getUserBy = query({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const { key, value } = args;

    if (key in ["email", "phone", "userId", "handle"]) {
      switch (key) {
        case "email":
          return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", value))
            .first();
        case "phone":
          return await ctx.db
            .query("users")
            .withIndex("by_phone", (q) => q.eq("phone", value))
            .first();
        case "userId":
          return await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", value))
            .first();
        case "handle":
          return await ctx.db
            .query("users")
            .withIndex("by_handle", (q) => q.eq("handle", value))
            .first();
      }
    }
  },
});

export const createUser = internalMutation({
  args: {
    userId: v.string(),
    handle: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    first: v.optional(v.string()),
    last: v.optional(v.string()),
    avatar: v.optional(v.id("_storage")),
    cover: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
    theme: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const createUserPublic = mutation({
  args: {
    userId: v.string(),
    handle: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    first: v.optional(v.string()),
    last: v.optional(v.string()),
    avatar: v.optional(v.id("_storage")),
    cover: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
    theme: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const updateUser = mutation({
  args: {
    userId: v.string(),
    handle: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    first: v.optional(v.string()),
    last: v.optional(v.string()),
    avatar: v.optional(v.id("_storage")),
    cover: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
    theme: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // we won't update the userId so clone args and drop it
    const prev = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!prev) {
      throw new Error("User not found");
    }

    const user = { ...prev, ...args };
    return await ctx.db.patch(prev._id, user);
  },
});

export const deleteUser = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.delete(user._id);
  },
});

export const getUserSubscriptions = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const isHandleUnique = query({
  args: {
    handle: v.string(),
  },
  handler: async (ctx, args) => {
    const handle = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    return !handle;
  },
});

export const getCurrentUserProfile = query({
  args: {
    userId: v.optional(v.string()),
  },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      userId: v.string(),
      handle: v.optional(v.string()),
      first: v.optional(v.string()),
      last: v.optional(v.string()),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      avatar: v.optional(v.id("_storage")),
      cover: v.optional(v.id("_storage")),
      bio: v.optional(v.string()),
      theme: v.optional(v.string()),
      avatarUrl: v.optional(v.string()),
      coverUrl: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    let userId = args.userId;

    // Try to get from auth if userId not provided
    if (!userId) {
      const user = await ctx.auth.getUserIdentity();
      if (user) {
        userId = user.subject;
      }
    }

    if (!userId) {
      return null;
    }

    const profile = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!profile) {
      return null;
    }

    // Get URLs for avatar and cover
    const avatarUrl = profile.avatar
      ? await ctx.storage.getUrl(profile.avatar)
      : undefined;
    const coverUrl = profile.cover
      ? await ctx.storage.getUrl(profile.cover)
      : undefined;

    return {
      ...profile,
      avatarUrl: avatarUrl ?? undefined,
      coverUrl: coverUrl ?? undefined,
    };
  },
});

export const uploadAvatar = mutation({
  args: {
    userId: v.string(),
    fileId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!currentUser) {
      // Create user if doesn't exist
      await ctx.db.insert("users", {
        userId: args.userId,
        avatar: args.fileId,
      });
    } else {
      // Update user with avatar
      await ctx.db.patch(currentUser._id, {
        avatar: args.fileId,
      });
    }
    return null;
  },
});

export const uploadCover = mutation({
  args: {
    userId: v.string(),
    fileId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!currentUser) {
      // Create user if doesn't exist
      await ctx.db.insert("users", {
        userId: args.userId,
        cover: args.fileId,
      });
    } else {
      // Update user with cover
      await ctx.db.patch(currentUser._id, {
        cover: args.fileId,
      });
    }
    return null;
  },
});

export const setHandle = mutation({
  args: {
    handle: v.string(),
    userId: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    // Try to get user from auth first
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

    // Check if handle is unique
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    if (existingUser) {
      throw new Error("Handle is already taken");
    }

    // Check if current user exists
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!currentUser) {
      // Create user if doesn't exist
      const newUserId = await ctx.db.insert("users", {
        userId: userId,
        handle: args.handle,
      });
      return newUserId;
    } else {
      // Update user with handle
      await ctx.db.patch(currentUser._id, {
        handle: args.handle,
      });
      return currentUser._id;
    }
  },
});
