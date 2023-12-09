import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { DataFormProps } from '..';

type Props = {
    methods: UseFormReturn<DataFormProps, any, undefined>
    stock: number
}

const useAmount = ({ methods, stock }: Props) => {
    const { watch, setValue } = methods
    const amount = watch('amount')
    const onRemoveAmount = () => {
        if (+amount <= 1) {
            setValue('amount', 1);
            return;
        }
        setValue('amount', +amount - 1);
    };
    const onAddAmount = () => {
        if (+amount >= stock) {
            methods.setValue('amount', stock);
            return;
        }
        setValue('amount', +amount + 1);
    };

    const onBlurAmount = () => {
        if (+amount === 0) {
            setValue('amount', 1)
        }

        if (+amount > stock) {
            setValue('amount', stock)
        }
    }
    return { onRemoveAmount, onAddAmount, onBlurAmount }
}
export default useAmount