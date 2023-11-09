'use client'

import React, { useState, useEffect, useRef } from 'react';
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
import { Avatar, Badge, BottomNavigation, BottomNavigationAction, Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, SxProps, Tooltip, useMediaQuery } from '@mui/material';
import { IoAddOutline, IoCartSharp, IoChatbubbleSharp, IoChevronBack, IoChevronForward, IoHome, IoLogOutOutline, IoPerson, IoSettingsOutline } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import { themeMui } from '@/utils/theme';
import { useAppContext } from '@/context/AppProvider';
import { signOut } from 'next-auth/react';
import { CSSTransition } from 'react-transition-group';

interface Props {
    window?: () => Window;
}

type MenuSub = Menu

type Menu = {
    title?: string
    icon?: React.ReactNode
    menuSub?: MenuSub[]
    route?: string
    divider?: boolean
}

export default function AppBarUI(props: Props) {
    const [activeMenuTable, setActiveMenuTable] = useState('main');
    const [menuHeight, setMenuHeight] = useState<number | null>(null);
    const [selectMenu, setSelectMenu] = useState<Menu | undefined | null>(null);
    const [selectMenuSub, setSelectMenuSub] = useState<Menu | undefined | null>(null);
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    const router = useRouter()
    const [{ user }] = useAppContext()
    const [first, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [menu, setMenu] = useState<Menu[]>([])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('event.currentTarget', event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
        let { route } = e.currentTarget.dataset
        if (route) {
            switch (route) {
                case 'signOut':
                    signOut({
                        redirect: true,
                        callbackUrl: '/signin'
                    })
                    break;
                case 'profile':
                    router.push(`/${route}`)
                    break;
                default:
                    setActiveMenuTable(route)
                    setSelectMenu(menu?.find(val => val.route === route))
                    break;
            }
        }
        // setAnchorEl(null);
    };
    const handleMenuSub = (e: React.MouseEvent<HTMLElement>) => {
        let { route } = e.currentTarget.dataset
        if (route) {
            setActiveMenuTable(route)
            console.log('menu.find(val => val.route === activeMenuTable)', selectMenu)
            setSelectMenuSub(selectMenu?.menuSub?.find(val => val.route === route))
        }
        // setAnchorEl(null);
    };

    function stringToColor(string: string) {
        let hash = 0;
        let i;


        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }


    function stringAvatar(name: string, image: string, sx?: SxProps) {
        return {
            sx: {
                bgcolor: name ? stringToColor(name) : undefined,
                width: 35, height: 35,
                ...sx
            },
            children: name ? [name?.split(' ')?.[0]?.[0], name?.split(' ')?.[1]?.[0]].join('') : undefined,
            src: image
        };
    }
    function calcHeight(el: any) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    useEffect(() => {
        setMenu([
            {
                title: user?.name || 'Profile',
                icon: <Avatar {...stringAvatar(user?.name ?? '', user?.image ?? '')} />,
                menuSub: [],
                route: 'profile',
                divider: true
            },
            {
                title: 'Add another account',
                icon: <IoAddOutline fontSize={22} />,
                menuSub: [
                    {
                        title: 'Add another account1',
                        icon: <IoAddOutline fontSize={22} />,
                        menuSub: [
                            { title: 'menu 1' }
                        ],
                        route: 'account1',
                    },
                ],
                route: 'account',
            },
            {
                title: 'Settings',
                icon: <IoSettingsOutline fontSize={22} />,
                menuSub: [
                    { title: 'menu 2' }
                ],
                route: 'settings',
            },
            {
                title: 'Logout',
                icon: <IoLogOutOutline fontSize={22} />,
                menuSub: [],
                route: 'signOut',
            }
        ])
    }, [user])

    useEffect(() => {
        setTimeout(() => {
            if (dropdownRef?.current?.offsetHeight) {
                console.log('dropdownRef?.current?.offsetHeight', dropdownRef?.current?.offsetHeight)
                setMenuHeight(dropdownRef?.current?.offsetHeight)
            }
        }, 0);
    }, [])


    return (
        <Box my={1}>
            <StyledAppBar sx={{ background: '#ffff', my: 1, top: { xs: 'auto' }, bottom: { xs: 10, md: 'auto' } }} enableColorOnDark>
                <Toolbar>
                    <Container maxWidth="xl">
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <StyledBoxLeft component="div" data-route="/" display={{ xs: 'none', md: 'flex' }}>
                                <Image src={Logo.src} width={30} height={30} alt='' />
                                <Typography variant="h5" component="div" color='primary' fontFamily='"Dancing Script", cursive !important'>
                                    {process.env.NEXT_PUBLIC_NAME_APP}
                                </Typography>
                            </StyledBoxLeft>
                            <Box width='100%' display='flex' justifyContent='space-around' >
                                <StyledBottomNavigation showLabels
                                    sx={{ width: { xs: '100%', md: '550px' } }}
                                    onChange={(_, newValue: any) => {
                                        setValue(newValue);
                                    }}
                                    value={first}>
                                    <StyledBottomNavigationAction
                                        label={'Home'}
                                        icon={<IoHome />}
                                    />
                                    <StyledBottomNavigationAction
                                        label={'Cart'}
                                        icon={
                                            <Badge
                                                color="error"
                                                max={999}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                badgeContent={0}>
                                                <IoCartSharp />
                                            </Badge>
                                        }
                                    />
                                    <StyledBottomNavigationAction
                                        label={'Chat'}
                                        icon={<Badge badgeContent={4} color="error"><IoChatbubbleSharp /></Badge>}
                                    />
                                    {matchesMobile ? (
                                        <StyledBottomNavigationAction
                                            label={'Profile'}
                                            icon={<IoPerson />}

                                        />
                                    ) : null}
                                </StyledBottomNavigation>
                            </Box>
                            <StyledBoxRight component="div" display={{ xs: 'none', md: 'flex' }}>
                                <Box>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar {...stringAvatar(user?.name ?? '', user?.image ?? '')} ></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={() => {
                                            setAnchorEl(null)
                                            setActiveMenuTable('main')
                                        }}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                minWidth: 350,
                                                p: 2,
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                                '& .MuiMenuItem-root': {
                                                    borderRadius: 2,
                                                    p: 2
                                                }
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <Box component={'div'} className="dropdown" sx={{ height: menuHeight }} >
                                            <CSSTransition
                                                in={activeMenuTable === 'main'}
                                                timeout={300}
                                                classNames="menu-primary"
                                                unmountOnExit
                                                onEnter={calcHeight}>

                                                <Box className="menu" >
                                                    {menu.map((val, idx) => {
                                                        return (
                                                            <React.Fragment key={idx}>
                                                                <MenuItem onClick={handleMenu} data-route={val.route} >
                                                                    <ListItemIcon>
                                                                        {val.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        {val.title}
                                                                    </ListItemText>
                                                                    {!!val?.menuSub?.length && <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                                                        <IoChevronForward fontSize={22} />
                                                                    </ListItemIcon>}
                                                                </MenuItem>
                                                                {val.divider && <Divider />}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Box>
                                            </CSSTransition>
                                            <CSSTransition
                                                in={menu.some(val => val.route === activeMenuTable)}
                                                timeout={500}
                                                classNames="menu-secondary"
                                                unmountOnExit
                                                onEnter={calcHeight}>
                                                <Box className="menu">
                                                    <MenuItem onClick={() => setActiveMenuTable('main')}>
                                                        <ListItemIcon>
                                                            <IoChevronBack fontSize={22} />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {selectMenu?.title}
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <Divider />
                                                    {selectMenu?.menuSub?.map((val, idx) => {
                                                        return (
                                                            <React.Fragment key={idx}>
                                                                <MenuItem onClick={handleMenuSub} data-route={val.route}>
                                                                    <ListItemIcon>
                                                                        {val.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        {val.title}
                                                                    </ListItemText>
                                                                    {!!val?.menuSub?.length && <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                                                        <IoChevronForward fontSize={22} />
                                                                    </ListItemIcon>}
                                                                </MenuItem>
                                                                {val.divider && <Divider />}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Box>
                                            </CSSTransition>
                                            <CSSTransition
                                                in={activeMenuTable === 'account1'}
                                                timeout={500}
                                                classNames="menu-secondary1"
                                                unmountOnExit
                                                onEnter={calcHeight}>
                                                <Box className="menu">
                                                    <MenuItem onClick={() => setActiveMenuTable('account')}>
                                                        <ListItemIcon>
                                                            <IoChevronBack fontSize={22} />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {selectMenuSub?.title}
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <Divider />
                                                    <MenuItem onClick={() => setActiveMenuTable('account')}>
                                                        <ListItemIcon>
                                                            <IoChevronBack fontSize={22} />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {selectMenuSub?.title}
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setActiveMenuTable('account')}>
                                                        <ListItemIcon>
                                                            <IoChevronBack fontSize={22} />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {selectMenuSub?.title}
                                                        </ListItemText>
                                                    </MenuItem>

                                                </Box>
                                            </CSSTransition>
                                            {/* <CSSTransition
                                                in={selectMenu?.menuSub?.some(val => val.route === activeMenuTable)}
                                                timeout={500}
                                                classNames="menu-secondary1"
                                                unmountOnExit
                                                onEnter={calcHeight}>
                                                <Box className="menu">
                                                    <MenuItem onClick={() => setActiveMenuTable('main')}>
                                                        <ListItemIcon>
                                                            <IoChevronBack fontSize={22} />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {selectMenu?.title}
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <Divider />
                                                    {selectMenu?.menuSub?.find(val => val.route === activeMenuTable)?.menuSub?.map((val) => {
                                                        return (
                                                            <>
                                                                <MenuItem onClick={handleMenu} data-route={val.route}>
                                                                    <ListItemIcon>
                                                                        {val.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        {val.title}
                                                                    </ListItemText>
                                                                    {!!val?.menuSub?.length && <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                                                        <IoChevronForward fontSize={22} />
                                                                    </ListItemIcon>}
                                                                </MenuItem>
                                                                {val.divider && <Divider />}
                                                            </>
                                                        )
                                                    })}
                                                </Box>
                                            </CSSTransition> */}
                                        </Box>

                                    </Menu>
                                    {/* <ButtonLansguage /> */}
                                </Box>
                            </StyledBoxRight>
                        </Box>
                    </Container>
                </Toolbar>
            </StyledAppBar >
            {/* <Toolbar /> */}
        </Box >
    );
}

const StyledAppBar = styled(AppBar)(({ theme }) => {
    return ({
        margin: '10px',
        maxWidth: 'calc(100% - 20px)',
        background: `#ffffff !important`,
        paddingBottom: `0 !important`,
        boxShadow: 'none',
        borderBottom: 'none',
        color: '#616060',
        WebkitBoxShadow: '0px -9px 20px 20px #fff',
        minHeight: '64px',
        userSelect: 'none',
        zIndex: 1000,
        [theme.breakpoints.down('md')]: {
            WebkitBoxShadow: '0px 9px 20px 20px #fff'
        },
        '& .MuiToolbar-root': {
            padding: `0 !important`,
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '10px',
            minHeight: '64px',
            maxHeight: '64px',
            boxShadow: '2px 2px 7px #cfcfcf',
        }
    })
});

const StyledBoxLeft = styled(Box)(({ theme }) => ({
    width: 180,
    display: 'flex',
    alignItems: 'center',
    gap: 10
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '10px 10px 0px 0px',

}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    width: '100%',
    color: `#8d8b8b`,
    fontSize: '1.5rem',
    borderRadius: '10px',
    maxWidth: '100%',
    minWidth: '80px',
    '&.Mui-selected': {
        color: `${theme.palette.primary.main}`,
    },
    '& .MuiBottomNavigationAction-label': {
        fontSize: '0.7rem',
    },
    '&:hover': {
        background: `${theme.palette.primary.main}30`,
    },
}));

const StyledBoxRight = styled(Box)(({ theme }) => ({
    // width: '200px',
    display: 'flex',
    justifyContent: 'flex-end'
}));
