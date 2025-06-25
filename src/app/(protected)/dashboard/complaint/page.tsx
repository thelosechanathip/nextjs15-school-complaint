'use client'

import React, { useEffect } from 'react'
import { useComplaintStore } from '@/stores/complaint.store'
import { Table, Spin, Alert, Typography } from 'antd'

const { Title } = Typography

const DashboardComplaintPage = () => {
  const { getComplaints, complaints, loading, error } = useComplaintStore()

  useEffect(() => {
    getComplaints()
  }, [getComplaints])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'หัวข้อการร้องเรียน',
      dataIndex: 'complaint_type',
      key: 'complaint_type',
    },
    {
      title: 'หัวข้อการร้องเรียนอื่นๆ',
      dataIndex: 'complaint_other_details',
      key: 'complaint_other_details',
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'สถานที่เกิดเหตุ',
      dataIndex: 'incident_location',
      key: 'incident_location',
    },
    {
      title: 'ชื่อ-สกุลผู้แจ้งเหตุ',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'เบอร์โทรผู้แจ้งเหตุ',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'E-mail ผู้แจ้งเหตุ',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ความสัมพันธ์กับนักเรียน',
      dataIndex: 'relationship_to_school_type',
      key: 'relationship_to_school_type',
    },
    {
      title: 'ความสัมพันธ์กับนักเรียนอื่นๆ',
      dataIndex: 'relationship_to_school_other_details',
      key: 'relationship_to_school_other_details',
    },
    {
      title: 'สร้างเมื่อ',
      dataIndex: 'createdAt',
      key: 'createdAt',
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

  return (
    <div>
      <Title level={3}>รายการเรื่องร้องเรียน</Title>
      <Table
        dataSource={complaints} // ใช้ข้อมูล complaints จาก store
        columns={columns}
        rowKey="id" // กำหนด key สำหรับแต่ละ row
        pagination={{ pageSize: 10 }} // กำหนด pagination
        scroll={{ x: 'max-content' }} // ถ้าข้อมูลเยอะและต้องการให้ตาราง Scroll แนวนอนได้
      />
    </div>
  )
}

export default DashboardComplaintPage