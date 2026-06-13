"use client";

import { useTheme } from "next-themes";
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import {
  daisyThemeToPreferredTheme,
  preferredThemeToDaisyTheme,
} from "@/lib/profile";
import { updateCurrentUserProfilePreference } from "@/lib/profile-client";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = async (isDark: boolean) => {
    const preferredTheme = isDark ? "dark" : "light";
    setTheme(preferredThemeToDaisyTheme[preferredTheme]);

    try {
      await updateCurrentUserProfilePreference({
        preferred_theme: preferredTheme,
      });
    } catch {
      // Keep the UI responsive even if the remote preference update fails.
    }
  };

  return (
    <label className="swap swap-rotate rounded-full">
      <input
        type="checkbox"
        checked={daisyThemeToPreferredTheme(theme) === "dark"}
        onChange={(e) => handleThemeChange(e.target.checked)}
        className="theme-controller"
        value={theme}
      />

      <MdOutlineLightMode className="swap-off h-5 w-5 fill-current" />

      <MdOutlineNightlight className="swap-on h-5 w-5 fill-current" />
    </label>
  );
}
