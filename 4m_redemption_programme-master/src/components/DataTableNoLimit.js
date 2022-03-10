import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from '@material-ui/core'
import getInitials from 'src/utils/getInitials'
import { useTheme } from '@emotion/react'

const _ = require('lodash')
const useStyles = makeStyles((theme) => ({
    table: {
        "& .MuiTableBody-root": {
            "& .MuiTableCell-root": {
                whiteSpace: 'nowrap',
            },
        },
        "& .MuiTableCell-root": {
            height: '40px',
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('sm')]: {
                padding: (props) => props.dense ? '6px 8px' : null
            }

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
        },
    }
}))



const DataTableNoLimit = ({ rows = [], row_id = '_id', heads = [], _orderBy = 'created_at', _order = 'desc', loading = true, dense = false, ...rest }) => {
    const theme = useTheme()
    const classes = useStyles({ dense: dense })

    const [order, setOrder] = useState(_order)
    const [orderBy, setOrderBy] = useState(_orderBy)


    const sorted = useMemo(() => _.orderBy(rows, [orderBy], [order]), [rows, orderBy, order])

    const rowLength = _.size(sorted)

    const headCells = heads

    const bodyCells = sorted


    const handleSort = (cell) => {
        if (orderBy == cell.value) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        }
        else {
            setOrderBy(cell.value)
        }
    }

    return (
        <Card {...rest}>
            <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
                <Table size='small' className={classes.table}>
                    <TableHead>
                        <TableRow sx={{ height: '40px' }}  >
                            {
                                _.map(headCells, cell => (
                                    <TableCell key={cell.id}  type={cell.type}  sx={{ width: cell.width, minWidth: cell.width, ...cell.sx }} >
                                        {cell.sort === true
                                            ? <TableSortLabel
                                                active={orderBy === cell.value}
                                                direction={orderBy === cell.value ? order : 'asc'}
                                                onClick={(event) => handleSort(cell)}
                                                hideSortIcon={false}
                                            >
                                                {cell.label}
                                            </TableSortLabel>
                                            : _.get(cell, 'label')
                                        }
                                    </TableCell>
                                ))
                            }
                            <TableCell className='table-spacer' />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(bodyCells, (bodyCell, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{ height: '40px' }}
                            >
                                {_.map(headCells, headCell => (
                                    <TableCell key={headCell.id + index} width={headCell.width} sx={{ textAlign: headCell.align, ...headCell.sx }} type={headCell.type}>
                                        {headCell.content ? headCell.content(bodyCell, index, _.get(bodyCell, headCell.value)) : _.get(bodyCell, headCell.value)}
                                    </TableCell>
                                ))}
                                <TableCell className='table-spacer' />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box >
        </Card >
    )
}


export default DataTableNoLimit
