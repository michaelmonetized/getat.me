import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBookingAvailability = query({
  args: {
    userId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("bookingAvailability"),
      _creationTime: v.number(),
      userId: v.string(),
      enabled: v.boolean(),
      defaultStartTime: v.string(),
      defaultEndTime: v.string(),
      monday: v.boolean(),
      tuesday: v.boolean(),
      wednesday: v.boolean(),
      thursday: v.boolean(),
      friday: v.boolean(),
      saturday: v.boolean(),
      sunday: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bookingAvailability")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    // If no availability exists, return null (components will show defaults)
    return existing;
  },
});

export const updateBookingAvailability = mutation({
  args: {
    userId: v.string(),
    enabled: v.optional(v.boolean()),
    defaultStartTime: v.optional(v.string()),
    defaultEndTime: v.optional(v.string()),
    monday: v.optional(v.boolean()),
    tuesday: v.optional(v.boolean()),
    wednesday: v.optional(v.boolean()),
    thursday: v.optional(v.boolean()),
    friday: v.optional(v.boolean()),
    saturday: v.optional(v.boolean()),
    sunday: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bookingAvailability")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    // If creating new, use defaults: M-F 9-5
    const data = {
      userId: args.userId,
      enabled: args.enabled ?? existing?.enabled ?? true,
      defaultStartTime: args.defaultStartTime ?? existing?.defaultStartTime ?? "09:00",
      defaultEndTime: args.defaultEndTime ?? existing?.defaultEndTime ?? "17:00",
      monday: args.monday ?? existing?.monday ?? true,
      tuesday: args.tuesday ?? existing?.tuesday ?? true,
      wednesday: args.wednesday ?? existing?.wednesday ?? true,
      thursday: args.thursday ?? existing?.thursday ?? true,
      friday: args.friday ?? existing?.friday ?? true,
      saturday: args.saturday ?? existing?.saturday ?? false,
      sunday: args.sunday ?? existing?.sunday ?? false,
    };

    if (existing) {
      // Only update fields that were provided
      const updateData: typeof data = { userId: args.userId };
      if (args.enabled !== undefined) updateData.enabled = args.enabled;
      if (args.defaultStartTime !== undefined) updateData.defaultStartTime = args.defaultStartTime;
      if (args.defaultEndTime !== undefined) updateData.defaultEndTime = args.defaultEndTime;
      if (args.monday !== undefined) updateData.monday = args.monday;
      if (args.tuesday !== undefined) updateData.tuesday = args.tuesday;
      if (args.wednesday !== undefined) updateData.wednesday = args.wednesday;
      if (args.thursday !== undefined) updateData.thursday = args.thursday;
      if (args.friday !== undefined) updateData.friday = args.friday;
      if (args.saturday !== undefined) updateData.saturday = args.saturday;
      if (args.sunday !== undefined) updateData.sunday = args.sunday;
      
      return await ctx.db.patch(existing._id, updateData);
    } else {
      // Create new with defaults
      return await ctx.db.insert("bookingAvailability", data);
    }
  },
});
