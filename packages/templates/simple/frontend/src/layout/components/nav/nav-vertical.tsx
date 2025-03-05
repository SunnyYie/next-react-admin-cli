import { getRoutesFromModules, menuFilter, useRouteToMenuFn } from '../../../router/routes/util'
import { useSettingActions, useSettings } from '../../../store/theme-setting'
import { useLocation, useMatches, useNavigate } from 'react-router'
import { Layout, Menu, type MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ThemeLayout } from './type'
import { ThemeMode } from '../../../store/type'
import { NAV_WIDTH } from '../../config'
import Scrollbar from '../../../components/scroll-bar'
import NavLogo from './nav-logo'

const { Sider } = Layout

type Props = {
  closeSideBarDrawer?: () => void
}
export default function NavVertical(props: Props) {
  const navigate = useNavigate()
  const matches = useMatches()
  const location = useLocation()
  const pathname = location.pathname

  const settings = useSettings()
  const { themeLayout, themeMode, darkSidebar } = settings
  const { setSettings } = useSettingActions()

  const routeToMenuFn = useRouteToMenuFn()
  const permissionRoutes = getRoutesFromModules()

  const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout])

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes)
    return routeToMenuFn(menuRoutes)
  }, [routeToMenuFn, permissionRoutes])

  const selectedKeys = useMemo(() => [pathname], [pathname])

  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 首次加载时设置 openKeys
  useEffect(() => {
    if (!collapsed) {
      const keys = matches
        .filter(match => match.pathname !== '/' && match.pathname !== pathname)
        .map(match => match.pathname)
      setOpenKeys(keys)
    }
  }, [collapsed, matches, pathname])

  const handleToggleCollapsed = () => {
    setSettings({
      ...settings,
      themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
    })
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
    props?.closeSideBarDrawer?.()
  }

  const handleOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys)
  }

  const sidebarTheme = useMemo(() => {
    if (themeMode === ThemeMode.Dark) {
      return darkSidebar ? 'light' : 'dark'
    }
    return darkSidebar ? 'dark' : 'light'
  }, [themeMode, darkSidebar])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={NAV_WIDTH}
      theme={sidebarTheme}
      className="!fixed left-0 top-0 h-screen border-r border-dashed border-gray-50"
    >
      <div className="flex h-full flex-col">
        <NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

        <Scrollbar>
          <Menu
            mode="inline"
            items={menuList}
            theme={sidebarTheme}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            className="!border-none"
            onClick={onClick}
          />
        </Scrollbar>
      </div>
    </Sider>
  )
}
