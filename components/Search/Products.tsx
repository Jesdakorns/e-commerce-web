import { useAppSelector } from "@/store"
import { Box, Grid, Pagination } from "@mui/material"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import ProductItem, { LoadingProductItem } from "../Item/ProductItem"
import { useCallback } from "react"

const Products = () => {
    const productsSearch = useAppSelector((state) => state.productsSearch)
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('s') || 1
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`search/?${createQueryString('p', `${value}`)}`)
    };

    return (
        <>
            {productsSearch.loading ? (
                <Grid container spacing={2} mb={3}>
                    {Array.from(Array(4)).map((val, idx) =>
                        <Grid key={idx} item xs={6} sm={4} md={3} lg={3}>
                            <LoadingProductItem />
                        </Grid>
                    )}
                </Grid>
            ) : (
                <Grid container spacing={2} mb={3}>
                    {productsSearch?.data?.data?.map((val, idx) =>
                        <Grid key={val.id} item xs={6} sm={4} md={3} lg={3}>
                            <ProductItem title={val.title} image={val.coverPhoto?.[0]} totalSales={val.salesAmount} price={val.price} discount={val.discount} rating={3} />
                        </Grid>
                    )}
                </Grid>
            )}
            <Box display='flex' justifyContent='center'>
                <Pagination onChange={handleChange} page={productsSearch.data.meta?.page ?? 1} count={productsSearch.data.meta?.lastPage} variant="outlined" color="primary" />
            </Box>
        </>
    )
}
export default Products