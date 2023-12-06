'use client'
import { BottomNavigation, Box, BottomNavigationAction, styled, useMediaQuery, Badge } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { TFrom } from '.';
import { themeMui } from '@/utils/theme';
import { usePathname, useRouter } from 'next/navigation';
import { IoCartSharp, IoChatbubbleSharp, IoHome, IoPerson, IoSearchSharp } from 'react-icons/io5';

type TMenuApp = {
    icon?: ReactNode
    text?: string
    url?: string
}

const NavMenu = () => {
    const router = useRouter()
    const pathname = usePathname()
    console.log(`🚀 ~ file: NavMenu.tsx ~ line 19 ~ NavMenu ~ pathname`, pathname.split('/'))
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    const { watch, setValue } = useFormContext<TFrom>()
    const [menuSelect, setMenuSelect] = useState<number | undefined>()
    const handleClickMenu = (event: React.SyntheticEvent<Element, Event>, val: number) => {
        const url = event.currentTarget.getAttribute('data-url')
        if (!url?.includes('search')) {
            setMenuSelect(val)
            router.push(`/${url}` || '')
            return
        }
        setValue('dialogSearch.open', true)

    }

    useEffect(() => {
        const elMenu = document.querySelectorAll('[data-url]')
        for (var i = 0; i < elMenu.length; i++) {
            const url = elMenu[i].getAttribute('data-url')
            if (url === pathname.split('/')?.[1]) {
                const idx = elMenu[i].getAttribute('data-index')
                setMenuSelect(+(idx ?? 0))
            }
        }
    }, [pathname])

    return (
        <Box width='100%' display='flex' justifyContent='space-around'>
            <StyledBottomNavigation showLabels
                sx={{ width: { xs: '100%', md: '420px' } }}
                onChange={handleClickMenu}
                value={menuSelect}
            >
                <StyledBottomNavigationAction
                    data-index='0'
                    data-url=''
                    label='Home'
                    icon={<IoHome />}
                />
                <StyledBottomNavigationAction
                    data-index='1'
                    data-url="cart"
                    label='Cart'
                    icon={<Badge color="error" max={999} badgeContent={1}><IoCartSharp /></Badge>}
                />
                <StyledBottomNavigationAction
                    data-index='2'
                    data-url="search"
                    label='Search'
                    icon={<IoSearchSharp />}
                />
                <StyledBottomNavigationAction
                    data-index='3'
                    data-url="chat"
                    label='Chat'
                    icon={<Badge color="error" max={999} badgeContent={1}><IoChatbubbleSharp /></Badge>}
                />
                {matchesMobile ? (
                    <StyledBottomNavigationAction
                        label={'Profile'}
                        icon={<IoPerson />}

                    />
                ) : null}
            </StyledBottomNavigation>
        </Box>
    )
}

export default NavMenu


const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '10px 10px 0px 0px',

}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    width: '100%',
    color: `#8d8b8b`,
    fontSize: '22px',
    borderRadius: '10px',
    maxWidth: '100%',
    minWidth: '60px',
    '& svg': {
        fontSize: '18px',
    },
    '&.Mui-selected': {
        color: `${theme.palette.primary.main}`,
    },
    '& .MuiBottomNavigationAction-label': {
        fontSize: '14px !important',
    },
    '&:hover': {
        background: `${theme.palette.primary.main}30`,
    },
}));
