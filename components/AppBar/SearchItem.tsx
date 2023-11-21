import { Dialog, DialogTitle, DialogContent, InputAdornment, IconButton, styled } from '@mui/material'
import React from 'react'
import TextFieldForm from '@/components/Input/TextField'
import { IoSearchSharp } from 'react-icons/io5';
import { FieldValues, Form, FormSubmitHandler, useFormContext } from 'react-hook-form';
import { useAppContext } from '@/context/AppProvider';
import { TFrom } from '.';

const SearchItem = () => {
    const { watch, setValue, handleSubmit } = useFormContext<TFrom>()
    const { open } = watch('dialogSearch')

    const handleCloseSearch = () => {
        setValue('dialogSearch.open', false)
        setValue('dialogSearch.search', '')
    }

    const handleSubmitSearch = async (data: FieldValues) => {
    }
    return (
        <>
            <CustomDialogSearch fullWidth maxWidth={'sm'} open={open} onClose={handleCloseSearch}>
                <DialogTitle p={0}>
                    <Form onSubmit={({ data }) => handleSubmitSearch(data)} >
                        <TextFieldForm
                            sx={{
                                '& .MuiInputBase-root': {
                                    '&:hover fieldset': {
                                        border: `none !important`,
                                    },
                                    '& fieldset': {
                                        border: `none`,
                                    },
                                },
                            }}
                            type='text'
                            name="dialogSearch.search"
                            placeholder="Search item"
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                            <IoSearchSharp />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}

                        />
                    </Form>
                </DialogTitle>
                <DialogContent sx={{ height: 400 }}>

                </DialogContent>

            </CustomDialogSearch >
        </>
    )
}

export default SearchItem

export const CustomDialogSearch = styled(Dialog)(({ }) => ({
    '& .MuiPaper-root': {
        borderRadius: '10px',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(107, 122, 144, 0.2)',
        backdropFilter: 'blur(4px)'
    },
    '& .MuiDialog-container': {
        alignItems: 'flex-start',
        marginTop: '70px'
    }
}));
