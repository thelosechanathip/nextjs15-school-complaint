'use client'

import React, { useEffect } from 'react'
import { useSchoolTransferStore } from '@/stores/schoolTransfer.store'
import { Table, Spin, Alert, Typography } from 'antd'

const { Title } = Typography

const DashboardSchoolTransferPage = () => {
  const { getSchoolTransfers, schoolTransfers, loading, error } = useSchoolTransferStore()

  useEffect(() => {
    getSchoolTransfers()
  }, [getSchoolTransfers])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ชื่อ-สกุลผู้ปกครอง',
      key: 'parent_full_name',
      render: (text: string, record: {
        school_transfer_parent_pname: string;
        school_transfer_parent_fname: string;
        school_transfer_parent_lname: string;
      }) => {
        const {
          school_transfer_parent_pname,
          school_transfer_parent_fname,
          school_transfer_parent_lname
        } = record;

        return `${school_transfer_parent_pname || ''} ${school_transfer_parent_fname || ''} ${school_transfer_parent_lname || ''}`.trim();
      },
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'school_transfer_address',
      key: 'school_transfer_address',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'school_transfer_phonenumber',
      key: 'school_transfer_phonenumber',
    },
    {
      title: 'ข้อมูลนักเรียน',
      key: 'student_full',
      render: (text: string, record: {
        school_transfer_student_pname: string;
        school_transfer_student_fname: string;
        school_transfer_student_lname: string;
        school_transfer_student_class: string;
      }) => {
        const {
          school_transfer_student_pname,
          school_transfer_student_fname,
          school_transfer_student_lname,
          school_transfer_student_class
        } = record;

        return `
          ${school_transfer_student_pname || ''} 
          ${school_transfer_student_fname || ''} 
          ${school_transfer_student_lname || ''}
          ${school_transfer_student_class || ''}
        `
          .trim()
      },
    },
    {
      title: 'สถานศึกษาที่ย้ายไป',
      dataIndex: 'school_transfer_to',
      key: 'school_transfer_to',
    },
    {
      title: 'ตำบล',
      dataIndex: 'school_transfer_sub_district',
      key: 'school_transfer_sub_district',
    },
    {
      title: 'อำเภอ',
      dataIndex: 'school_transfer_district',
      key: 'school_transfer_district',
    },
    {
      title: 'จังหวัด',
      dataIndex: 'school_transfer_province',
      key: 'school_transfer_province',
    },
    {
      title: 'รหัสไปรษณีย์',
      dataIndex: 'school_transfer_postalnumber',
      key: 'school_transfer_postalnumber',
    },
    {
      title: 'เบอร์โทรสถานศึกษาที่ย้ายไป',
      dataIndex: 'school_transfer_schoolphonenumber',
      key: 'school_transfer_schoolphonenumber',
    },
    {
      title: 'ความสัมพันธ์กับนักเรียน',
      dataIndex: 'relationship_to_school_type',
      key: 'relationship_to_school_type',
    },
    {
      title: 'ความสัมพันธ์กับนักเรียน อื่นๆ',
      dataIndex: 'relationship_to_school_other_details',
      key: 'relationship_to_school_other_details',
    },
    {
      title: 'เหตุผลการย้าย',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'เหตุผลการย้าย อื่นๆ',
      dataIndex: 'description_details',
      key: 'description_details',
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
        dataSource={schoolTransfers} // ใช้ข้อมูล complaints จาก store
        columns={columns}
        rowKey="id" // กำหนด key สำหรับแต่ละ row
        pagination={{ pageSize: 10 }} // กำหนด pagination
        scroll={{ x: 'max-content' }} // ถ้าข้อมูลเยอะและต้องการให้ตาราง Scroll แนวนอนได้
      />
    </div>
  )
}

export default DashboardSchoolTransferPage