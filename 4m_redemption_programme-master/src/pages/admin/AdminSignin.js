import { Helmet } from 'react-helmet'
import React, { Component, useState } from 'react'
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
import { useAdmin } from 'src/provider/AdminDataProvider'
import Constants from 'src/Constants'

var moment = require('moment-timezone')

const useStyles = makeStyles({
    page: {
        textAlign: 'center',
        fontWeight: '100'
    },
    bottom: {
        display: 'flex',
        flexGrow: '1',

    },
    bold: {
        fontSize: '25px',
        fontWeight: '600',
        textAlign: 'center',
    },
}
)


const AdminSignin = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    var token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            navigate('/admin/total_fun_score', { replace: true })
        }
    }, [])
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values, helper) => {
            api.adminLogin(values.password).then(res => {
                navigate('/admin/total_fun_score', { replace: true })
                helper.setSubmitting(false)
            }).catch(e => {
                if (e.message == 'Network Error') {
                    helper.setErrors({ password: Constants.yup.NETWORK_ERROR })
                }
                else {
                    helper.setErrors({ password: Constants.yup.INVALID_PASSWORD })
                }
                helper.setSubmitting(false)
            })
        },
    })


    return (
        <>
            <Helmet>
                <title>Admin Login | TE4M Funometer</title>
            </Helmet>
            <Container maxWidth="xs" sx={{ minHeight: '100%', py: 3, textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='h3'>{moment().format('D/M/YYYY (ddd)')}</Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Box minHeight='256px' sx={{ mt: 5, mb: 2 }}>
                        <Typography variant='h2' paragraph fontWeight='bold'>TE4M Funometer</Typography>
                        <Typography variant='h1' fontWeight='bold' sx={{ my: 4 }}>ADMIN</Typography>
                        <TextField
                            error={Boolean(formik.errors?.password)}
                            fullWidth
                            helperText={formik.errors?.password}
                            label="Password"
                            margin="normal"
                            type='password'
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values?.password}
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
                </form>
                <Box sx={{ flexGrow: 3 }} />
            </Container>

        </>
    )
}

export default AdminSignin