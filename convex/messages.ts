import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to create conversation ID (sorted user IDs)
function getConversationId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join("_");
}

export const getConversations = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get all messages where user is sender or receiver
    const sentMessages = await ctx.db
      .query("messages")
      .withIndex("by_senderUserId", (q) => q.eq("senderUserId", args.userId))
      .collect();

    const receivedMessages = await ctx.db
      .query("messages")
      .withIndex("by_receiverUserId", (q) => q.eq("receiverUserId", args.userId))
      .collect();

    // Group by conversation ID
    const conversations = new Map<string, {
      otherUserId: string;
      lastMessage: typeof sentMessages[0] | typeof receivedMessages[0];
      unreadCount: number;
    }>();

    sentMessages.forEach((msg) => {
      const otherUserId = msg.receiverUserId;
      const convId = getConversationId(args.userId, otherUserId);
      const existing = conversations.get(convId);
      if (!existing || msg.createdAt > existing.lastMessage.createdAt) {
        conversations.set(convId, {
          otherUserId,
          lastMessage: msg,
          unreadCount: 0,
        });
      }
    });

    receivedMessages.forEach((msg) => {
      const otherUserId = msg.senderUserId;
      const convId = getConversationId(args.userId, otherUserId);
      const existing = conversations.get(convId);
      const unreadCount = msg.read ? 0 : 1;
      if (!existing || msg.createdAt > existing.lastMessage.createdAt) {
        conversations.set(convId, {
          otherUserId,
          lastMessage: msg,
          unreadCount,
        });
      } else if (!msg.read) {
        existing.unreadCount += unreadCount;
      }
    });

    return Array.from(conversations.values()).sort(
      (a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt
    );
  },
});

export const getMessages = query({
  args: {
    userId1: v.string(),
    userId2: v.string(),
  },
  handler: async (ctx, args) => {
    const conversationId = getConversationId(args.userId1, args.userId2);
    return await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", conversationId))
      .order("asc")
      .collect();
  },
});

export const sendMessage = mutation({
  args: {
    senderUserId: v.string(),
    receiverUserId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const conversationId = getConversationId(args.senderUserId, args.receiverUserId);
    
    return await ctx.db.insert("messages", {
      conversationId,
      senderUserId: args.senderUserId,
      receiverUserId: args.receiverUserId,
      content: args.content,
      read: false,
      createdAt: Date.now(),
    });
  },
});

export const markMessagesAsRead = mutation({
  args: {
    userId1: v.string(),
    userId2: v.string(),
    readerUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversationId = getConversationId(args.userId1, args.userId2);
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", conversationId))
      .filter((q) => 
        q.and(
          q.eq(q.field("receiverUserId"), args.readerUserId),
          q.eq(q.field("read"), false)
        )
      )
      .collect();

    for (const message of messages) {
      await ctx.db.patch(message._id, { read: true });
    }
  },
});

