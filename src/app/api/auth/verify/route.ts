import { NextResponse, NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import pm from '@/lib/prisma'

type TVerifyToken = {
    userId?: string,
    username?: string
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('authToken')?.value

        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 401 })
        }

        const decoded = verifyToken(token) as TVerifyToken
        if (!decoded) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 })

        const data = await pm.users.findUnique({ where: { id: decoded.userId } })
        if (!data) return NextResponse.json({ message: 'User not found' }, { status: 404 })

        return NextResponse.json(data, { status: 200 })

    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error verifying token:', err)
        return NextResponse.json({ message: 'Internal Server Error during token verification' }, { status: 500 })
    }
}