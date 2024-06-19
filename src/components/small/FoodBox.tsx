import Image from "next/image";
import Link from "next/link";
import OvalButton from "./OvalButton";

export default function FoodBox() {
  return (
    <div className="bg-gray-200 p-6 flex flex-col items-center gap-y-2 shadow-lg rounded-md hover:bg-white">
      {/* image */}
      <Image
        className="w-36"
        src="/images/pizza.png"
        width="10000"
        height="10000"
        alt="food image"
      />

      {/* title */}
      <h4 className="text-black font-bold text-xl">Pepperoni Pizza</h4>

      {/* description */}
      <p className="text-sm text-center font-bold">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>

      {/* cart button */}
      <OvalButton href="/cart">
        Add to cart <span>$12</span>
      </OvalButton>
    </div>
  );
}
