import { Box, Divider, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import TextFieldForm from '@/components/Input/TextField'
import ButtonCT from '@/components/Button/Button'
import Image from "next/image";
import LogoMain from '@/src/assets/images/logo_main.png';
import { useFormContext } from 'react-hook-form'
import { RULES } from '@/utils/rules'
import { themeColor } from '@/utils/themeColor'
import RadioGroupForm from '@/components/Input/RadioGroup'
import { IoAddCircle } from 'react-icons/io5'
import ButtonAuthSocial from './ButtonAuthSocial'

interface Props {
    isShow?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
    onSignUp?: React.MouseEventHandler<HTMLButtonElement>
    onSignInGoogle?: React.MouseEventHandler<HTMLButtonElement>
}

const SignUp = ({ isShow = true, onSignUp, ...props }: Props) => {

    return (
        <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, scale: 0.5, display: 'none' }}
            animate={isShow ? { opacity: 1, scale: 1, display: 'block' } : { display: 'none' }}
            transition={{
                duration: 0.5,
                delay: 0,
                ease: [0, 0.7, 0.2, 1.3]
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Image src={LogoMain.src} width={90} height={90} alt="" />
                <Typography component="h1" variant="h5" textAlign="center" color={themeColor.PRIMARY_COLOR}>
                    Sign Up
                </Typography>
            </Box>
            <TextFieldForm type="email" name="signUp.email" placeholder="Email Address" fullWidth autoComplete="off" rules={{ required: isShow, pattern: RULES.PATTERN.EMAIL }} />
            <TextFieldForm type="password" name="signUp.password" placeholder="Password" fullWidth autoComplete="off" rules={{ required: isShow, pattern: RULES.PATTERN.PASSWORD }} />
            <TextFieldForm type='tel' name="signUp.phone" placeholder="Phone" inputProps={{ maxLength: 10, }} fullWidth autoComplete="off" rules={{ required: isShow, pattern: RULES.PATTERN.PHONE }} />
            <RadioGroupForm name="signUp.gender" row data={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' }
            ]}
                rules={{ required: isShow }}
            />
            <ButtonCT
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSignUp}
            >
                Sign Up
            </ButtonCT>
            <ButtonAuthSocial {...props} />

        </motion.div>

    )
}

export default SignUp