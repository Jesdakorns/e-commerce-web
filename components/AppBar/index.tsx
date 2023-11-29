'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Logo from '@/src/assets/images/logo_main.png';
import Image from "next/image";
import { styled } from '@mui/system';
import { Avatar, Badge, Divider,IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Slide, SxProps, Tooltip } from '@mui/material';
import { IoAddOutline, IoCartSharp, IoChatbubbleSharp, IoChevronBack, IoChevronForward, IoHome, IoLogOutOutline, IoSearchSharp, IoSettingsOutline } from 'react-icons/io5';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppProvider';
import { signOut } from 'next-auth/react';
import { CSSTransition } from 'react-transition-group';
import { stringToColor } from '@/utils/function';
import { FormProvider, useForm } from 'react-hook-form';
import { TransitionProps } from '@mui/material/transitions';
import SearchItem from './SearchItem';
import NavMenu from './NavMenu';

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

type TMenuApp = {
    icon?: ReactNode
    text?: string
    url?: string
}

export type TFrom = {
    dialogSearch: {
        open: boolean
        search: string
    }
    navMenu: {
        first: number
        items: TMenuApp[]
    }
}

export default function AppBarUI(props: Props) {
    const methods = useForm<TFrom>({
        defaultValues: {
            dialogSearch: {
                open: false,
                search: ''
            },
        }
    })
    const { } = methods
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [activeMenuTable, setActiveMenuTable] = useState('main');
    const [menuHeight, setMenuHeight] = useState<number | null | undefined>(dropdownRef?.current?.offsetHeight);
    const [selectMenu, setSelectMenu] = useState<Menu | undefined | null>(null);
    const [selectMenuSub, setSelectMenuSub] = useState<Menu | undefined | null>(null);

    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const [{ user }] = useAppContext()
    const [first, setFirst] = useState<number | undefined>()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [menuApp, setMenuApp] = useState<TMenuApp[]>([])
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
    };
    const handleMenuSub = (e: React.MouseEvent<HTMLElement>) => {
        let { route } = e.currentTarget.dataset
        if (route) {
            setActiveMenuTable(route)
            console.log('menu.find(val => val.route === activeMenuTable)', selectMenu)
            setSelectMenuSub(selectMenu?.menuSub?.find(val => val.route === route))
        }
    };

    const stringAvatar = (name: string, image: string, sx?: SxProps) => {
        return {
            sx: {
                bgcolor: name ? stringToColor(name) : undefined,
                width: 35, height: 35,
                ...sx
            },
            children: name ? [name?.split(' ')?.[0]?.[0], name?.split(' ')?.[1]?.[0]].join('') : undefined,
            src: image,
            name: 'AccountSettings'
        };
    }
    const calcHeight = (el: any) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    useEffect(() => {
        setFirst(menuApp.findIndex(val => val.url === pathname))
        setMenuApp([
            { icon: <IoHome />, text: 'Home', url: '/' },
            {
                icon: <Badge
                    color="error"
                    max={999}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    badgeContent={0}>
                    <IoCartSharp />
                </Badge>,
                text: 'Cart', url: '/cart'
            },
            { icon: <Badge badgeContent={4} color="error"><IoChatbubbleSharp /></Badge>, text: 'Chat', url: '/chat' },
            { icon: <IoSearchSharp />, text: 'Search', url: '/search' },

        ])
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

    return (
        <>
            <FormProvider {...methods}>
                <Box my={1}>

                    <StyledAppBar sx={{ background: '#ffff', my: 1, top: { xs: 'auto' }, bottom: { xs: 10, md: 'auto' } }} enableColorOnDark>
                        <Toolbar>
                            <Container maxWidth="lg" sx={{ px: { xs: 1, md: 3 } }}>
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <StyledBoxLeft component="div" data-route="/" display={{ xs: 'none', md: 'flex' }}>
                                        <Image src={Logo.src} width={30} height={30} alt='' />
                                        <Typography variant="h5" component="div" color='primary' fontFamily='"Dancing Script", cursive !important'>
                                            {process.env.NEXT_PUBLIC_NAME_APP}
                                        </Typography>
                                    </StyledBoxLeft>
                                    <NavMenu />
                                    <StyledBoxRight component="div" display={{ xs: 'none', md: 'flex' }}>
                                        <Box>
                                            <Tooltip title="Account Settings">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-label='Account Settings'
                                                >
                                                    <Avatar {...stringAvatar(user?.name ?? '', user?.image ?? '')} alt='Account Settings' ></Avatar>
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
                                                </Box>
                                            </Menu>
                                        </Box>
                                    </StyledBoxRight>
                                </Box>
                            </Container>
                        </Toolbar>
                    </StyledAppBar >
                </Box >
                <SearchItem />
            </FormProvider>


        </>
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
    width: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 10
}));

const StyledBoxRight = styled(Box)(({ theme }) => ({
    // width: '200px',
    display: 'flex',
    justifyContent: 'flex-end'
}));
