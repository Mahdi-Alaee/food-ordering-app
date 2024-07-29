import { MenuItem } from "@/types/small-types";
import { createContext, ReactNode, useState } from "react";

const AppContext = createContext({});

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (newItem: MenuItem) =>
    setCart((prev) => [...prev, newItem]);

  const removeFromCart = (itemId: string) =>
    setCart((prev) => prev.filter((item) => item._id !== itemId));

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
