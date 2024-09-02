"use client";

import Link from "next/link";
import NavBar from "../medium/NavBar";
import { SlBasket } from "react-icons/sl";
import OvalButton from "../small/OvalButton";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/Context/app";
import MobileNavBar from "../medium/MobileNavBar";
import { FaBars } from "react-icons/fa";
import { setProducts } from "@/Redux/reducers/productsReducer";
import { Category, MenuItem } from "@/types/small-types";
import { useAppDispatch } from "@/Redux/store";
import { loadItems } from "@/lib/funcs";
import { setCategories } from "@/Redux/reducers/categoriesReducer";

export default function Header() {
  const { data: session } = useSession();
  const { cart } = useContext(AppContext) as AppContextType;
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadItems("/api/menu-item", dispatch, setProducts);
    loadItems("/api/category", dispatch, setCategories);
  }, []);

  return (
    <header className="flex justify-between mb-12 md:mb-0">
      {/* left side */}
      <div className="flex items-center gap-8 font-bold">
        {/* logo */}
        <Link href="/" className="text-redColor text-2xl font-bold">
          ST PIZZA
        </Link>

        <NavBar />
        <MobileNavBar
          isOpenMobileMenu={isOpenMobileMenu}
          setIsOpenMobileMenu={setIsOpenMobileMenu}
        />
      </div>
      {/* right side */}
      <div className="flex items-center gap-x-6">
        <div className="hidden items-center gap-x-4 md:flex">
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
        </div>

        {/* basket */}
        <Link href="/cart" className="text-2xl relative">
          <SlBasket className="text-2xl" />
          <span
            className="absolute -top-1 -right-2 bg-redColor text-white text-sm w-4 h-4 rounded-full flex justify-center items-center"
            style={{ lineHeight: 0 }}
          >
            {cart.length}
          </span>
        </Link>
        {/* menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpenMobileMenu(true)}
          type="button"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>
    </header>
  );
}
