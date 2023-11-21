"use client";

import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import React, { Suspense, lazy } from "react";
import LogoLogin from '@/src/assets/images/logo_login.svg';
import { themeColor } from "@/utils/themeColor";
import { FormProvider, useForm } from "react-hook-form";
const SignIn = lazy(() => import('./SignIn'))
import SignUp from "./SignUp";
import { SignInLoadingUI } from "./Loading";
import useAuth from "./Hook/useAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";



const Auth = () => {
  const { methods, isMode, onChangeMode, onSignIn, onSignUp, onSignGoogle } = useAuth()

  return (
   
      <FormProvider {...methods}>
        <Grid container spacing={2} sx={{ height: '100vh', mt: 0 }} alignItems="center" className="user-select-none">

          <Grid item xs={12} md={6} xl={7}>
            <Container component="main" className="scene">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}
              >
                <Box sx={{
                  my: 1, width: '100%', maxWidth: '400px', display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <Suspense fallback={<SignInLoadingUI />}>
                    <SignIn isShow={isMode} onClick={onChangeMode} onSignIn={onSignIn} onSignInGoogle={onSignGoogle} />
                  </Suspense>
                  <SignUp isShow={isMode} onClick={onChangeMode} onSignUp={onSignUp} onSignInGoogle={onSignGoogle} />
                </Box>
              </Box>
            </Container >

          </Grid >
          <Grid item xs={12} md={6} xl={5} sx={{ background: themeColor.PRIMARY_COLOR_100, display: { xs: 'none', md: 'block' }, height: '100vh' }}>
            <Box p={7} display="flex" justifyContent="center" alignItems="center" height="100%">
              <Image src={LogoLogin} width={1200} height={500} alt="logo login" style={{ width: '90%', height: 'auto' }} />
            </Box>
          </Grid>
        </Grid >
      </FormProvider >
  );
};

export default Auth;
