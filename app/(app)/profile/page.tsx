"use client";

import { useTranslation } from "@/hooks/useTranslation";

import ProfileForm from "@/components/profile-form";
const ProfilePage = () => {
  const t = useTranslation();

  return (
    <div className="p-4 bg-base-100 rounded shadow h-auto w-auto justify-self-center">
      <span className="font-bold text-md text-center">{t.profile}</span>

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
