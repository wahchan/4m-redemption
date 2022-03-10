import { Helmet } from 'react-helmet'
import { AlignCenter } from 'react-feather'
import RefreshIcon from '@material-ui/icons/Refresh'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import api from 'src/api/api'
import { Container, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
var moment = require('moment-timezone')


const _ = require('lodash')

const Dashboard = () => {

  const [lastUpdated, setLastUpdated] = useState()
  const [todayResult, setTodayResult] = useState()

  useEffect(() => {
    api.getRedeemResult().then(res => {
      setTodayResult(_.get(res.data, 'data.scheduled_task'))
      setLastUpdated(new Date())
    })
    var timer = setInterval(() => {
      if (moment().second() === 0) {
        var time = new Date()
        api.getRedeemResult().then(res => {
          setTodayResult(_.get(res.data, 'data.scheduled_task'))
          setLastUpdated(time)
        })
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }

  }, [])






  var score = _.toNumber(todayResult?.total_fun_score)
  var avg_score = _.round(todayResult?.total_fun_score / todayResult?.total_submission, 2)

  return (
    <>
      <Helmet>
        <title>Dashboard | TE4M Funometer</title>
      </Helmet>
      <Container maxWidth='xs' sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center' }} >
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 5 }}>{moment(lastUpdated).format('D/M/YYYY (ddd)')}</Typography>
        <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 1 }}>TOTAL FUN SCORE</Typography>
        <Box sx={{ mb: 3, backgroundColor: 'secondary.main', p: 3.5, borderRadius: '5px 5px', border: '5px solid black' }}>
          <Typography variant='h1' sx={{ fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {_.isNumber(todayResult?.total_fun_score) ? todayResult?.total_fun_score : '- - -'}
          </Typography>
        </Box>
        <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 1 }}>AVERAGE FUN SCORE</Typography>
        <Box sx={{ backgroundColor: 'secondary.main', p: 3.5, borderRadius: '5px 5px', border: '5px solid black' }}>
          <Typography variant='h1' sx={{ fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {_.isNumber(todayResult?.avg_fun_score) ? _.round(todayResult?.avg_fun_score, 2) : '- - -'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
          {/* <IconButton sx={{ p: 0, mr: 1 }} onClick={refresh}>
            <RefreshIcon />
          </IconButton> */}
          <Typography variant='body2' color='textSecondary' sx={{ textAlign: 'left' }}>
            Last updated on {lastUpdated ? moment(lastUpdated).format('YYYY-MM-DD HH:mm') : ''}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 2 }} />
      </Container>
    </>
  )
}

export default Dashboard
