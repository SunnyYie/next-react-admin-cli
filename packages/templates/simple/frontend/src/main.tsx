import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
// @ts-ignore
import worker from './mock'
import App from './App.tsx'

import 'virtual:svg-icons-register'

import './index.css'
import './theme/theme.css'

import './locales/i18n'

// 修复 antd 5 的兼容性问题
import '@ant-design/v5-patch-for-react-19'

// 可以根据env环境变量判断是否开启(dev: 开启， prod: 关闭)
worker.start({ onUnhandledRequest: 'bypass' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Suspense>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
