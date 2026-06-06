"use client";

import { useTheme } from "next-themes";
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "night"}
        onChange={(e) => setTheme(e.target.checked ? "night" : "nord")}
      />

      <MdOutlineLightMode className="swap-off h-5 w-5" />

      <MdOutlineNightlight className="swap-on h-5 w-5" />
    </label>
  );
}
