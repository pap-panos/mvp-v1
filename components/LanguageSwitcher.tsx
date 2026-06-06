"use client";

import { useLanguage } from "@/contexts/language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <label className="swap swap-rotate rounded-full">
      <input
        type="checkbox"
        value={language}
        onChange={(e) => setLanguage(e.target.checked ? "el" : "en")}
      />

      <span className="swap-off">en</span>

      <span className="swap-on">ελ</span>
    </label>
  );
}
