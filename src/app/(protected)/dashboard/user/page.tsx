'use client'

import React from 'react'
import UserModal from '@/components/protected/users/UserModal'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useUserStore } from '@/stores/user.store'

const UserPage = () => {
    const { showModal, setTitle, setButtonTitle } = useUserStore()

    const handleClickCreateData = () => {
        showModal()
        setTitle('เพิ่มข้อมูล User')
        setButtonTitle('บันทึกข้อมูล')
    }

    return (
        <div>
            <UserModal />
            <div className="flex justify-between items-center">
                <h1 className='text-2xl font-bold'>ระบบการจัดการ User</h1>
                <button type="button" className="cursor-pointer text-3xl hover:scale-[105%]" onClick={handleClickCreateData}>
                    <PlusCircleOutlined />
                </button>
            </div>
            <hr className='my-3 text-gray-300' />

        </div>
    )
}

export default UserPage