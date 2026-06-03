"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <button
      className="btn btn-sm btn-ghost text-red-400 hover:bg-red-200 justify-start"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
