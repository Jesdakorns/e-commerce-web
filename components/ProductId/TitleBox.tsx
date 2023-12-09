import { themeMui } from '@/utils/theme'
import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const TitleBox = ({children}:Props) => {
    return (
        <Typography mb={1} variant='h5' color={`${themeMui.palette.primary.main}`} className='text-overflow'>{children}</Typography>
    )
}

export default TitleBox