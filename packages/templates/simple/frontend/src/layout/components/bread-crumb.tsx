import { Breadcrumb, type BreadcrumbProps, type GetProp } from 'antd'
import { Link, useMatches } from 'react-router'
import { useMemo } from 'react'
import { Iconify } from '../../components/icon'
import { getRoutesFromModules, menuFilter, useFlattenedRoutes } from '../../router/routes/util'

type MenuItem = GetProp<BreadcrumbProps, 'items'>[number]

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
  // const { t } = useTranslation()
  const matches = useMatches()
  const flattenedRoutes = useFlattenedRoutes()
  const menuModuleRoutes = getRoutesFromModules()

  const breadCrumbs = useMemo(() => {
    const menuRoutes = menuFilter(menuModuleRoutes)
    const paths = matches.filter(item => item.pathname !== '/').map(item => item.pathname)

    const pathRouteMetas = flattenedRoutes.filter(item => paths.includes(item.key))

    let currentMenuItems = [...menuRoutes]

    return pathRouteMetas.map((routeMeta): MenuItem => {
      const { key, label } = routeMeta

      // Find current level menu items
      const currentRoute = currentMenuItems.find(item => item.meta?.key === key)

      // Update menu items for next level
      currentMenuItems = currentRoute?.children?.filter(item => !item.meta?.hideMenu) ?? []

      return {
        key,
        title: label,
        ...(currentMenuItems.length > 0 && {
          menu: {
            items: currentMenuItems.map(item => ({
              key: item.meta?.key,
              label: item.meta?.key ? <Link to={item.meta.key}>{item.meta.label}</Link> : null,
            })),
          },
        }),
      }
    })
  }, [matches, flattenedRoutes, menuModuleRoutes])

  return <Breadcrumb items={breadCrumbs} className="!text-sm" separator={<Iconify icon="ph:dot-duotone" />} />
}
