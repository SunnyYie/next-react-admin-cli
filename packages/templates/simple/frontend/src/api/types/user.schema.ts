import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string().email({ message: '请输入正确的用户名' }),
  password: z.string().min(6, '请输入不少于6位数的密码'),
  verificationCode: z.optional(z.string().length(6, '请输入正确的验证码')),
})
export type LoginFormType = z.infer<typeof LoginFormSchema>

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: '请输入正确的邮箱' }),
  password: z.string().min(6, '请输入不少于6位数的密码'),
  confirmPassword: z.string().min(6, '两次输入的密码不一致'),
})

export type RegisterFormType = z.infer<typeof RegisterFormSchema>

export const ForgetFormSchema = LoginFormSchema.extend({
  confirmPassword: z.string().min(6, '请输入不少于6位数的确认密码'),
})

export type ForgetFormType = z.infer<typeof ForgetFormSchema>
