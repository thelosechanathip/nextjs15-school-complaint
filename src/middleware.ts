import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    // ดึง Token จาก httpOnly cookie
    const token = req.cookies.get('authToken')?.value
    const { pathname } = req.nextUrl

    // Redirect login สำหรับผู้ใช้ที่ login แล้ว
    if (token) {
        const publicRoutes = ['/', '/login']
        if (publicRoutes.includes(pathname)) return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Redirect logic สำหรับผู้ใช้ที่ยังไม่ได้ Login
    if (!token && pathname.startsWith('/dashboard')) return NextResponse.redirect(new URL('/login', req.url))

    return NextResponse.next()
}

// กำหนด path ที่ middleware จะทำงาน (ยกเว้น static files และ API routes)
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}