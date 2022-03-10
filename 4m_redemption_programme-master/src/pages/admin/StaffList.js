import { Helmet } from 'react-helmet'
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Alert,
    InputAdornment
} from '@material-ui/core'
import { AlignCenter } from 'react-feather'
import { useState } from 'react'
import DataTable from 'src/components/DataTable'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import SearchIcon from '@material-ui/icons/Search'
import EditDialog from 'src/components/EditDialog'
import { useFormik } from 'formik'
import { useEffect } from 'react'

import * as yup from 'yup'
import api from 'src/api/api'
import { useAdmin } from 'src/provider/AdminDataProvider'
import { Typography } from '@material-ui/core'
import { useSnack } from 'src/provider/SnackbarProvider'
import Constants from 'src/Constants'
import { useBackDrop } from 'src/provider/BackdropProvider'
var moment = require('moment-timezone')
const _ = require('lodash')
const useStyles = makeStyles({

})


const StaffList = () => {
    const classes = useStyles()
    const snack = useSnack()
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [search, setSearch] = useState('')


    const [staffList, setStaffList] = useState([])
    const backdrop = useBackDrop()

    const [error, setError] = useState()

    useEffect(() => {
        backdrop.open()
        api.getStaffs().then(res => {
            backdrop.close()
            setStaffList(_.get(res, 'data.staffs'), [])
        })
    }, [])


    const formik = useFormik({
        initialValues: {
            id: '4MID-',
            name: ''
        },
        // validateOnChange: false,
        validationSchema: yup.object().shape({
            id: yup.string().required().nullable().max(128).when('created_at', {
                is: v => _.isNil(v),
                then: yup.string().notOneOf(_.map(staffList, v => v.id), Constants.yup.STAFF_EXIST)
            }),
            name: yup.string().required().nullable().max(128)
        }),
        onSubmit: (values, helper) => {
            if (!values) return
            if (values.created_at) {
                api.updateStaffs(values.id, {
                    name: values.name
                }).then(res => {
                    snack.open('Saved')
                    setOpen(false)
                    helper.setSubmitting(false)
                    setStaffList(list => _.unionBy([res.data], [...list], 'id'))
                }).catch(e => {
                    setError(e.msg)
                    helper.setSubmitting(false)
                })
            }
            else {
                api.addStaffs({
                    staff_id: values.id,
                    name: values.name
                }).then(res => {
                    helper.resetForm()
                    setOpen(false)
                    snack.open('Success')
                    helper.setSubmitting(false)
                    setStaffList(list => _.unionBy([res.data], [...list], 'id'))
                }).catch(e => {
                    if (e.msg == 'staff_id repeated') {
                        helper.setErrors({ id: Constants.yup.STAFF_EXIST_DISABLED })
                    }
                    else {
                        setError(e.msg)
                    }
                    helper.setSubmitting(false)
                })
            }

        },
    })

    const formikDelete = useFormik({
        initialValues: {},
        onSubmit: (values, helper) => {
            if (!values) return
            api.updateStaffs(values.id, {
                is_active: false
            }).then(res => {
                setStaffList(list => _.pullAllBy([...list], [res.data], 'id'))
                setOpenDelete(false)
                helper.setSubmitting(false)
            }).catch(e => {
                setError(e.msg)
                helper.setSubmitting(false)
            })
        },
    })

    const handleEdit = (row) => {
        setError(null)
        formik.handleReset()
        formik.setValues(row)
        setOpen(true)
    }

    const handleDelete = (row) => {
        setError(null)
        formikDelete.handleReset()
        formikDelete.setValues(row)
        setOpenDelete(true)
    }

    const handleAdd = () => {
        setError(null)
        formik.handleReset()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    return (
        <>
            <Helmet>
                <title>Staff List | TE4M Funometer</title>
            </Helmet>
            <Box sx={{ minHeight: '100%', py: 3 }} >
                <Container>
                    <Typography variant='h1' paragraph>
                        Staff List
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 2 }} >
                        <TextField variant='outlined' fullWidth InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button variant='contained' onClick={handleAdd} sx={{ my: 'auto', ml: 1 }}>
                            Add
                        </Button>
                    </Box>
                    <DataTable
                        heads={[
                            { id: 'id', label: 'Staff ID', value: 'id', width: '40%' },
                            { id: 'name', label: 'Name', value: 'name', width: '40%' },
                            {
                                id: 'action', label: 'Actions', width: '20%', content: (row) => {
                                    return <Box sx={{ mx: -1 }}>
                                        <IconButton onClick={() => handleEdit(row)} sx={{ px: 0.5, py: 0 }}> <EditIcon /> </IconButton>
                                        <IconButton onClick={() => handleDelete(row)} sx={{ px: 0.5, py: 0 }}> <DeleteForeverIcon /> </IconButton>
                                    </Box>
                                }
                            },
                        ]}
                        rows={_.filter(staffList, row => {

                            return _.some(['id', 'name'], field => new RegExp(search, 'i').test(row[field]))
                        })}
                        _order='asc' _orderBy='id'
                    />
                </Container>
            </Box>
            <EditDialog title={_.get(formik, 'values.created_at') ? 'Edit Staff ' : 'Add New Staff'} open={open} handleClose={handleClose} handleSave={formik.handleSubmit} confirmDisabled={formik.isSubmitting}>
                {error &&
                    <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                }
                <TextField
                    error={Boolean(formik.touched?.id && formik.errors?.id)}
                    fullWidth
                    helperText={formik.touched?.id && formik.errors?.id}
                    label="Staff ID"
                    name="id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.id}
                    disabled={!_.isNil(formik.values?.created_at)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    error={Boolean(formik.touched?.name && formik.errors?.name)}
                    fullWidth
                    helperText={formik.touched?.name && formik.errors?.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values?.name}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
            </EditDialog>
            <EditDialog title={'Delete Staff'} open={openDelete} handleClose={handleCloseDelete} handleSave={formikDelete.handleSubmit} confirmDisabled={formikDelete.isSubmitting} confirmText='Confirm'>
                {'Are you sure?'}
            </EditDialog>
        </>
    )
}

export default StaffList
