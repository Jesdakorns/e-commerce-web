"use client";

import { AppProvider } from "@/context/AppProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const CustomProviders = ({ children }: Props) => {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
        <SessionProvider><AppProvider>{children}</AppProvider></SessionProvider>
      </GoogleOAuthProvider>

    </>
  );
};

export default CustomProviders;
