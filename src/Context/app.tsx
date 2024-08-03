"use client";

import { Cart } from "@/types/small-types";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AppContextType {
  cart: Cart[];
  addToCart: (newItem: Cart) => void;
  removeFromCart: (itemId: string) => void;
}

export const AppContext = createContext({});

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")!) as Cart[];
    console.log({ cartData });
    setCart(cartData || []);
  }, []);

  const setCartToLocalStorage = (cartData: Cart[]) =>
    localStorage.setItem("cart", JSON.stringify(cartData));

  const addToCart = (newItem: Cart) => {
    console.log({ newItem });

    const isExists = cart.find((item) => item._id === newItem._id);
    console.log({ isExists });
    if (!isExists)
      setCart((prev) => {
        const newCart = [...prev, newItem];
        setCartToLocalStorage(newCart);
        return newCart;
      });
    else {
      console.log("in else");

      setCart((prev) => {
        const newCart = prev.map((item) =>
          item._id === newItem._id ? { ...item, count: item.count + 1 } : item
        );
        setCartToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const isHeigherThanOne = prev.some((item) => {
        console.log("loop");

        if (item._id === itemId && item.count > 1) {
          return true;
        }
      });
      if (isHeigherThanOne) {
        const newCart = prev.map((item) =>
          item._id === itemId ? { ...item, count: item.count - 1 } : item
        );
        setCartToLocalStorage(newCart);
        return newCart;
      } else {
        const newCart = prev.filter((item) => item._id !== itemId);
        setCartToLocalStorage(newCart);
        return newCart;
      }
    });
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
