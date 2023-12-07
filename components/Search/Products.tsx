import { useAppSelector } from "@/store"
import { Box, Grid, Pagination, Typography } from "@mui/material"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import ProductItem, { LoadingProductItem } from "../Item/ProductItem"
import React, { ReactNode, useCallback } from "react"
import { IoBagHandleOutline, IoCart, IoSearch, IoSearchOutline, IoSparklesOutline } from "react-icons/io5"
import RenderItems from "../Item/RenderItems"
import useCustomRouter from "@/hook/useCustomRouter"

type Props = {
    list?: boolean
}

const Products = ({ list }: Props) => {
    const productsSearch = useAppSelector((state) => state.productsSearch)
    const router = useRouter()
    const searchParams = useSearchParams()
    const { queryParams, pushQueryRouter } = useCustomRouter()

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        queryParams.set('p', `${value}`)
        pushQueryRouter(queryParams)
        // router.push(`search/?${createQueryString('p', `${value}`)}`)
    };

    return (
        <>
            <RenderItems
                hasLoader={productsSearch.loading}
                loader={<Grid container spacing={2} mb={3}>
                    {Array.from(Array(4)).map((val, idx) =>
                        <Grid key={idx} item xs={list ? 12 : 6} sm={list ? 12 : 4} md={list ? 12 : 3} lg={list ? 12 : 3}>
                            <LoadingProductItem />
                        </Grid>
                    )}
                </Grid>}
                dataLength={productsSearch?.data?.data.length}
                noDataEl={
                    <Box height={'50dvh'} display='flex' justifyContent='center' alignItems='center' flexDirection='column' >
                        <Box width={200} position='relative' px={3} mb={1}>
                            <IoBagHandleOutline style={{ width: '100%', height: '100%', color: '#ababab' }} />
                            <IoSparklesOutline style={{
                                position: 'absolute',
                                right: 0,
                                color: '#a9a9a9'
                            }} />
                            <IoSparklesOutline style={{
                                position: 'absolute',
                                left: -10,
                                top: 120,
                                color: '#a9a9a9'
                            }} />
                        </Box>
                        <Box width={{ xs: '100%', md: '40%' }}> <Typography variant="h6" color="#ababab" textAlign='center'>The product you selected was not found.</Typography></Box>
                    </Box>
                }
                hiddenEnd={!productsSearch.data.meta?.lastPage}
                endEl={
                    <Box display='flex' justifyContent='center'>
                        <Pagination onChange={handleChange} page={productsSearch.data.meta?.page ?? 1} count={productsSearch.data.meta?.lastPage || 1} variant="outlined" color="primary" />
                    </Box>
                }
            >
                <Grid container spacing={2} mb={3}>
                    {productsSearch?.data?.data?.map((val, idx) =>
                        <Grid key={val.id} item xs={list ? 12 : 6} sm={list ? 12 : 4} md={list ? 12 : 3} lg={list ? 12 : 3}>
                            <ProductItem list={list} title={val.title} image={val.coverPhoto?.[0]} totalSales={val.salesAmount} price={val.price} discount={val.discount} rating={3} />
                        </Grid>
                    )}
                </Grid>
            </RenderItems>
        </>
    )
}
export default Products
