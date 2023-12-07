import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Slider, Tab, Tabs, Typography, styled } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
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
import { productTypeStore } from '@/store/actions'
import numeral from 'numeral'
import RenderItems from '../Item/RenderItems'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Filter = () => {
    const dispatch = useDispatch<AppDispatch>()
    const productType = useAppSelector((state) => state.productType)
    const productsSearch = useAppSelector((state) => state.productsSearch)
    console.log(`🚀 ~ file: Filter.tsx ~ line 21 ~ Filter ~ products`, productsSearch)
    // const router = useRouter()
    const { watch, handleSubmit, setValue } = useFormContext<SearchFromProps>()
    const price = watch('price')
    // console.log(`🚀 ~ file: Filter.tsx ~ line 16 ~ Filter ~ price`, price)
    const lowPrice = watch('lowPrice')
    // console.log(`🚀 ~ file: Filter.tsx ~ line 16 ~ Filter ~ lowPrice`, lowPrice)
    const highPrice = watch('highPrice')
    // console.log(`🚀 ~ file: Filter.tsx ~ line 18 ~ Filter ~ highPrice`, highPrice)
    // const pathname = usePathname()
    const { queryParams, pushQueryRouter } = useCustomRouter()

    const [tab, setTab] = React.useState('1');
    const submitFilterPrice: SubmitHandler<SearchFromProps> = (val) => {
        if (tab === '2') {
            queryParams.set('p', '1')
            queryParams.set('lowPrice', `${val.lowPrice}`)
            queryParams.set('highPrice', `${val.highPrice}`)

        } else {
            const [low, high] = val.price
            queryParams.set('p', '1')
            queryParams.set('lowPrice', `${low}`)
            queryParams.set('highPrice', `${high}`)
        }

        pushQueryRouter(queryParams)
    }
    const clearFilterPrice = () => {
        queryParams.set('p', '1')
        queryParams.delete('lowPrice')
        queryParams.delete('highPrice')
        pushQueryRouter(queryParams)
        setValue('lowPrice', null)
        setValue('highPrice', null)
    }
    const minDistance = 1;
    const handleChange2 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue("price", [clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue("price", [clamped - minDistance, clamped]);
            }
        } else {
            setValue("price", newValue as number[]);
        }
    };
    function valuetext(value: number) {
        return `${numeral(value).format('0.0a')}`;
    }


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (productType.isSetData) return
        dispatch(productTypeStore())
    }, [])
    console.log('productsSearch?.other?.[]', productsSearch?.other?.['priceMax'])
    return (
        <Box sx={{ height: { xs: `100%`, md: `calc(100dvh - 132px)` }, borderRight: { xs: '', md: `1px solid #f8f8f8` }, pr: { xs: 0, md: 3 } }}>
            <Box display='flex' alignItems='center' gap={1} mb={2}>
                <IoFunnelOutline /> <Typography variant="body1">ค้นหาแบบละเอียด</Typography>
            </Box>
            <Box mb={3}>
                <RenderItems
                    dataLength={productType.data.length}
                >
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

                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab sx={{ width: '50%' }} label="Slider" value="1" />
                            <Tab sx={{ width: '50%' }} label="Input" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ px: 0 }}>
                        <PrettoSlider
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={price}
                            onChange={handleChange2}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                            valueLabelFormat={valuetext}
                            // max={400000}
                            max={productsSearch?.other?.['priceMax']}
                        // marks
                        />
                        <Box my={1}>Price: ฿{numeral(price?.[0]).format('0,0')} ~ ฿{numeral(price?.[1]).format('0,0')}</Box>

                    </TabPanel>
                    <TabPanel value="2" sx={{ px: 0 }}>
                        <Box display='flex' flexDirection='row'>
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
                disabled={tab === '2' ? !(+(lowPrice ?? 0) < +(highPrice ?? 0)) : undefined}
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
                onClick={clearFilterPrice}
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