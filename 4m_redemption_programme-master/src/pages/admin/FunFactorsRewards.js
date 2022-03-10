import { Helmet } from 'react-helmet'
import {
    Box,
    Container,
    Grid,
    makeStyles,
    Radio
} from '@material-ui/core'
import DataTable from 'src/components/DataTable'
import { useState } from 'react'
import classNames from 'classnames'
import api from 'src/api/api'
import { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useBackDrop } from 'src/provider/BackdropProvider'

var moment = require('moment-timezone')

const useStyles = makeStyles({
    radio_active: {
        color: 'limegreen !important'
    },
    radio_inactive: {
        color: 'red !important',
    },
})

const _ = require('lodash')


const FunFactorsRewards = () => {
    const classes = useStyles()

    const [rewards, setRewards] = useState([])
    const backdrop = useBackDrop()

    useEffect(() => {
        backdrop.open()
        api.getCalculatedTasks().then(res => {
            backdrop.close()
            setRewards(_.get(res, 'data.calculated_tasks', []))
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>Fun Score Rewards | TE4M Funometer</title>
            </Helmet>
            <Container sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Typography variant='h1' paragraph>
                    Fun Score Rewards
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Radio disabled checked={true} sx={{ padding: 0 }} />
                        <Typography>
                            {': Function Disabled'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Radio disabled className={classes.radio_active} checked={true} sx={{ padding: 0 }} />
                        <Typography>
                            {': Condition Fulfilled'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Radio disabled className={classes.radio_inactive} checked={true} sx={{ padding: 0 }} />
                        <Typography>
                            {': Condition NOT Fulfilled'}
                        </Typography>
                    </Box>
                </Box>
                <DataTable dense heads={[
                    {
                        id: 'status', label: 'Status', value: 'status', sx: { textAlign: 'center' }, width: '1%', content: (row) =>
                            <Radio disabled checked={true} className={classNames({ [classes.radio_active]: row.has_reward == true }, { [classes.radio_inactive]: row.has_reward == false })} sx={{ padding: 0 }} />
                    },
                    { id: 'date', label: 'Date', value: 'date', content: (row) => moment(row.created_at).format('DD/MM/YYYY (ddd) HH:mm:ss') },
                    { id: 'fun_index', label: 'Fun Index', value: 'fun_index', content: (row) => <Box color={row.fun_index == row.total_fun_score ? 'limegreen' : 'red'}>{row.fun_index}</Box>, sx: { textAlign: 'right' } },
                    { id: 'total_fun_score', label: 'Total Fun Score', value: 'total_fun_score', content: (row) => <Box color={row.fun_index == row.total_fun_score ? 'limegreen' : 'red'}>{row.total_fun_score}</Box>, sx: { textAlign: 'right' } },
                    { id: 'daily_calculated_at', label: 'Calculated At', value: 'daily_calculated_at' },
                    { id: 'staff_ball', label: 'Staff Ball', value: 'drops.0' },
                    { id: 'gift_ball', label: 'Gift Ball', value: 'drops.1' },
                    // { id: 'created_at', label: 'Calculated At', value: 'created_at', content: (row) => moment(row.created_at).format('HH:mm:ss') },
                ]} rows={rewards} />
            </Container>
        </>
    )
}

export default FunFactorsRewards
