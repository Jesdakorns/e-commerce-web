'use client'
import { IProduct } from '@/network/api/response'
import { Box, Container, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { productStore } from '@/store/actions'
import ProductDescriptionBox from './ProductDescriptionBox'
import ProductHeaderBox from './ProductHeaderBox'
import ProductReviewBox from './ProductReviewBox'


type Props = {
    data?: IProduct
}

export type DataFormProps = {
    amount: number
}

const ProductId = ({ data }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const methods = useForm<DataFormProps>({
        defaultValues: {
            amount: 1
        }
    })

    useEffect(() => {
        dispatch(productStore(data))
    }, [data])

    return (
        <FormProvider {...methods}>
            <Container maxWidth='lg'>
                <ProductHeaderBox />
                <Box sx={{ py: 2 }}>
                    <ProductDescriptionBox />
                </Box>
                <ProductReviewBox />
            </Container>
        </FormProvider >
    )
}

export default ProductId


export const BoxHeading = styled(Box)(({ theme }) => ({
    background: `${theme.palette.primary.main}1a`,
    fontSize: '1rem',
    padding: '10px 20px',
    margin: '16px 0',
    borderRadius: '10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
}));
