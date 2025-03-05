import { FolderKanban } from 'lucide-react'

import { Navigate, Outlet } from 'react-router'
import { Suspense, lazy } from 'react'
import { AppRouteObject } from '../../types'
import { CircleLoading } from '../../../components/circle-loading'
import { logObj } from '../../../locales/log'

const InterfaceLog = lazy(() => import('../../../pages/log/interface-log'))
const UserLog = lazy(() => import('../../../pages/log/user-log'))

const project: AppRouteObject = {
  order: 2,
  path: 'log',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: logObj.name,
    icon: <FolderKanban />,
    key: '/log',
  },
  children: [
    {
      index: true,
      element: <Navigate to="/log/interface-log" replace />,
    },
    {
      path: 'interfaceLog',
      element: <InterfaceLog />,
      meta: { label: logObj.name, key: '/log/interface-log' },
    },
    {
      path: 'userLog',
      element: <UserLog />,
      meta: {
        label: logObj.user.name,
        key: `/log/user-log`,
      },
    },
  ],
}

export default project
