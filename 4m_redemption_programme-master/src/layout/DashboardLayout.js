import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { experimentalStyled } from '@material-ui/core'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import { Box } from '@material-ui/core'
import AdminDataProvider from 'src/provider/AdminDataProvider'

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
)

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 50,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256
    }
  })
)

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  overflow: 'auto'
})

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  // height: '100%',
  // overflow: 'auto'
})

const Footer = experimentalStyled('div')({
  textAlign: 'center',
  margin: '8px 0px',
  fontSize: '10px'
})




const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <DashboardLayoutRoot sx={{ backgroundColor: 'background.default' }}>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer id='app'>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
          <Footer>
            Copyright &copy; 2021 4M Industrial Development Limited. All rights reserved.
          </Footer>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  )
}

export default DashboardLayout
