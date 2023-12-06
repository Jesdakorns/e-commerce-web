import { themeColor } from '@/utils/themeColor';
import { Box } from '@mui/material';
import React from 'react';

type PropsMessengerTextField = {
    mode?: 'error' | 'description' | undefined;
    message?: string;
};

export const MessengerTextField = ({ mode = 'error', message }: PropsMessengerTextField) => {
    return (
        <Box
            sx={{
                fontSize: `12px`,
                margin: message ? `5px 0` : '0',
                color: mode === 'error' ? `${themeColor.DANGER_COLOR}` : null,
            }}
        >
            {message}
        </Box>
    );
};
