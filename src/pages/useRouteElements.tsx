import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './ProductList'
import Login from './Login'
import Register from './Register'
import RegisterLayout from 'src/layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout'
import Profile from './Profile'

function ProtectedRoute() {
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />{' '}
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />{' '}
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
