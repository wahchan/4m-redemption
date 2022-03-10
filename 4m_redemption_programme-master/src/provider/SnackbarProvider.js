import React, { useState, useEffect, useContext } from 'react'
import { Grow, makeStyles, Snackbar, useTheme, Alert } from '@material-ui/core'


const { createContext } = require('react')

const SnackbarContext = createContext()

export function useSnack() {
    return useContext(SnackbarContext)
}


const ResultSnackbar = props => {
    const defaultAnchorOrigin = {
        vertical: 'top',
        horizontal: 'center',
    }

    const { snack, setSnack, timeout, ...rest } = props

    const open = snack.open
    const level = snack.level
    const message = snack.message

    const handleClose = () => {
        setSnack({
            ...snack,
            open: false
        })
    }
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={defaultAnchorOrigin}
            TransitionComponent={Grow}
            autoHideDuration={2000}
        >
            <Alert variant='filled' severity={level} onClose={handleClose}>
                <strong>{message}</strong>
            </Alert>
        </Snackbar>
    )
}


const SnackbarProvider = (props) => {

    const { children } = props

    const [snack, setSnack] = useState({
        open: false,
        level: 'error',
        message: ''
    })

    const handleError = msg => {
        handleClose()
        var message = 'Error!'
        if (typeof msg === 'string' || typeof msg === 'number') {
            message = msg
        }
        const error = () => setSnack({
            open: true,
            level: 'error',
            message: message
        })
        setTimeout(error, 100)
    }

    const handleSuccess = msg => {
        handleClose()
        var message = 'Success!'
        if (typeof msg === 'string' || typeof msg === 'number') {
            message = msg
        }
        const success = () => setSnack({
            open: true,
            level: 'success',
            message: message
        })
        setTimeout(success, 100)
    }


    const handleWarn = msg => {
        handleClose()
        var message = 'Warning'
        if (typeof msg === 'string' || typeof msg === 'number') {
            message = msg
        }
        const success = () => setSnack({
            open: true,
            level: 'warning',
            message: message
        })
        setTimeout(success, 100)
    }
    const handleClose = () => {
        setSnack({
            ...snack,
            open: false
        })
    }

    const state = {
        open: handleSuccess,
        error: handleError,
        warn: handleWarn,
        close: handleClose
    }

    return (
        <SnackbarContext.Provider value={state} >
            <ResultSnackbar snack={snack} setSnack={setSnack} />
            {children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarProvider