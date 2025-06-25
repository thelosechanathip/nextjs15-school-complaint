'use client'

import React, { SetStateAction, Dispatch } from 'react'
import {
    DashboardOutlined, // Add more specific icons if you have them
    ExclamationCircleOutlined,
    SwapOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, Tooltip } from 'antd' // Import Tooltip
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
            icon: <DashboardOutlined />, // Using a more specific icon
            label: (
                <Link href="/dashboard">Dashboard</Link>
            ),
            tooltip: 'Dashboard', // Add a tooltip specific label
        },
        {
            key: '/dashboard/complaint',
            icon: <ExclamationCircleOutlined />, // Using a more specific icon
            label: (
                <Link href="/dashboard/complaint">รายการเรื่องร้องเรียน</Link>
            ),
            tooltip: 'รายการเรื่องร้องเรียน',
        },
        {
            key: '/dashboard/school_transfer',
            icon: <SwapOutlined />, // Using a more specific icon
            label: (
                <Link href="/dashboard/school_transfer">รายการเรื่องแจ้งย้ายนักเรียน</Link>
            ),
            tooltip: 'รายการเรื่องแจ้งย้ายนักเรียน',
        },
        {
            key: '/dashboard/user',
            icon: <UserOutlined />, // Using a more specific icon
            label: (
                <Link href="/dashboard/user">จัดการข้อมูล User</Link>
            ),
            tooltip: 'จัดการข้อมูล User',
        },
    ];

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
                } else {
                    // When desktop size is restored, make sure it's uncollapsed
                    setCollapsed(false); // You might want to adjust this logic based on desired default behavior
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
                fontWeight: 'bold', // Make logo text bolder
                whiteSpace: 'nowrap', // Prevent text from wrapping
                overflow: 'hidden', // Hide overflow when collapsed
            }}>
                {collapsed ? 'E' : 'E-Services Dashboard'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[getActiveKey()]}
                // Dynamically render items with Tooltip
                items={menuItems.map(item => ({
                    key: item.key,
                    icon: (
                        <Tooltip title={collapsed ? item.tooltip : ''} placement="right">
                            {item.icon}
                        </Tooltip>
                    ),
                    label: item.label,
                }))}
            />
        </Sider>
    )
}

export default Sidebar