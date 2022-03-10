import Axios from 'axios'
import moment from 'moment'
import { useLocation } from 'react-router'
const _ = require('lodash')
const baseURL = 'https://asia-east2-te4m-funo-meter.cloudfunctions.net/api'
// const baseURL = 'http://localhost:5001/te4m-funo-meter/asia-east2/api'



const axios = Axios.create({
    baseURL: baseURL,
    timeout: 60000
})


axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        console.error(error)
        return error
    }
)

axios.interceptors.response.use(
    (response) => {
        const result = response.data
        if (result && result.result !== 'fail') {
            return response
        }
        throw result
    },
    (error) => {
        console.error(error)
        return Promise.reject(error)
    }
)

const auth = () => {
    return {
        token: localStorage.getItem('token')
    }
}

const api = {
    //auth
    changePassword: ({ password, new_password }) => {
        return axios.post('/password?token=' + auth().token, {
            password, new_password
        }).then(res => {
            localStorage.setItem('token', _.get(res.data, 'data.token'))
            return res
        })
    },
    getConfig: () => {
        return axios.get('/config', { params: { token: auth().token } })
    },
    updateConfig: ({ fun_index, is_active, drop_schedule, daily_calculated_at }) => {
        var data = _.omitBy({ fun_index, is_active, drop_schedule, daily_calculated_at }, _.isNil)
        return axios.post('/config?token=' + auth().token, data)
    },
    getTaskConfig: () => {
        return axios.get('/scheduled_tasks', {
            params: {
                start: moment().startOf('month').format('YYYY-MM-DD'),
                end: moment().startOf('month').add(3, 'month').subtract(1, 'day').format('YYYY-MM-DD')
                // start: moment().format('YYYY-MM-DD'),
                // end: moment().add(3, 'day').format('YYYY-MM-DD')
            }
        })
    },
    updateTaskConfig: async ({ scheduled_tasks }) => {
        return axios.post('/scheduled_tasks', { scheduled_tasks }, {
            params: {
                token: auth().token
            }
        })
    },
    getStaffs: () => {
        return axios.get('/staffs?token=' + auth().token)
    },
    addStaffs: ({ staff_id, name }) => {
        return axios.post('/staffs?token=' + auth().token, { staff_id, name })
    },
    updateStaffs: (staff_id, data) => {
        return axios.post(`/staffs/${staff_id}?token=` + auth().token, data)
    },
    getFunoMeterRecords: () => {
        return axios.get('/funoMeterRecords?token=' + auth().token)
    },
    getCalculatedTasks: () => {
        return axios.get('/calculated_tasks', {
            params: {
                token: auth().token,
            }
        })
    },
    getTodayTotalFactor: () => {
        return axios.get('/today_scheduled_task')
    },
    //no auth
    adminLogin: (password) => {
        return axios.post('/auth/admin', { password }).then(res => {
            localStorage.setItem('token', res.data.token)
            return res
        })
    },
    getRedeemResult: () => {
        return axios.get('/today_redeem')
    },
    staffLogin: (staff_id) => {
        return axios.post('/auth/staff', { staff_id }).then(res => {
            return res
        })
    },
    createFunoMeterRecords: ({ staff_id, value }) => {
        return axios.post('/funoMeterRecords', { staff_id, value })
    }

}


export default api