import { test, expect } from '@playwright/test'

test.describe('登录功能测试', () => {
  test.beforeEach(async ({ page }) => {
    // 在每个测试用例前导航到登录页面
    await page.goto('http://localhost:5173/#/login')
  })

  test('正常登录场景', async ({ page }) => {
    // 输入用户名和密码
    await page.fill('input[id="login_username"]', 'admin')
    await page.fill('input[id="login_password"]', 'demo1234')

    // 点击登录按钮
    await page.click('button[type="submit"]')

    // 验证登录成功后跳转到首页
    await expect(page).toHaveURL('http://localhost:5173/#/dashboard/workbench')

    // 验证页面上是否有
    await expect(page.getByText('Workbench')).toBeVisible()
  })

  test('用户名密码错误场景', async ({ page }) => {
    // 输入错误的用户名和密码
    await page.fill('input[id="login_username"]', 'wrong_user')
    await page.fill('input[id="login_password"]', 'wrong_password')

    // 点击登录按钮
    await page.click('button[type="submit"]')

    // 验证错误提示信息
    await expect(page.locator('.error-message')).toBeVisible()
    await expect(page.locator('.error-message')).toContainText('用户名或密码错误')
  })

  test('表单验证场景', async ({ page }) => {
    // 不输入任何内容直接点击登录
    await page.click('button[type="submit"]')

    // 验证表单验证提示
    await expect(page.locator('.ant-form-item-explain-error')).toBeVisible()
  })

  test('记住密码功能', async ({ page, context }) => {
    // 勾选记住密码
    await page.check('input[id="login_remember"]')

    // 输入登录信息
    await page.fill('input[id="login_username"]', 'admin')
    await page.fill('input[id="login_password"]', 'demo1234')

    // 登录
    await page.click('button[type="submit"]')

    // 关闭页面后重新打开
    await page.close()
    const newPage = await context.newPage()
    await newPage.goto('http://localhost:5173/#/login')

    // 验证用户名是否被记住
    await expect(newPage.locator('input[id="login_username"]')).toHaveValue('admin')
  })
})
