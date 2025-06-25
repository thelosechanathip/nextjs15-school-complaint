'use client'

import React, { useEffect } from 'react'
import { useComplaintStore } from '@/stores/complaint.store'
import { useSchoolTransferStore } from '@/stores/schoolTransfer.store'
import { Card, Col, Row, Statistic, Spin, Alert, Typography } from 'antd' // Import Statistic, Spin, Alert, Typography
import { FileTextOutlined, UserSwitchOutlined } from '@ant-design/icons' // Import icons for better visuals
import Link from 'next/link'

const { Title } = Typography;

const DashboardPage = () => {
  const { getComplaintCount, complaintCount, loading: complaintLoading, error: complaintError } = useComplaintStore();
  const { getSchoolTransferCount, schoolTransferCount, loading: schoolTransferLoading, error: schoolTransferError } = useSchoolTransferStore();

  useEffect(() => {
    getComplaintCount();
    getSchoolTransferCount();
  }, [getComplaintCount, getSchoolTransferCount]);

  // Combine loading and error states for a cleaner UI
  const overallLoading = complaintLoading || schoolTransferLoading;
  const overallError = complaintError || schoolTransferError;

  if (overallLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen-minus-header-footer"> {/* Adjust min-h if needed */}
        <Spin size="large" tip="กำลังโหลดข้อมูล..." />
      </div>
    );
  }

  if (overallError) {
    return (
      <div className="p-4"> {/* Add some padding around the alert */}
        <Alert
          message="เกิดข้อผิดพลาดในการโหลดข้อมูล"
          description={overallError} // Display the actual error message
          type="error"
          showIcon
        />
      </div>
    );
  }


  return (
    <div className="p-6 md:p-8 lg:p-10"> {/* Add padding around the dashboard content */}
      <Title level={2} className="mb-8 text-center text-gray-800">แดชบอร์ดสรุปข้อมูล</Title> {/* Centered title */}

      <Row gutter={[24, 24]} justify="center"> {/* Responsive gutter, center alignment */}
        {/* Card for Complaint Count */}
        <Col xs={24} sm={12} md={8} lg={6}> {/* Full width on extra small, 2 per row on small, 3 per row on medium, 4 per row on large */}
          <Link href="/dashboard/complaint">
            <Card
              hoverable
              className="shadow-lg rounded-lg text-center" // Add shadow and rounded corners with Tailwind
              style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} // Center content vertically
            >
              <Statistic
                title="จำนวนเรื่องร้องเรียน"
                value={complaintCount}
                precision={0} // No decimal places
                valueStyle={{ color: '#3f8600', fontSize: '2.5rem' }} // Green color, larger font
                prefix={<FileTextOutlined style={{ marginRight: '8px' }} />} // Icon prefix
              />
            </Card>
          </Link>
        </Col>

        {/* Card for School Transfer Count */}
        <Col xs={24} sm={12} md={8} lg={6}> {/* Same responsive behavior */}
          <Link href="/dashboard/school_transfer">
            <Card
              hoverable
              className="shadow-lg rounded-lg text-center"
              style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Statistic
                title="จำนวนเรื่องย้ายนักเรียน"
                value={schoolTransferCount}
                precision={0}
                valueStyle={{ color: '#eb5c00', fontSize: '2.5rem' }} // Orange color for variety
                prefix={<UserSwitchOutlined style={{ marginRight: '8px' }} />} // Icon prefix
              />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage