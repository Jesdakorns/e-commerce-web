import { themeMui } from '@/utils/theme'
import { Typography } from '@mui/material'
import numeral from 'numeral'
import React from 'react'

type Props = {
    stock: number
}

const StockBox = ({ stock }: Props) => {
    return (
        <Typography variant='subtitle2' color={`${themeMui.palette.primary.main}`}>มีสินค้าทั้งหมด {numeral((stock)).format('0,0')} ชิ้น</Typography>
    )
}

export default StockBox