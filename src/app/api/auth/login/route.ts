import { NextResponse } from 'next/server'
import pm from '@/lib/prisma'
import type { TLoginSchema } from '@/lib/validator/auth'
import { comparePassword } from '@/lib/bcrypt'
import { serialize } from 'cookie'
import { generateToken } from '@/lib/jwt'

export async function POST(req: Request) {
    try {
        const { username, password }: TLoginSchema = await req.json()

        const userUnique = await pm.users.findUnique({ where: { username } })
        if (!userUnique) return NextResponse.json({ message: 'ชื่อผู้ใช้ไม่ถูกต้อง' }, { status: 404 })

        const resCompare = await comparePassword(password, userUnique.password)
        if (!resCompare) return NextResponse.json({ message: 'รหัสผ่านไม่ถูกต้อง' }, { status: 404 })

        const token = generateToken({ userId: userUnique.id })

        const cookie = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 8,
            sameSite: 'strict'
        })

        const response = NextResponse.json({ message: 'Login successfully!' });
        response.headers.set('Set-Cookie', cookie);
        return response
    } catch (error: unknown) {
        const err = error as Error
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}