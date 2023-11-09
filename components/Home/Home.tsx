'use client'

import React from "react";

import Login from "@/components/Auth";

import { Button, Container } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { DefaultSession } from "next-auth";
import { useAppContext } from "@/context/AppProvider";

const Home = () => {
  const [{ user }] = useAppContext()
  console.log(`🚀 ~ file: Home.tsx ~ line 17 ~ Home ~ user`, user)
  return (
    <section className="py-24">
      <Container maxWidth='lg'>

        <div className="container">

          <h2 className="mt-4 font-medium">You are logged in as:</h2>
          <p>{user?.id}</p>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <p>image:{user?.image}</p>
          <p>{user?.accessToken}</p>
          <p>{user?.refreshToken}</p>
        </div>
        <button
          onClick={() => signOut({
            redirect: true,
            callbackUrl: '/signin'
          })}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </Container>
    </section>
  );
};

export default Home;
