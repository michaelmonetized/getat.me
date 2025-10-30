import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createSubscription = internalMutation({
  args: {
    key: v.string(),
    value: v.string(),
    subscriptionId: v.string(),
    priceId: v.string(),
    expires: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex(`by_${args.key}` as any, (q) => q.eq(args.key, args.value))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const subscription = {
      userId: user.userId,
      subscriptionId: args.subscriptionId,
      priceId: args.priceId,
      expires: args.expires,
    };

    return await ctx.db.insert("subscriptions", subscription);
  },
});

export const getSubscriptionsBy = query({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    switch (args.key) {
      case "subscriptionId":
        return await ctx.db
          .query("subscriptions")
          .withIndex("by_subscriptionId", (q) =>
            q.eq("subscriptionId", args.value)
          )
          .first();
      case "priceId":
        return await ctx.db
          .query("subscriptions")
          .withIndex("by_priceId", (q) => q.eq("priceId", args.value))
          .collect();
      case "userId":
        return await ctx.db
          .query("subscriptions")
          .withIndex("by_userId", (q) => q.eq("userId", args.value))
          .collect();
      default:
        throw new Error("Invalid key");
    }
  },
});

export const renewSubscription = internalMutation({
  args: {
    subscriptionId: v.string(),
    expires: v.number(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_subscriptionId", (q) => q.eq("subscriptionId", args.subscriptionId))
      .first();

    if (!subscription || Array.isArray(subscription)) {
      throw new Error("Subscription not found");
    }

    return await ctx.db.patch(subscription._id, { expires: args.expires });
  },
});
