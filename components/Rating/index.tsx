import { RatingProps, styled, Rating, Theme, Box } from '@mui/material';
import React, { ReactNode } from 'react'

type Props = RatingProps & {
    start?: ReactNode
    end?: ReactNode
}

const CustomRating = ({ start, end, ...props }: Props) => {
    return (
        <Box display="flex" alignItems='center' gap={1}>
            {start ? <Box>{start}</Box> : null}
            <StyledRating {...props} />
            {end ? <Box>{end}</Box> : null}
        </Box>
    )
}

export default CustomRating

const StyledRating = styled(Rating)(({ theme }) => {
    return ({
        color: `${theme.palette.primary.main}`,
        '& .MuiRating-iconFilled': {
            color: `${theme.palette.primary.main}`,
        },
    })
});
