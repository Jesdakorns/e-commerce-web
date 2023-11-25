'use client'

import React, { Suspense, lazy } from "react";

import Login from "@/components/Auth";
import Image from 'next/image'
import { Button, Container, Box, } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { DefaultSession } from "next-auth";
import { useAppContext } from "@/context/AppProvider";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Grid, Pagination } from 'swiper/modules';
import MenuType from "./MenuType";
import Loadable from 'react-loadable';
import Promotion from "./Promotion";
// const Promotion = lazy(() => import('./Promotion'))
import BestSellingProducts from "./BestSellingProducts";
import ProductList from "./ProductList";
// const Promotion = Loadable({
//   loader: () => import('./Promotion'),
//   loading:() => (<>loading...</>),
// });

const Home = () => {
  const [{ user }] = useAppContext()
  return (
    <>
      <Container maxWidth='lg'>

        <Box display='flex' flexDirection='column' gap={3}>
          
          <Promotion />
          <MenuType />
          {/* <MenuType /> */}
          <BestSellingProducts />
          <ProductList />
        </Box>

        {/* <Box >
          
        </Box>

       
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
        </button> */}
      </Container>
    </>
  );
};

export default Home;

