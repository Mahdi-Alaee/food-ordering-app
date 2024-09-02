"use client";

import { AppContextProvider } from "@/Context/app";
import { store } from "@/Redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
