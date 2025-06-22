import React from 'react'
import { Card } from 'antd'
import Link from 'next/link'

const { Meta } = Card

const AllMenu = () => {
    return (
        <>
            <Link href="/complaint">
                <div className="hover:scale-[105%] transition-all">
                    <Card>
                        <Meta
                            title="CNS(Complaint Notification System)"
                            description="ระบบแจ้งเรื่องร้องเรียนการทุจริต"
                        />
                    </Card>
                </div>
            </Link>
            <Link href="/school_transfer">
                <div className="hover:scale-[105%] transition-all">
                    <Card>
                        <Meta
                            title="STNS(Student Transfer Notification System)"
                            description="ระบบแจ้งย้ายนักเรียน"
                        />
                    </Card>
                </div>
            </Link>
        </>
    )
}

export default AllMenu