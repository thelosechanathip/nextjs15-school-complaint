import { string, z } from "zod"

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string()
})
export type TRegisterSchema = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
})
export type TLoginSchema = z.infer<typeof LoginSchema>

export const VerifyTokenSchema = z.object({
    username: z.string(),
    role: string()
})
export type TVerifyTokenSchema = z.infer<typeof VerifyTokenSchema>