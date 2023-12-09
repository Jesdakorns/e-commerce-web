import { Box, IconButton, Theme, Typography, styled } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import { IoRemoveSharp, IoAddSharp } from 'react-icons/io5'
import TextFieldForm, { FormTextInputProps } from '@/components/Input/TextField'
import { FieldValue } from 'react-hook-form'

type Props = {
    label?: string
    onRemove?: MouseEventHandler<HTMLButtonElement>
    onPlus?: MouseEventHandler<HTMLButtonElement>
    colorBtn?: string,
    colorLabel?: string

}

const AmountButton = <FieldValue extends Record<string, any>>({ label, colorLabel, onRemove, onPlus, colorBtn, ...props }: FormTextInputProps<FieldValue> & Props) => {
    return (
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='subtitle1' color={colorLabel}>{label}</Typography>
            <BoxButtonQuantity component='div'>
                <IconButton
                    sx={{ color: `${colorBtn}`, }}
                    onClick={onRemove}
                >
                    <IoRemoveSharp />
                </IconButton>
                <TextFieldForm
                    {...props}
                    sx={{
                        '& .MuiInputBase-root': {
                            background: '#fff',
                            borderRadius: '999px',
                            padding: '0 5px',
                            height: '35px',
                            marginBottom: 0,
                            '& input': {
                                width: 50,
                                textAlign: 'center'
                            },
                            '&:hover fieldset': {
                                border: 'none',
                            },
                            '& fieldset': {
                                border: `none`,
                            },
                            '&.Mui-focused fieldset': { border: `none`, },
                        }
                    }}
                />
                <IconButton
                    sx={{ color: `${colorBtn}`, }}
                    onClick={onPlus}
                >
                    <IoAddSharp />
                </IconButton>
            </BoxButtonQuantity>
        </Box>
    )
}

export default AmountButton

const BoxButtonQuantity = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
}));