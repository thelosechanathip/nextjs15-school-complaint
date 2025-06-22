'use client'

import { Card, Button, Form, Input, Radio } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
}

interface IFormInput {
    complaint_type: string
    complaint_other_details: string
    description: string
    incident_location: string
    fullname: string
    phone_number: number
    email: string
    relationship_to_school_type: string
    relationship_to_school_other_details: string
}

const FormComplaint = () => {
    const router = useRouter()

    const { handleSubmit, control, watch, formState: { errors, isSubmitting }, reset  } = useForm<IFormInput>({
        defaultValues: {
            complaint_type: 'การทุจริตในการจัดซื้อจัดจ้าง',
            complaint_other_details: '',
            relationship_to_school_type: 'นักเรียน',
            relationship_to_school_other_details: ''
        }
    })

    const onSubmit = async (data: IFormInput) => {
        try {
            const res = await axios.post('/api/complaints', data)
            toast.success(res.data.message)
            reset()
            router.push('/')
        } catch (error: unknown) {
            const err = error as Error
            // จัดการ Network Error (เช่น CORS ที่ถูกบล็อก หรือปัญหาการเชื่อมต่อ)
            console.error("Submission failed:", error)
            if (err.message === 'ERR_NETWORK') {
                toast.error("ส่งข้อมูลไม่สำเร็จ: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบ CORS ใน Google Script")
            } else {
                toast.error("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ")
            }
        }
    }

    const watchedComplaintType = watch('complaint_type')
    const watchedRelationshipToSchoolType = watch('relationship_to_school_type')

    return (
        <div className="container mx-auto mt-6 mb-20 px-6">
            <Card className='shadow-2xl'>
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-center md:text-3xl">
                        แจ้งเรื่องร้องเรียนการทุจริต / ประพฤติมิชอบในโรงเรียน
                    </h1>
                </div>

                <div className="mt-8 w-full max-w-3xl mx-auto">
                    {/* ส่วนของคำอธิบาย ไม่ได้แก้ไข */}
                    <p className="text-base text-center md:text-left md:text-lg">
                        แบบฟอร์มนี้จัดทำขึ้นเพื่อให้นักเรียน บุคลากร หรือผู้ปกครองสามารถแจ้งข้อมูลการกระทำที่ไม่เหมาะสม เช่น การทุจริต การใช้อำนาจในทางที่ผิด หรือพฤติกรรมที่ละเมิดจริยธรรม เพื่อให้โรงเรียนสามารถตรวจสอบและดำเนินการได้อย่างโปร่งใสและเป็นธรรม{' '}
                        <span className="font-bold">
                            *ข้อมูลของคุณจะถูกเก็บเป็นความลับอย่างเคร่งครัด*
                        </span>
                    </p>
                    <hr className='hr my-5' />
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        layout="vertical"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                    >
                        {/* ส่วนของฟอร์ม ไม่ได้แก้ไขโค้ด */}
                        {/* Complaint Type */}
                        <Form.Item label="ประเภทเรื่องร้องเรียน" validateStatus={errors.complaint_type ? 'error' : ''} help={errors.complaint_type?.message}>
                            <Controller name="complaint_type" control={control} rules={{ required: 'กรุณาเลือกประเภทเรื่องร้องเรียน' }}
                                render={({ field }) => (
                                    <Radio.Group {...field} style={style}
                                        options={[
                                            { value: 'การทุจริตในการจัดซื้อจัดจ้าง', label: 'การทุจริตในการจัดซื้อจัดจ้าง' },
                                            { value: 'การเรียกรับผลประโยชน์', label: 'การเรียกรับผลประโยชน์' },
                                            { value: 'การละเมิดสิทธิ์นักเรียน', label: 'การละเมิดสิทธิ์นักเรียน' },
                                            { value: 'พฤติกรรมไม่เหมาะสมของครู/บุคลากร', label: 'พฤติกรรมไม่เหมาะสมของครู/บุคลากร' },
                                            { value: 'complaintTypeOther', label: 'อื่นๆ (โปรดระบุ)' },
                                        ]}
                                    />
                                )}
                            />
                        </Form.Item>
                        {watchedComplaintType === 'complaintTypeOther' && (
                            <Form.Item label="ระบุรายละเอียดเพิ่มเติม" validateStatus={errors.complaint_other_details ? 'error' : ''} help={errors.complaint_other_details?.message}>
                                <Controller name="complaint_other_details" control={control} rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                    render={({ field }) => <Input {...field} variant="filled" placeholder="โปรดระบุ" />}
                                />
                            </Form.Item>
                        )}
                        {/* Description */}
                        <Form.Item label="โปรดอธิบายรายละเอียดของเหตุการณ์" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
                            <Controller name="description" control={control} rules={{ required: 'กรุณากรอกคำอธิบาย' }}
                                render={({ field }) => <Input.TextArea {...field} rows={4} variant="filled" placeholder="กรอกคำอธิบายรายละเอียดของเหตุการณ์" />}
                            />
                        </Form.Item>
                        {/* Location */}
                        <Form.Item label="สถานที่เกิดเหตุการณ์" validateStatus={errors.incident_location ? 'error' : ''} help={errors.incident_location?.message}>
                            <Controller name="incident_location" control={control} rules={{ required: 'กรุณากรอกสถานที่' }}
                                render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกสถานที่เกิดเหตุการณ์" />}
                            />
                        </Form.Item>
                        {/* Full Name */}
                        <Form.Item label="ชื่อ-นามสกุล (ผู้ร้องเรียน)" validateStatus={errors.fullname ? 'error' : ''} help={errors.fullname?.message}>
                            <Controller name="fullname" control={control} rules={{ required: 'กรุณากรอกชื่อ-นามสกุล' }}
                                render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกชื่อ-นามสกุล (ผู้ร้องเรียน)" />}
                            />
                        </Form.Item>
                        {/* Phone Number */}
                        <Form.Item label="เบอร์โทรศัพท์ (ไม่บังคับ)">
                            <Controller name="phone_number" control={control}
                                render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกเบอร์โทรศัพท์" />}
                            />
                        </Form.Item>
                        {/* Email */}
                        <Form.Item label="Email (ไม่บังคับ)">
                            <Controller name="email" control={control}
                                render={({ field }) => <Input {...field} variant="filled" placeholder="กรอก Email" />}
                            />
                        </Form.Item>
                        {/* Relationship */}
                        <Form.Item label="ความสัมพันธ์กับโรงเรียน" validateStatus={errors.relationship_to_school_type ? 'error' : ''} help={errors.relationship_to_school_type?.message}>
                            <Controller name="relationship_to_school_type" control={control} rules={{ required: 'กรุณาเลือกความสัมพันธ์' }}
                                render={({ field }) => (
                                    <Radio.Group {...field} style={style}
                                        options={[
                                            { value: 'นักเรียน', label: 'นักเรียน' },
                                            { value: 'ผู้ปกครอง', label: 'ผู้ปกครอง' },
                                            { value: 'ครู/บุคลากร', label: 'ครู/บุคลากร' },
                                            { value: 'relationOther', label: 'อื่นๆ (โปรดระบุ)' },
                                        ]}
                                    />
                                )}
                            />
                        </Form.Item>
                        {watchedRelationshipToSchoolType === 'relationOther' && (
                            <Form.Item label="ระบุรายละเอียดเพิ่มเติม" validateStatus={errors.relationship_to_school_other_details ? 'error' : ''} help={errors.relationship_to_school_other_details?.message}>
                                <Controller name="relationship_to_school_other_details" control={control} rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                    render={({ field }) => <Input {...field} variant="filled" placeholder="โปรดระบุ" />}
                                />
                            </Form.Item>
                        )}
                        {/* Submit Button */}
                        <Form.Item>
                            <div className='flex justify-between'>
                                <Link href="/">
                                    <Button type="primary" danger htmlType="submit" size="large">
                                        กลับสู่หน้าหลัก
                                    </Button>
                                </Link>
                                <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}> {/* <--- เพิ่ม disabled={isSubmitting} ตรงนี้ */}
                                    {isSubmitting ? <LoadingOutlined /> : 'ส่งเรื่องร้องเรียน'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default FormComplaint