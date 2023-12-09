import { Box, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { themeMui } from '@/utils/theme';
import { useAppSelector } from '@/store';

const ReviewPhotoBox = () => {
    const product = useAppSelector((state) => state.product)
    const matchesMobile = useMediaQuery(themeMui.breakpoints.down('md'));
    const matchesMobileXs = useMediaQuery(themeMui.breakpoints.down('sm'));
    const matchesDesktop = useMediaQuery(themeMui.breakpoints.up('md'));
    const [reviewPhoto, setReviewPhoto] = useState<string | undefined>()


    useEffect(() => {
        setReviewPhoto(product?.coverPhoto?.[0])
    }, [product])


    return (
        <Box display='flex' gap={1} flexDirection='column'>
            <Box width='100%'
                sx={{ borderRadius: 2, background: `url("${[process.env.NEXT_PUBLIC_API_BASE_URL, reviewPhoto].filter(val => val).join('/')}")`, aspectRatio: '1/1', objectFit: 'cover', backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, }}
            />

            <Box width='100%' height='100%'>
                <StyledSwiper
                    direction={'horizontal'}
                    pagination={{
                        clickable: false,
                    }}
                    slidesPerView={matchesMobileXs ? 4 : matchesDesktop ? 3 : 5}
                    spaceBetween={10}
                >
                    {product?.coverPhoto?.map((val, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <Box
                                    className="cursor-pointer"
                                    onClick={() => { setReviewPhoto(val) }}
                                    onMouseOver={() => { setReviewPhoto(val) }}
                                    height='100%' sx={{ borderRadius: 2, position: 'cus', background: `url("${[process.env.NEXT_PUBLIC_API_BASE_URL, val].filter(val => val).join('/')}")`, aspectRatio: '1/1', objectFit: 'cover', backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `contain`, }}>
                                </Box>
                            </SwiperSlide>
                        )
                    })}
                </StyledSwiper>
            </Box>
        </Box>
    )
}

export default ReviewPhotoBox



const StyledSwiper = styled(Swiper)(({ theme }) => ({
    '&.swiper': {
        width: '100%',
        height: 'auto',
    },
    '& .swiper-slide': {
        width: '100%',
        background: '#fff',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
    },

    '& .swiper-slide img': {
        display: 'block',
        width: '100%',
        height: ' 100%',
        objectFit: 'cover',
    }

}));
