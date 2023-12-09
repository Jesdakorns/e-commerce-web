'use client'
import { Box, Grid} from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { themeMui } from '@/utils/theme'
import { useAppSelector } from '@/store'
import AmountButton from '@/components/ProductId/AmountButton'
import useAmount from '@/components/ProductId/hook/useAmount'
import { DataFormProps } from '@/components/ProductId'
import ReviewPhotoBox from '@/components/ProductId/ReviewPhotoBox'
import PriceBox from '@/components/ProductId/PriceBox'
import TitleBox from '@/components/ProductId/TitleBox'
import DeliveryBox from '@/components/ProductId/DeliveryBox'
import StockBox from '@/components/ProductId/StockBox'
import OrderButton from '@/components/ProductId/OrderButton'


const ProductHeaderBox = () => {
    const methods = useFormContext<DataFormProps>()
    const product = useAppSelector((state) => state.product)
    const { onAddAmount, onRemoveAmount, onBlurAmount } = useAmount({ methods, stock: product?.stockQuantity ?? 0 })

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
                <ReviewPhotoBox />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={{ pt: { xs: 0, md: '16px' }}}>
                    <TitleBox>{product?.title}</TitleBox>
                    <PriceBox price={(product?.price ?? 0) - (product?.discount ?? 0)} />
                    <DeliveryBox>การจัดส่ง</DeliveryBox>
                    <AmountButton
                        colorLabel={`${themeMui.palette.primary.main}`}
                        label="จำนวน"
                        mode="positiveOnlyInteger"
                        name="amount"
                        colorBtn={`${themeMui.palette.primary.main}`}
                        inputProps={{
                            maxLength: product?.stockQuantity.toString().length
                        }}
                        onBlur={onBlurAmount}
                        onRemove={onRemoveAmount}
                        onPlus={onAddAmount}
                    />
                    <StockBox stock={product?.stockQuantity ?? 0} />
                    <OrderButton />
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProductHeaderBox
