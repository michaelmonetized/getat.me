export interface LinkTemplate {
  id: string;
  name: string;
  category: LinkTemplateCategory;
  icon: string;
  urlPlaceholder: string;
  description: string;
}

export type LinkTemplateCategory = "Social" | "Music" | "Business" | "Payment";

export const LINK_TEMPLATE_CATEGORIES: LinkTemplateCategory[] = [
  "Social",
  "Music",
  "Business",
  "Payment",
];

export const LINK_TEMPLATES: LinkTemplate[] = [
  // Social
  {
    id: "instagram",
    name: "Instagram",
    category: "Social",
    icon: "📸",
    urlPlaceholder: "https://instagram.com/yourhandle",
    description: "Share your Instagram profile",
  },
  {
    id: "x-twitter",
    name: "X / Twitter",
    category: "Social",
    icon: "𝕏",
    urlPlaceholder: "https://x.com/yourhandle",
    description: "Share your X profile",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Social",
    icon: "🎵",
    urlPlaceholder: "https://tiktok.com/@yourhandle",
    description: "Share your TikTok profile",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Social",
    icon: "▶️",
    urlPlaceholder: "https://youtube.com/@yourchannel",
    description: "Share your YouTube channel",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Social",
    icon: "💼",
    urlPlaceholder: "https://linkedin.com/in/yourprofile",
    description: "Share your LinkedIn profile",
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "Social",
    icon: "👤",
    urlPlaceholder: "https://facebook.com/yourpage",
    description: "Share your Facebook page",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    category: "Social",
    icon: "👻",
    urlPlaceholder: "https://snapchat.com/add/yourusername",
    description: "Share your Snapchat",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    category: "Social",
    icon: "📌",
    urlPlaceholder: "https://pinterest.com/yourprofile",
    description: "Share your Pinterest boards",
  },
  {
    id: "reddit",
    name: "Reddit",
    category: "Social",
    icon: "🤖",
    urlPlaceholder: "https://reddit.com/u/yourusername",
    description: "Share your Reddit profile",
  },
  {
    id: "threads",
    name: "Threads",
    category: "Social",
    icon: "🧵",
    urlPlaceholder: "https://threads.net/@yourhandle",
    description: "Share your Threads profile",
  },

  // Music
  {
    id: "spotify",
    name: "Spotify",
    category: "Music",
    icon: "🎧",
    urlPlaceholder: "https://open.spotify.com/artist/yourid",
    description: "Share your Spotify artist page",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    category: "Music",
    icon: "🎶",
    urlPlaceholder: "https://music.apple.com/artist/yourid",
    description: "Share your Apple Music profile",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    category: "Music",
    icon: "☁️",
    urlPlaceholder: "https://soundcloud.com/yourprofile",
    description: "Share your SoundCloud profile",
  },
  {
    id: "bandcamp",
    name: "Bandcamp",
    category: "Music",
    icon: "🎸",
    urlPlaceholder: "https://yourbandname.bandcamp.com",
    description: "Share your Bandcamp page",
  },

  // Business
  {
    id: "website",
    name: "Website",
    category: "Business",
    icon: "🌐",
    urlPlaceholder: "https://yourwebsite.com",
    description: "Link to your website",
  },
  {
    id: "email",
    name: "Email",
    category: "Business",
    icon: "✉️",
    urlPlaceholder: "mailto:you@example.com",
    description: "Add your email address",
  },
  {
    id: "phone",
    name: "Phone",
    category: "Business",
    icon: "📞",
    urlPlaceholder: "tel:+1234567890",
    description: "Add your phone number",
  },
  {
    id: "location",
    name: "Location",
    category: "Business",
    icon: "📍",
    urlPlaceholder: "https://maps.google.com/?q=your+address",
    description: "Share your location on Maps",
  },
  {
    id: "calendly",
    name: "Calendly / Booking",
    category: "Business",
    icon: "📅",
    urlPlaceholder: "https://calendly.com/yourname",
    description: "Let people book time with you",
  },

  // Payment
  {
    id: "venmo",
    name: "Venmo",
    category: "Payment",
    icon: "💸",
    urlPlaceholder: "https://venmo.com/yourusername",
    description: "Accept payments via Venmo",
  },
  {
    id: "cashapp",
    name: "Cash App",
    category: "Payment",
    icon: "💵",
    urlPlaceholder: "https://cash.app/$yourtag",
    description: "Accept payments via Cash App",
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "Payment",
    icon: "💳",
    urlPlaceholder: "https://paypal.me/yourusername",
    description: "Accept payments via PayPal",
  },
  {
    id: "buymeacoffee",
    name: "Buy Me a Coffee",
    category: "Payment",
    icon: "☕",
    urlPlaceholder: "https://buymeacoffee.com/yourname",
    description: "Let supporters buy you a coffee",
  },
];
