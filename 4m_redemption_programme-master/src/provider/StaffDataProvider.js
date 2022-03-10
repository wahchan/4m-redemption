import React, { useEffect, useContext, createContext, } from 'react'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import api from 'src/api/api'
const AdminDataContext = createContext()
var lodash = require('lodash')


export function useStaff() {
    const context = useContext(AdminDataContext)
    if (!context) return {}
    return context
}

const _ = require('lodash')



export default (props) => {
    const { children } = props
    const location = useLocation()
    const navigate = useNavigate()

    const [staff, setStaff] = useState()

    useEffect(() => {
        if (location.pathname !== '/login' && _.isNil(staff)) {
            navigate('/login', { replace: true })
        }
    }, [location.pathname])


    const state = {
        staff, setStaff,
    }

    if (location.pathname !== '/login' && _.isNil(staff)) {
        return null
    }

    return (
        <AdminDataContext.Provider value={state}>
            {children || <Outlet />}
        </AdminDataContext.Provider>
    )
}