import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import { themeMui } from '@/utils/theme'

type Props = {
    children?: ReactNode
}

const DeliveryBox = ({ children }: Props) => {
    return (
        <Typography variant="subtitle1" color={`${themeMui.palette.primary.main}`} >{children}</Typography>

    )
}

export default DeliveryBox