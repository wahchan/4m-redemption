import { Helmet } from 'react-helmet'
import {
    Box,
    Container,
    Grid,
    Card,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core'
import { AlignCenter } from 'react-feather'
import RefreshIcon from '@material-ui/icons/Refresh'
import { useState } from 'react'
import { useEffect } from 'react'
import api from 'src/api/api'
import { useBackDrop } from 'src/provider/BackdropProvider'
var moment = require('moment-timezone')

const useStyles = makeStyles({

})

const _ = require('lodash')

const TotalFunFactors = () => {
    const classes = useStyles()

    const backdrop = useBackDrop()
    const [lastUpdated, setLastUpdated] = useState()
    const [total, setTotal] = useState()

    useEffect(() => {
        api.getTodayTotalFactor().then(res => {
            setTotal(res.data)
            setLastUpdated(new Date())
        })
    }, [])


    const refresh = () => {
        backdrop.open()
        api.getTodayTotalFactor().then(res => {
            setTotal(res.data)
            setLastUpdated(new Date())
            backdrop.close()
        }).catch(e => {
            backdrop.close()
        })
    }
    var score = _.toNumber(total?.total_fun_score)
    var avg_score = _.round(total?.total_fun_score / total?.total_submission, 2)

    return (
        <>
            <Helmet>
                <title>Total Fun Score | TE4M Funometer</title>
            </Helmet>
            <Container maxWidth='xs' sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center' }} >
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 5 }}>{moment(lastUpdated).format('D/M/YYYY (ddd)')}</Typography>
                <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 1 }}>TOTAL FUN SCORE</Typography>
                <Box sx={{ mb: 3, backgroundColor: 'secondary.main', p: 3.5, borderRadius: '5px 5px', border: '5px solid black' }}>
                    <Typography variant='h1' sx={{ fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {_.isNumber(total?.total_fun_score) ? total?.total_fun_score : '- - -'}
                    </Typography>
                </Box>
                <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 1 }}>AVERAGE FUN SCORE</Typography>
                <Box sx={{ backgroundColor: 'secondary.main', p: 3.5, borderRadius: '5px 5px', border: '5px solid black' }}>
                    <Typography variant='h1' sx={{ fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {_.isNumber(total?.avg_fun_score) ? _.round(total?.avg_fun_score, 2) : '- - -'}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                    <IconButton sx={{ p: 0, mr: 1 }} onClick={refresh}>
                        <RefreshIcon />
                    </IconButton>
                    <Typography variant='body2' color='textSecondary' sx={{ textAlign: 'left' }}>
                        Last updated on {lastUpdated ? moment(lastUpdated).format('YYYY-MM-DD HH:mm:ss') : ''}
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 2 }} />
            </Container>
        </>
    )
}

export default TotalFunFactors
