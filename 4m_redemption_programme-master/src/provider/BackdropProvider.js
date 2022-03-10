import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import React, { useState, useEffect, useContext, createContext } from 'react'


const BackdropContext = createContext()

export function useBackDrop() {
    return useContext(BackdropContext)
}


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 9999,
        color: '#fff',
    },
}))


export const DataBackdrop = ({ open }) => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}


export default (props) => {
    const { children } = props
    const classes = useStyles()
    const [open, setOpen] = useState(false)


    const state = {
        open: () => setOpen(true),
        close: () => setOpen(false)
    }

    return (
        <BackdropContext.Provider value={state}>
            <Backdrop className={classes.backdrop} open={open} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </BackdropContext.Provider>
    )
}