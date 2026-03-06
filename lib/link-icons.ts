// Phosphor icon identifiers for link icons
// These map to react-icons/pi imports

export interface LinkIconOption {
  id: string;
  label: string;
  keywords: string[];
}

export const LINK_ICONS: LinkIconOption[] = [
  { id: "PiInstagramLogo", label: "Instagram", keywords: ["instagram", "photo", "social"] },
  { id: "PiXLogo", label: "X / Twitter", keywords: ["twitter", "x", "tweet", "social"] },
  { id: "PiYoutubeLogo", label: "YouTube", keywords: ["youtube", "video", "stream"] },
  { id: "PiSpotifyLogo", label: "Spotify", keywords: ["spotify", "music", "audio"] },
  { id: "PiTiktokLogo", label: "TikTok", keywords: ["tiktok", "video", "short"] },
  { id: "PiLinkedinLogo", label: "LinkedIn", keywords: ["linkedin", "professional", "job"] },
  { id: "PiGithubLogo", label: "GitHub", keywords: ["github", "code", "dev"] },
  { id: "PiDiscordLogo", label: "Discord", keywords: ["discord", "chat", "community"] },
  { id: "PiTwitchLogo", label: "Twitch", keywords: ["twitch", "stream", "gaming"] },
  { id: "PiFacebookLogo", label: "Facebook", keywords: ["facebook", "social", "meta"] },
  { id: "PiPinterestLogo", label: "Pinterest", keywords: ["pinterest", "pin", "board"] },
  { id: "PiSnapchatLogo", label: "Snapchat", keywords: ["snapchat", "snap", "social"] },
  { id: "PiWhatsappLogo", label: "WhatsApp", keywords: ["whatsapp", "message", "chat"] },
  { id: "PiTelegramLogo", label: "Telegram", keywords: ["telegram", "message", "chat"] },
  { id: "PiRedditLogo", label: "Reddit", keywords: ["reddit", "forum", "community"] },
  { id: "PiMediumLogo", label: "Medium", keywords: ["medium", "blog", "article"] },
  { id: "PiDribbbleLogo", label: "Dribbble", keywords: ["dribbble", "design", "portfolio"] },
  { id: "PiBehanceLogo", label: "Behance", keywords: ["behance", "design", "portfolio"] },
  { id: "PiGlobe", label: "Website", keywords: ["website", "web", "globe", "site"] },
  { id: "PiLink", label: "Link", keywords: ["link", "url", "other"] },
  { id: "PiEnvelope", label: "Email", keywords: ["email", "mail", "contact"] },
  { id: "PiPhone", label: "Phone", keywords: ["phone", "call", "contact"] },
  { id: "PiMapPin", label: "Location", keywords: ["location", "map", "address", "place"] },
  { id: "PiShoppingBag", label: "Shop", keywords: ["shop", "store", "buy", "ecommerce"] },
  { id: "PiMusicNote", label: "Music", keywords: ["music", "song", "audio"] },
  { id: "PiVideoCamera", label: "Video", keywords: ["video", "camera", "film"] },
  { id: "PiCamera", label: "Camera", keywords: ["camera", "photo", "photography"] },
  { id: "PiMicrophone", label: "Podcast", keywords: ["microphone", "podcast", "audio", "mic"] },
  { id: "PiHeadphones", label: "Headphones", keywords: ["headphones", "audio", "listen"] },
  { id: "PiGameController", label: "Gaming", keywords: ["game", "gaming", "controller", "play"] },
];

// Domain → icon auto-detection
const DOMAIN_ICON_MAP: Record<string, string> = {
  "instagram.com": "PiInstagramLogo",
  "twitter.com": "PiXLogo",
  "x.com": "PiXLogo",
  "youtube.com": "PiYoutubeLogo",
  "youtu.be": "PiYoutubeLogo",
  "spotify.com": "PiSpotifyLogo",
  "open.spotify.com": "PiSpotifyLogo",
  "tiktok.com": "PiTiktokLogo",
  "linkedin.com": "PiLinkedinLogo",
  "github.com": "PiGithubLogo",
  "discord.com": "PiDiscordLogo",
  "discord.gg": "PiDiscordLogo",
  "twitch.tv": "PiTwitchLogo",
  "facebook.com": "PiFacebookLogo",
  "fb.com": "PiFacebookLogo",
  "pinterest.com": "PiPinterestLogo",
  "snapchat.com": "PiSnapchatLogo",
  "wa.me": "PiWhatsappLogo",
  "whatsapp.com": "PiWhatsappLogo",
  "t.me": "PiTelegramLogo",
  "telegram.me": "PiTelegramLogo",
  "reddit.com": "PiRedditLogo",
  "medium.com": "PiMediumLogo",
  "dribbble.com": "PiDribbbleLogo",
  "behance.net": "PiBehanceLogo",
};

export function detectIconFromUrl(url: string): string | undefined {
  try {
    const hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
    // Try exact match first, then parent domain
    return DOMAIN_ICON_MAP[hostname] ?? DOMAIN_ICON_MAP[hostname.split(".").slice(-2).join(".")];
  } catch {
    return undefined;
  }
}
