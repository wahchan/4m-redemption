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
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAdmin } from 'src/provider/AdminDataProvider'
import api from 'src/api/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSnack } from 'src/provider/SnackbarProvider'
import { useBackDrop } from 'src/provider/BackdropProvider'
import Constants from 'src/Constants'
var moment = require('moment-timezone')
const _ = require('lodash')




const ChangePassword = () => {

    const snack = useSnack()
    const backdrop = useBackDrop()

    const formik = useFormik({
        initialValues: {
            password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: yup.object().shape({
            password: yup.string().required().nullable(),
            new_password: yup.string().min(4).required().nullable().test('equal', Constants.yup.NEW_PASSWORD_EQUAL, function (value) {
                return this.parent.password !== value
            }).label('new password'),
            confirm_password: yup.string().required().nullable().test('equal', Constants.yup.CONFIRM_PASSWORD_EQUAL, function (value) {
                return this.parent.new_password === value
            }).label('confirm new password')
        }),
        onSubmit: (values, helper) => {
            backdrop.open()
            api.changePassword(values)
                .then(res => {
                    backdrop.close()
                    snack.open('Success')
                    helper.setSubmitting(false)
                    helper.resetForm()
                })
                .catch(e => {
                    backdrop.close()
                    if (e.msg === 'invalid password') {
                        helper.setErrors({ password: e.msg })
                    }
                    helper.setSubmitting(false)
                })

        }
    })


    return (
        <>
            <Helmet>
                <title>Change Password | TE4M Funometer</title>
            </Helmet>
            <Container sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Typography variant='h1' paragraph>
                    Change Password
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <TextField
                        error={Boolean(formik.touched?.password && formik.errors?.password)}
                        helperText={formik.touched?.password && formik.errors?.password}
                        fullWidth
                        label="Current Password"
                        type='password'
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.password}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        error={Boolean(formik.touched?.new_password && formik.errors?.new_password)}
                        helperText={formik.touched?.new_password && formik.errors?.new_password}
                        fullWidth
                        label="New Password"
                        type='password'
                        name="new_password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.new_password}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        error={Boolean(formik.touched?.confirm_password && formik.errors?.confirm_password)}
                        helperText={formik.touched?.confirm_password && formik.errors?.confirm_password}
                        fullWidth
                        label="Confirm New Password"
                        name="confirm_password"
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.confirm_password}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button type='submit' disabled={formik.isSubmitting} variant='contained' color="primary" >
                            {'Submit'}
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default ChangePassword
