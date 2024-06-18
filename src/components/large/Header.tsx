import Link from "next/link";
import NavBar from "../medium/NavBar";
import { SlBasket } from "react-icons/sl";

export default function Header() {
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
        {/* login link */}
        <Link href="/login" className="font-bold">
          Login
        </Link>

        {/* register link */}
        <Link
          href="/login"
          className="py-2 px-8 rounded-full bg-redColor font-bold text-white"
        >
          Register
        </Link>

        {/* basket */}
        <Link href="/cart" className="text-2xl">
          <SlBasket />
        </Link>
      </div>
    </header>
  );
}
