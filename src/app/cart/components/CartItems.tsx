'use client'

import { useContext } from "react";
import CartItem from "./CartItem";
import { AppContext, AppContextType } from "@/Context/app";
import { Cart } from "@/types/small-types";

interface CartItemsProps{
  cart:Cart[]
}

export default function CartItems({cart}:CartItemsProps) {

  return (
    <ul className="flex flex-col gap-y-2">
      {cart.map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
    </ul>
  );
}
