import { getItem, setItem, StorageEnum } from '../utils/storage'
import userService from '../api/services/user/userService'
import { useMutation } from '@tanstack/react-query'
import { UserInfo, UserToken } from './type'
import { create } from 'zustand'
import { LoginFormType } from '../api/services/user/type'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

type User = {
  userInfo: Partial<UserInfo>
  userToken: UserToken
  actions: {
    setUserInfo: (userInfo: UserInfo) => void
    setUserToken: (token: UserToken) => void
    setUserRefreshToken: (token: UserToken) => void
    clearUserInfoAndToken: () => void
  }
}

const useUserAuthStore = create<User>(set => ({
  userInfo: getItem<UserInfo>(StorageEnum.UserInfo) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: userInfo => {
      set({ userInfo })
      setItem(StorageEnum.UserInfo, userInfo)
    },
    setUserToken: userToken => {
      set({ userToken })
      setItem(StorageEnum.Token, userToken)
    },
    setUserRefreshToken: userToken => {
      set({ userToken })
      setItem(StorageEnum.RefreshToken, userToken)
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} })
    },
  },
}))

export const useUserInfo = () => useUserAuthStore(state => state.userInfo)
export const useUserToken = () => useUserAuthStore(state => state.userToken)
export const setUserRefreshToken = () => useUserAuthStore(state => state.userToken)
export const useUserActions = () => useUserAuthStore(state => state.actions)

export const useSignIn = () => {
  const { setUserToken, setUserInfo, setUserRefreshToken } = useUserActions()
  const navigatge = useNavigate()

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  })

  const signIn = async (data: LoginFormType) => {
    try {
      const res = await signInMutation.mutateAsync(data)
      const { user, accessToken, refreshToken } = res

      setUserToken({ accessToken })
      setUserRefreshToken({ refreshToken })
      setUserInfo(user)

      navigatge(HOMEPAGE, { replace: true })
      toast.success('Sign in success!')
    } catch (err) {
      throw new Error((err as any)?.message || '请求错误，请稍后重试')
    }
  }

  return signIn
}

export default useUserAuthStore
