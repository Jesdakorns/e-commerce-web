import { Box, styled } from '@mui/material'
import React, { useMemo } from 'react'

type Props = {
    discount: number,
    price: number
}
const SaleTag = ({ discount, price }: Props) => {
    if (!discount) {
        return <></>
    }

    const percentDiscount = (((discount ?? 0) * 100) / (price ?? 0))
    const isInteger = Number.isInteger(percentDiscount) ? 0 : 1
    const percentageDiscount = (discount * 100) / (price ?? 0)

    return (
        <>
            <PercentageDiscountBox>
                -{percentageDiscount.toFixed(isInteger)}% sale
            </PercentageDiscountBox>
        </>
    )
}
export default SaleTag


const PercentageDiscountBox = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    position: `absolute`,
    right: 0,
    marginTop: '8px',
    background: '#f5e66b',
    padding: `0 10px`,
    color: '#B30000',
    fontSize: '14px'
}));
