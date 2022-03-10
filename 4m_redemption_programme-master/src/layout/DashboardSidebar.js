import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Typography
} from '@material-ui/core'
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather'
import NavItem from './NavItem'
import InputIcon from '@material-ui/icons/Input'
import CloseIcon from '@material-ui/icons/Close'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import PeopleIcon from '@material-ui/icons/People'
import Constants from 'src/Constants'

var moment = require('moment-timezone')
const user = {
  avatar: null,
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
}

const items = [
  {
    href: '/admin/total_fun_score',
    // icon: ShoppingBagIcon,
    title: 'Total Fun Score'
  },
  {
    href: '/admin/parameters',
    // icon: SettingsIcon,
    title: 'Default Schedule Parameters'
  },
  {
    href: '/admin/task_schedule',
    // icon: SettingsIcon,
    title: 'Schedule Parameters'
  },
  {
    href: '/admin/fun_score_rewards',
    // icon: BarChartIcon,
    title: 'Fun Score Rewards'
  },
  {
    href: '/admin/staff_list',
    // icon: PeopleIcon,
    title: 'Staff List'
  }
]


if (!moment().isSameOrAfter(Constants.Date.expired_time)) {
  items.push(
    {
      href: '/admin/device_control',
      title: 'Device Control Panel'
    },
  )
}

items.push(
  {
    href: '/admin/change_password',
    title: 'Change Password'
  }
)

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation()
  const handleClose = () => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
  }
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
  }, [location.pathname])

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          p: 2
        }}
      >
        <IconButton sx={{ p: 0, mr: 1 }} onClick={handleClose}>
          <CloseIcon size="20" />
        </IconButton>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {'TE4M Funometer'}
        </Typography>
      </Box>

      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: '1' }}></Box>
      <Box sx={{ px: 1, pb: 1, mb: 1 }}>
        <NavItem
          onClick={() => localStorage.removeItem('token')}
          href='/admin/login'
          key='Signout'
          title='Signout'
        // icon={InputIcon}
        />
      </Box>

    </Box>
  )

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 50,
              height: 'calc(100% - 40px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
}

export default DashboardSidebar
