import { darkColorTokens, lightColorTokens, presetsColors } from '../tokens/color'
import { ThemeMode, type UILibraryAdapter } from '../type'
import { useSettings } from '../../store/theme-setting'
import { lightShadowTokens } from '../tokens/shadow'
import { darkShadowTokens } from '../tokens/shadow'
import { StyleProvider } from '@ant-design/cssinjs'
import { App, ConfigProvider, theme } from 'antd'
import { baseThemeTokens } from '../tokens/base'
import { removePx } from '../../utils/theme'
import type { ThemeConfig } from 'antd'
import useLocale from '../../locales/use-locale'

export const AntdAdapter: UILibraryAdapter = ({ mode, children }) => {
  const { language } = useLocale()
  const { themeColorPresets, fontFamily, fontSize } = useSettings()

  // 全局注册样式算法，主题颜色，阴影
  const algorithm = mode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm
  const colorTokens = mode === ThemeMode.Light ? lightColorTokens : darkColorTokens
  const shadowTokens = mode === ThemeMode.Light ? lightShadowTokens : darkShadowTokens
  const primaryColorToken = presetsColors[themeColorPresets]

  // 主题配置
  const token: ThemeConfig['token'] = {
    colorPrimary: primaryColorToken.default,
    colorSuccess: colorTokens.palette.success.default,
    colorWarning: colorTokens.palette.warning.default,
    colorError: colorTokens.palette.error.default,
    colorInfo: colorTokens.palette.info.default,

    colorBgLayout: colorTokens.background.default,
    colorBgContainer: colorTokens.background.paper,
    colorBgElevated: colorTokens.background.default,

    wireframe: false,
    fontFamily: fontFamily,
    fontSize: fontSize,

    borderRadiusSM: removePx(baseThemeTokens.borderRadius.sm),
    borderRadius: removePx(baseThemeTokens.borderRadius.default),
    borderRadiusLG: removePx(baseThemeTokens.borderRadius.lg),
  }

  // 组件配置
  const components: ThemeConfig['components'] = {
    Breadcrumb: {
      separatorMargin: removePx(baseThemeTokens.spacing[1]),
    },
    Menu: {
      colorFillAlter: 'transparent',
      itemColor: colorTokens.text.secondary,
      motionDurationMid: '0.125s',
      motionDurationSlow: '0.125s',
      darkItemBg: darkColorTokens.background.default,
    },
    Layout: {
      siderBg: darkColorTokens.background.default,
    },
    Card: {
      boxShadow: shadowTokens.card,
    },
  }

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{ algorithm, token, components }}
      tag={{
        style: {
          borderRadius: removePx(baseThemeTokens.borderRadius.md),
          fontWeight: 700,
          padding: `0 ${baseThemeTokens.spacing[1]}`,
          margin: `0 ${baseThemeTokens.spacing[1]}`,
          borderWidth: 0,
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  )
}
