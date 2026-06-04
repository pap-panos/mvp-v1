"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import LogoutButton from "./logout-button";
import Image from "next/image";
import john from "@/public/john.jpg";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="navbar sticky top-0 z-50  w-full bg-base-100 shadow-sm">
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
        <>
          <button className="btn btn-ghost btn-circle mr-1">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
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
                  Account
                  <span className="badge badge-xs bg-red-500 text-white rounded-full">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
