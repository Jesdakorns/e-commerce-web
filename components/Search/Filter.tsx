import { Box, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { IoFunnel } from 'react-icons/io5'
import TextFieldForm from '../Input/TextField'
import ButtonCT from '../Button/Button'
import CheckboxForm from '../Input/Checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { SearchFromProps } from '.'
import useCustomRouter from '@/hook/useCustomRouter'

const Filter = () => {
    const router = useRouter()
    const { watch, handleSubmit, setValue } = useFormContext<SearchFromProps>()
    const lowPrice = watch('lowPrice')
    console.log(`🚀 ~ file: Filter.tsx ~ line 16 ~ Filter ~ lowPrice`, lowPrice)
    const highPrice = watch('highPrice')
    console.log(`🚀 ~ file: Filter.tsx ~ line 18 ~ Filter ~ highPrice`, highPrice)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { queryParams, pushQueryRouter } = useCustomRouter()

    const submitFilterPrice: SubmitHandler<SearchFromProps> = (val) => {
        queryParams.set('p', '1')
        queryParams.set('lowPrice', val?.lowPrice ?? '')
        queryParams.set('highPrice', val?.highPrice ?? '')
        pushQueryRouter(queryParams)
        // router.push(`${pathname}?${params.toString()}`)
    }
    const clearFilterPrice = () => {
        // const params = new URLSearchParams(searchParams)
        queryParams.set('p', '1')
        queryParams.delete('lowPrice')
        queryParams.delete('highPrice')
        pushQueryRouter(queryParams)
        // router.push(`${pathname}?${params.toString()}`)
        setValue('lowPrice', '')
        setValue('highPrice', '')
    }

    return (
        <Box>
            <Box display='flex' alignItems='center' gap={1} mb={2}>
                <IoFunnel /> <Typography variant="body1">ค้นหาแบบละเอียด</Typography>
            </Box>
            <Box>
                <CheckboxForm name="checkbox" label="Test" />
                {/* <CheckboxForm name="checkbox1" label="Test1" /> */}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                <TextFieldForm
                    type="text"
                    placeholder="Low Price"
                    name="lowPrice"
                    formType='number'
                // rules={{ required: true }}
                />
                <Box sx={{ display: 'flex', m: 2 }}>-</Box>
                <TextFieldForm
                    type="text"
                    placeholder="High Price"
                    name="highPrice"
                    formType='number'
                // rules={{ required: true }}
                />
            </Box>
            <ButtonCT
                className="btn-main"
                type="submit"
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                disabled={!(+(lowPrice ?? 0) < +(highPrice ?? 0))}
                sx={{ minHeight: '39px !important', }}
                onClick={handleSubmit(submitFilterPrice)}
            >
                Apply Price
            </ButtonCT>
            <ButtonCT

                className="btn-cle"
                type="submit"
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                color="error"
                disabled={!(lowPrice && highPrice)}
                sx={{ minHeight: '39px !important', mt: 2 }}
                onClick={clearFilterPrice}
            >
                Clear All
            </ButtonCT>
        </Box>
    )
}

export default Filter