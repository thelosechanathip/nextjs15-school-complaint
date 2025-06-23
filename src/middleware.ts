import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get('authToken')?.value
    const { pathname } = req.nextUrl

    // 1. จัดการ Redirect สำหรับผู้ใช้ที่ Login แล้ว (UI Routes)
    if (authToken) {
        const publicRoutes = ['/', '/login']
        if (publicRoutes.includes(pathname)) {
            // ไม่ควร redirect ถ้า path เป็น API route ที่ต้องการ token แม้จะ login แล้ว
            // Check if it's an API route that needs to be protected
            if (!pathname.startsWith('/api/(protected)')) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        }
    }

    // 2. จัดการ Redirect สำหรับผู้ใช้ที่ยังไม่ได้ Login (UI Routes)
    // ถ้าไม่มี authToken และกำลังเข้าถึงหน้า dashboard ให้ redirect ไปหน้า login
    if (!authToken && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // 3. การป้องกัน API Routes ที่ต้องการ Token
    // ตรวจสอบว่าเส้นทางปัจจุบันเริ่มต้นด้วย '/api/protected/'
    // และไม่มี authToken
    if (pathname.startsWith('/api/(protected)/') && !authToken) {
        // หากไม่มี authToken ให้ส่ง response แบบ Unauthorized (401)
        // คุณอาจจะส่ง JSON response หรือ redirect ไปยังหน้า login ก็ได้
        // การส่ง 401 เหมาะสำหรับ API มากกว่าการ redirect
        return NextResponse.json({ message: 'ไม่มีสิทธิ์ในการเข้าใช้งาน!' }, { status: 401 })
    }

    // ถ้าผ่านเงื่อนไขทั้งหมด ให้ดำเนินการต่อ
    return NextResponse.next()
}

// กำหนด path ที่ middleware จะทำงาน
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         *
         * Includes all API routes explicitly to allow middleware to handle them.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}