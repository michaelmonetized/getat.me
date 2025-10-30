import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  returns: v.object({ url: v.string() }),
  handler: async (ctx) => {
    const url = await ctx.storage.generateUploadUrl();
    return { url };
  },
});

export const getFileUrl = mutation({
  args: { fileId: v.id("_storage") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});
