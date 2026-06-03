"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import LogoutButton from "./logout-button";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="navbar w-full bg-base-100 shadow-sm">
      {pathname !== "/" && user && (
        <>
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </>
      )}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold">
          Fake Bill
        </Link>
      </div>
      {pathname === "/" && !user && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <Link
                href="/auth/login"
                className="btn btn-primary text-white btn-sm rounded-full"
              >
                Login
              </Link>
            </li>
            <li>
              <Link className="text-secondary" href="/auth/signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <Link
                href="/dashboard"
                className="btn btn-primary text-white btn-sm rounded-full"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
