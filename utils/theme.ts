import { createTheme } from "@mui/material";
import { themeColor } from "./themeColor";



export const screen = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1920
};

export const themeMui = createTheme({
  palette: {
    primary: {
      light: themeColor.PRIMARY_COLOR,
      main: themeColor.PRIMARY_COLOR,
      dark: themeColor.PRIMARY_COLOR,
      contrastText: "#fff",
    },
    success: {
      light: themeColor.SUCCESS_COLOR,
      main: themeColor.SUCCESS_COLOR,
      dark: themeColor.SUCCESS_COLOR,
      contrastText: "#fff",
    },
    error: {
      main: themeColor.DANGER_COLOR,
      light: themeColor.DANGER_COLOR,
      dark: themeColor.DANGER_COLOR,
    },
    secondary: {
      main: themeColor.SECONDARY_COLOR,
      light: themeColor.SECONDARY_COLOR,
      dark: themeColor.SECONDARY_COLOR,
    },
    info: {
      main: themeColor.INFO_COLOR,
      light: themeColor.INFO_COLOR,
      dark: themeColor.INFO_COLOR,
      contrastText: "#000",
    },
  },
  breakpoints: {
    values: {
      xs: screen.xs,
      sm: screen.sm,
      md: screen.md,
      lg: screen.lg,
      xl: screen.xl
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        // Name of the slot
        root: {
          backgroundColor: '#8d8b8b'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: 'none'
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        // Name of the slot
        root: {
        //  '& svg':{fontSize: '100%'}
        },
      },
    },
  }
});
