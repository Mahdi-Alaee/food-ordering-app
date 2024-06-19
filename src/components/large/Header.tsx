import Link from "next/link";
import NavBar from "../medium/NavBar";
import { SlBasket } from "react-icons/sl";
import OvalButton from "../small/OvalButton";

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
        <OvalButton
          href="/login"
        >
          Register
        </OvalButton>

        {/* basket */}
        <Link href="/cart" className="text-2xl">
          <SlBasket />
        </Link>
      </div>
    </header>
  );
}
