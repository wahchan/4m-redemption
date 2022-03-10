import { Outlet } from 'react-router-dom'
import { experimentalStyled } from '@material-ui/core'
import MainNavbar from './MainNavbar'

const MainLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
)

const MainLayoutWrapper = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  // paddingTop: 64
})

const MainLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  overflow: 'auto'
})

const MainLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  // height: '100%',
  // overflow: 'auto'
})


const Footer = experimentalStyled('div')({
  textAlign: 'center',
  margin: '8px 0px',
  fontSize: '10px'
})


const MainLayout = () => (
  <MainLayoutRoot sx={{ backgroundColor: 'background.default' }}>
    {/* <MainNavbar /> */}
    <MainLayoutWrapper>
      <MainLayoutContainer>
        <MainLayoutContent>
          <Outlet />
        </MainLayoutContent>
        <Footer>
          Copyright &copy; 2021 4M Industrial Development Limited. All rights reserved.
        </Footer>
      </MainLayoutContainer>
    </MainLayoutWrapper>
  </MainLayoutRoot>
)

export default MainLayout
