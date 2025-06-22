'use client'

import { useAuthStore } from '@/stores/auth.store'
import { useEffect, useState } from 'react'
import { Layout, theme } from 'antd'
import Navbar from '@/components/protected/Navbar'
import Sidebar from '@/components/protected/Sidebar'

const { Content } = Layout

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { verifyToken } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            await verifyToken();
        };
        checkAuth()
    }, [verifyToken])

    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize();
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (isMobile) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }, [isMobile])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar
                collapsed={collapsed}
                setCollapsed={() => setCollapsed(!collapsed)}
                isMobile={isMobile}
            />
            <Layout
                // *** ปรับ margin-left ให้เท่ากับความกว้างของ Sider เพื่อชดเชยที่ Sider เป็น fixed ***
                style={{ marginLeft: collapsed ? (isMobile ? 0 : 80) : 200 }}
                className="site-layout" // อาจเพิ่ม className เพื่อความชัดเจนในการปรับ CSS
            >
                <Navbar
                    colorBgContainer={colorBgContainer}
                    collapsed={collapsed}
                    setCollapsed={() => setCollapsed(!collapsed)}
                    isMobile={isMobile}
                />
                <Content
                    style={{
                        margin: '80px 16px 16px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        // *** เพิ่ม padding-top เพื่อหลีกเลี่ยง Header ที่ fixed ***
                        paddingTop: 'calc(10px + 10px)', // 24px (เดิม) + 64px (ความสูง Header)
                        minHeight: 'calc(100vh - 64px - 48px)', // 100vh - Header Height - total margin (24px top + 24px bottom)
                        overflowY: 'auto', // ทำให้ Content มี scrollbar แนวตั้งเป็นของตัวเอง
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}