import { Box, Rating, Skeleton, Typography, styled } from '@mui/material';
import numeral from 'numeral';
import React from 'react'

type Props = {
    title: string,
    image?: string,
    totalSales?: number
    price?: number,
    discount?: number
    rating?: number
}

export const LoadingProductItem = () => {
    return (
        <StyledBoxItem>
            <Box className="img" sx={{ position: 'relative', }}>
                <Skeleton variant="rectangular" height={'100%'} />
            </Box>
            <Box display='flex' flexDirection='column' px={2} pb={1}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Box className="footer-box-text" display='flex' flexDirection='column' justifyContent='space-between' >
                    <Skeleton variant="text" width={80} />
                    <Typography component='p' fontSize={12}><Skeleton variant="text" width={60} /></Typography>
                    <Typography component='p' fontSize={16}>
                        <Skeleton variant="text" width={40} />
                    </Typography>
                </Box>
            </Box>
        </StyledBoxItem>
    )
}


const ProductItem = ({ title, image, totalSales, price, discount, rating }: Props) => {

    const percentDiscount = ((discount ?? 0) * 100) / (price ?? 0)
    return (
        <StyledBoxItem>

            <Box component="div" className="img" sx={{ position: 'relative', background: `url("${[process.env.NEXT_PUBLIC_API_BASE_URL, image].filter(val => val).join('/')}")` }}>
                {discount ? (
                    <Box sx={{
                        width: 'fit-content',
                        position: `absolute`,
                        right: 0,
                        marginTop: '8px',
                        background: '#f5e66b',
                        padding: `0 10px`,
                        color: '#B30000',
                        fontSize: '14px'
                    }}>-{((discount * 100) / (price ?? 0)).toFixed(Number.isInteger(percentDiscount) ? 0 : 1)}% sale</Box>
                ) : null}

            </Box>
            <Box display='flex' flexDirection='column' gap={1} px={2} pb={1}>
                <Typography component='p' className='box-text text-overflow'>{title}</Typography>
                <Box className="footer-box-text" display='flex' flexDirection='column' justifyContent='space-between' >
                    {(rating !== undefined && rating !== null) ? (
                        <Rating name="size-small" defaultValue={rating} size="small" readOnly />
                    ) : null}
                    {(totalSales !== undefined && totalSales !== null) ? (
                        <Typography component='p' fontSize={12}>ยอดขาย {numeral(totalSales).format('0a')} ชิ้น</Typography>
                    ) : null}
                    {(price !== undefined && price !== null) ? (
                        <Box display='flex'>
                            <Typography component='p' fontSize={16} sx={{ textDecoration: discount ? 'line-through' : '', color: discount ? 'rgba(0,0,0,.54)' : '#ee4d2d' }}>
                                ฿{numeral(price).format('฿0,0[.]00')}
                            </Typography>
                            <Typography component='p' fontSize={16} color={'#ee4d2d'} ml={1}>
                                {discount ? <>฿{numeral((price ?? 0) - (discount ?? 0)).format('฿0,0[.]00')} </> : null}
                            </Typography>
                        </Box>
                    ) : null}
                </Box>
            </Box>
        </StyledBoxItem >
    )
}

export default ProductItem



const StyledBoxItem = styled(Box)(({ theme }) => ({
    gap: 10,
    width: '100% ',
    height: '100%',
    // textAlign: 'center',
    borderRadius: '10px',
    display: 'flex !important',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    backgroundColor: '#ffff',
    marginBottom: '5px',
    '&:hover': {
        // borderRadius: '10px',
        boxShadow: `0px 2px 14px -9px ${theme.palette.primary.main}`,
        backgroundColor: '#fff',
        ['@media (max-width: 666px)']: {
            margin: 'auto'
        }
    },
    '& .img': {
        width: '100%',
        // height: '250px',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        objectFit: 'cover',
        aspectRatio: '2/2'
    },
    '& .box-text': {
        width: '100%',
        color: '#2E2E2E',
        fontSize: '14px',
        letterSpacing: '0.5',
        textAlign: 'left',
        height: '43px',
        gap: '5px',
        overflow: 'hidden',
    },
}));
