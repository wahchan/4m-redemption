import { Helmet } from 'react-helmet'
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@material-ui/core'
import { AlignCenter } from 'react-feather'
import { useFormik, useFormikContext } from 'formik'
import { useAdmin } from 'src/provider/AdminDataProvider'
import api from 'src/api/api'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useSnack } from 'src/provider/SnackbarProvider'
import Constants from 'src/Constants'
import DataTable from 'src/components/DataTable'
import { useBackDrop } from 'src/provider/BackdropProvider'
import FormikTextField from 'src/components/Formik/FormikTextField'
import DataTableNoLimit from 'src/components/DataTableNoLimit'
import { Fragment } from 'react'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import ScrollTopButton from 'src/components/ScrollTopButton'
import EditDialog from 'src/components/EditDialog'
var moment = require('moment-timezone')

const yup = require('yup')
const _ = require('lodash')

const useStyles = makeStyles((theme) => ({
    table: {
        "& .MuiTableBody-root": {
            "& .MuiTableCell-root": {
                whiteSpace: 'nowrap',
            },
        },
        "& .MuiTableCell-root": {
            height: '40px',
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
            [theme.breakpoints.down('sm')]: {
                padding: (props) => props.dense ? '6px 8px' : null
            }
        },
        "& .MuiTableSortLabel-icon": {
            opacity: 0.5,
        },
        "& .Mui-active .MuiTableSortLabel-icon": {
            opacity: 1,
            color: 'limegreen',
        },
        '& .table-spacer': {
            display: 'none',
            borderLeft: '0 !important',
            flex: '1 1 auto', width: '100%', padding: 0
        },
    }
}))




yup.addMethod(yup.string, 'isValidDate', function (message) {
    return this.test('foramt', Constants.yup.DATE_FORMAT_ERROR, v => moment(v, 'YYYY-MM-DD', true).isValid())
})


yup.addMethod(yup.string, 'isValidTime', function (message) {
    return this.test('foramt', Constants.yup.TIME_FORMAT_ERROR, v => !v || moment(v, 'HH:mm', true).isValid())
})



const FormikTimeTextField = ({ name, formik, ...rest }) => {

    const value = _.get(formik.values, name)
    const error = _.get(formik.errors, name)
    const touched = _.get(formik.touched, name)

    const isError = Boolean(touched && error)

    return useMemo(() => <TextField
        fullWidth
        name={name}
        value={value}
        onChange={e => {
            if (_.size(_.get(formik.values, e.target.name)) == 1 && _.size(e.target.value) == 2) {
                e.target.value = e.target.value + ':'
            }
            formik.handleChange(e)
        }}
        onBlur={formik.handleBlur}
        error={isError}
        sx={{ height: '30px' }}
        {...rest}
    />, [value, error, touched, isError])
}


const TaskRow = ({ row, index, formik, config }) => {
    var rowName = `tasks.${index}`
    var rowErrors = _.get(formik.errors, rowName)
    var sx = {
        height: '40px'
    }
    var cellSx = {}
    if (row.is_holiday) {
        cellSx.fontWeight = 'bold'
        cellSx.color = 'red'
    }
    else if (row.weekday !== 0 && row.weekday !== 6) {
        cellSx.fontWeight = 'bold'
    }
    var isToday = moment().isSame(moment(row.date), 'day')
    if (isToday) {
        sx.backgroundColor = 'rgba(50,255,50,0.2)'
        sx[':hover'] = {
            backgroundColor: 'rgba(50,255,50,0.3) !important'
        }
    }
    var isDisabled = moment().isAfter(moment(row.date), 'day')

    return (
        <Fragment>
            {row.weekday === 1 && <tr>
                <TableCell colSpan={99} sx={{ p: 0 }} style={{ height: '12px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
            </tr>
            }
            <TableRow id={`task.${index}`} hover key={index} sx={sx} >
                <TableCell sx={cellSx} >
                    {moment(row.date).format('DD/MM/YYYY (ddd)')}
                </TableCell>
                <TableCell sx={{ px: 0.5, py: 0.5, textAlign: 'center' }}>
                    <Switch onChange={formik.handleChange} name={`${rowName}.is_active`} checked={_.get(formik.values, `${rowName}.is_active`)} disabled={isDisabled} />
                </TableCell>
                <TableCell sx={{ px: 1, py: 1 }} >
                    <FormikTextField disabled={isDisabled} type='number' disableHelper id={'fun_index.' + index} formik={formik} fullWidth placeholder={config?.fun_index} name={`${rowName}.fun_index`} sx={{ height: '30px' }} />
                </TableCell>
                <TableCell sx={{ px: 1, py: 1 }} >
                    <FormikTimeTextField disabled={isDisabled} name={`${rowName}.daily_calculated_at`} placeholder={config?.daily_calculated_at} formik={formik} />
                </TableCell>
                <TableCell sx={{ px: 1, py: 1 }}>
                    <FormikTimeTextField disabled={isDisabled} name={`${rowName}.drops.0.time`} placeholder={config?.drop_schedule[0]} formik={formik} />
                </TableCell>
                <TableCell sx={{ px: 1, py: 1 }}>
                    <FormikTimeTextField disabled={isDisabled} name={`${rowName}.drops.1.time`} placeholder={config?.drop_schedule[1]} formik={formik} />
                </TableCell>
                <TableCell className='table-spacer' />
            </TableRow>
            {_.size(rowErrors) > 0 && <TableRow>
                <TableCell colSpan={99} sx={{ px: 1 }} >
                    <Box display='flex' flexDirection='row'>
                        <ChangeHistoryIcon sx={{ height: '16px', width: '16px' }} />
                        <Box sx={{ color: 'red', ml: 1 }}>
                            {rowErrors.fun_index && <div > Fun Index : {rowErrors.fun_index}</div>}
                            {rowErrors.daily_calculated_at && <div > Calculated At : {rowErrors.daily_calculated_at}</div>}
                            {_.get(rowErrors, 'drops.0.time') && <div > Staff Ball : {_.get(rowErrors, 'drops.0.time')}</div>}
                            {_.get(rowErrors, 'drops.1.time') && <div > Gift Ball : {_.get(rowErrors, 'drops.1.time')}</div>}
                        </Box>
                    </Box>
                </TableCell>
            </TableRow>
            }
        </Fragment>

    )



}


const ParameterTables = () => {
    const classes = useStyles()
    const { config, setConfig } = useAdmin()
    const snack = useSnack()

    const [tasks, setTasks] = useState([])

    const [open, setOpen] = useState(false);

    const backdrop = useBackDrop()


    useEffect(() => {
        backdrop.open()
        api.getTaskConfig().then(res => {
            setTasks(res.data.scheduled_tasks || [])
        }).finally(() => {
            backdrop.close()
        })
    }, [])

    const schema = yup.object().shape({
        tasks: yup.array().of(
            yup.object().shape({
                date: yup.string().required().isValidDate(),
                fun_index: yup.number().nullable().min(0).max(9).label('fun index'),
                daily_calculated_at: yup.string().nullable().isValidTime().label('daily calculated at'),
                drops: yup.array().of(
                    yup.object({
                        time: yup.string().nullable().isValidTime().test('asd', Constants.yup.AFTER_CALCULATE, function (value) {
                            var index = this.options.index
                            var daily_calculated_at = _.get(this, 'options.from.1.value.daily_calculated_at') || config?.daily_calculated_at
                            var time = value || _.get(config, `drop_schedule.${index}`)
                            return moment(time, 'HH:mm').isSameOrAfter(moment(daily_calculated_at, 'HH:mm').add(5, 'minute'), 'minute')
                        }).test('min', Constants.yup.SECOND_DROP, function (value) {
                            var index = this.options.index
                            if (index == 0) return true
                            var first_time = _.get(this, 'options.from.1.value.drops.0.time') || _.get(config, `drop_schedule.${0}`)
                            var time = value || _.get(config, `drop_schedule.${1}`)
                            return moment(time, 'HH:mm').isAfter(moment(first_time, 'HH:mm'), 'minute')
                        })
                    })
                )
            })
        ),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tasks: tasks
        },
        validateOnChange: false,
        validationSchema: schema,
        onSubmit: (values, helper) => {

            var changed = values.tasks.filter((t, index) => {
                return !_.isEqual(t, tasks[index])
            }).map(t => _.pick(t, ['date', 'id', 'fun_index', 'is_active', 'drops', 'daily_calculated_at']))
            var today = moment().format('YYYY-MM-DD')
            var index = _.findIndex(changed, { date: today })
            if (!open && index >= 0) {
                helper.setSubmitting(false)
                setOpen(true)
                return
            }

            api.updateTaskConfig({ scheduled_tasks: changed }).then(res => {
                snack.open('Saved')
                setTasks(values.tasks)
            }).catch(e => {
                snack.open('Failed')
            }).finally(e => {
                helper.setSubmitting(false)
                setOpen(false)
            })
        }
    })

    var grouped = _.groupBy(formik.values.tasks, row => moment(row.date).format('YYYY-MM'))
    var groupedLength = _.mapValues(grouped, v => _.size(v))

    return (
        <>
            <Helmet>
                <title>Edit Schedule Parameters | TE4M Funometer</title>
            </Helmet>
            <EditDialog title={'Confirm Submit'} confirmDisabled={formik.isSubmitting} open={open} handleClose={() => setOpen(false)} handleSave={formik.handleSubmit} >
                <Typography>
                    You have edited today's schedule task
                </Typography>
                <Typography>
                    Save your changes may affect today drop's task
                </Typography>
            </EditDialog>
            <Container sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Typography variant='h1' paragraph>
                    Edit Schedule Parameters
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete='off' >
                    {_.keys(grouped).map((k, index) => {
                        var length = 0
                        _.times(index, n => {
                            var a = _.keys(grouped)[n]
                            length = length + groupedLength[a]
                        })
                        var tasks = grouped[k]
                        return <Fragment>
                            <Typography variant='h2' paragraph>
                                {k}
                            </Typography>
                            <Card sx={{ overflowX: 'auto', overflowY: 'hidden', mb: 3 }}>
                                <Table size='small' className={classes.table}>
                                    <TableHead>
                                        <TableRow sx={{ height: '40px' }}  >
                                            <TableCell >Date</TableCell>
                                            <TableCell width='1%' sx={{ whiteSpace: 'nowrap' }}>Is Active</TableCell>
                                            <TableCell width='120px' sx={{ minWidth: '120px' }}>
                                                <div>{'Fun Index'}</div>
                                                <div>{'(0-9)'}</div>
                                            </TableCell>
                                            <TableCell width='120px' sx={{ minWidth: '120px' }}>
                                                <div>{'Calculated At'}</div>
                                                <div>{'(HH:mm)'}</div>
                                            </TableCell>
                                            <TableCell width='120px' sx={{ minWidth: '120px' }}>
                                                <div>{'Staff Ball'}</div>
                                                <div>{'(HH:mm)'}</div>
                                            </TableCell>
                                            <TableCell width='120px' sx={{ minWidth: '120px' }}>
                                                <div>{'Gift  Ball'}</div>
                                                <div>{'(HH:mm)'}</div>
                                            </TableCell>
                                            <TableCell className='table-spacer' />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasks.map((row, index) => {
                                            return <TaskRow row={row} index={length + index} formik={formik} config={config} />
                                        })}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Fragment>
                    })}

                    <ScrollTopButton />
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box flex={1} />
                        <Button type='submit' disabled={formik.isSubmitting} variant='contained' color="primary" >
                            {'Save'}
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default ParameterTables


