import Image from "next/image";
import Link from "next/link";
import Right from "../icons/Right";
import OvalButton from "../small/OvalButton";

export default function Hero() {
  return (
    <section className="flex gap-x-24">
      {/* left */}
      <div className="flex flex-col gap-y-6 justify-center w-5/12 pr-2">
        {/* title */}
        <h1 className="text-4xl font-bold text-black">
          Everything
          <br /> is better
          <br /> with a <span className="text-redColor">Pizza</span>
        </h1>
        {/* description */}
        <p className="text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        {/* buttons */}
        <div className="flex gap-x-6 items-center">
          <OvalButton href="/">
            ORDER NOW
            <Right />
          </OvalButton>
          <Link
            className="px-6 text-sm flex items-center font-bold gap-x-2"
            href="/about"
          >
            Learn more
            <Right />
          </Link>
        </div>
      </div>
      {/* right */}
      <div className="w-5/12 hidden md:block">
        <Image
          src="/images/pizza.png"
          alt="pizza png"
          width="10000"
          height="10000"
          priority={true}
        />
      </div>
    </section>
  );
}
