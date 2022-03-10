import { Helmet } from 'react-helmet'
import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core'
import { AlignCenter } from 'react-feather'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import api from 'src/api/api'
import { useStaff } from 'src/provider/StaffDataProvider'
import Constants from 'src/Constants'

var moment = require('moment-timezone')

const useStyles = makeStyles({

})




const StaffSignIn = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const staff = useStaff()

    useEffect(() => {
        staff.setStaff(null)
    }, [])

    const formik = useFormik({
        initialValues: {
            staff_id: '4MID-'
        },
        onSubmit: (values, helper) => {
            api.staffLogin(values.staff_id).then(res => {
                staff.setStaff(res.data)
                navigate('/staff/submit')
            }).catch(e => {
                if (e.message == 'Network Error') {
                    helper.setErrors({ staff_id: Constants.yup.NETWORK_ERROR })
                }
                else {
                    helper.setErrors({ staff_id: Constants.yup.STAFF_WRONG_ID })

                }
            }).finally(() => {
                helper.setSubmitting(false)
            })
        },
    })
    return (
        <>
            <Helmet>
                <title>Login | TE4M Funometer</title>
            </Helmet>
            <Container maxWidth="xs" sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='h3'>{moment().format('D/M/YYYY (ddd)')}</Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Box minHeight='256px' sx={{ mt: 5, mb: 2 }}>
                        <Typography variant='h2' paragraph fontWeight='bold'>TE4M Funometer</Typography>
                        <Typography variant='h1' fontWeight='bold' sx={{ my: 4 }}>STAFF</Typography>
                        <TextField
                            error={Boolean(formik.errors?.staff_id)}
                            fullWidth
                            helperText={formik.errors?.staff_id || 'Please input your staff ID'}
                            label="Staff ID"
                            margin="normal"
                            name="staff_id"
                            onChange={formik.handleChange}
                            value={formik.values?.staff_id}
                            variant="outlined"
                        />
                    </Box>
                    <Button
                        color="primary"
                        disabled={formik.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button disabled size="large" variant="contained" sx={{ mt: 2, visibility: 'hidden' }} >
                        Back
                    </Button>
                </form>
                <Box sx={{ flexGrow: 3 }} />
            </Container>
        </>
    )
}

export default StaffSignIn