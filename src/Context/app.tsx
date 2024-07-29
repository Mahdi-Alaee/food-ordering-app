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
    console.log({ cart });
  }, [cart]);

  const addToCart = (newItem: Cart) => {
    console.log({ newItem });

    const isExists = cart.find((item) => item._id === newItem._id);
    console.log({ isExists });
    if (!isExists) setCart((prev) => [...prev, newItem]);
    else {
      console.log("in else");

      setCart((prev) =>
        prev.map((item) =>
          item._id === newItem._id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      let isHeigherThanOne = false;
      const res = prev.some((item) => {
        console.log("loop");

        if (item._id === itemId && item.count > 1) {
          isHeigherThanOne = true;
          return true;
        }
      });
      console.log({ res });

      return prev;
    });
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
