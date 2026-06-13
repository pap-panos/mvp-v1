"use client";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { useTranslation } from "@/hooks/useTranslation";
import type { UserProfile } from "@/lib/profile";

interface SidebarProps {
  user: User | null;
  profile?: UserProfile | null;
  children: React.ReactNode;
}

const Sidebar = ({ user, profile, children }: SidebarProps) => {
  const pathname = usePathname();
  const t = useTranslation();
  if (pathname === "/") return <Navbar user={user} profile={profile} />;
  else
    return (
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar user={user} profile={profile} />
          <main className="p-3 m-3">{children}</main>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full shadow-sm flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  href="/dashboard"
                  className={
                    pathname === "/dashboard"
                      ? " menu-active bg-primary text-white rounded-full"
                      : ""
                  }
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <GoHomeFill className="my-1.5 inline-block size-5" />
                  <span className="is-drawer-close:hidden">{t.home}</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <Link
                  href="/settings"
                  className={
                    pathname === "/settings"
                      ? " menu-active bg-primary text-white rounded-full"
                      : ""
                  }
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <IoSettingsSharp className="my-1.5 inline-block size-5" />
                  <span className="is-drawer-close:hidden">{t.settings}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Sidebar;
