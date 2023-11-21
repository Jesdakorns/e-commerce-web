import { Box, Divider, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import TextFieldForm from '@/components/Input/TextField'
import ButtonCT from '@/components/Button/Button'
import Image from "next/image";
import LogoMain from '@/src/assets/images/logo_main.png';
import { PATTERN } from '@/utils'
import { RULES } from '@/utils/rules'
import { themeColor } from '@/utils/themeColor'
import ButtonAuthSocial from './ButtonAuthSocial'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface Props {
    isShow?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
    onSignIn?: React.MouseEventHandler<HTMLFormElement>
    onSignInGoogle?: React.MouseEventHandler<HTMLButtonElement>
}

const SignIn = ({ isShow = true, onSignIn, ...props }: Props) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isShow ? { display: 'none' } : { opacity: 1, scale: 1, display: 'block' }}
            transition={{
                duration: 0.5,
                delay: 0,
                ease: [0, 0.7, 0.2, 1.3]
            }}
        >
            <Box component="form" onSubmit={onSignIn}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Image src={LogoMain.src} width={90} height={90} alt="" />
                    <Typography component="h1" variant="h5" textAlign="center" color={themeColor.PRIMARY_COLOR}>
                        Sign In
                    </Typography>
                </Box>
                <TextFieldForm type="text" name="signIn.email" placeholder="Email Address" fullWidth autoComplete="off" rules={{
                    required: !isShow, pattern: RULES.PATTERN.EMAIL
                }} />
                <TextFieldForm type={showPassword ? 'text' : 'password'} name="signIn.password" placeholder="Password" fullWidth autoComplete="off" rules={{
                    required: !isShow
                }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}

                />
                <ButtonCT
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </ButtonCT>
            </Box>
            <ButtonAuthSocial {...props} />
        </motion.div>

    )
}

export default SignIn
