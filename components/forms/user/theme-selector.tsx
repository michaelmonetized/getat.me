"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const themes = [
  "Mocha",
  "Frapaccino",
  "Monokai",
  "Tokyo",
  "Tomorrow",
  "One",
  "Rosepine",
  "Dracula",
] as const;

type Theme = (typeof themes)[number];

export function ThemeSelector() {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState<Theme>("Mocha");

  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (userProfile?.theme && themes.includes(userProfile.theme as Theme)) {
      setSelectedTheme(userProfile.theme as Theme);
    }
  }, [userProfile]);

  const handleThemeChange = async (theme: Theme) => {
    setSelectedTheme(theme);
    if (user?.id) {
      try {
        await updateUser({ userId: user.id, theme });
      } catch (err) {
        console.error("Failed to update theme:", err);
      }
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="text-base font-semibold">Theme:</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-1">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm ${
              selectedTheme === theme ? "bg-muted/50" : "hover:bg-muted/30"
            }`}
          >
            <span className={selectedTheme === theme ? "font-medium" : ""}>
              {theme}
            </span>
            {selectedTheme === theme && (
              <Check className="h-4 w-4 text-foreground" />
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
