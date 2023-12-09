import { Box, Pagination, Typography } from '@mui/material';
import React from 'react'
import { IoStar } from 'react-icons/io5';
import { BoxHeading } from '@/components/ProductId';
import CustomRating from '@/components/Rating';
import { themeMui } from '@/utils/theme';
import CommentBox, { LoadingCommentBox, NotCommentBox } from '@/components/ProductId/CommentBox';
import RenderItems from '../Item/RenderItems';

const ProductReviewBox = () => {
    return (
        <Box sx={{ py: 2 }}>
            <BoxHeading gap={1}>
                <Typography variant="subtitle1">คะแนนรีวิวสินค้า</Typography>

                <CustomRating
                    size="small"
                    name="text-feedback"
                    value={3}
                    readOnly
                    precision={0.1}
                    emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                    start={<Typography variant="subtitle1" color={themeMui.palette.primary.main}>{3} / 5</Typography>}
                />
            </BoxHeading>
            <RenderItems
                hasLoader={false}
                loader={
                    Array.from(Array(2)).map((val, idx) =>
                        <LoadingCommentBox key={idx} />
                    )
                }
                dataLength={Array.from(Array(2)).length}
                noDataEl={<NotCommentBox />}
                hiddenEnd={!0}
                endEl={
                    <Box display='flex' justifyContent='center'>
                        <Pagination page={1} count={20} variant="outlined" color="primary" />
                    </Box>
                }
            >
                {Array.from(Array(5)).map((_, idx) => {
                    return (
                        <CommentBox key={idx} name="Test Test" rating={3} createdAt={new Date()}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae dolore hic sapiente tempore esse aliquam, illum laborum quaerat ut sequi aperiam? Error in unde aliquid consequuntur, sunt ullam?
                        </CommentBox>
                    )
                })}
            </RenderItems>
        </Box>
    )
}

export default ProductReviewBox
