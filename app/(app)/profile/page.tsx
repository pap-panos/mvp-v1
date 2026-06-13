import ProfileForm from "@/components/profile-form";
import { normalizeUserProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, full_name, phone, avatar_url, preferred_language, preferred_theme",
    )
    .eq("id", user.id)
    .maybeSingle();

  const userProfile = normalizeUserProfile(user.id, profile);

  return (
    <div className="flex h-auto w-full max-w-lg flex-col rounded bg-base-100 p-4 shadow">
      <ProfileForm user={user} profile={userProfile} />
    </div>
  );
}
