"use client";

import { getSession, loadUser } from "@/lib/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  _id: string;
  email: string;
  password: string;
}

export interface AppContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userData = await loadUser();
      setUser(userData.user);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext)!;
