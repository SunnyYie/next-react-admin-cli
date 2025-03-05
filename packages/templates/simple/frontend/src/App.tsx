import { AntdAdapter } from './theme/adapter/antd.adapter'
import { ThemeProvider } from './theme/theme-provider'
import Toast from './components/toast'
import Router from './router/routes'

export default function App() {
  return (
    <ThemeProvider adapters={[AntdAdapter]}>
      <Router />
      <Toast />
    </ThemeProvider>
  )
}
