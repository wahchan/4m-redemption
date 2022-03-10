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
import Constants from 'src/Constants'
import FormikTextField from 'src/components/Formik/FormikTextField'
var moment = require('moment-timezone')
const _ = require('lodash')

const useStyles = makeStyles({

})

yup.addMethod(yup.string, 'isValidTime', function (message) {
    return this.test('foramt', Constants.yup.TIME_FORMAT_ERROR, v => !v || moment(v, 'HH:mm', true).isValid())
})



const Parameters = () => {
    const classes = useStyles()
    const { config, setConfig } = useAdmin()
    const [saved, setSaved] = useState()
    const snack = useSnack()

    const formik = useFormik({
        initialValues: {
            ...config,
            drop_schedule: _.take(config.drop_schedule, 2)
        },
        validateOnChange: false,
        validationSchema: yup.object().shape({
            fun_index: yup.number().required().min(0).max(9).label('fun index'),
            drop_schedule: yup.array().of(
                yup.string().required()
                    .test('foramt', Constants.yup.TIME_FORMAT_ERROR, v => moment(v, 'HH:mm', true).isValid())
                    .test('after_12', Constants.yup.AFTER_CALCULATE, function (value) {
                        var daily_calculated_at = _.get(this, 'options.from.0.value.daily_calculated_at')
                        return moment(value, 'HH:mm').isSameOrAfter(moment(daily_calculated_at, 'HH:mm').add(5, 'minute'), 'minute')
                    }).test('min', Constants.yup.SECOND_DROP, function (value) {
                        var index = this.options.index
                        if (index == 0) return true
                        var array = _.slice(this.parent, 0, index)
                        return moment(value, 'HH:mm').isAfter(moment(_.min(array), 'HH:mm'), 'minute')
                    })
            ),
        }),
        onSubmit: (values, helper) => {
            setSaved(false)
            api.updateConfig(values).then(res => {
                snack.open('Saved')
                setSaved(true)
                setConfig(res.data)
                helper.setSubmitting(false)
            }).catch(e => {
                snack.open('Failed')
                helper.setSubmitting(false)
            })
        }
    })


    return (
        <>
            <Helmet>
                <title>Edit Default Schedule Parameters | TE4M Funometer</title>
            </Helmet>
            <Container sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Typography variant='h1' paragraph>
                    Edit Default Schedule Parameters
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>

                    <TextField
                        type='number'
                        inputProps={{
                            min: 0,
                            max: 9
                        }}
                        error={Boolean(formik.errors?.fun_index)}
                        fullWidth
                        helperText={formik.errors?.fun_index}
                        label="Fun Index"
                        name="fun_index"
                        onChange={formik.handleChange}
                        value={formik.values?.fun_index}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <FormikTextField
                        required
                        fullWidth
                        placeholder='HH:mm'
                        label='Daily Calculated At'
                        name='daily_calculated_at'
                        formik={formik}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        error={Boolean(_.get(formik.errors, 'drop_schedule.0'))}
                        fullWidth
                        helperText={_.get(formik.errors, 'drop_schedule.0')}
                        placeholder='HH:mm'
                        label="Staff Ball Drop Time"
                        name="drop_schedule.0"
                        onChange={formik.handleChange}
                        value={_.get(formik.values, 'drop_schedule.0')}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        error={Boolean(_.get(formik.errors, 'drop_schedule.1'))}
                        fullWidth
                        helperText={_.get(formik.errors, 'drop_schedule.1')}
                        placeholder='HH:mm'
                        label="Gift Ball Drop Time"
                        name="drop_schedule.1"
                        onChange={formik.handleChange}
                        value={_.get(formik.values, 'drop_schedule.1')}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button type='submit' disabled={formik.isSubmitting} variant='contained' color="primary" >
                            {'Save'}
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default Parameters
