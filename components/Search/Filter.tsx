import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Slider, Tab, Tabs, Typography, styled } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { IoFunnel, IoFunnelOutline } from 'react-icons/io5'
import TextFieldForm from '../Input/TextField'
import ButtonCT from '../Button/Button'
import CheckboxForm from '../Input/Checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { SearchFromProps } from '.'
import useCustomRouter from '@/hook/useCustomRouter'
import { AppDispatch, useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { priceMaxStore, productTypeStore } from '@/store/actions'
import numeral from 'numeral'
import RenderItems from '../Item/RenderItems'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import useDrawerFilter from './hook/useDrawerFilter'
import PriceSlider from './PriceSlider'
import useTabPrice from './hook/useTabPrice'

const Filter = () => {

    const dispatch = useDispatch<AppDispatch>()
    const productType = useAppSelector((state) => state.productType)
    const priceMax = useAppSelector((state) => state.priceMax)
    const methods = useFormContext<SearchFromProps>()
    const { watch, handleSubmit, setValue } = methods
    const price = watch('price')
    const lowPrice = watch('lowPrice')
    const highPrice = watch('highPrice')
    const { queryParams, pushQueryRouter } = useCustomRouter()
    const { submitFilterPrice, clearFilterPrice } = useDrawerFilter()
    const { tabPrice, handleTabPrice } = useTabPrice()

    useEffect(() => {
        if (productType.isSetData) return
        dispatch(productTypeStore())

    }, [])

    useEffect(() => {
        if (priceMax) return
        dispatch(priceMaxStore())
    }, [])

    return (
        <Box sx={{ height: { xs: `100%`, md: `calc(100dvh - 132px)` }, borderRight: { xs: '', md: `1px solid #f8f8f8` }, pr: { xs: 0, md: 3 } }}>
            <Box display='flex' alignItems='center' gap={1} mb={2}>
                <IoFunnelOutline /> <Typography variant="body1">ค้นหาแบบละเอียด</Typography>
            </Box>
            <Box mb={3}>
                <RenderItems dataLength={productType.data.length}>
                    <Typography variant="body1" color="">Product type</Typography>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {productType.data.map((val, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <ListItemButton
                                        sx={{ borderRadius: '10px !important' }}
                                        selected={[val.titleTh, val.titleEn].some((val) => val === (queryParams.get('s') ?? ''))}
                                        onClick={() => {
                                            queryParams.set('s', val.titleTh)
                                            queryParams.delete('p')
                                            pushQueryRouter(queryParams)
                                        }}>
                                        <ListItemText className='text-overflow' primary={val.titleTh} />
                                    </ListItemButton>
                                </React.Fragment>
                            )
                        })}
                    </List>
                </RenderItems>



            </Box>
            <Typography variant="body1" color="">Price</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>

                <TabContext value={tabPrice}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabPrice} aria-label="lab API tabs example">
                            <Tab sx={{ width: '50%' }} label="Slider" value="1" />
                            <Tab sx={{ width: '50%' }} label="Input" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ px: { xs: '15px', md: 0 } }}>
                        <PriceSlider />
                        <Box my={1}>Price: ฿{numeral(price?.[0]).format('0,0')} ~ ฿{numeral(price?.[1]).format('0,0')}</Box>

                    </TabPanel>
                    <TabPanel value="2" sx={{ px: { xs: '15px', md: 0 } }}>
                        <Box display='flex' flexDirection='row'>
                            <TextFieldForm
                                type="text"
                                placeholder="Low Price"
                                name="lowPrice"
                                formType='number'
                            />
                            <Box sx={{ display: 'flex', m: 2 }}>-</Box>
                            <TextFieldForm
                                type="text"
                                placeholder="High Price"
                                name="highPrice"
                                formType='number'
                            />
                        </Box>
                        <Box my={1}>Price: ฿{numeral(lowPrice).format('0,0')} ~ ฿{numeral(highPrice).format('0,0')}</Box>
                    </TabPanel>
                </TabContext>




            </Box>
            <ButtonCT
                className="btn-main"
                type="submit"
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                disabled={tabPrice === '2' ? !(+(lowPrice ?? 0) < +(highPrice ?? 0)) : undefined}
                sx={{ minHeight: '39px !important', }}
                onClick={handleSubmit(submitFilterPrice)}
            >
                Apply Price
            </ButtonCT>
            <ButtonCT

                className="btn-cle"
                type="submit"
                variant="outlined"
                size="large"
                disableElevation
                fullWidth
                // color=
                // disabled={!(lowPrice && highPrice)}
                sx={{ minHeight: '39px !important', mt: 2 }}
                onClick={() => clearFilterPrice(methods)}
            >
                Clear All
            </ButtonCT>
        </Box>
    )
}

export default Filter


const PrettoSlider = styled(Slider)(({ theme }) => ({
    // color: '#52af77',
    height: 5,

    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 20,
        width: 5,
        borderRadius: 10,
        //   backgroundColor: '#fff',
        //   border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 10,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: theme.palette.primary.main,
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}));