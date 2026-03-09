/**
 * Seed script to create demo showcase profiles.
 *
 * Run from the Convex dashboard → Functions → seedDemoProfiles:seed
 * Or via CLI:
 *   npx convex run seedDemoProfiles:seed
 *
 * The mutation is idempotent — it skips any demo user that already exists.
 */
import { internalMutation } from "./_generated/server";

const DEMO_USER_IDS = [
  "demo_user_1",
  "demo_user_2",
  "demo_user_3",
  "demo_user_4",
  "demo_user_5",
] as const;

interface DemoProfile {
  user: {
    userId: string;
    handle: string;
    first: string;
    last: string;
    email: string;
    bio: string;
    theme: string;
    brandColor: string;
    fontFamily: string;
    buttonStyle: string;
    backgroundType: string;
    backgroundColor: string;
  };
  sections: {
    name: string;
    weight: number;
    icon?: string;
    description?: string;
  }[];
  /** Links reference sections by index into the sections array above. */
  links: {
    anchor: string;
    href: string;
    weight: number;
    color?: string;
    icon?: string;
    sectionIndex?: number;
  }[];
  booking: {
    enabled: boolean;
    defaultStartTime: string;
    defaultEndTime: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

const profiles: DemoProfile[] = [
  // ── 1. Music Artist ──────────────────────────────────────────────
  {
    user: {
      userId: DEMO_USER_IDS[0],
      handle: "lilwave",
      first: "Marcus",
      last: "Wave",
      email: "lilwave@demo.getat.me",
      bio: "Producer & artist from ATL. New EP \"Neon Drift\" out now 🎵",
      theme: "dark",
      brandColor: "#00f0ff",
      fontFamily: "Space Grotesk",
      buttonStyle: "pill",
      backgroundType: "solid",
      backgroundColor: "#0a0a0f",
    },
    sections: [
      { name: "Music", weight: 0, icon: "music", description: "Stream my music everywhere" },
      { name: "Merch & More", weight: 1, icon: "shopping-bag" },
    ],
    links: [
      { anchor: "Spotify — Neon Drift EP", href: "https://open.spotify.com", weight: 0, color: "#1DB954", icon: "spotify", sectionIndex: 0 },
      { anchor: "Apple Music", href: "https://music.apple.com", weight: 1, color: "#fa2d48", icon: "apple", sectionIndex: 0 },
      { anchor: "YouTube — Official Videos", href: "https://youtube.com", weight: 2, color: "#FF0000", icon: "youtube", sectionIndex: 0 },
      { anchor: "SoundCloud Unreleased", href: "https://soundcloud.com", weight: 3, color: "#ff5500", icon: "soundcloud", sectionIndex: 0 },
      { anchor: "Merch Store", href: "https://shop.example.com", weight: 4, color: "#00f0ff", icon: "shopping-bag", sectionIndex: 1 },
      { anchor: "TikTok", href: "https://tiktok.com", weight: 5, color: "#ffffff", icon: "tiktok" },
    ],
    booking: {
      enabled: true,
      defaultStartTime: "18:00",
      defaultEndTime: "23:00",
      monday: false,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },

  // ── 2. Consultant / Coach ───────────────────────────────────────
  {
    user: {
      userId: DEMO_USER_IDS[1],
      handle: "sarahcoach",
      first: "Sarah",
      last: "Mitchell",
      email: "sarah@demo.getat.me",
      bio: "Executive coach helping leaders scale with clarity. Forbes 30 Under 30. Author of \"Lead Louder.\"",
      theme: "light",
      brandColor: "#4f46e5",
      fontFamily: "Inter",
      buttonStyle: "rounded",
      backgroundType: "solid",
      backgroundColor: "#f8f7ff",
    },
    sections: [
      { name: "Work With Me", weight: 0, icon: "calendar", description: "Coaching & consulting services" },
      { name: "Content", weight: 1, icon: "mic", description: "Podcast, articles & talks" },
      { name: "Connect", weight: 2, icon: "link" },
    ],
    links: [
      { anchor: "Book a Strategy Call", href: "https://calendly.com", weight: 0, color: "#4f46e5", icon: "calendar", sectionIndex: 0 },
      { anchor: "Leadership Coaching (6-week)", href: "https://example.com/coaching", weight: 1, color: "#6366f1", icon: "users", sectionIndex: 0 },
      { anchor: "Lead Louder Podcast", href: "https://podcasts.apple.com", weight: 2, color: "#7c3aed", icon: "mic", sectionIndex: 1 },
      { anchor: "Latest on Harvard Business Review", href: "https://hbr.org", weight: 3, color: "#1e293b", icon: "file-text", sectionIndex: 1 },
      { anchor: "LinkedIn", href: "https://linkedin.com", weight: 4, color: "#0A66C2", icon: "linkedin", sectionIndex: 2 },
      { anchor: "Twitter / X", href: "https://x.com", weight: 5, color: "#000000", icon: "twitter", sectionIndex: 2 },
    ],
    booking: {
      enabled: true,
      defaultStartTime: "09:00",
      defaultEndTime: "16:00",
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: false,
      saturday: false,
      sunday: false,
    },
  },

  // ── 3. Restaurant ───────────────────────────────────────────────
  {
    user: {
      userId: DEMO_USER_IDS[2],
      handle: "thesmokehaus",
      first: "The Smoke",
      last: "Haus",
      email: "info@demo.getat.me",
      bio: "Wood-fired BBQ in Austin, TX. Brisket so good it'll make you cry. Open Tue–Sun.",
      theme: "warm",
      brandColor: "#c2410c",
      fontFamily: "Playfair Display",
      buttonStyle: "rounded",
      backgroundType: "solid",
      backgroundColor: "#fef3e2",
    },
    sections: [
      { name: "Order & Reserve", weight: 0, icon: "utensils", description: "Get food or book a table" },
      { name: "Follow Us", weight: 1, icon: "heart" },
    ],
    links: [
      { anchor: "View Full Menu", href: "https://example.com/menu", weight: 0, color: "#c2410c", icon: "book-open", sectionIndex: 0 },
      { anchor: "Order on DoorDash", href: "https://doordash.com", weight: 1, color: "#FF3008", icon: "truck", sectionIndex: 0 },
      { anchor: "Order on Uber Eats", href: "https://ubereats.com", weight: 2, color: "#06C167", icon: "shopping-bag", sectionIndex: 0 },
      { anchor: "Yelp — 4.8 ★ (2.1k reviews)", href: "https://yelp.com", weight: 3, color: "#d32323", icon: "star", sectionIndex: 0 },
      { anchor: "Instagram @thesmokehaus", href: "https://instagram.com", weight: 4, color: "#E4405F", icon: "instagram", sectionIndex: 1 },
      { anchor: "Facebook", href: "https://facebook.com", weight: 5, color: "#1877F2", icon: "facebook", sectionIndex: 1 },
    ],
    booking: {
      enabled: true,
      defaultStartTime: "11:00",
      defaultEndTime: "21:00",
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
  },

  // ── 4. Content Creator / Developer ──────────────────────────────
  {
    user: {
      userId: DEMO_USER_IDS[3],
      handle: "devjake",
      first: "Jake",
      last: "Chen",
      email: "jake@demo.getat.me",
      bio: "Full-stack dev & content creator. Building in public, breaking things on stream. 120k on YouTube.",
      theme: "dark",
      brandColor: "#22d3ee",
      fontFamily: "JetBrains Mono",
      buttonStyle: "sharp",
      backgroundType: "solid",
      backgroundColor: "#0f172a",
    },
    sections: [
      { name: "Watch & Follow", weight: 0, icon: "play", description: "Streams, videos, and content" },
      { name: "Community", weight: 1, icon: "users", description: "Join the crew" },
      { name: "Projects", weight: 2, icon: "code" },
    ],
    links: [
      { anchor: "YouTube — Tutorials & Vlogs", href: "https://youtube.com", weight: 0, color: "#FF0000", icon: "youtube", sectionIndex: 0 },
      { anchor: "Twitch — Live Coding", href: "https://twitch.tv", weight: 1, color: "#9146FF", icon: "twitch", sectionIndex: 0 },
      { anchor: "Twitter / X", href: "https://x.com", weight: 2, color: "#ffffff", icon: "twitter", sectionIndex: 0 },
      { anchor: "Discord Server (8k members)", href: "https://discord.gg", weight: 3, color: "#5865F2", icon: "message-circle", sectionIndex: 1 },
      { anchor: "GitHub — Open Source", href: "https://github.com", weight: 4, color: "#ffffff", icon: "github", sectionIndex: 2 },
      { anchor: "Dev Blog", href: "https://dev.to", weight: 5, color: "#22d3ee", icon: "edit", sectionIndex: 2 },
    ],
    booking: {
      enabled: true,
      defaultStartTime: "10:00",
      defaultEndTime: "18:00",
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false,
    },
  },

  // ── 5. Photographer ─────────────────────────────────────────────
  {
    user: {
      userId: DEMO_USER_IDS[4],
      handle: "lensbylex",
      first: "Alexis",
      last: "Moreau",
      email: "lex@demo.getat.me",
      bio: "NYC portrait & editorial photographer. Vogue, GQ, Elle. Currently booking Fall 2026.",
      theme: "minimal",
      brandColor: "#a3a3a3",
      fontFamily: "Cormorant Garamond",
      buttonStyle: "outline",
      backgroundType: "solid",
      backgroundColor: "#fafafa",
    },
    sections: [
      { name: "Portfolio", weight: 0, icon: "camera", description: "Selected works" },
      { name: "Shop & Socials", weight: 1, icon: "shopping-bag" },
    ],
    links: [
      { anchor: "Full Portfolio", href: "https://example.com/portfolio", weight: 0, color: "#171717", icon: "image", sectionIndex: 0 },
      { anchor: "Editorial Work", href: "https://example.com/editorial", weight: 1, color: "#525252", icon: "book-open", sectionIndex: 0 },
      { anchor: "Instagram @lensbylex", href: "https://instagram.com", weight: 2, color: "#E4405F", icon: "instagram", sectionIndex: 1 },
      { anchor: "Print Shop — Limited Editions", href: "https://example.com/prints", weight: 3, color: "#171717", icon: "shopping-bag", sectionIndex: 1 },
      { anchor: "Pinterest Moodboards", href: "https://pinterest.com", weight: 4, color: "#E60023", icon: "layout", sectionIndex: 1 },
    ],
    booking: {
      enabled: true,
      defaultStartTime: "08:00",
      defaultEndTime: "19:00",
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
];

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const results: string[] = [];

    for (const profile of profiles) {
      // Idempotency: skip if this demo user already exists
      const existing = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", profile.user.userId))
        .first();

      if (existing) {
        results.push(`⏭ ${profile.user.handle} already exists — skipped`);
        continue;
      }

      // 1. Create user (branding fields live on the user record)
      await ctx.db.insert("users", profile.user);

      // 2. Create sections and collect their IDs
      const sectionIds: string[] = [];
      for (const section of profile.sections) {
        const id = await ctx.db.insert("sections", {
          userId: profile.user.userId,
          ...section,
        });
        sectionIds.push(id);
      }

      // 3. Create links, resolving sectionIndex → sectionId
      for (const link of profile.links) {
        const { sectionIndex, ...linkData } = link;
        await ctx.db.insert("links", {
          userId: profile.user.userId,
          ...linkData,
          sectionId:
            sectionIndex !== undefined
              ? (sectionIds[sectionIndex] as any)
              : undefined,
        });
      }

      // 4. Create booking availability
      await ctx.db.insert("bookingAvailability", {
        userId: profile.user.userId,
        ...profile.booking,
      });

      results.push(`✅ ${profile.user.handle} created`);
    }

    return results;
  },
});
