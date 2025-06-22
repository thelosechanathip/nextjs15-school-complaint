import pm from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { TRegisterSchema } from '@/lib/validator/auth'

export async function POST(req: Request) {
    try {
        const { username, password }: TRegisterSchema = await req.json()
        if (!username || !password) return NextResponse.json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 })

        const userUnique = await pm.users.findUnique({ where: { username } })
        if (userUnique) return NextResponse.json({ message: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว' }, { status: 404 })

        const hashedPassword = bcrypt.hashSync(password, 10)

        await pm.users.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'ลงทะเบียนเสร็จสิ้น' }, { status: 200 })
    } catch (error: unknown) {
        const err = error as Error
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}