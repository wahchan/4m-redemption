import { createMuiTheme, colors } from '@material-ui/core'
import MuiTable from './MuiTable'
import shadows from './shadows'
import typography from './typography'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#21ACF0'
    },
    secondary: {
      contrastText: '#ffffff',
      main: '#90D5F7'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  components: {
    // MuiTable: MuiTable,
    MuiTablePagination: {
      styleOverrides: {
        selectRoot: {
          marginLeft: 8,
          marginRight: 12
        },
        actions: {
          marginLeft: 12,
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.common.white
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        InputLabelProps: {
          shrink: true
        },
        inputProps: {
          spellCheck: false
        }
      },
      styleOverrides: {
        root: {
          // height: '100%',
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '& .MuiInputBase-input': {
            paddingTop: '12px',
            paddingBottom: '12px',
          }
        }
      }
    }
  },

  shadows,
  typography: {
    fontFamily: 'Noto Sans HK, sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: '-0.24px'
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: '-0.24px'
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: '-0.06px'
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '-0.06px'
    },
    h5: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: '-0.05px'
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: '-0.05px'
    },
    overline: {
      fontWeight: 500
    }
  }
})

export default theme
