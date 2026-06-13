import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import ProfilePreferencesSync from "@/components/profile-preferences-sync";
import { normalizeUserProfile } from "@/lib/profile";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, full_name, phone, avatar_url, preferred_language, preferred_theme",
    )
    .eq("id", user.id)
    .maybeSingle();

  const userProfile = normalizeUserProfile(user.id, profile);

  return (
    <>
      <ProfilePreferencesSync profile={userProfile} />
      <Sidebar user={user} profile={userProfile}>
        {children}
      </Sidebar>
    </>
  );
}
