'use client'

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Logo from '@/src/assets/images/logo_main.png';
import Image from "next/image";
import { styled } from '@mui/system';
import { Badge, BottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import { IoCartSharp, IoChatbubbleSharp, IoHome } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import { themeMui } from '@/utils/theme';
import AppBarUI from '@/components/AppBar';

interface Props {
    window?: () => Window;
    children: React.ReactNode;
}

function ScrollTop({ children, window }: Props) {

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: { xs: 100, md: 16 }, right: 16, transition: '1s' }}
            >
                {children}
            </Box>
        </Fade>
    );
}


export default function DefaultLayout(props: Props) {
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    console.log(`🚀 ~ file: index.tsx ~ line 64 ~ BackToTop ~ matches`, matchesMobile)
    const pathname = usePathname()
    const [first, setValue] = useState(0)
    const isPathSignin = pathname === '/signin'
    return (
        <>
            <Box id="back-to-top-anchor" />
            {isPathSignin ? (
                null
            ) : !matchesMobile ? (
                <>
                    <AppBarUI />
                </>
            ) : null}

            <Box sx={{ pb: isPathSignin ? 0 : { xs: '92px', md: 4 }, pt: isPathSignin ? 0 : { xs: 0, md: '92px' } }} >
                {props.children}
            </Box >

            {
                isPathSignin ? (
                    null
                ) : matchesMobile ? (
                    <>
                        <AppBarUI />
                    </>
                ) : null
            }

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    padding: '10px',
    background: `#ffffff !important`,
    paddingBottom: `0 !important`,
    boxShadow: 'none',
    borderBottom: 'none',
    color: '#616060',
    // maxHeight: '64px',
    minHeight: '64px',
    userSelect: 'none',
    zIndex: 1000,
    '& .MuiToolbar-root': {
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '10px',
        minHeight: '64px',
        maxHeight: '64px',
        boxShadow: '2px 2px 7px #cfcfcf',
    }
}));

const StyledBoxLeft = styled(Box)(({ theme }) => ({
    width: 400,
    display: 'flex',
    alignItems: 'center',
    gap: 10
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '10px 10px 0px 0px',
    width: '450px'
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: '1.5rem',
    borderRadius: '10px',
    '&.Mui-selected': {
        color: `#8d8b8b`,
    },
    '& .MuiBottomNavigationAction-label': {
        fontSize: '0.7rem',
    },
    '&:hover': {
        background: `${theme.palette.primary.main}30`,
    },
    '&.action': {
        color: `#545454 !important`,
        pointerEvents: 'none',
    }
}));

const StyledBoxRight = styled(Box)(({ theme }) => ({
    width: '200px',
    display: 'flex',
    justifyContent: 'flex-end'
}));
