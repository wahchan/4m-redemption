import { Navigate } from 'react-router-dom'
import DashboardLayout from 'src/layout/DashboardLayout'
import MainLayout from 'src/layout/MainLayout'
import Dashboard from 'src/pages/Dashboard'
import NotFound from 'src/pages/NotFound'
import AdminSignin from './pages/admin/AdminSignin'
import ChangePassword from './pages/admin/ChangePassword'
import FunFactorsRewards from './pages/admin/FunFactorsRewards'
import Parameters from './pages/admin/Parameters'
import ParameterTable from './pages/admin/ParameterTable'
import StaffList from './pages/admin/StaffList'
import DeviceControl from './pages/admin/DeviceControl'
import TotalFunFactors from './pages/admin/TotalFunFactors'
import StaffSignIn from './pages/staff/StaffSignIn'
import StaffSubmit from './pages/staff/StaffSubmit'
import StaffSuccess from './pages/staff/StaffSuccess'
import AdminDataProvider from './provider/AdminDataProvider'
import StaffDataProvider from './provider/StaffDataProvider'

const routes = [
  {
    path: 'admin',
    element: <AdminDataProvider>< DashboardLayout /></AdminDataProvider>,
    children: [
      { path: 'change_password', element: <ChangePassword /> },
      { path: 'fun_score_rewards', element: <FunFactorsRewards /> },
      { path: 'staff_list', element: <StaffList /> },
      { path: 'total_fun_score', element: <TotalFunFactors /> },
      { path: 'parameters', element: <Parameters /> },
      { path: 'task_schedule', element: <ParameterTable /> },
      { path: 'device_control', element: <DeviceControl /> },
      { path: '/', element: <Navigate to="/admin/login" /> },
      { path: '*', element: <Navigate to="/admin" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin/login', element: <AdminSignin /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/login" /> }
    ]
  },
  {
    path: '/',
    element: <StaffDataProvider>< MainLayout /></StaffDataProvider>,
    children: [
      { path: 'login', element: <StaffSignIn /> },
      { path: 'staff/submit', element: <StaffSubmit /> },
      { path: 'staff/success', element: <StaffSuccess /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/login" /> }
    ]
  },
]

export default routes
