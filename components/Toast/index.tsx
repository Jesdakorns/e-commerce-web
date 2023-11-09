"use client";
import { useAppContext } from '@/context/AppProvider';
import { NOTIFICATION_VARIANT } from '@/utils/constants';
import { AlertTitle, Box, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlertCircleIcon, CheckCircleIcon, CloseIcon, InfoCircleIcon } from '@/components/Icon';

export interface IToastNotification {
    message?: string;
    description?: string;
    icon?: any;
    variant?: NOTIFICATION_VARIANT;
}

const Container = styled.div<{ $bgcolor?: string; $color?: string }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background-color: ${({ $bgcolor }) => $bgcolor};
    color: ${({ $color }) => $color};
    padding: 14px 12px;
`;

const Message = styled.div`
`;

function Toast() {
    const [{ toastNotification }] = useAppContext();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!!toastNotification);
    }, [toastNotification]);

    const getToastData = () => {
        switch ((toastNotification as IToastNotification)?.variant) {
            case NOTIFICATION_VARIANT.SUCCESS:
                return {
                    textColor: '#1c5d11',
                    color: '#51dfa2',
                    icon: <CheckCircleIcon />
                };
            case NOTIFICATION_VARIANT.WARNING:
                return {
                    textColor: '#FFFFFF',
                    color: '#FFCC00',
                    icon: <AlertCircleIcon />
                };
            case NOTIFICATION_VARIANT.DANGEROUS:
                return {
                    textColor: '#a51815',
                    color: '#ffdbdb',
                    icon: <AlertCircleIcon />
                };
            case NOTIFICATION_VARIANT.INFO:
                return {
                    textColor: '#FFFFFF',
                    color: '#1d81d5',
                    icon: <InfoCircleIcon />
                };
            default:
                return {
                    textColor: '#FFFFFF',
                    color: '#FFCC00',
                    icon: <AlertCircleIcon />
                };
        }
    };

    const onClose = () => {
        setVisible(false);
    };

    const { icon, color, textColor } = getToastData();
    return (
        <Snackbar
            test-id="snackbar"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={visible}
            onClose={onClose}
            autoHideDuration={60000}
        >
            <Container $bgcolor={color} $color={textColor}>
                <Box display={'flex'} mr={'12px'}>
                    {icon}
                </Box>
                <Box>
                    <Message>{toastNotification?.message}</Message>
                </Box>
                <Box pl={2}>
                    <IconButton aria-label="close" color="inherit" sx={{ p: 0, ml: 1 }} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Container>
        </Snackbar>
    );
}

export default Toast;
