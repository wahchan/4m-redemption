import { Helmet } from 'react-helmet'
import {
    Box,
    Container,
    Grid,
    Button,
    makeStyles,
    Typography
} from '@material-ui/core'
import { AlignCenter } from 'react-feather'
import { NavLink } from 'react-router-dom'

var moment = require('moment-timezone')

const useStyles = makeStyles({
    upperspace: {
        height: '20px',

    },
    page: {
        textAlign: 'center',
    },
})




const StaffSuccess = () => {
    const classes = useStyles()

    return (
        <>
            <Helmet>
                <title>Success | TE4M Funometer</title>
            </Helmet>
            <Container maxWidth="xs" sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='h3' >{moment().format('D/M/YYYY (ddd)')}</Typography>
                <Box minHeight='256px' sx={{ mt: 3, mb: 4 }}>
                    <img
                        alt="Logo"
                        src="/static/images/success.png"
                        width='140'
                        height='140'
                    />
                    <Typography variant='h1' fontWeight='bold' lineHeight={1.5}>
                        Submission
                        <br />
                        Successful
                    </Typography>
                </Box>
                <Button color="primary" to='/login' fullWidth size="large" variant="contained" component={NavLink} >
                    Back
                </Button>
                <Button disabled size="large" variant="contained" sx={{ mt: 2, visibility: 'hidden' }} >
                    Back
                </Button>
                <Box sx={{ flexGrow: 3 }} />
            </Container>
        </>
    )
}

export default StaffSuccess
