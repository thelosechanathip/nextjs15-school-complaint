import { z } from 'zod'

export const UserSchema = z.array(
    z.object({
        username: z.string(),
        role: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    })
)
export type TUserSchema = z.infer<typeof UserSchema>