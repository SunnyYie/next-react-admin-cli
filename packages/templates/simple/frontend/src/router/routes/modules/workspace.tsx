import { PanelsTopLeft } from 'lucide-react'

import { workspaceObj } from '../../../locales/workspace'
import { AppRouteObject } from '../../types'

import { Suspense, lazy } from 'react'
import { Navigate, Outlet } from 'react-router'
import { CircleLoading } from '../../../components/circle-loading'

const Dashboard = lazy(() => import('../../../pages/dashboard/workbench'))

const workspace: AppRouteObject = {
  order: 1,
  path: 'dashboard',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    key: '/dashboard',
    icon: <PanelsTopLeft />,
    label: workspaceObj.name,
    isActive: true,
  },
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard/workbench" replace />,
    },
    {
      path: 'workbench',
      element: <Dashboard />,
      meta: {
        key: '/dashboard/workbench',
        label: workspaceObj.dashboard.name,
      },
    },
  ],
}

export default workspace
