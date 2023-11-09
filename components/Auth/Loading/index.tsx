import { Divider, Grid, Skeleton } from '@mui/material'
import React from 'react'

export const SignInLoadingUI = () => {
    return (
        <>
            <Skeleton variant="rectangular" width={90} height={90} />
            <Skeleton variant="text" width={210} sx={{ my: 2 }} />
            <Skeleton variant="rounded" width={400} height={50} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width={400} height={50} sx={{ mb: 4 }} />
            <Skeleton variant="rounded" width={400} height={50} sx={{ mb: 2 }} />
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                    <Skeleton variant="text" width={210} />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} flexItem ><Skeleton variant="text" width={30} sx={{ my: 2 }} /></Divider>
            <Skeleton variant="rounded" width={400} height={50} />
        </>
    )
}
