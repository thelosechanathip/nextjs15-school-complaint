import React, { SetStateAction, Dispatch } from 'react'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
const { Header } = Layout
import { useAuthStore } from '@/stores/auth.store'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface NavbarProps {
    colorBgContainer: string | number
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
    isMobile: boolean
}

const Navbar = ({ colorBgContainer, collapsed, setCollapsed, isMobile }: NavbarProps) => {
    const router = useRouter()
    const { logout } = useAuthStore()

    const handleLogout = async () => {
        try {
            const res = (await logout()) as { data: { message: string }, status: number }
            if (res && res.status === 200) {
                toast.success(res?.data?.message)
                router.push('/login')
            }
        } catch (error: unknown) {
            const err = error as Error
            throw new Error(err.message)
        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" onClick={handleLogout}>
                    ออกจากระบบ
                </a>
            ),
        },
    ]

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                position: 'fixed',
                width: `calc(100% - ${collapsed ? (isMobile ? 0 : 80) : 200}px)`, // คำนวณความกว้าง Header
                zIndex: 99, // ให้ Header อยู่ด้านบน (น้อยกว่า Sider)
                right: 0,
                top: 0,
                transition: 'width 0.2s', // เพื่อให้ Header ปรับขนาดอย่าง smooth
            }}
        >
            <div className="flex justify-between items-center px-10 pt-5">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                    }}
                />
                <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Button type="text"
                        icon={<UserOutlined />}
                        style={{
                            fontSize: '16px',
                        }}
                    />
                </Dropdown>
            </div>
        </Header>
    )
}

export default Navbar