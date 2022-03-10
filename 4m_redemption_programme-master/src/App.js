import 'react-perfect-scrollbar/dist/css/styles.css'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import GlobalStyles from 'src/theme/GlobalStyles'
import theme from 'src/theme'
import routes from 'src/routes'
import BackdropProvider from './provider/BackdropProvider'
import SnackbarProvider from './provider/SnackbarProvider'

const App = () => {
  const routing = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <BackdropProvider>
        <SnackbarProvider>
          <GlobalStyles />
          {routing}
        </SnackbarProvider>
      </BackdropProvider>
    </ThemeProvider>
  )
}

export default App
