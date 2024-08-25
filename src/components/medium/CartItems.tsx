"use client";

import { useContext } from "react";
import CartItem from "../small/CartItem";
import { AppContext, AppContextType } from "@/Context/app";
import { Cart } from "@/types/small-types";

interface CartItemsProps {
  cart: Cart[];
  noButtons?: boolean
}

export default function CartItems({ cart,noButtons = false }: CartItemsProps) {
  console.log({cart});

  return (
    <ul className="flex flex-col gap-y-2">
      {cart.map((item) => (
        <CartItem key={item._id} {...item} noButtons={noButtons} />
      ))}
    </ul>
  );
}
