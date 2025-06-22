'use client'

import React from 'react'
import { Button, Form, Input } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { TLoginSchema } from '@/lib/validator/auth' // ตรวจสอบให้แน่ใจว่า import ถูกต้อง
import Link from 'next/link'
import axios from 'axios' // Import AxiosError
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation' // ใช้ useRouter จาก next/navigation สำหรับ App Router

const FormLogin = () => {
    const router = useRouter() // Initialize router

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TLoginSchema>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data: TLoginSchema) => {
        try {
            const res = await axios.post('/api/auth/login', data)
            toast.success(res.data.message)
            router.push('/dashboard')
            reset()
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

    return (
        <Form
            name="basic"
            onFinish={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                // Ant Design's `validateStatus` and `help` props can show validation state
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

            <Form.Item>
                <div className="flex justify-between">
                    <div className='hover:scale-[105%] transition-all'>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            เข้าสู่ระบบ
                        </Button>
                    </div>
                    <Link href="/">
                        <div className='hover:scale-[105%] transition-all'>
                            <Button type="primary" danger>
                                กลับสู่หน้าหลัก
                            </Button>
                        </div>
                    </Link>
                </div>
            </Form.Item>
        </Form>
    )
}

export default FormLogin