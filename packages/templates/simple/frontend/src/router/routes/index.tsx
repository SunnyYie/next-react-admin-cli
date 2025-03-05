import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router'
import { AppRouteObject } from '../types'
import MainLayout from '../../layout'
import { getRoutesFromModules } from './util'
import { lazy } from 'react'
import { ErrorRoutes } from './error-routes'
import ProtectedRoute from '../components/protected-route'

const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('../../pages/public/login/Login')),
}
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
}
const menuModuleRoutes = getRoutesFromModules()

export const routes: AppRouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/workbench" replace />,
      },
      ...menuModuleRoutes,
    ],
  },
  LoginRoute,
  PAGE_NOT_FOUND_ROUTE,
  ErrorRoutes,
]

export default function Router() {
  const router = createHashRouter(routes as unknown as RouteObject[])
  return <RouterProvider router={router} />
}
