'use client'

import React, { useEffect } from 'react'
import UserModal from '@/components/protected/users/UserModal'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useUserStore } from '@/stores/user.store'
import { Table, Spin, Alert, Tooltip } from 'antd'

const UserPage = () => {
    const { showModal, setTitle, setButtonTitle, fetchUser, users, loading, error } = useUserStore()

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'สถานะ',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'สร้างเมื่อ',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => new Date(text).toLocaleString(), // จัดรูปแบบวันที่ให้เป็นมิตร
        },
        {
            title: 'สร้างเมื่อ',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => new Date(text).toLocaleString(), // จัดรูปแบบวันที่ให้เป็นมิตร
        },
    ];

    // แสดงสถานะ Loading
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <Spin size="large" />
            </div>
        )
    }

    // แสดงสถานะ Error
    if (error) {
        return (
            <Alert
                message="ข้อผิดพลาด"
                description={error}
                type="error"
                showIcon
                style={{ margin: '20px' }}
            />
        )
    }

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
                    <Tooltip title="เพิ่มข้อมูล">
                        <PlusCircleOutlined />
                    </Tooltip>
                </button>
            </div>
            <hr className='my-3 text-gray-300' />
            <Table
                dataSource={users} // ใช้ข้อมูล complaints จาก store
                columns={columns}
                rowKey="id" // กำหนด key สำหรับแต่ละ row
                pagination={{ pageSize: 10 }} // กำหนด pagination
                scroll={{ x: 'max-content' }} // ถ้าข้อมูลเยอะและต้องการให้ตาราง Scroll แนวนอนได้
            />
        </div>
    )
}

export default UserPage