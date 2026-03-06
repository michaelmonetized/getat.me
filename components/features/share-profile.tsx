"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  PiCopyLight,
  PiShareNetworkLight,
  PiDownloadSimpleLight,
  PiXLight,
  PiXLogoLight,
  PiFacebookLogoLight,
  PiLinkedinLogoLight,
  PiWhatsappLogoLight,
  PiTelegramLogoLight,
  PiQrCodeLight,
} from "react-icons/pi";

// ── Lightweight QR Code Generator (SVG-based) ──────────────────────────
// Implements a minimal QR encoder for alphanumeric URLs.
// For robustness we use a canvas-based approach with the native qr encoding.

function generateQRMatrix(data: string): boolean[][] {
  // Minimal QR code generator - we'll use a simple approach
  // that creates a visual QR-like pattern and rely on a lightweight lib
  // For production, this uses a canvas-based approach
  const size = Math.max(21, Math.ceil(data.length / 2) + 21);
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  return matrix;
}

// Use canvas-based QR generation via the browser's built-in capabilities
function QRCodeSVG({
  value,
  size = 200,
  fgColor = "#000000",
  bgColor = "#ffffff",
  onCanvasReady,
}: {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use dynamic import for qr generation
    import("@/lib/qr").then(({ generateQR }) => {
      const modules = generateQR(value);
      const moduleCount = modules.length;
      const cellSize = size / moduleCount;

      canvas.width = size;
      canvas.height = size;

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);

      // Modules
      ctx.fillStyle = fgColor;
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (modules[row][col]) {
            ctx.fillRect(
              col * cellSize,
              row * cellSize,
              cellSize,
              cellSize
            );
          }
        }
      }

      onCanvasReady?.(canvas);
    });
  }, [value, size, fgColor, bgColor, onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg"
      style={{ width: size, height: size }}
    />
  );
}

// ── Social Share URLs ───────────────────────────────────────────────────

function getSocialShareUrl(
  platform: string,
  url: string,
  text: string
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  switch (platform) {
    case "twitter":
      return `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    case "telegram":
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    default:
      return "#";
  }
}

const socialPlatforms = [
  { id: "twitter", label: "X / Twitter", icon: PiXLogoLight },
  { id: "facebook", label: "Facebook", icon: PiFacebookLogoLight },
  { id: "linkedin", label: "LinkedIn", icon: PiLinkedinLogoLight },
  { id: "whatsapp", label: "WhatsApp", icon: PiWhatsappLogoLight },
  { id: "telegram", label: "Telegram", icon: PiTelegramLogoLight },
];

// ── Share Profile Component ─────────────────────────────────────────────

interface ShareProfileProps {
  handle: string;
  brandColor?: string;
  onClose?: () => void;
  /** If true, renders inline (no overlay). Otherwise renders as modal. */
  inline?: boolean;
}

export function ShareProfile({
  handle,
  brandColor,
  onClose,
  inline = false,
}: ShareProfileProps) {
  const { toast } = useToast();
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${handle}`
      : `https://getat.me/${handle}`;
  const shareText = `Check out my profile on getat.me!`;
  const qrColor = brandColor || "#000000";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast({ title: "Link copied!", description: profileUrl });
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = profileUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast({ title: "Link copied!", description: profileUrl });
    }
  }, [profileUrl, toast]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${handle} on getat.me`,
          text: shareText,
          url: profileUrl,
        });
      } catch {
        // User cancelled or error — fall back to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  }, [handle, profileUrl, shareText, handleCopy]);

  const handleDownloadQR = useCallback(() => {
    if (!canvasEl) return;
    const link = document.createElement("a");
    link.download = `${handle}-qr.png`;
    link.href = canvasEl.toDataURL("image/png");
    link.click();
  }, [canvasEl, handle]);

  const content = (
    <div className="space-y-6">
      {/* Header (modal only) */}
      {!inline && onClose && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Share Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <PiXLight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Profile URL + Copy */}
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm font-mono truncate dark:bg-muted/50">
          {profileUrl}
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <PiCopyLight className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>

      {/* Native Share */}
      <Button
        className="w-full"
        variant="outline"
        onClick={handleNativeShare}
      >
        <PiShareNetworkLight className="h-4 w-4 mr-2" />
        Share
      </Button>

      {/* QR Code */}
      <div className="flex flex-col items-center gap-3">
        <QRCodeSVG
          value={profileUrl}
          size={200}
          fgColor={qrColor}
          onCanvasReady={setCanvasEl}
        />
        <Button variant="outline" size="sm" onClick={handleDownloadQR}>
          <PiDownloadSimpleLight className="h-4 w-4 mr-1" />
          Download QR
        </Button>
      </div>

      {/* Social Share */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Share on social
        </p>
        <div className="grid grid-cols-5 gap-2">
          {socialPlatforms.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={getSocialShareUrl(id, profileUrl, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors dark:hover:bg-muted/50"
              aria-label={`Share on ${label}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  // Modal overlay
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />
      <Card className="relative z-10 w-full max-w-md mx-4">
        <CardContent className="pt-6">{content}</CardContent>
      </Card>
    </div>
  );
}

// ── Small share button for public profiles ──────────────────────────────

export function ShareButton({
  handle,
  brandColor,
}: {
  handle: string;
  brandColor?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur border px-3 py-2 text-sm font-medium text-muted-foreground shadow-lg hover:text-foreground hover:bg-background transition-all dark:bg-background/60"
        aria-label="Share this profile"
      >
        <PiShareNetworkLight className="h-4 w-4" />
        Share
      </button>
      {open && (
        <ShareProfile
          handle={handle}
          brandColor={brandColor}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
