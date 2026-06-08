"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import LogoutButton from "./logout-button";
import Image from "next/image";
import john from "@/public/john.jpg";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import ThemeController from "./theme-controller";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const t = useTranslation();

  return (
    <nav className="navbar sticky top-0 z-50  w-full bg-base-100 shadow-sm">
      {pathname !== "/" && user && (
        <>
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <VscLayoutSidebarLeftDock className="h-5 w-5 rounded" />
          </label>
        </>
      )}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold">
          fakebill
        </Link>
      </div>

      {user ? (
        <>
          <button className="btn btn-ghost btn-circle mr-1">
            <div className="indicator">
              <IoMdNotifications className="h-5 w-5 " />
              <span className="badge badge-xs badge-error indicator-item text-white">
                1
              </span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={john}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/account" className="justify-between">
                  {t.account}
                  <span className="badge badge-xs bg-red-500 text-white rounded-full">
                    {t.new}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="justify-between">
                  {t.profile}
                  <FaUserAlt className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {pathname === "/" && (
              <>
                <li className="mr-1">
                  <Link
                    href="/auth/login"
                    className="btn btn-primary text-white btn-sm rounded-full"
                  >
                    {t.login}
                  </Link>
                </li>
                <li className="mr-1">
                  <Link
                    className="btn btn-secondary btn-sm btn-outline hover:text-white rounded-full"
                    href="/auth/signup"
                  >
                    {t.signup}
                  </Link>
                </li>
              </>
            )}
            <li>
              <ThemeController />
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
