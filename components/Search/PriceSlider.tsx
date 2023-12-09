import { Slider, styled } from '@mui/material';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { SearchFromProps } from '.';
import numeral from 'numeral';
import { useAppSelector } from '@/store';

const PriceSlider = () => {
    const priceMax = useAppSelector((state) => state.priceMax)
    const methods = useFormContext<SearchFromProps>()
    const { watch, handleSubmit, setValue } = methods
    const price = watch('price')
    console.log(`🚀 ~ file: PriceSlider.tsx ~ line 13 ~ PriceSlider ~ price`, price)

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

    return (
        <PrettoSlider
            getAriaLabel={() => 'Minimum distance shift'}
            value={price}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            valueLabelFormat={valuetext}
            max={priceMax}
        />
    )
}

export default PriceSlider


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