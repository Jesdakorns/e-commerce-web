import { useAppSelector } from '@/store'
import { Box, styled } from '@mui/material'
import React from 'react'
import { BoxHeading } from '.'

const ProductDescriptionBox = () => {
    const product = useAppSelector((state) => state.product)
    console.log(`🚀 ~ file: ProductDescriptionBox.tsx ~ line 7 ~ ProductDescriptionBox ~ product`, product)
    return (
        <Box component='div'>
            <BoxHeading>
                <Box component='p'>รายละเอียดสินค้า</Box>
            </BoxHeading>
            <Box p={2} dangerouslySetInnerHTML={{ __html: product?.description ?? '' }}>
            </Box>
        </Box>
    )
}

export default ProductDescriptionBox
