import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const res = await prisma.schoolTransfers.create({ data: { ...body } })

        if (res) return NextResponse.json({ message: 'บันทึกข้อมูลการโอนเรียนเสร็จสิ้น' }, { status: 201 })
    } catch (error: unknown) {
        console.log('Error creating school transfer', error)
        return NextResponse.json({ error: 'Error creating school transfer' }, { status: 500 })
    }
}