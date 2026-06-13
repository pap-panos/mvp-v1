"use client";

import type { PreferredLanguage, PreferredTheme } from "@/lib/profile";
import { createClient } from "@/lib/supabase/client";

export async function updateCurrentUserProfilePreference(
  preference:
    | { preferred_language: PreferredLanguage }
    | { preferred_theme: PreferredTheme },
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...preference });

  if (error) throw error;
}
