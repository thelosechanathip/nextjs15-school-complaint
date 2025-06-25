import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    const token = req.cookies.get('authToken')?.value // ตรวจสอบ token

    if (!token) return NextResponse.json({ message: 'ไม่มีสิทธิ์ในการเข้าใช้งาน!' }, { status: 401 })

    try {
        const complaints = await prisma.complaints.findMany()
        const complaintCount = await prisma.complaints.count()

        // ตรวจสอบว่า array ว่างเปล่าหรือไม่ ถ้าไม่มีข้อมูล
        if (complaints.length === 0) {
            return NextResponse.json({ message: 'ไม่พบรายการร้องเรียน', data: [] }, { status: 200 })
        }

        return NextResponse.json({ complaints, complaintCount }, { status: 200 })
    } catch (error: unknown) {
        console.error('Error fetching complaints:', error)
        return NextResponse.json({ error: 'Internal Server Error: Failed to fetch complaints' }, { status: 500 })
    }
}