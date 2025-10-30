import { v } from "convex/values";
import { z } from "zod";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
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
  })
    .searchIndex("search_by_handle", { searchField: "handle" })
    .index("by_userId", ["userId"])
    .index("by_handle", ["handle"])
    .index("by_email", ["email"])
    .index("by_phone", ["phone"]),
  subscriptions: defineTable({
    userId: v.string(),
    subscriptionId: v.string(),
    priceId: v.string(),
    expires: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_subscriptionId", ["subscriptionId"])
    .index("by_priceId", ["priceId"]),
  links: defineTable({
    userId: v.string(),
    anchor: v.string(),
    href: v.string(),
    weight: v.optional(v.number()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});

export const userObject = z.object({
  userId: z.string(),
  handle: z.string().optional(),
  first: z.string().optional(),
  last: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  cover: z.string().optional(),
  bio: z.string().optional(),
});

export type User = z.infer<typeof userObject>;

export const subscriptionObject = z.object({
  userId: z.string(),
  subscriptionId: z.string(),
  expires: z.number(),
  priceId: z.string(),
});

export type Subscription = z.infer<typeof subscriptionObject>;

export const linkObject = z.object({
  userId: z.string(),
  anchor: z.string(),
  href: z.string(),
  weight: z.number().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type Link = z.infer<typeof linkObject>;
