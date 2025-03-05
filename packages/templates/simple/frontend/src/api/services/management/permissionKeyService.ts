import { PermissionKey } from '../../../store/type'
import apiClient from '../../apiClient'

export enum UserApi {
  GetAllPermissionKeys = 'user/getPermissionKeysAll',
  GetPermissionKeys = 'user/getPermissionKeys',
  GetPermissionKeysByCondition = 'user/getPermissionKeysByCondition',
  CreatePermissionKey = 'user/createPermissionKey',
  UpdatePermissionKey = 'user/updatePermissionKey',
  DeletePermissionKey = 'user/deletePermissionKey',
}

// 获取全部权限数组
const getAllPermissionKeys = () => apiClient.get<PermissionKey[]>({ url: UserApi.GetAllPermissionKeys })
// 获取角色对应权限数组
const getPermissionKeys = (roleId: string) =>
  apiClient.post<PermissionKey[]>({ url: UserApi.GetPermissionKeys, data: { roleId } })

// 条件查询权限标识
const getPermissionKeysByCondition = (data: any) => apiClient.post({ url: UserApi.GetPermissionKeysByCondition, data })

// 新增用户权限
const createPermissionKey = (data: { roleId: string; permissionKeyData: PermissionKey[] }) =>
  apiClient.post({ url: UserApi.CreatePermissionKey, data })

// 修改用户权限
const updatePermissionKey = (data: { permissionId: string; permissionKeyData: PermissionKey }) =>
  apiClient.put({ url: UserApi.CreatePermissionKey, data })

// 删除用户权限
const deletePermissionKey = (data: { permissionId: string }) =>
  apiClient.delete({ url: UserApi.DeletePermissionKey, data })

export default {
  getAllPermissionKeys,
  getPermissionKeys,
  getPermissionKeysByCondition,
  createPermissionKey,
  updatePermissionKey,
  deletePermissionKey,
}
