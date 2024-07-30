"use client";

import Image from "next/image";
import OvalButton from "./OvalButton";
import { Cart, MenuItem } from "@/types/small-types";
import { AppContext, AppContextType } from "@/Context/app";
import { useContext, useEffect, useState } from "react";
import Trash from "../icons/Trash";

export default function FoodBox({
  _id,
  name,
  description,
  price,
  image,
  sizes,
  extras,
  category,
}: MenuItem) {
  const { addToCart, cart, removeFromCart } = useContext(
    AppContext
  ) as AppContextType;
  const [inCart, setInCart] = useState<Cart | undefined>(undefined);
  let mainItem: Cart;

  useEffect(() => {
    console.log(cart);

    setInCart(() => cart.find((item) => item._id === _id));
  }, [cart]);

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
            mainItem = {
              _id,
              name,
              description,
              price,
              image,
              sizes,
              extras,
              category,
              count: inCart?.count || 1,
            };
            inCart || addToCart(mainItem!);
          }}
          type="button"
        >
          {inCart ? (
            <>
              <span
                onClick={() => {
                  setTimeout(() => {
                    removeFromCart(mainItem._id!);
                  }, 5);
                }}
              >
                {inCart.count > 1 ? "-" : <Trash className="size-5" />}
              </span>{" "}
              | <span>{inCart.count}</span> |{" "}
              <span
                onClick={() => {
                  setTimeout(() => {
                    addToCart(mainItem);
                  }, 5);
                }}
              >
                +
              </span>
            </>
          ) : (
            <span>
              Add to cart <span>${price}</span>
            </span>
          )}
        </OvalButton>
      </div>
    </div>
  );
}
