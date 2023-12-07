import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid, Pagination } from 'swiper/modules';
import { AppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { promotionsStore } from '@/store/actions';

const Promotion = () => {
    const promotion = useAppSelector((state) => state.promotion);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (promotion?.isSetData) return
        dispatch(promotionsStore())
    }, [promotion])

    return (
        <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} gap={1}>
            <Box width={{ xs: '100%', md: '60%' }} height={'100%'}>
                {promotion?.loading ? (
                    <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ objectFit: 'cover', aspectRatio: '3/1', borderRadius: '10px' }} />
                ) : (
                    <Swiper
                        style={{ borderRadius: '10px', }}
                        modules={[Autoplay, Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }} className="mySwiper">
                        {promotion?.promotion?.map((val, idx) => {
                            return (
                                <SwiperSlide key={idx} style={{ display: 'flex' }}>
                                    <Box
                                        onClick={() => { window.open(val.url, '_back') }}
                                        alt='main promotion image'
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '3/1',background:'#0000' }}
                                        component='img'
                                        loading="lazy"
                                        src={[process.env.NEXT_PUBLIC_API_BASE_URL, val.image].filter(val => val).join('/')}>
                                    </Box>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                )}

            </Box>
            <Box display={'flex'} gap={1} width={{ xs: '100%', md: '40%' }} flexDirection={{ xs: 'column', sm: 'row', md: 'column' }}>
                {promotion?.loading ? (
                    <>
                        <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 4px)', md: '100%' }, height: '100%', borderRadius: '10px', objectFit: 'cover', aspectRatio: '35/7' }} />
                        <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 4px)', md: '100%' }, height: '100%', borderRadius: '10px', objectFit: 'cover', aspectRatio: '35/7' }} />
                    </>
                ) : (
                    promotion?.promotionSub?.map((val) => {
                        return (
                            <Box
                                onClick={() => { window.open(val.url, '_back') }}
                                key={val.id}
                                sx={{ width: { xs: '100%', sm: 'calc(50% - 4px)', md: '100%' }, height: '100%', borderRadius: '10px', objectFit: 'cover', aspectRatio: '35/7' }}
                                component='img'
                                loading="lazy"
                                alt='sub promotion image'
                                src={[process.env.NEXT_PUBLIC_API_BASE_URL, val.image].filter(val => val).join('/')}>
                            </Box>
                        )
                    })
                )}
            </Box>
        </Box >
    )
}

export default Promotion