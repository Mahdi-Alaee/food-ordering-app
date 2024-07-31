"use client";

import Image from "next/image";
import OvalButton from "./OvalButton";
import { Cart, MenuItem } from "@/types/small-types";
import { AppContext, AppContextType } from "@/Context/app";
import { useContext, useState } from "react";
import AddToCartModal from "../medium/AddToCartModal";

export default function FoodBox(props: MenuItem) {
  const { addToCart, cart } = useContext(AppContext) as AppContextType;
  let mainItem: Cart;
  const { _id, name, description, price, image, sizes, extras, category } =
    props;
  const [isOpenModal, setIsOpenModal] = useState(false);

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
        <OvalButton
          className="bg-redColor flex-wrap justify-center"
          onClick={() => {
            if (sizes!.length > 0 && extras!.length > 0) setIsOpenModal(true);
            else addToCart({ ...props, count: 1 });
          }}
          type="button"
        >
          <span>
            Add to cart <span>${price}</span>
          </span>
        </OvalButton>
      </div>
      <AddToCartModal menuItem={props} isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </div>
  );
}
