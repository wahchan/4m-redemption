import { createMuiTheme, colors } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'

const theme = createMuiTheme({
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    "& .MuiTableBody-root": {
                        "& .MuiTableCell-root": {
                            whiteSpace: 'nowrap',
                        },
                    },
                    "& .MuiTableCell-root": {
                        height: '40px',
                        borderLeft: "1px solid rgba(224, 224, 224, 1)",

                    },
                    "& .MuiTableSortLabel-icon": {
                        opacity: 0.5,
                    },
                    "& .Mui-active .MuiTableSortLabel-icon": {
                        opacity: 1,
                        color: 'limegreen',
                    },
                    '& .table-spacer': {
                        display: 'none',
                        borderLeft: '0 !important',
                        flex: '1 1 auto', width: '100%', padding: 0
                    }
                }
            }
        },
    }
})

export default theme.components.MuiTable
