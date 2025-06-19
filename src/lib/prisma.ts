import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({ log: ['query'] })

// เพิ่มฟังก์ชันสำหรับตรวจสอบการเชื่อมต่อ
async function connectToDatabase() {
    try {
        await prisma.$connect()
        // console.log('✅ Successfully connected to the database.')
    } catch (error: unknown) {
        const err = error as Error
        console.error('❌ Failed to connect to the database!')
        console.error('Error details:', err.message)
        console.error('Please check your DATABASE_URL and network access settings.')
    }
}

// เรียกใช้ฟังก์ชันตรวจสอบการเชื่อมต่อเมื่อ Prisma Client ถูกสร้างขึ้น
// แต่ไม่จำเป็นต้องรอให้มันเสร็จก่อน export
connectToDatabase()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma