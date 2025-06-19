'use client'

import AllMenu from '@/components/home/AllMenu'
import React from 'react'

export default function Home() {
  console.log(process.env.DATABASE_URL)
  return (
    <>
      <div className='container mx-auto mt-20'>
        <div className='flex flex-col text-center'> {/* เอา gap ออกจากตรงนี้ */}
          <h1 className='text-4xl font-bold mb-3'>E-Services</h1> {/* เพิ่ม mb-3 ที่ h1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AllMenu />
          </div>
        </div>
      </div>
    </>
  )
}