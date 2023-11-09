"use client";

import { AppProvider } from "@/context/AppProvider";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const CustomProviders = ({ children }: Props) => {

  return (
    <>

      <SessionProvider><AppProvider>{children}</AppProvider></SessionProvider>

    </>
  );
};

export default CustomProviders;
