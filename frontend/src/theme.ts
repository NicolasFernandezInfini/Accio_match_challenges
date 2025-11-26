/**
 * ACCIÓ Matchmaking Platform - Material UI Theme
 * Customized to match ACCIÓ's corporate identity
 */

import { createTheme } from '@mui/material/styles'

// Colores corporativos de ACCIÓ
const accioColors = {
  beige: '#E6D7B8',
  beigeDark: '#D4C5A3',
  beigeDarker: '#C2B391',
  white: '#FEFEFE',
  black: '#1A1A1A',
  blue: '#0066CC',
  blueDark: '#004C99',

  // Escala de grises
  gray100: '#F5F5F5',
  gray200: '#E0E0E0',
  gray300: '#BDBDBD',
  gray600: '#757575',
  gray800: '#424242',

  // Colores funcionales
  success: '#2E7D32',
  successLight: '#E8F5E9',
  error: '#C62828',
  errorLight: '#FFEBEE',
  warning: '#F57C00',
  warningLight: '#FFF3E0',
  info: '#0288D1',
  infoLight: '#E3F2FD',
}

const theme = createTheme({
  palette: {
    primary: {
      main: accioColors.beige,
      dark: accioColors.beigeDark,
      contrastText: accioColors.black,
    },
    secondary: {
      main: accioColors.blue,
      dark: accioColors.blueDark,
      contrastText: accioColors.white,
    },
    error: {
      main: accioColors.error,
      light: accioColors.errorLight,
    },
    warning: {
      main: accioColors.warning,
      light: accioColors.warningLight,
    },
    info: {
      main: accioColors.info,
      light: accioColors.infoLight,
    },
    success: {
      main: accioColors.success,
      light: accioColors.successLight,
    },
    text: {
      primary: accioColors.black,
      secondary: accioColors.gray600,
    },
    background: {
      default: accioColors.white,
      paper: accioColors.white,
    },
    divider: accioColors.gray200,
  },
  typography: {
    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.25,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.25,
    },
    button: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontWeight: 700,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.06)',
    '0 4px 12px rgba(0,0,0,0.1)',
    '0 8px 32px rgba(0,0,0,0.2)',
    // MUI requiere 25 sombras, repetimos las últimas
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
    '0 8px 32px rgba(0,0,0,0.2)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: accioColors.beige,
          color: accioColors.black,
          '&:hover': {
            backgroundColor: accioColors.beigeDark,
          },
          '&:active': {
            backgroundColor: accioColors.beigeDarker,
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: accioColors.beige,
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: accioColors.beige,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: `1px solid ${accioColors.gray200}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: accioColors.gray200,
            },
            '&:hover fieldset': {
              borderColor: accioColors.gray300,
            },
            '&.Mui-focused fieldset': {
              borderColor: accioColors.blue,
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: accioColors.gray100,
          border: `1px solid ${accioColors.gray200}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: accioColors.white,
          color: accioColors.black,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          borderBottom: `1px solid ${accioColors.gray200}`,
        },
      },
    },
  },
})

export default theme
