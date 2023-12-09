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
import ProductHeaderBox from './ProductHeaderBox'
import ProductReviewBox from './ProductReviewBox'


type Props = {
    data?: IProduct
}

const ProductId = ({ data }: Props) => {
    const product = useAppSelector((state) => state.product)
    const dispatch = useDispatch<AppDispatch>()
    const methods = useForm({
        defaultValues: {
            amount: 1
        }
    })
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    const matchesMobileXs = useMediaQuery(themeMui.breakpoints.down('sm'));
    const matchesDesktop = useMediaQuery(themeMui.breakpoints.up('md'));
    const [reviewPhoto, setReviewPhoto] = useState(data?.coverPhoto?.[0])
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



// const IconIoChevronBackOutline = styled(IoChevronBackOutline)(({ theme }) => ({
//     fontSize: '2rem',
//     marginRight: '15px',
//     cursor: 'pointer'
// }));
const BoxImageReview = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
}));
const BoxSlider = styled(Box)(({ theme }) => ({
    '& .slick-slider.slick-initialized': {
        marginTop: '10px',

        position: 'relative',
        width: '100%',
        ['@media (max-width: 1025px)']: {
            // width: '100%',
        },
        '& .slick-list': {
            width: '100%',
        },
        '& .slick-track': {
            width: 'auto !important',
            display: 'inline-flex'
        },
        '& .slider-review': {
            // padding: '5px',
            // width: '100px',
            // height: '100px',
            // display: 'flex !important',
            // alignItems: 'center',
            // justifyContent: 'center',
            // borderRadius: '20px',
            // '& .review-image:nth-last-child(1)': {
            //     // borderRadius: '20px',
            //     width: '100%',
            //     // height: 'inherit'


            // },
            // '& .review-image:nth-first-child(1)': {
            //     // borderRadius: '20px',
            //     width: '100%',
            //     // height: 'inherit'


            // },
            // '& img': {
            //     height: '100px',
            //     cursor: 'pointer',
            //     borderRadius: '20px',
            //     ['@media (max-width: 666px)']: {
            //         height: '50px',
            //     },
            // },
        },
        '& .slick-prev, .slick-next': {
            height: '35px',
            width: 'auto',
            zIndex: 1
        },
        '& .slick-arrow.slick-prev': {
            position: 'absolute',
            left: '-11px',
        },
        '& .slick-arrow.slick-next': {
            position: 'absolute',
            right: '-11px',
        },
        '& .slick-prev:before': {
            content: '"←"',
            color: ' #525252',
            fontSize: '2.5rem',

        },
        '& .slick-next:before': {
            content: '"→"',
            color: ' #525252',
            fontSize: '2.5rem',

        }
    },
    '& .slick-slide, .slick-slide *': {
        outline: 'none',
        '& div': {
            display: 'flex',
        }
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