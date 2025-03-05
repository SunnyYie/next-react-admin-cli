import { NAV_HORIZONTAL_HEIGHT } from '../../config'
import { Menu, type MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useMemo } from 'react'
import { getRoutesFromModules, menuFilter, useRouteToMenuFn } from '../../../router/routes/util'

export default function NavHorizontal() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const routeToMenuFn = useRouteToMenuFn()
  const menuModuleRoutes = getRoutesFromModules()

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(menuModuleRoutes)
    return routeToMenuFn(menuRoutes)
  }, [routeToMenuFn, menuModuleRoutes])

  const selectedKeys = useMemo(() => [pathname], [pathname])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        defaultOpenKeys={[]}
        selectedKeys={selectedKeys}
        onClick={onClick}
        className="!border-none"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
