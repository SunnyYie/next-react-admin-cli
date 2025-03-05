import { hexToRgbChannel, rgbAlpha } from '../utils/theme'
import { useSettings } from '../store/theme-setting'
import { presetsColors } from './tokens/color'
import type { UILibraryAdapter } from './type'
import { layoutClass } from './layout.css'
import { ThemeMode } from '../store/type'
import { useEffect } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  adapters?: UILibraryAdapter[]
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
  const { themeMode, themeColorPresets, fontFamily, fontSize } = useSettings()

  // 初始化主题
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(ThemeMode.Light, ThemeMode.Dark)
    root.classList.add(themeMode)
  }, [themeMode])

  // 初始化颜色
  useEffect(() => {
    const root = window.document.documentElement
    const primaryColors = presetsColors[themeColorPresets]
    // 初始化主题颜色 css 变量
    for (const [key, value] of Object.entries(primaryColors)) {
      root.style.setProperty(`--colors-palette-primary-${key}`, value)
      root.style.setProperty(`--colors-palette-primary-${key}Channel`, hexToRgbChannel(value))
    }
    // 初始化阴影
    root.style.setProperty('--shadows-primary', `box-shadow: 0 8px 16px 0 ${rgbAlpha(primaryColors.default, 0.24)}`)
  }, [themeColorPresets])

  // 初始化字体和字体大小
  useEffect(() => {
    const root = window.document.documentElement
    root.style.fontSize = `${fontSize}px`

    const body = window.document.body
    body.style.fontFamily = fontFamily
  }, [fontFamily, fontSize])

  // 适配器
  const wrappedWithAdapters = adapters.reduce(
    (children, Adapter) => (
      <Adapter key={Adapter.name} mode={themeMode}>
        {children}
      </Adapter>
    ),
    children,
  )

  return <div className={layoutClass}>{wrappedWithAdapters}</div>
}
