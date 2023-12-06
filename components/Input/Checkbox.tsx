import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, RadioGroupProps, Select, SelectProps, styled } from '@mui/material';
import React, { ReactNode } from 'react'
import { MessengerTextField } from './MessengerTextField';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';

interface FormTextInputProps<FieldValue extends Record<string, any>>
    extends SelectProps {
    control?: Control<FieldValue> | undefined;
    name: FieldPath<FieldValue>;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    description?: string;
    startLabelIcon?: React.ReactNode;
    endLabelIcon?: React.ReactNode;
    showRequired?: boolean;
    formType?: 'number';
    label?: ReactNode
    data?: {
        label: string;
        value: string;
    }[]
}



export const CustomCheckbox = styled(Select)(({ size }) => ({
    '&.MuiInputBase-root': {
        backgroundColor: '#ffff',
        '& .MuiSelect-select': {
            padding: size === 'small' ? '7.5px 14px' : size === 'medium' ? '9.5px 14px' : '14px 14px',
        }
    },
}));


const CheckboxForm = <FieldValue extends Record<string, any>>({
    control,
    name,
    rules,
    description,
    startLabelIcon,
    endLabelIcon,
    showRequired = false,
    formType,
    label,
    data,
    ...props
}: FormTextInputProps<FieldValue>) => {
    return (
        <Controller
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <Box width={'100%'}>
                    <FormControl error={!!error}>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={onChange}
                                checked={value}
                            />}
                            label={label}
                            labelPlacement="end"
                        />
                    </FormControl>

                    {error ? (
                        <MessengerTextField mode="error" message={error.message || `This field is required`} />
                    ) : (
                        <MessengerTextField mode="description" message={description} />
                    )}
                </Box>
            )}
        />
    )
}

export default CheckboxForm