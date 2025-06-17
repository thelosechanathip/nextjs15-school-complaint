'use client' // <-- สำคัญมาก! ต้องประกาศเป็น Client Component

import React from 'react'
import FormComplaint from '@/components/FormComplaint'

export default function Home() {
  return (
    <>
      <FormComplaint />
    </>
  )
}