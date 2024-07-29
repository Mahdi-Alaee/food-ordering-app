"use client";

import { AppContextProvider } from "@/Context/app";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </SessionProvider>
    </>
  );
}
