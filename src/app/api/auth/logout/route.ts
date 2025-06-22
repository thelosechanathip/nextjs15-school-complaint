import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('authToken')?.value

        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 401 })
        }

        const response = NextResponse.json({ message: 'Logout successfully' }, { status: 200 })
        response.cookies.delete('authToken')
        return response
    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error verifying token:', err)
        return NextResponse.json({ message: 'Internal Server Error during token verification' }, { status: 500 })
    }
}