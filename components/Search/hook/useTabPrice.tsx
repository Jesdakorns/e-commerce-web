import useCustomRouter from '@/hook/useCustomRouter';
import React from 'react'

const useTabPrice = () => {
    const { queryParams, pushQueryRouter } = useCustomRouter()
    const tabPrice = queryParams.get('tab') ?? '1'

    const handleTabPrice = (event: React.SyntheticEvent, newValue: string) => {
        queryParams.set('tab', newValue)
        pushQueryRouter(queryParams)
    };

    return { tabPrice, handleTabPrice }
}

export default useTabPrice