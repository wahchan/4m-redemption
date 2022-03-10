import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import Logo from './Logo'
import { Typography } from '@material-ui/core'

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([])

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar sx={{ px: 1 }} style={{ height: '50px', minHeight: '50px', padding: '0 12px' }} >
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} sx={{ p: 0, mr: '12px' }} >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant='h5' onClick={onMobileNavOpen}>
          TE4M Funometer
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  )
}

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
}

export default DashboardNavbar
