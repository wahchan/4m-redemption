import { TextField, TextFieldProps } from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useMemo } from 'react'
const _ = require('lodash')
const FormikTextField = ({ name, formik, touchError = true, disableError, disableHelper, ...rest }) => {
    const value = _.get(formik.values, name)
    const error = _.get(formik.errors, name)
    const touched = _.get(formik.touched, name)
    const isError = !disableError && touchError ? Boolean(touched && error) : Boolean(error)
    try {
        return useMemo(() =>
            <TextField
                name={name}
                value={value}
                onChange={(e) => {
                    if (rest?.type == 'number') {
                        var n = _.toNumber(e.target.value)
                        formik.setFieldValue(name, e.target.value == '' ? null : n)
                    }
                    else {
                        formik.handleChange(e)
                    }
                }}
                onBlur={formik.handleBlur}
                error={isError}
                helperText={!disableHelper && isError && error
                }
                {...rest}
            />, [value, error])
    } catch (error) {
        console.error('FormikTextField => error', error)
        return null
    }

}

export default FormikTextField