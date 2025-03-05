import { AppRouteObject, RouteMeta } from "../types";
import { useCallback, useMemo } from "react";
import { ascend } from "ramda";
import { routes } from ".";

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const routeToMenuFn = useCallback((items: AppRouteObject[]) => {
    return items
      .filter((item) => !item.meta?.hideMenu)
      .map((item) => {
        const menuItem: any = [];
        const { meta, children } = item;

        if (meta) {
          if (meta.isActive) menuItem.isActive = true;

          const { key, label, icon } = meta;
          menuItem.key = key;
          menuItem.label = (
            <div className={`inline-flex items-center 'justify-between'} `}>
              <div>{label}</div>
            </div>
          );

          if (icon) {
            menuItem.icon = icon;
          }
        }

        if (children) {
          menuItem.children = routeToMenuFn(children);
        }
        return { ...menuItem };
      });
  }, []);
  return routeToMenuFn;
}

/**
 * 过滤出可视菜单
 * return menu routes
 */
export const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter((item) => {
      const isHide = item.meta?.hideMenu;
      if (isHide) return false;

      const show = item.meta?.key;

      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Infinity));
};

/**
 * return flatten routes
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
}

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissionRoutes = routes;
  return useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes, permissionRoutes]);
}

/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getRoutesFromModules() {
  const menuModules: AppRouteObject[] = [];

  const modules = import.meta.glob("./modules/**/*.tsx", { eager: true });
  Object.keys(modules).forEach((key) => {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  });
  return menuModules;
}
