import React, { SetStateAction, Dispatch } from 'react'
import {
    FileOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const { Sider } = Layout

interface SidebarProps {
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
    isMobile: boolean
}

const Sidebar = ({ collapsed, setCollapsed, isMobile }: SidebarProps) => {
    const pathname = usePathname()

    // กำหนดรายการเมนูของคุณ
    const menuItems = [
        {
            key: '/dashboard',
            icon: <FileOutlined />,
            label: (
                <Link href="/dashboard">Dashboard</Link>
            ),
        },
        {
            key: '/dashboard/complaint',
            icon: <FileOutlined />,
            label: (
                <Link href="/dashboard/complaint">รายการเรื่องร้องเรียน</Link>
            ),
        },
        {
            key: '/dashboard/school_transfer',
            icon: <FileOutlined />,
            label: (
                <Link href="/dashboard/school_transfer">รายการเรื่องแจ้งย้ายนักเรียน</Link>
            ),
        },
        {
            key: '/dashboard/user',
            icon: <FileOutlined />,
            label: (
                <Link href="/dashboard/user">จัดการข้อมูล User</Link>
            ),
        },
    ]

    const getActiveKey = () => {
        const foundItem = menuItems.find(item => pathname === item.key)
        return foundItem ? foundItem.key : ''
    }


    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            onBreakpoint={(broken) => {
                if (broken) {
                    setCollapsed(true);
                }
            }}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 100,
            }}
        >
            <div className="demo-logo-vertical" style={{
                height: '32px',
                margin: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}>
                {collapsed ? 'E' : 'E-Services Dashboard'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[getActiveKey()]}
                items={menuItems}
            />
        </Sider>
    )
}

export default Sidebar