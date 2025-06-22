'use client'

import AllMenu from '@/components/home/AllMenu'
import React from 'react'
import { DatabaseOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='container mx-auto mt-20'>
        <div className='flex flex-col text-center'>
          <div className="flex justify-center items-center gap-3 mb-10">
            <h1 className='text-4xl font-bold'>E-Services</h1>
            <Link href="/login">
              <div className="hover:scale-110 transition-all bg-gray-800 text-gray-300 rounded-xl p-2">
                <DatabaseOutlined style={{ fontSize: '35px' }} />
              </div>
            </Link>
          </div>
          <div className="grid px-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AllMenu />
          </div>
        </div>
      </div>
    </>
  )
}