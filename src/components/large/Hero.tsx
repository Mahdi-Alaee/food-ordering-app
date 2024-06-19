import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      {/* left */}
      <div>
        {/* title */}
        <h1>Everything is better with a Pizza</h1>
        {/* description */}
        <p>
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        {/* buttons */}
        <div>
          <Link href="/order">ORDER NOW</Link>
          <Link href="/about">Learn more</Link>
        </div>
      </div>
      {/* right */}
      <div>
        <Image src={'/images/pizza.png'} alt="pizza png" />
      </div>
    </section>
  );
}
