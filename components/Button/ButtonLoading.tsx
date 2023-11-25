import { Button, ButtonProps, styled } from "@mui/material";
import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
type Props = ButtonProps;

const CustomButton = styled(LoadingButton)(({ variant, size }) => ({
  height: size === 'large' ? 51 : size === 'medium' ? 42 : 38,
  borderRadius: 8,
  borderWidth: variant === 'outlined' ? '2px' : '',
  // '&:hover,:disabled': {
  //   borderWidth: '2px',
  // },
}));


const ButtonLoadingCT = ({ children, ...props }: Props) => {
  return <CustomButton {...props}>{children}</CustomButton>;
};

export default ButtonLoadingCT;
