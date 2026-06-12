import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/profile-form";
const ProfilePage = async () => {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  return (
    <div className="p-4 bg-base-100 rounded shadow h-auto w-auto justify-self-center">
      <ProfileForm claims={claimsData?.claims ?? null} />
    </div>
  );
};

export default ProfilePage;
