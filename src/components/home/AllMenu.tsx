import React from 'react'
import { Card } from 'antd'
import Link from 'next/link'

const { Meta } = Card

const AllMenu = () => {
    return (
        <>
            <Link href="/complaint">
                <Card>
                    <Meta title="ระบบแจ้งเรื่องร้องเรียนการทุจริต" />
                </Card>
            </Link>
        </>
    )
}

export default AllMenu