'use client'
import { Box, Button, Container, Drawer, FormControl, Grid, IconButton, OutlinedInput, Pagination, Typography, useMediaQuery } from '@mui/material'
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import Select from '../Input/Select'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoAppsSharp, IoFunnel, IoList, IoOptions, IoReturnDownForward, IoSearchSharp } from 'react-icons/io5'
import { themeColor } from '@/utils/themeColor'
import ProductItem, { LoadingProductItem } from '../Item/ProductItem'
import { AppDispatch, useAppSelector } from '@/store'
import ButtonCT from '../Button/Button'
import TextFieldForm from '../Input/TextField'
import { themeMui } from '@/utils/theme'
import { useDispatch } from 'react-redux'
import { productsSearchStore, productsStore } from '@/store/actions'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingProduct } from '../Home/ProductList'
import Loadable from 'react-loadable';
import Products from '@/components/Search/Products'
import Filter from './Filter'
import useCustomRouter from '@/hook/useCustomRouter'

export type SearchFromProps = {
    sort?: string
    checkbox?: string
    price: number[]
    lowPrice?: number | null
    highPrice?: number | null
}

const Search = () => {
    const [list, setList] = useState(false)
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('lg'));
    const productsSearch = useAppSelector((state) => state.productsSearch)
    const dispatch = useDispatch<AppDispatch>()
    const pathname = usePathname()
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const pageParams = searchParams.get('p') || 1
    const sortParams = searchParams.get('sort') || ''
    const searchItemParams = searchParams.get('s') || ''
    const lowPriceParams = searchParams.get('lowPrice') || ''
    const highPriceParams = searchParams.get('highPrice') || ''
    const methods = useForm<SearchFromProps>({
        defaultValues: {
            sort: undefined,
            checkbox: undefined,
            price: [0, 10],
            // lowPrice: undefined,
            // highPrice: undefined
        }
    })
    const { watch, reset } = methods
    const sort = watch('sort')
    const checkbox = watch('checkbox')
    const [state, setState] = React.useState(false);
    const { queryParams, pushQueryRouter } = useCustomRouter()
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    useEffect(() => {
        reset({
            sort: sortParams,
            checkbox: '',
            price: [+(lowPriceParams ?? 0), highPriceParams ? +(highPriceParams) : productsSearch?.other?.['priceMax']],
            lowPrice: +lowPriceParams,
            highPrice: +highPriceParams
        })
    }, [productsSearch])


    useEffect(() => {
        dispatch(productsSearchStore({
            search: searchItemParams,
            page: +pageParams,
            order: sortParams,
            orderByField: 'priceMinusDiscount',
            lowPrice: lowPriceParams ? +lowPriceParams : undefined,
            highPrice: highPriceParams ? +highPriceParams : undefined,

        }))
        console.log('(lowPrice && highPrice)', lowPriceParams, highPriceParams)
    }, [searchItemParams, pageParams, sortParams, lowPriceParams, highPriceParams])


    return (
        <>
            <FormProvider {...methods}>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={12} lg={3} xl={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
                            <Filter />
                        </Grid>
                        <Grid item xs={12} md={12} lg={9} xl={9}>
                            <Box display='flex' alignItems='center' gap={1} mb={2}>
                                <IoSearchSharp style={{ fontSize: '25px' }} />
                                <Typography variant='h5'>
                                    ค้นหา: <Box color={themeColor.PRIMARY_COLOR} component='span'>{searchItemParams}</Box>
                                </Typography>
                            </Box>
                            <Box display='flex' gap={1} justifyContent='flex-end' alignItems='center' p={2} mb={2} sx={{ background: '#f6f6f6c2', }}>
                                {/* <Box width={100}>
                                    เรียงโดย
                                </Box> */}
                                 <IconButton size='medium' onClick={() => setList(true)}><IoList style={{ fontSize: '100%' }} /></IconButton>
                                <IconButton size='medium' onClick={() => setList(false)}><IoAppsSharp style={{ fontSize: '100%' }} /></IconButton>
                                {matchesMobile ? <IconButton size='medium' onClick={toggleDrawer(true)}><IoOptions style={{ fontSize: '100%' }} /></IconButton> : null}
                                <Select
                                    sx={{ width: 170 }}
                                    name='sort'
                                    data={[
                                        { label: 'เรียงโดยราคา', value: '' },
                                        { label: 'ราคา: จากน้อยไปมาก', value: 'ASC' },
                                        { label: 'ราคา: จากมากไปน้อย', value: 'DESC' },
                                    ]}
                                    onFocus={() => {
                                        queryParams.set('sort', sort ?? '')
                                        pushQueryRouter(queryParams)
                                    }}
                                >
                                </Select>
                               
                            </Box>
                            <Products list={list}/>
                        </Grid>
                    </Grid>
                    <Drawer
                        anchor={'right'}
                        open={state}
                        onClose={toggleDrawer(false)}
                        sx={{ '& .MuiPaper-root': { width: { xs: '100%', sm: 400 } } }}
                    >
                        <Box p={2}>
                            <Box display={{ xs: 'flex', sm: 'none' }} justifyContent='flex-end' mb={2}>
                                <IconButton size='medium' color="primary" aria-label="add to shopping cart" onClick={toggleDrawer(false)}>
                                    <IoReturnDownForward />
                                </IconButton>
                            </Box>
                            <Filter />
                        </Box>
                    </Drawer>
                </Container>
            </FormProvider>
        </>
    )
}

export default Search

