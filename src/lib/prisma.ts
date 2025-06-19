import { PrismaClient } from '@prisma/client'

// กำหนด type สำหรับ globalThis (เพื่อรองรับ TypeScript)
declare global {
    var prisma: PrismaClient | undefined
}

// ตรวจสอบว่ามี instance ของ PrismaClient อยู่ใน globalThis แล้วหรือไม่
// ถ้ามี ให้ใช้ตัวที่มีอยู่แล้ว (ป้องกันการสร้างหลาย instance ใน development)
// ถ้าไม่มี ให้สร้างใหม่
const prisma = global.prisma || new PrismaClient({
    log: ['query'], // สำหรับดู query ใน console (เฉพาะ dev mode)
})

// ใน production, ไม่ต้องเก็บ instance ไว้ใน globalThis
// เพื่อป้องกันปัญหา memory leaks หรือปัญหา bundling
if (process.env.NODE_ENV === 'production') {
    // ถ้าเป็น production, ให้เชื่อมต่อทันที
    prisma.$connect().then(() => {
        console.log('✅ Prisma connected in production.');
    }).catch((err) => {
        console.error('❌ Failed to connect Prisma in production:', err)
    })
} else {
    // ใน development, เก็บ instance ไว้ใน globalThis
    // และตรวจสอบการเชื่อมต่อ
    global.prisma = prisma
    prisma.$connect().then(() => {
        console.log('✅ Successfully connected to the database.')
    }).catch((err) => {
        console.error('❌ Failed to connect to the database!')
        console.error('Error details:', err.message)
        console.error('Please check your DATABASE_URL and network access settings.')
        // สำหรับ dev mode ไม่ต้อง process.exit(1) เพื่อให้เซิร์ฟเวอร์ยังทำงานได้
    })
}

export default prisma