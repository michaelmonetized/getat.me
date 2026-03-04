import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const updateBranding = mutation({
  args: {
    brandColor: v.optional(v.string()),
    fontFamily: v.optional(v.string()),
    buttonStyle: v.optional(v.string()),
    backgroundType: v.optional(v.string()),
    backgroundColor: v.optional(v.string()),
    backgroundImage: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await getCurrentUser(ctx, true);
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity as string))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.patch(user._id, args);
  },
});

export const getBranding = query({
  args: { handle: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    if (!user) return null;

    const backgroundImageUrl = user.backgroundImage
      ? await ctx.storage.getUrl(user.backgroundImage)
      : undefined;

    return {
      brandColor: user.brandColor,
      fontFamily: user.fontFamily,
      buttonStyle: user.buttonStyle,
      backgroundType: user.backgroundType,
      backgroundColor: user.backgroundColor,
      backgroundImageUrl: backgroundImageUrl ?? undefined,
    };
  },
});
