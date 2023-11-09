import { Box, StandardTextFieldProps, TextField, styled } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';
import { MessengerTextField } from './MessengerTextField';
import { PATTERN } from '@/utils';
import { IMaskInput } from 'react-imask';



export const CustomTextField = styled(TextField)(({ size }) => ({
    '& .MuiInputBase-root': {
        borderRadius: `8px`,
        background: '#fff',
        marginBottom: '5px',
        '&:hover fieldset': {
            border: `2px solid #b9b9b9  !important`,
        },
        '& input': {
            padding: size === 'small' ? '7.5px 14px' : size === 'medium' ? '9.5px 14px' : '14px 14px',
        },
        '& fieldset': {
            border: `2px solid #b9b9b9 `,

        },
        '&.Mui-focused fieldset': { borderWidth: `2px !important` },
        '&.Mui-error fieldset': {
            // borderColor: theme.DANGER_COLOR,
        },
        '&.Mui-disabled fieldset': {
            backgroundColor: `#e8e8e859`,
        },
    },
}));


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
const CustomMuiTelInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="#00-000-0000"
                definitions={{
                    '#': /[0]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => {
                    onChange(value ?? '')
                }}
                overwrite
            />
        );
    },
);


type MODE =
    | 'textOnly'
    | 'integer'
    | 'float'
    | 'positiveOnlyInteger'
    | 'positiveOnlyFloat'

interface FormTextInputProps<FieldValue extends Record<string, any>>
    extends StandardTextFieldProps {
    control?: Control<FieldValue> | undefined;
    name: FieldPath<FieldValue>;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    description?: string;
    startLabelIcon?: React.ReactNode;
    endLabelIcon?: React.ReactNode;
    showRequired?: boolean;
    mode?: MODE;
    formType?: 'number';
}

const TextFieldForm = <FieldValue extends Record<string, any>>({
    control,
    name,
    rules,
    type,
    label,
    description,
    startLabelIcon,
    endLabelIcon,
    showRequired = true,
    mode,
    formType,
    ...props
}: FormTextInputProps<FieldValue>) => {
    const changeTextFormType = (text: string | null) => {
        if (!text) return null;
        return text;
    };

    return (
        <Controller
            // control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <Box width={'100%'}>
                    <Box
                        width={'100%'}
                        mb={
                            startLabelIcon || label || (showRequired && rules?.required) || endLabelIcon ? 0.7 : 0
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
                            {label}
                            {/* {showRequired && rules?.required && <Box color="red">*</Box>} */}
                            {endLabelIcon}
                        </Box>
                    </Box>
                    {type === 'tel' ? (
                        <CustomTextField
                            fullWidth
                            value={value !== null && value !== undefined ? value : ''}
                            onChange={onChange}
                            inputRef={ref}
                            error={!!error}
                            InputProps={{
                                inputComponent: CustomMuiTelInput as any,
                            }}
                            {...props}
                        />
                    ) : (
                        <CustomTextField
                            autoComplete="off"
                            onChange={(e) => {
                                let output = changeTextFormType(e.target.value);

                                if (formType === 'number') {
                                    if (!PATTERN.FLOAT.test(e.target.value)) {
                                        output = changeTextFormType(value);
                                    }
                                }
                                if (mode) {
                                    const MAP_MODE_TO_PATTERN = {
                                        integer: PATTERN.INTEGER,
                                        float: PATTERN.FLOAT,
                                        positiveOnlyInteger: PATTERN.POSITIVE_INT,
                                        positiveOnlyFloat: PATTERN.POSITIVE_FLOAT,
                                        textOnly: PATTERN.TEXT_ONLY,
                                    };
                                    if (!MAP_MODE_TO_PATTERN[mode].test(e.target.value) && e.target.value) {
                                        output = changeTextFormType(value);
                                    }
                                }
                                onChange(output);
                                return;
                            }}
                            onBlur={onBlur}
                            value={value !== null && value !== undefined ? value : ''}
                            inputRef={ref}
                            error={!!error}
                            type={type}
                            {...props}
                        />
                    )}
                    {error ? (
                        <MessengerTextField mode="error" message={error.message || `This field is required`} />
                    ) : (
                        <MessengerTextField mode="description" message={description} />
                    )}
                </Box>
            )}
        />
    );
};

export default TextFieldForm;
