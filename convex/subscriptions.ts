import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

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

// Helper function to map priceId to plan slug
function getPlanSlugFromPriceId(priceId: string): string | undefined {
  const plans = {
    "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu": "premium",
    "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf": "pro",
    "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9": "promax",
  };
  return plans[priceId as keyof typeof plans];
}

export const updateUserSubscriptionPlan = internalMutation({
  args: {
    userId: v.string(),
    priceId: v.string(),
  },
  handler: async (ctx, args) => {
    const planSlug = getPlanSlugFromPriceId(args.priceId);
    if (!planSlug) {
      return; // Unknown plan, skip update
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { subscriptionPlan: planSlug });
  },
});
