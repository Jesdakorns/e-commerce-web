'use client'
import { IProduct } from '@/network/api/response'
import { Box, Container, Fade, Grid, IconButton, Typography, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { themeMui } from '@/utils/theme'
import numeral from 'numeral'
import ButtonCT from '../Button/Button'
import TextFieldForm from '../Input/TextField'
import { IoAddSharp, IoRemoveSharp } from 'react-icons/io5'
import { AppDispatch, useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { productStore } from '@/store/actions'
import ProductDescriptionBox from './ProductDescriptionBox'



const ProductHeaderBox = () => {
    const product = useAppSelector((state) => state.product)
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    const matchesMobileXs = useMediaQuery(themeMui.breakpoints.down('sm'));
    const matchesDesktop = useMediaQuery(themeMui.breakpoints.up('md'));
    const [reviewPhoto, setReviewPhoto] = useState<string | undefined>()
    useEffect(() => {
        setReviewPhoto(product?.coverPhoto?.[0])
    }, [product])

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
                <Box display='flex' gap={1} flexDirection={{ xs: 'column-reverse', md: 'column-reverse' }}>

                    <Box width='100%' height='100%'>
                        <StyledSwiper
                            direction={'horizontal'}
                            pagination={{
                                clickable: false,
                            }}
                            className="mySwiper"
                            slidesPerView={matchesMobileXs ? 4 : matchesDesktop ? 3 : 5}
                            spaceBetween={10}
                        >
                            {product?.coverPhoto?.map((val, idx) => {
                                return (
                                    <SwiperSlide key={idx}>
                                        <Box
                                            onClick={() => { setReviewPhoto(val) }}
                                            onMouseOver={() => { setReviewPhoto(val) }}
                                            height='100%' sx={{ background: `url("${[process.env.NEXT_PUBLIC_API_BASE_URL, val].filter(val => val).join('/')}")`, aspectRatio: '1/1', objectFit: 'cover', backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, }}>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })}
                        </StyledSwiper>
                    </Box>
                    <Box width='100%'
                        sx={{ background: `url("${[process.env.NEXT_PUBLIC_API_BASE_URL, reviewPhoto].filter(val => val).join('/')}")`, aspectRatio: '1/1', objectFit: 'cover', backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, }}
                    ></Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <BoxContent sx={{ pt: { xs: 0, md: '16px' } }}>
                    <BoxTitle component='h1' className="o-text-title-product">{product?.title}</BoxTitle>
                    <BoxPrice component='h1'>฿{numeral((product?.price ?? 0) - (product?.discount ?? 0)).format('0,0')}</BoxPrice>
                    <BoxDelivery component='div' sx={{ mb: 1 }}>
                        <BoxText component='h4'>การจัดส่ง</BoxText>

                    </BoxDelivery>
                    <BoxQuantity component='div' sx={{ mb: 1 }}>
                        <BoxText component='h4'>จำนวน</BoxText>
                        <BoxButtonQuantity component='div'>
                            <IconButton
                                sx={{ color: `${themeMui.palette.primary.main}`, }}

                            // onClick={removeQuantity}
                            >
                                <IoRemoveSharp />
                            </IconButton>
                            <TextFieldForm
                                name="amount"
                                formType='number'
                                sx={{
                                    '& .MuiInputBase-root': {
                                        // borderColor: `${themeMui.palette.primary.main}`,
                                        background: '#fff',
                                        borderRadius: '999px',
                                        padding: '0 5px',
                                        height: '35px',
                                        marginBottom: 0,
                                        '& input': {
                                            width: 50,
                                            textAlign: 'center'
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '& fieldset': {
                                            border: `none`,

                                        },
                                        '&.Mui-focused fieldset': { border: `none`, },
                                    }
                                }}
                            />
                            <IconButton
                                sx={{ color: `${themeMui.palette.primary.main}`, }}
                            // onClick={addQuantity}
                            >
                                <IoAddSharp />
                            </IconButton>
                        </BoxButtonQuantity>
                    </BoxQuantity>
                    <BoxStockQuantity component='p'>มีสินค้าทั้งหมด {numeral((product?.stockQuantity)).format('0,0')} ชิ้น</BoxStockQuantity>
                    <BoxButtonPay component='div' sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={5} >
                                <ButtonCT
                                    className="btn-cle"
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    disableElevation
                                    fullWidth
                                    // startIcon={<AddShoppingCartIcon />}
                                    // loading={loadingLogin}
                                    sx={{ minHeight: '39px !important' }}
                                // onClick={() => {
                                //     dispatch(cartProduct(id, quantity))
                                //     setQuantity(1)
                                // }}
                                >
                                    เพิ่มเข้ารถเข็น
                                </ButtonCT>

                            </Grid>
                            <Grid item xs={12} md={7}>
                                <ButtonCT
                                    className="btn-cle"
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    fullWidth
                                    // loading={loadingLogin}
                                    sx={{ minHeight: '50px !important' }}
                                >
                                    สั่งซื้อ
                                </ButtonCT>
                            </Grid>
                        </Grid>
                    </BoxButtonPay>
                </BoxContent>
            </Grid>
        </Grid>
    )
}

export default ProductHeaderBox



const StyledSwiper = styled(Swiper)(({ theme }) => ({
    '&.swiper': {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        }
        // overflow: 'hidden',
    },
    '& .swiper-slide': {
        width: '100%',
        // height: ' 100%',
        // textAlign: 'center',
        // fontSize: '18px',
        background: '#fff',
        aspectRatio: '1/1',
        display: 'flex',
        // justifyContent: 'sta',
        alignItems: 'center',
    },

    '& .swiper-slide img': {
        display: 'block',
        width: '100%',
        height: ' 100%',
        objectFit: 'cover',
    }

}));


const BoxContent = styled(Box)(({ theme }) => ({
    padding: '16px',
}));
const BoxTitle = styled(Box)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,

}));
const BoxPrice = styled(Box)(({ theme }) => ({
    color: `${theme.palette.error.main}`,
    marginBottom: '85px'
}));
const BoxText = styled(Box)(({ theme }) => ({
    marginRight: '25px'
}));
const BoxDelivery = styled(Box)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    display: 'flex',
    alignItems: 'center'
}));
const BoxQuantity = styled(Box)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    display: 'flex',
    alignItems: 'center'
}));
const BoxButtonQuantity = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
}));
// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//     borderColor: `${theme.palette.primary.main}`,
//     margin: '5px',
//     '& .MuiOutlinedInput-root': {
//         background: '#fff',
//         '& .MuiOutlinedInput-input': {
//             textAlign: 'center'
//         },
//         '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: `${theme.palette.primary.main}`
//         },
//         '&:hover fieldset': {
//             borderColor: `${theme.palette.primary.main}`
//         },
//     },
// }));
// const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
//     borderRadius: '999px',
//     padding: '0 5px',
//     height: '35px',

// }));

const ButtonQuantity = styled(Box)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    width: '35px',
    height: '35px',
    background: '#fff',
    border: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    borderRadius: '999px',
    cursor: 'pointer',
    margin: '5px',
}));

const BoxStockQuantity = styled(Box)(({ theme }) => ({
    display: 'flex',
    color: `${theme.palette.primary.main}cc`,
    fontSize: '0.9rem'
}));

const BoxButtonPay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}));