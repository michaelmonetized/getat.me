"use client";

import {
  PiInstagramLogo, PiXLogo, PiYoutubeLogo, PiSpotifyLogo, PiTiktokLogo,
  PiLinkedinLogo, PiGithubLogo, PiDiscordLogo, PiTwitchLogo, PiFacebookLogo,
  PiPinterestLogo, PiSnapchatLogo, PiWhatsappLogo, PiTelegramLogo, PiRedditLogo,
  PiMediumLogo, PiDribbbleLogo, PiBehanceLogo, PiGlobe, PiLink,
  PiEnvelope, PiPhone, PiMapPin, PiShoppingBag, PiMusicNote,
  PiVideoCamera, PiCamera, PiMicrophone, PiHeadphones, PiGameController,
} from "react-icons/pi";
import type { IconType } from "react-icons";

const ICON_MAP: Record<string, IconType> = {
  PiInstagramLogo, PiXLogo, PiYoutubeLogo, PiSpotifyLogo, PiTiktokLogo,
  PiLinkedinLogo, PiGithubLogo, PiDiscordLogo, PiTwitchLogo, PiFacebookLogo,
  PiPinterestLogo, PiSnapchatLogo, PiWhatsappLogo, PiTelegramLogo, PiRedditLogo,
  PiMediumLogo, PiDribbbleLogo, PiBehanceLogo, PiGlobe, PiLink,
  PiEnvelope, PiPhone, PiMapPin, PiShoppingBag, PiMusicNote,
  PiVideoCamera, PiCamera, PiMicrophone, PiHeadphones, PiGameController,
};

interface LinkIconProps {
  icon?: string;
  className?: string;
}

export function LinkIcon({ icon, className = "h-5 w-5" }: LinkIconProps) {
  if (!icon) return null;
  const Icon = ICON_MAP[icon];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export { ICON_MAP };
