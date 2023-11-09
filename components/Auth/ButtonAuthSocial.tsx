import { Box, Divider, Grid } from '@mui/material'
import React from 'react'
import ButtonCT from '@/components/Button/Button'


interface Props {
    onClick?: React.MouseEventHandler<HTMLDivElement>
    onSignUp?: React.MouseEventHandler<HTMLButtonElement>
    onSignInGoogle?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonAuthSocial = ({ onClick, onSignUp, onSignInGoogle }: Props) => {
    return (
        <>
           
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                    <Box sx={{ cursor: 'pointer', textDecorationLine: 'underline' }} onClick={onClick} >
                        {"Already have an account? Sign in"}
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} flexItem >or</Divider>
            <ButtonCT fullWidth variant="contained" color='info' size="large" sx={{ mb: 2 }} onClick={onSignInGoogle} startIcon={<Box className="login-with-google-btn "></Box>} >Sign in with Google</ButtonCT>
            {/* <ButtonCT fullWidth variant="contained" color='info' size="large" onClick={() => submitSignIn('github')} startIcon={<IoLogoGithub style={{ color: `#636363` }} />}>Sign in with GitHub</ButtonCT> */}
        </>
    )
}

export default ButtonAuthSocial