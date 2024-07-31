import { MenuItem } from "@/types/small-types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import OvalButton from "../small/OvalButton";

interface AddToCartModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuItem: MenuItem;
}

export default function AddToCartModal({
  isOpen,
  menuItem,
  setIsOpen,
}: AddToCartModalProps) {
  const { name, description, image, price, sizes, extras } = menuItem;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center transition-all duration-150 ${
        isOpen ? "z-50" : "-z-50 opacity-0 invisible"
      }`}
      onClick={() => setIsOpen(false)}
    >
      {/* modal */}
      <div
        className="bg-white p-6 w-96 flex flex-col gap-y-4 text-center max-h-screen overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* image */}
        <Image
          className="w-52 mx-auto"
          src={image!}
          alt="pizza png"
          width={10000}
          height={10000}
        />
        {/* title */}
        <h3 className="text-lg font-bold text-black text-center">{name}</h3>
        {/* description */}
        <p>{description}</p>
        {/* sizes */}
        <div>
          <h5>Pick your size</h5>
          <div className="grid grid-cols-1 gap-y-2">
            {sizes!?.length > 0 &&
              sizes!.map((size) => (
                <label
                  key={size.id}
                  className="border flex gap-x-2 p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <input type="radio" name="size" />
                  <span>
                    {size.name} ${size.price}
                  </span>
                </label>
              ))}
          </div>
        </div>
        {/* extras */}
        <div>
          <h5>Pick your extra</h5>
          <div className="grid grid-cols-1 gap-y-2">
            {extras!?.length > 0 &&
              extras!.map((extra) => (
                <label
                  key={extra.id}
                  className="border flex gap-x-2 p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <input type="checkbox" name="extra" />
                  <span>
                    {extra.name} ${extra.price}
                  </span>
                </label>
              ))}
          </div>
        </div>
        <OvalButton className="bg-redColor text-lg justify-center" type="button">Add to cart</OvalButton>
      </div>
    </div>
  );
}
