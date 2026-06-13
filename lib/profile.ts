export type PreferredLanguage = "el" | "en";
export type PreferredTheme = "light" | "dark";

export type UserProfile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferred_language: PreferredLanguage;
  preferred_theme: PreferredTheme;
};

export const DEFAULT_PROFILE: Omit<UserProfile, "id"> = {
  full_name: null,
  phone: null,
  avatar_url: null,
  preferred_language: "el",
  preferred_theme: "light",
};

export function normalizeUserProfile(
  userId: string,
  profile: Partial<UserProfile> | null | undefined,
): UserProfile {
  return {
    id: userId,
    full_name: profile?.full_name ?? DEFAULT_PROFILE.full_name,
    phone: profile?.phone ?? DEFAULT_PROFILE.phone,
    avatar_url: profile?.avatar_url ?? DEFAULT_PROFILE.avatar_url,
    preferred_language:
      profile?.preferred_language === "en" ? "en" : DEFAULT_PROFILE.preferred_language,
    preferred_theme:
      profile?.preferred_theme === "dark" ? "dark" : DEFAULT_PROFILE.preferred_theme,
  };
}

export const preferredThemeToDaisyTheme: Record<PreferredTheme, string> = {
  light: "nord",
  dark: "night",
};

export function daisyThemeToPreferredTheme(theme: string | undefined) {
  return theme === "night" ? "dark" : "light";
}

export function getInitials(fullName: string | null, email?: string | null) {
  const source = fullName?.trim() || email?.trim() || "";
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
