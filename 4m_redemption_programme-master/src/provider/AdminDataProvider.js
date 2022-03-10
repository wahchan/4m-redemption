import React, { useEffect, useContext, createContext, } from 'react'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import api from 'src/api/api'
const AdminDataContext = createContext()
var lodash = require('lodash')


export function useAdmin() {
    const context = useContext(AdminDataContext)
    if (!context) return {}
    return context
}

const _ = require('lodash')



export default (props) => {
    const { children } = props
    const location = useLocation()
    const navigate = useNavigate()

    const [token, setToken] = useState()
    const [config, setConfig] = useState()

    useEffect(() => {
        api.getConfig().then(res => {
            setConfig(res.data)
        }).catch(e => {
            localStorage.removeItem('token')
            navigate('/admin/login', { replace: true })
        })
    }, [location.pathname])


    const state = {
        token, setToken,
        config, setConfig
    }

    if (_.isNil(config)) {
        return null
    }

    return (
        <AdminDataContext.Provider value={state}>
            {children || <Outlet />}
        </AdminDataContext.Provider>
    )
}