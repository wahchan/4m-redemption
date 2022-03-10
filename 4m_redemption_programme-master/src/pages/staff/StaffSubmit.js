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
import * as yup from 'yup'
import { NavLink } from 'react-router-dom'

var moment = require('moment-timezone')


const StaffSubmit = () => {
    const navigate = useNavigate()

    const { staff } = useStaff()

    useEffect(() => {
        new Image().src = "/static/images/success.png"
    }, [])

    const formik = useFormik({
        initialValues: {
            value: null
        },
        validationSchema: yup.object().shape({
            value: yup.number().required().min(0).max(10).nullable(),
        }),
        onSubmit: (values, helper) => {
            api.createFunoMeterRecords({ staff_id: staff.id, value: values.value }).then(res => {
                helper.setSubmitting(false)
                navigate('/staff/success')
            }).catch(e => {
                helper.setSubmitting(false)
                helper.setErrors({ value: e.msg })
            })
        },
    })


    return (
        <>
            <Helmet>
                <title>Submit Fun Score | TE4M Funometer</title>
            </Helmet>
            <Container maxWidth="xs" sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='h3' >{moment().format('D/M/YYYY (ddd)')}</Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Box minHeight='256px' sx={{ mt: 5, mb: 2 }}>
                        <Typography variant='h2' paragraph fontWeight='bold'>TE4M Funometer</Typography>
                        <Typography variant='h1' fontWeight='bold' sx={{ my: 4, overflowWrap: 'anywhere' }}>
                            <span >{'Welcome, '}</span>
                            <span style={{ display: 'inline-block' }}>{staff.name}</span>
                        </Typography>
                        <TextField
                            error={Boolean(formik.errors?.value)}
                            type='number'
                            fullWidth
                            helperText={formik.errors?.value}
                            placeholder={'Fun Score Between (0-10)'}
                            label="Fun Score"
                            margin="normal"
                            name="value"
                            onChange={formik.handleChange}
                            value={formik.values?.value}
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
                        sx={{ mb: 2 }}
                    >
                        Submit
                    </Button>
                    <Button color="primary" to='/login' fullWidth size="large" variant="contained" component={NavLink} >
                        Back
                    </Button>
                </form>
                <Box sx={{ flexGrow: 3 }} />
            </Container>
        </>
    )
}


export default StaffSubmit
