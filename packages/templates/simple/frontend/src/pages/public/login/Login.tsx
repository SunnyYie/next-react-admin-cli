import SettingButton from '../../../layout/components/setting-button'
import { LoginStateProvider } from './providers/LoginStateProvider'
import Overlay from '@/assets/images/background/overlay.jpg'
import RegisterForm from './RegisterForm'
// import MobileForm from './MobileForm'
import LoginForm from './LoginForm'
import ResetForm from './ResetForm'

import { useUserToken } from '../../../store/user-setting'
import { themeVars } from '../../../theme/theme.css'
import { useTranslation } from 'react-i18next'
import { rgbAlpha } from '../../../utils/theme'
import { Layout, Typography } from 'antd'
import { Navigate } from 'react-router'
import LocalePicker from '../../../components/locale-picker'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

function Login() {
  const { t } = useTranslation()
  const token = useUserToken()

  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />
  }

  const gradientBg = rgbAlpha(themeVars.colors.background.defaultChannel, 0.9)
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay})`

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={{
          background: bg,
        }}
      >
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">Next React Admin</div>
        <Typography.Text className="flex flex-row gap-[16px] text-2xl">
          {t('sys.login.signInSecondTitle')}
        </Typography.Text>
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
          {/* <MobileForm /> */}
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-2 top-0 flex flex-row">
        <LocalePicker />
        <SettingButton />
      </div>
    </Layout>
  )
}
export default Login
