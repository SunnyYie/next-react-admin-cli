import { describe, test, expect, beforeEach } from 'vitest'
import { AxiosRequestConfig } from 'axios'

describe('Request Interceptor', () => {
  let interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  let mockConfig: AxiosRequestConfig

  beforeEach(() => {
    // 定义拦截器函数
    interceptor = (config: AxiosRequestConfig) => {
      config.headers!.Authorization = 'Bearer Token'
      return config
    }

    // 初始化模拟配置对象
    mockConfig = {
      headers: {},
      url: 'https://api.example.com',
      method: 'get',
    }
  })

  test('should add Authorization header with Bearer token', () => {
    // 执行拦截器
    const result = interceptor(mockConfig)

    // 验证结果
    expect(result.headers!.Authorization).toBe('Bearer Token')
  })

  test('should preserve existing headers while adding Authorization', () => {
    // 添加一个已存在的header
    mockConfig.headers = {
      'Content-Type': 'application/json',
    }

    // 执行拦截器
    const result = interceptor(mockConfig)

    // 验证结果
    expect(result.headers!.Authorization).toBe('Bearer Token')
    expect(result.headers!['Content-Type']).toBe('application/json')
  })

  test('should return the modified config object', () => {
    // 执行拦截器
    const result = interceptor(mockConfig)

    // 验证返回的是完整的配置对象
    expect(result).toBe(mockConfig)
    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('method')
    expect(result).toHaveProperty('headers')
  })
})
