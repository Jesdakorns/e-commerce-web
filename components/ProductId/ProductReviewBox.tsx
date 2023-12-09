import { Avatar, Box, Rating, SxProps, styled } from '@mui/material';
import React from 'react'
import { IoStar } from 'react-icons/io5';
import { BoxHeading } from '.';
import { stringToColor } from '@/utils/function';
import dayjs from 'dayjs';

const ProductReviewBox = () => {

    const stringAvatar = (name: string, image?: string, sx?: SxProps) => {
        return {
            sx: {
                bgcolor: name ? stringToColor(name) : undefined,
                width: 35, height: 35,
                ...sx
            },
            children: name ? [name?.split(' ')?.[0]?.[0], name?.split(' ')?.[1]?.[0]].join('') : undefined,
            src: image,
            name: 'AccountSettings'
        };
    }
    const name = 'Jeeee Saaaa'
    return (
        <Box sx={{ py: 2 }}>
            <BoxHeading>
                <Box component='p' sx={{ mr: 2 }}>
                    คะแนนรีวิวสินค้า
                </Box>
                <BoxRating component='div'>
                    <Box component='span' sx={{ mr: 1, lineHeight: '15px' }} >{4} / 5</Box>
                    <StyledRating
                        size="small"
                        name="text-feedback"
                        value={4}
                        readOnly
                        precision={0.1}
                        emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </BoxRating>
            </BoxHeading>
            {Array.from(Array(4)).map((_,idx) => {
                return (
                    <BoxContent key={idx}>
                        <BoxAvatar component='div' sx={{ textTransform: 'uppercase' }}>
                            <Avatar {...stringAvatar(name)} alt='' />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' } }}>
                                    <Box component='p' sx={{ mr: 2, textTransform: 'capitalize' }}>{name}</Box>
                                    <Box component='span' sx={{ fontSize: '0.7rem', color: '#757575', lineHeight: '14px' }}>{dayjs().format('DD-MM-YYYY')}</Box>
                                </Box>
                                <BoxAvatarRating sx={{ display: 'flex' }}>
                                    <RatingReview
                                        sx={{ mr: 1 }}
                                        size="small"
                                        name="rating-review"
                                        value={4}
                                        readOnly
                                        precision={0.1}
                                        emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <RatingReviewText component='p'>
                                        4
                                    </RatingReviewText>
                                </BoxAvatarRating>
                            </Box>
                        </BoxAvatar>
                        <BoxReviewContent>
                            <BoxReviewText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis hic, recusandae accusantium officiis voluptatem commodi sit fugit debitis! Fugiat, odit. Cum accusamus rem earum, labore nobis laboriosam sunt doloremque nulla.
                            </BoxReviewText>
                        </BoxReviewContent>
                    </BoxContent>
                )
            })}
        </Box>
    )
}

export default ProductReviewBox



const StyledRating = styled(Rating)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem'
    },
    '& .MuiRating-iconFilled': {
        color: `${theme.palette.primary.main}`,
        //  fontSize: '1rem'
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    }
}));


const BoxRating = styled(Box)(({ theme }) => ({
    fontSize: '1.2rem',
    display: 'flex',
    color: `${theme.palette.primary.main}`,
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
    },
}));
const BoxContent = styled(Box)(({ theme }) => ({
    padding: '10px 20px',
    margin: '0 16px',
    marginBottom: '16px'
}));
const BoxAvatar = styled(Box)(({ theme }) => ({
    // fontSize: '1.2rem',
    display: 'flex',
    marginBottom: '10px',
    gap: 10
}));
const BoxAvatarRating = styled(Box)(({ theme }) => ({
    // fontSize: '1.2rem',
    display: 'flex',
    fontSize: '0.8rem',
    alignItems: 'center'
}));
const RatingReview = styled(Rating)(({ theme }) => ({
    fontSize: '0.8rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem'
    },
    '& .MuiRating-iconFilled': {
        color: `${theme.palette.primary.main}`,
        //  fontSize: '1rem'
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    }
}));
const RatingReviewText = styled(Box)(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontWeight: 'bold'

}));
const BoxReviewContent = styled(Box)(({ theme }) => ({
    paddingLeft: '47px',
    marginBottom: '15px'
}));
const BoxReviewText = styled(Box)(({ theme }) => ({
    marginBottom: '5px'
}));
const BoxReviewImageView = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap'
}));