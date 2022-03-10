import { Helmet } from 'react-helmet'
import { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useBackDrop } from 'src/provider/BackdropProvider'
import gachaApi from 'src/api/gachaApi'
import DataTable from 'src/components/DataTable'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { useSnack } from 'src/provider/SnackbarProvider'
import { Container, Box, Table, IconButton, makeStyles, Divider, TableHead, TableBody, TableRow, TableCell, CircularProgress, Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Fab } from '@material-ui/core'
import { useAdmin } from 'src/provider/AdminDataProvider'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import 'src/theme/animation.css'
import classNames from 'classnames'
import Constants from 'src/Constants'
import { useNavigate } from 'react-router'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DataTableNoLimit from 'src/components/DataTableNoLimit'
var moment = require('moment-timezone')


const useStyles = makeStyles(theme => ({
    card: {
        '& .title': {
            display: 'inline-table',
            color: theme.palette.text.secondary,
            width: '200px',
            maxWidth: '100%',
            overflowWrap: 'anywhere',
            marginBottom: '8px',
        },
        '& .content': {
            display: 'inline-table',
            overflowWrap: 'anywhere',
            marginBottom: '8px',
            width: '300px',
            maxWidth: '100%'
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    // buttonSuccess: {
    //     backgroundColor: green[500],
    //     '&:hover': {
    //         backgroundColor: green[700],
    //     },
    // },
    fabProgress: {
        // color: green[500],
        zIndex: 99,
        position: 'absolute',
        width: '20px !important',
        height: '20px !important'
    },
}))
const mac = '396666c8ed9842f093015f037edbbc13'


const _ = require('lodash')



const StockValue = ({ stock }) => {
    if (stock === true) {
        return <span style={{ color: 'limegreen' }}>Available</span>
    }
    else if (stock === false) {
        return <span style={{ color: 'red' }}>Out of Stock</span>
    }
    else {
        return <span>No Data</span>
    }
}

const DeviceControl = () => {
    const classes = useStyles()
    const backdrop = useBackDrop()
    const snack = useSnack()
    const navigate = useNavigate()
    const [deviceStatus, setDeviceStatus] = useState()

    const { config } = useAdmin()
    const mac = config?.machine_id

    const [submitting, setSubmitting] = useState({})

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        gachaApi.getGachaDeviceStatus(mac).then(res => {
            setDeviceStatus(res.data)
        })
    }

    const handleRemoteRedeem = (row) => {
        var isSubmitting = submitting[row.id]
        if (!isSubmitting) {
            setSubmitting(s => ({ ...s, [row.id]: true }))
            gachaApi.remoteRedeem(mac, row.id).then(res => {
                if (res.data.status !== 'success') throw res.data.status
                getData()
                snack.open('Success')
                setSubmitting(s => ({ ...s, [row.id]: false }))
            }).catch(e => {
                var err = _.capitalize(e)
                if (err) {
                    snack.error('Failed : Device ' + err)
                }
                else {
                    snack.error('Failed')
                }
                setSubmitting(s => ({ ...s, [row.id]: false }))
            })
        }
    }

    if (moment().isSameOrAfter(Constants.Date.expired_time)) {
        navigate('/admin/login', { replace: true })
        return null
    }


    var isOnline = deviceStatus?.status === 'idle' || deviceStatus?.status === 'running'

    return (
        <>
            <Helmet>
                <title>Total Fun Score | TE4M Funometer</title>
            </Helmet>
            <Container sx={{ minHeight: '100%', py: 3 }} >
                <Typography variant='h1' paragraph>
                    Device Control Panel
                </Typography>
                <Card className={classes.card} sx={{ mb: 3, p: 2, pb: 1 }}>
                    <Box >
                        <Typography className='title'>Machine ID </Typography>
                        <Typography className='content'>{mac}</Typography>
                    </Box>
                    <Divider sx={{ mb: 2, mx: -2 }} />
                    <Box >
                        <Typography className='title'>Device Status </Typography>
                        {deviceStatus?.status
                            ? <Typography className='content' sx={{ color: isOnline ? 'limegreen' : 'red' }}>{isOnline ? 'Online' : 'Offline'}</Typography>
                            : <Typography className='content' >{'Connecting...'}</Typography>
                        }
                    </Box>
                    {deviceStatus?.data &&
                        <Fragment>
                            <Divider sx={{ mb: 2, mx: -2 }} />
                            <Box>
                                <Typography className='title'>Device Name </Typography>
                                <Typography className='content'>{deviceStatus?.data?.info?.trackConfig?.device_name}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2, mx: -2 }} />
                            <Box>
                                <Typography className='title'>Device Local IP </Typography>
                                <Typography className='content'>{deviceStatus?.data?.ip}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2, mx: -2 }} />
                            <Box >
                                <Typography className='title'>Device Master Code </Typography>
                                <Box className='content' sx={{ display: '' }}>
                                    <Typography > {deviceStatus?.data?.info?.masterCode} </Typography>
                                    <div>
                                        <a target='_blank' href={'https://grm.animaetech.com/api/token_qr/' + deviceStatus?.data?.info?.masterCode} style={{ textDecoration: 'underline' }}>
                                            <Box style={{ verticalAlign: 'super', display: 'inline' }}> Show QR Code </Box>
                                            <OpenInNewIcon style={{ height: '18px' }} />
                                        </a>
                                    </div>
                                </Box>
                            </Box>
                        </Fragment>
                    }
                </Card>
                {deviceStatus?.data &&
                    <Fragment>
                        <Typography variant='h1' paragraph>
                            Track List
                        </Typography>
                        <Grid container spacing={2} sx={{ flexDirection: 'row' }} >
                            <Grid item xs={12} md={4} >
                                <Card sx={{ height: '100%', minHeight: '200px', maxHeight: '500px', p: 2 }}>
                                    {config?.track_image_url && <img src={config?.track_image_url} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />}
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={8} >
                                <DataTableNoLimit
                                    heads={[
                                        { id: 'id', label: 'Track ID', value: 'id', width: '50%' },
                                        {
                                            id: 'stock', label: 'Has Stock', value: 'stock', width: '50%', content: (row) => <StockValue stock={_.get(deviceStatus, 'data.info.stockValue.' + row.id)} />
                                        },
                                        {
                                            id: 'action', label: 'Action', type: 'checkbox', width: '1%', sx: { textAlign: 'center' }, content: (row) => {
                                                var Icon = submitting[row.id] ? PlayCircleOutlineIcon : PlayCircleOutlineIcon
                                                return <Box sx={{ mx: -1 }}>
                                                    <IconButton color={submitting[row.id] == true ? 'primary' : ''}
                                                        onClick={() => handleRemoteRedeem(row)} sx={{ p: 0.5 }}
                                                    >
                                                        {submitting[row.id] == true && <CircularProgress size={30} sx={{ zIndex: 99, position: 'absolute', }} />}
                                                        <PlayCircleOutlineIcon />
                                                    </IconButton>
                                                </Box>
                                            }
                                        },
                                    ]}
                                    rowsPerPage={5}
                                    rows={_.get(deviceStatus, 'data.info.trackConfig.track')}
                                    _order='asc' _orderBy='id'
                                />
                            </Grid>

                        </Grid>
                    </Fragment>

                }
            </Container>
        </>
    )
}

export default DeviceControl
