import React, { } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: 'min(800px, 100%)',
        overflow: 'hidden'
    },
    textField: {
        width: 'min(800px, 100%)',
        // height: '80px'
    },
    action: {
        width: '80px'
    },
}))
const _ = require('lodash')
const EditDialog = ({ open, handleClose, title, children, handleSave, confirmText, cancelText, confirmDisabled = false, maxWidth = 'xs' }) => {

    const classes = useStyles()



    return (
        <Dialog
            classes={{ paper: classes.dialog }}
            maxWidth={maxWidth}
            open={open}
        >
            <form onSubmit={handleSave} autoComplete='off'>
                <DialogTitle style={{ padding: '24px 24px 16px 24px' }}>
                    <Typography variant='h1' color='textPrimary'>{_.toString(title)}</Typography>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions style={{ padding: '8px 24px 24px 24px' }}>
                    <Button className={classes.action} onClick={handleClose}>
                        {cancelText || 'Cancel'}
                    </Button>
                    <Button type='submit' disabled={confirmDisabled} className={classes.action} variant='contained' onClick={handleSave} color="primary" autoFocus>
                        {confirmText || 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

EditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
}


export default EditDialog