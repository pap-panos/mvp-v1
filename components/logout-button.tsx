"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button className="btn btn-soft btn-error rounded-2xl" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
