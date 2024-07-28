import Image from "next/image";
import OvalButton from "./OvalButton";
import { MenuItem } from "@/types/small-types";

export default function FoodBox({
  name,
  description,
  price,
  image,
  sizes,
  extras,
  category,
}: MenuItem) {
  return (
    <div className="bg-gray-200 p-6 flex flex-col items-center justify-between gap-y-2 shadow-lg rounded-md hover:bg-white">
      {/* image */}
      <Image
        className="w-36"
        src={image!}
        width="10000"
        height="10000"
        alt="food image"
      />
      <div className="flex flex-col items-center gap-y-2">
        {/* title */}
        <h4 className="text-black font-bold text-xl">{name}</h4>

        {/* description */}
        <p className="text-sm text-center font-bold">{description}</p>

        {/* cart button */}
        <OvalButton className="bg-redColor flex-wrap justify-center" href="/cart">
          Add to cart <span>${price}</span>
        </OvalButton>
      </div>
    </div>
  );
}
