"use client";

import { AppProvider } from "@/context/AppProvider";
import { store } from "@/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
interface Props {
  children: React.ReactNode;
}

const CustomProviders = ({ children }: Props) => {
  return (
    <>
      <Provider store={store} >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
          <SessionProvider><AppProvider>{children}</AppProvider></SessionProvider>
        </GoogleOAuthProvider>
      </Provider>

    </>
  );
};

export default CustomProviders;
