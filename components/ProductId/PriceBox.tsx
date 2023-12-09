import { themeMui } from '@/utils/theme';
import { Typography } from '@mui/material';
import numeral from 'numeral';
import React from 'react'

type Props = {
    price: number
}

const PriceBox = ({ price }: Props) => {
    return (
        <Typography mb="75px" color={`${themeMui.palette.error.main}`} variant='h4'>฿{numeral(price).format('0,0')}</Typography>
    )
}

export default PriceBox
