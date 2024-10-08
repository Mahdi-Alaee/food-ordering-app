"use client";

import { Cart } from "@/types/small-types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface AppContextType {
  cart: Cart[];
  addToCart: (newItem: Cart) => void;
  removeFromCart: (itemId: string) => void;
  resetCart: Function;
}

export const AppContext = createContext({});

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")!) as Cart[];
    setCart(cartData || []);
  }, []);

  const setCartToLocalStorage = (cartData: Cart[]) =>
    localStorage.setItem("cart", JSON.stringify(cartData));

  const addToCart = (newItem: Cart) => {
    const isExists = cart.find((item) => item._id === newItem._id);
    if (!isExists) {
      setCart((prev) => {
        const newCart = [...prev, newItem];
        setCartToLocalStorage(newCart);
        return newCart;
      });
    } else {
      setCart((prev) => {
        const newCart = prev.map((item) =>
          item._id === newItem._id ? { ...item, count: item.count + 1 } : item
        );
        setCartToLocalStorage(newCart);
        return newCart;
      });
    }
    toast.info("Added :)");
  };

  const removeFromCart = (itemId: string) => {
    let isHeigherThanOne = false;
    setCart((prev) => {
      isHeigherThanOne = prev.some((item) => {
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
    toast.info(`${isHeigherThanOne ? "Decreased" : "Removed"} :)`);
  };

  const resetCart = () => {
    setCart([]);
    setCartToLocalStorage([]);
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, resetCart }}>
      {children}
    </AppContext.Provider>
  );
}
