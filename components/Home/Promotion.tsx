import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid, Pagination } from 'swiper/modules';


const promotionList = [
    { image: 'https://www.gloriafood.com/wp-content/uploads/2021/11/Christmas-restaurant-promotions-fb.png', url: '' },
    { image: 'https://mandarinrestaurant.com/wp-content/uploads/2021/01/MDR1693-MakeYourDishComeTrue-WebBanners-PromotionsBanner-1024x493-V2.jpg', url: '' },
    { image: 'https://peekandpoke.com/wp-content/uploads/2020/08/12-days-of-christmas-promotion-feature.png', url: '' },
]

const Promotion = () => {
    return (
        <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} gap={1}>
            <Box width={{ xs: '100%', md: '60%' }} height={'100%'}>
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
                    {promotionList.map((val, idx) => {
                        return (
                            <SwiperSlide key={idx} style={{ display: 'flex' }}>
                                <Box
                                    alt='main promotion image'
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '25/7' }}
                                    component='img'
                                    loading="lazy"
                                    src={val.image}>
                                </Box>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
            <Box display={'flex'} gap={1} width={{ xs: '100%', md: '40%' }} flexDirection={{ xs: 'column', sm: 'row', md: 'column' }}>
                <Box
                    sx={{ width: { xs: '100%', sm: 'calc(50% - 4px)', md: '100%' }, height: '100%', borderRadius: '10px', objectFit: 'cover', aspectRatio: '35/7' }}
                    component='img'
                    loading="lazy"
                    alt='sub promotion image'
                    src={'https://images.ctfassets.net/45roy5e8ztfd/4nbBmr6OFNk8fw7CyPfQNH/ec8f5441d8162156271acbe8530c651e/Mass-Millionaire-Holiday-Raffle-promo_page_banner_984x290.png'}>
                </Box>
                <Box
                    sx={{ width: { xs: '100%', sm: 'calc(50% - 4px)', md: '100%' }, height: '100%', borderRadius: '10px', objectFit: 'cover', aspectRatio: '35/7' }}
                    component='img'
                    loading="lazy"
                    alt='sub promotion image'
                    src={'https://images.ctfassets.net/45roy5e8ztfd/kdiNvtBNYTZFwef9CQOup/e560b59b47fe063b17f535fbf6ed7337/Snow_Much_Fun_Promo_2023_promo_page_banner_984x290.png'}>
                </Box>
                {/* <Box sx={{ borderRadius: '10px' }}>
                    <Image
                        src={'data:image/jpeg;base64,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'} width={200} height={200}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '35/7' }} alt="test" /></Box> */}
            </Box>


        </Box>
    )
}

export default Promotion