"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold">
          Fake Bill
        </Link>
      </div>
      {pathname === "/" && (
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
    </div>
  );
};

export default Navbar;
