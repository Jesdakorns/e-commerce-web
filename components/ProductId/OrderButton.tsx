import { Box, Grid } from '@mui/material'
import React from 'react'
import ButtonCT from '../Button/Button'
import { MdOutlineAddShoppingCart } from 'react-icons/md'

const OrderButton = () => {
    return (
        <Box component='div' sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5} >
                    <ButtonCT
                        className="btn-cle"
                        type="submit"
                        variant="outlined"
                        size="large"
                        disableElevation
                        fullWidth
                        startIcon={<MdOutlineAddShoppingCart />}
                        sx={{ minHeight: '39px !important' }}
                    >
                        เพิ่มเข้ารถเข็น
                    </ButtonCT>

                </Grid>
                <Grid item xs={12} md={5}>
                    <ButtonCT
                        className="btn-cle"
                        type="submit"
                        variant="contained"
                        size="large"
                        disableElevation
                        fullWidth
                        sx={{ minHeight: '50px !important' }}
                    >
                        สั่งซื้อ
                    </ButtonCT>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderButton