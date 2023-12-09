import React, { useState } from 'react'
import { SubmitHandler, UseFormReturn, useFormContext } from 'react-hook-form';
import { SearchFromProps } from '..';
import useCustomRouter from '@/hook/useCustomRouter';

const useDrawerFilter = () => {
    const { queryParams, pushQueryRouter } = useCustomRouter()
    const [drawerFilter, setDrawerFilter] = useState(false);
    const tab = queryParams.get('tab') ?? ''
    console.log(`🚀 ~ file: useDrawerFilter.tsx ~ line 10 ~ useDrawerFilter ~ tab`, tab)
    const toggleDrawerFilter =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawerFilter(open);
            };

    const submitFilterPrice: SubmitHandler<SearchFromProps> = (val) => {
        console.log(`🚀 ~ file: useDrawerFilter.tsx ~ line 25 ~ useDrawerFilter ~ val`, val)
        if (tab === '2') {
            queryParams.set('p', '1')
            queryParams.set('lowPrice', `${val.lowPrice ?? 0}`)
            queryParams.set('highPrice', `${val.highPrice}`)

        } else {
            const [low, high] = val.price
            queryParams.set('p', '1')
            queryParams.set('lowPrice', `${low}`)
            queryParams.set('highPrice', `${high}`)
        }

        pushQueryRouter(queryParams)
    }

    const clearFilterPrice = (methods?: UseFormReturn<SearchFromProps, any>) => {
        queryParams.set('p', '1')
        queryParams.delete('lowPrice')
        queryParams.delete('highPrice')
        pushQueryRouter(queryParams)
        methods?.setValue('lowPrice', null)
        methods?.setValue('highPrice', null)
    }

    return { drawerFilter, toggleDrawerFilter, submitFilterPrice, clearFilterPrice }
}

export default useDrawerFilter