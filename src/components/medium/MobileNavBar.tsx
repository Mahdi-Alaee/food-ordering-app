import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import OvalButton from "../small/OvalButton";
import { TiTimes } from "react-icons/ti";
import { Dispatch, SetStateAction } from "react";

interface MobileNavBarProps {
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNavBar({
  isOpenMobileMenu,
  setIsOpenMobileMenu,
}: MobileNavBarProps) {
  const { data: session } = useSession();
  const close = () => setIsOpenMobileMenu(false);

  return (
    <nav
      className={`fixed top-0 z-10 text-white w-screen h-screen transition-all duration-200 bg-gray-500 ${
        isOpenMobileMenu ? "-left-0" : `-left-full opacity-0 -z-10 invisible`
      }`}
    >
      <button
        type="button"
        onClick={close}
        className="flex justify-center ml-auto mr-3 mt-4 items-center"
      >
        <TiTimes className="text-4xl" />
      </button>
      <div
        className="flex flex-col text-lg"
        onClick={close}
      >
        <Link className="p-2 hover:text-redColor hover:bg-gray-200" href="/">
          Home
        </Link>
        <Link
          className="p-2 hover:text-redColor hover:bg-gray-200"
          href="/menu"
        >
          Menu
        </Link>
        <Link
          className="p-2 hover:text-redColor hover:bg-gray-200"
          href="/#about"
        >
          About
        </Link>
        <Link
          className="p-2 hover:text-redColor hover:bg-gray-200"
          href="/#contact"
        >
          Contact
        </Link>
      </div>
      <div className="flex justify-center items-center gap-x-4 mt-4" onClick={close}>
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
    </nav>
  );
}
