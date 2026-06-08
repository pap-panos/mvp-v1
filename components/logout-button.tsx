"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CgLogOut } from "react-icons/cg";
import { useTranslation } from "@/hooks/useTranslation";

const LogoutButton = () => {
  const router = useRouter();
  const t = useTranslation();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <button
      className="btn btn-sm btn-ghost  hover:bg-red-200 hover:text-red-400 justify-between"
      onClick={logout}
    >
      {t.logout}
      <CgLogOut className="ml-2 w-5 h-5" />
    </button>
  );
};

export default LogoutButton;
