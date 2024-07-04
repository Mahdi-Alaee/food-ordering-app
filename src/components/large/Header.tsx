"use client";

import Link from "next/link";
import NavBar from "../medium/NavBar";
import { SlBasket } from "react-icons/sl";
import OvalButton from "../small/OvalButton";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between">
      {/* left side */}
      <div className="flex items-center gap-8 font-bold">
        {/* logo */}
        <p className="text-redColor text-2xl font-bold">ST PIZZA</p>

        <NavBar />
      </div>
      {/* right side */}
      <div className="flex items-center gap-x-4">
        {session ? (
          <>
            <Link href="/profile">
              Hello,{" "}
              <span className="text-redColor">
                {session.user?.name
                  ? session.user.name.split(" ")[0]
                  : session.user?.email?.split("@")[0]}
              </span>
            </Link>
            <div
              onClick={() => {
                signOut({
                  callbackUrl: "/",
                  redirect: true,
                });
              }}
            >
              <OvalButton href="">Logout</OvalButton>
            </div>
          </>
        ) : (
          <>
            {/* login link */}
            <Link href="/login" className="font-bold">
              Login
            </Link>

            {/* register link */}
            <OvalButton href="/register">Register</OvalButton>
          </>
        )}

        {/* basket */}
        <Link href="/cart" className="text-2xl">
          <SlBasket />
        </Link>
      </div>
    </header>
  );
}
