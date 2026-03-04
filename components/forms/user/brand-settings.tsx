"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiCheck, PiPaintBrushLight, PiLinkLight } from "react-icons/pi";

const COLOR_PRESETS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#ef4444",
  "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#000000", "#ffffff", "#64748b",
];

const FONTS = [
  { value: "Inter", label: "Inter" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "Space Grotesk", label: "Space Grotesk" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "JetBrains Mono", label: "JetBrains Mono" },
  { value: "Libre Baskerville", label: "Libre Baskerville" },
];

const BUTTON_STYLES = [
  { value: "rounded", label: "Rounded", className: "rounded-lg" },
  { value: "pill", label: "Pill", className: "rounded-full" },
  { value: "square", label: "Square", className: "rounded-none" },
  { value: "outline", label: "Outline", className: "rounded-lg border-2 bg-transparent" },
];

const BG_TYPES = [
  { value: "solid", label: "Solid" },
  { value: "gradient", label: "Gradient" },
];

export function BrandSettings() {
  const { user } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateBranding = useMutation(api.branding.updateBranding);

  const [brandColor, setBrandColor] = useState("#6366f1");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [buttonStyle, setButtonStyle] = useState("rounded");
  const [backgroundType, setBackgroundType] = useState("solid");
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const [customHex, setCustomHex] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.brandColor) setBrandColor(userProfile.brandColor);
      if (userProfile.fontFamily) setFontFamily(userProfile.fontFamily);
      if (userProfile.buttonStyle) setButtonStyle(userProfile.buttonStyle);
      if (userProfile.backgroundType) setBackgroundType(userProfile.backgroundType);
      if (userProfile.backgroundColor) setBackgroundColor(userProfile.backgroundColor);
    }
  }, [userProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateBranding({
        brandColor,
        fontFamily,
        buttonStyle,
        backgroundType,
        backgroundColor,
      });
    } catch (err) {
      console.error("Failed to save branding:", err);
    }
    setSaving(false);
  };

  const handleCustomHex = () => {
    if (/^#[0-9a-fA-F]{6}$/.test(customHex)) {
      setBrandColor(customHex);
      setCustomHex("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PiPaintBrushLight className="h-5 w-5" />
          Brand Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Color */}
        <div className="space-y-2">
          <Label>Brand Color</Label>
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                onClick={() => setBrandColor(color)}
                className="w-8 h-8 rounded-lg border-2 transition-all flex items-center justify-center"
                style={{
                  backgroundColor: color,
                  borderColor: brandColor === color ? "white" : "transparent",
                  boxShadow: brandColor === color ? `0 0 0 2px ${color}` : "none",
                }}
              >
                {brandColor === color && (
                  <PiCheck className="h-4 w-4" style={{ color: color === "#ffffff" || color === "#eab308" ? "#000" : "#fff" }} />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="#hexcode"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="w-32"
              maxLength={7}
            />
            <Button variant="outline" size="sm" onClick={handleCustomHex}>
              Apply
            </Button>
            <div
              className="w-9 h-9 rounded-lg border"
              style={{ backgroundColor: brandColor }}
            />
          </div>
        </div>

        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font</Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Button Style */}
        <div className="space-y-2">
          <Label>Button Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {BUTTON_STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setButtonStyle(style.value)}
                className={`px-4 py-2.5 text-sm font-medium transition-all border-2 ${
                  style.className
                } ${
                  buttonStyle === style.value
                    ? "border-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-muted-foreground"
                }`}
                style={
                  buttonStyle === style.value && style.value !== "outline"
                    ? { backgroundColor: brandColor, borderColor: brandColor, color: "#fff" }
                    : buttonStyle === style.value && style.value === "outline"
                    ? { borderColor: brandColor, color: brandColor }
                    : {}
                }
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Background Type */}
        <div className="space-y-2">
          <Label>Background</Label>
          <div className="flex gap-2">
            {BG_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={backgroundType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setBackgroundType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
          {backgroundType === "solid" && (
            <Input
              placeholder="#0f172a"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-48 mt-2"
            />
          )}
          {backgroundType === "gradient" && (
            <Input
              placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div
            className="rounded-xl p-6 border overflow-hidden"
            style={{
              background:
                backgroundType === "gradient"
                  ? backgroundColor
                  : backgroundColor,
              fontFamily,
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-muted/30 border-2 border-white/20" />
              <div className="text-white text-sm font-bold">@{userProfile?.handle || "yourhandle"}</div>
              <div className="text-white/60 text-xs">Your bio goes here</div>
              <div className="w-full max-w-[200px] space-y-2 mt-2">
                {["My Website", "Portfolio"].map((label) => (
                  <div
                    key={label}
                    className={`w-full px-3 py-2 text-center text-xs font-medium transition-all ${
                      buttonStyle === "pill"
                        ? "rounded-full"
                        : buttonStyle === "square"
                        ? "rounded-none"
                        : buttonStyle === "outline"
                        ? "rounded-lg"
                        : "rounded-lg"
                    }`}
                    style={
                      buttonStyle === "outline"
                        ? { border: `2px solid ${brandColor}`, color: brandColor, backgroundColor: "transparent" }
                        : { backgroundColor: brandColor, color: "#fff" }
                    }
                  >
                    <span className="flex items-center justify-center gap-1">
                      <PiLinkLight className="h-3 w-3" />
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Brand Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
