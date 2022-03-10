import Axios from 'axios'
import { useLocation } from 'react-router'
const _ = require('lodash')



const baseURL = "https://api.gacha.animaetech.com"



const axios = Axios.create({
    baseURL: baseURL,
    timeout: 30000
})


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

const gachaApi = {
    getGachaDeviceStatus: (mac) => {
        return axios.get(`/gacha/status/${mac}`)
    },
    remoteRedeem: (mac, track) => {
        return axios.get(`/gacha/start/${mac}/${track}`, { timeout: 30000 }).catch(e => {
            if (e.code == 'ECONNABORTED') {
                throw 'timeout'
            }
            throw e
        })
    }


}


export default gachaApi