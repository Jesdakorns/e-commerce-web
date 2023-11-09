import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import React, { ReactNode } from 'react'
import { MessengerTextField } from './MessengerTextField';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';

interface FormTextInputProps<FieldValue extends Record<string, any>>
    extends RadioGroupProps {
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


const RadioGroupForm = <FieldValue extends Record<string, any>>({
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
                    <Box
                        width={'100%'}
                        mb={
                            startLabelIcon || (showRequired && rules?.required) || endLabelIcon ? 0.7 : 0
                        }
                    >
                        <Box
                            className="label"
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={0.5}
                        >

                            {startLabelIcon}
                            <FormLabel >{label}</FormLabel>
                            {showRequired && rules?.required && <Box color="red">*</Box>}
                            {endLabelIcon}
                        </Box>
                    </Box>
                    <FormControl error={!!error}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value !== null && value !== undefined ? value : ''}
                            {...props}
                        >
                            {data?.map(({ label, value }) => <FormControlLabel key={value} value={value} control={<Radio />} label={label} />)}
                        </RadioGroup>
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

export default RadioGroupForm