import { useAppSelector } from '@/store'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { BoxHeading } from '@/components/ProductId'

const ProductDescriptionBox = () => {
    const product = useAppSelector((state) => state.product)
    return (
        <Box component='div'>
            <BoxHeading>
                <Typography variant="subtitle1">รายละเอียดสินค้า</Typography>
            </BoxHeading>
            <Box p={2} dangerouslySetInnerHTML={{ __html: product?.description ?? '' }}>
            </Box>
        </Box>
    )
}

export default ProductDescriptionBox
