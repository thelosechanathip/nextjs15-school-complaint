'use client'

import React from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { useUserStore } from '@/stores/user.store'
import { useForm, Controller } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { TRegisterSchema } from '@/lib/validator/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const UserModal = () => {
    const router = useRouter()
    const { open, handleCancel, title, buttonTitle } = useUserStore()
    const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<TRegisterSchema>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data: TRegisterSchema) => {
        try {
            const res = await axios.post('/api/auth/register', data)
            toast.success(res.data.message || 'ลงทะเบียนสำเร็จ!')
            router.push('/dashboard')
            reset()
            handleCancel()
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>

            console.error("Submission failed:", err)

            if (err.response) {
                toast.error(err.response.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน')
            } else if (err.request) {
                toast.error("ส่งข้อมูลไม่สำเร็จ: ไม่มีการตอบสนองจากเซิร์ฟเวอร์ กรุณาลองใหม่ในภายหลัง")
            } else {
                if (err.code === 'ERR_NETWORK') {
                    toast.error("ส่งข้อมูลไม่สำเร็จ: ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือการตั้งค่า CORS")
                } else {
                    toast.error("เกิดข้อผิดพลาดที่ไม่รู้จัก: กรุณาลองใหม่อีกครั้ง")
                }
            }
        }
    }

    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            // ปรับปรุง footer buttons
            footer={[
                <Button key="back" onClick={handleCancel}> {/* เปลี่ยนเป็น type='default' หรือไม่ระบุ */}
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit(onSubmit)} // ใช้ onClick สำหรับ Button
                >
                    {buttonTitle}
                </Button>,
            ]}
        >
            <hr className='my-5 text-gray-300' />
            <Form
                name="basic"
                autoComplete="off"
            // ไม่ต้องระบุ onFinish เพราะเราใช้ handleSubmit กับปุ่มโดยตรง
            >
                <Form.Item
                    label="Username"
                    validateStatus={errors.username ? 'error' : ''}
                    help={errors.username?.message}
                >
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'กรุณากรอก Username!' }}
                        render={({ field }) => <Input {...field} placeholder="ชื่อผู้ใช้" />}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'กรุณากรอก Password!' }}
                        render={({ field }) => <Input.Password {...field} placeholder="รหัสผ่าน" />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserModal