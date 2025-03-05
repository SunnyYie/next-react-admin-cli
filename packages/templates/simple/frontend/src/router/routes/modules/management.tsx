import { BriefcaseBusiness } from 'lucide-react'

import { Navigate, Outlet } from 'react-router'
import { Suspense, lazy } from 'react'
import { AppRouteObject } from '../../types'
import { CircleLoading } from '../../../components/circle-loading'
import { manageObj } from '../../../locales/manage'

const ManageRole = lazy(() => import('../../../pages/management/role'))
const ManagePermission = lazy(() => import('../../../pages/management/permission'))
const ManageUser = lazy(() => import('../../../pages/management/user'))

const manage: AppRouteObject = {
  order: 5,
  path: 'manage',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: manageObj.name,
    icon: <BriefcaseBusiness color="#000000" />,
    key: '/manage',
  },
  children: [
    {
      index: true,
      element: <Navigate to="/manage/permission" replace />,
    },
    {
      path: 'permission',
      element: <ManagePermission />,
      meta: { label: manageObj.permission.name, key: '/manage/permission' },
    },
    {
      path: 'role',
      element: <ManageRole />,
      meta: { label: manageObj.role.name, key: '/manage/role' },
    },
    {
      path: 'user',
      element: <ManageUser />,
      meta: { label: manageObj.user.name, key: '/manage/user' },
    },
  ],
}

export default manage
