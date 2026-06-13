"use client";

import {
  useLanguage,
  type Language,
} from "@/contexts/language-context";
import { updateCurrentUserProfilePreference } from "@/lib/profile-client";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = async (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    try {
      await updateCurrentUserProfilePreference({
        preferred_language: nextLanguage,
      });
    } catch {
      // Keep the UI responsive even if the remote preference update fails.
    }
  };

  return (
    <label className="swap swap-rotate rounded-full">
      <input
        type="checkbox"
        checked={language === "el"}
        value={language}
        onChange={(event) =>
          handleLanguageChange(event.target.checked ? "el" : "en")
        }
      />

      <span className="swap-off">en</span>
      <span className="swap-on">ελ</span>
    </label>
  );
}
