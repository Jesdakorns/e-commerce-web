import { stringToColor } from '@/utils/function';
import { Avatar, Box, Skeleton, SxProps, Typography, styled } from '@mui/material';
import React, { ReactNode } from 'react'
import CustomRating from '@/components/Rating';
import { themeMui } from '@/utils/theme';
import { IoStar } from 'react-icons/io5';
import dayjs from 'dayjs';
import { TbMessageCircleCancel } from 'react-icons/tb';

type Props = {
    children: ReactNode
    name: string
    rating: number
    createdAt: Date
}

export const NotCommentBox = () => {
    return (
        <Box height={'30dvh'} display='flex' justifyContent='center' alignItems='center' flexDirection='column' >
            <Box width={200} position='relative' px={3} mb={1}>
                <TbMessageCircleCancel style={{ width: '100%', height: '100%', color: '#ababab' }} />
            </Box>
            <Box width={{ xs: '100%', md: '40%' }}> <Typography variant="h6" color="#ababab" textAlign='center'>The comment not found.</Typography></Box>
        </Box>
    )
}

export const LoadingCommentBox = () => {
    return (
        <BoxContent>
            <BoxAvatar component='div'>
                <Skeleton variant="circular" width={40} height={40} />
                <Box>
                    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                        <Skeleton width={100} />
                        <Skeleton width={100} />
                    </Box>
                    <Skeleton width={150} />
                </Box>
            </BoxAvatar>
            <BoxReviewContent>
                <Skeleton />
                <Skeleton />
                <Skeleton width={'50%'} />
            </BoxReviewContent>
        </BoxContent>
    )
}

const CommentBox = ({ children, name, rating, createdAt }: Props) => {
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
    return (
        <BoxContent>
            <BoxAvatar component='div'>
                <Avatar {...stringAvatar(name)} alt='' />
                <Box>
                    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{name}</Typography>
                        <Typography variant="caption">{dayjs(createdAt).format('DD-MM-YYYY')}</Typography>
                    </Box>
                    <CustomRating
                        sx={{ fontSize: '14px' }}
                        size="small"
                        name="rating-review"
                        value={rating}
                        readOnly
                        precision={0.1}
                        emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                        end={<Typography variant="subtitle2" color={themeMui.palette.primary.main}>({rating})</Typography>}
                    />
                </Box>
            </BoxAvatar>
            <BoxReviewContent>
                {children}
            </BoxReviewContent>
        </BoxContent>
    )
}

export default CommentBox

const BoxContent = styled(Box)(({ theme }) => ({
    padding: '10px 20px',
    margin: '0 16px',
    marginBottom: '16px'
}));

const BoxAvatar = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: '10px',
    gap: 10
}));

const BoxReviewContent = styled(Box)(({ theme }) => ({
    paddingLeft: '47px',
    marginBottom: '15px'
}));
