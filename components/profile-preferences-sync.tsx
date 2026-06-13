"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/language-context";
import { preferredThemeToDaisyTheme, type UserProfile } from "@/lib/profile";

type ProfilePreferencesSyncProps = {
  profile: UserProfile;
};

export default function ProfilePreferencesSync({
  profile,
}: ProfilePreferencesSyncProps) {
  const { setLanguage } = useLanguage();
  const { setTheme } = useTheme();

  useEffect(() => {
    setLanguage(profile.preferred_language);
    setTheme(preferredThemeToDaisyTheme[profile.preferred_theme]);
  }, [profile.preferred_language, profile.preferred_theme, setLanguage, setTheme]);

  return null;
}
