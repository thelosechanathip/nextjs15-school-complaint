'use client'

import { Card, Button, Form, Input, Radio, Row, Col } from 'antd' // ตรวจสอบว่ามี Row, Col
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import type { TRequestSchoolTransferSchema } from '@/lib/validator/schoolTransfer'

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
}

const FormSchoolTransfer = () => {
    const router = useRouter()

    const { handleSubmit, control, watch, formState: { errors, isSubmitting }, reset } =
        useForm<TRequestSchoolTransferSchema>({
            defaultValues: {
                relationship_to_school_type: 'บิดา',
                relationship_to_school_other_details: '',
                description: 'ติดตามผู้ปกครอง',
                description_details: '',
            }
        })

    const onSubmit = async (data: TRequestSchoolTransferSchema) => {
        try {
            const res = await axios.post('/api/school_transfer', data)
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

    const watchedRelationshipToSchoolType = watch('relationship_to_school_type')
    const watchedDescription = watch('description')

    return (
        <div className="container mx-auto mt-6 mb-20 px-6">
            <Card className='shadow-2xl'>
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-center md:text-3xl">
                        แจ้งย้ายสถานศึกษา
                    </h1>
                </div>

                <div className="mt-8 w-full max-w-3xl mx-auto">
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        layout="vertical"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                    >
                        <Row gutter={[16, 16]}> {/* Add gutter for spacing between columns */}
                            <Col xs={24} sm={8}> {/* Full width on extra small, 1/3 width on small and up */}
                                {/* SchoolTransferParentPname */}
                                <Form.Item
                                    label="คำนำหน้าผู้ปกครอง"
                                    validateStatus={errors.school_transfer_parent_pname ? 'error' : ''}
                                    help={errors.school_transfer_parent_pname?.message}
                                >
                                    <Controller
                                        name="school_transfer_parent_pname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกคำนำหน้าผู้ปกครอง' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกคำนำหน้าผู้ปกครอง" />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={8}> {/* Full width on extra small, 1/3 width on small and up */}
                                {/* SchoolTransferParentFname */}
                                <Form.Item
                                    label="ชื่อผู้ปกครอง"
                                    validateStatus={errors.school_transfer_parent_fname ? 'error' : ''}
                                    help={errors.school_transfer_parent_fname?.message}
                                >
                                    <Controller
                                        name="school_transfer_parent_fname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกชื่อผู้ปกครอง' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกชื่อผู้ปกครอง" />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={8}> {/* Full width on extra small, 1/3 width on small and up */}
                                {/* SchoolTransferParentLname */}
                                <Form.Item
                                    label="นามสกุลผู้ปกครอง"
                                    validateStatus={errors.school_transfer_parent_lname ? 'error' : ''}
                                    help={errors.school_transfer_parent_lname?.message}
                                >
                                    <Controller
                                        name="school_transfer_parent_lname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกนามสกุลผู้ปกครอง' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกนามสกุลผู้ปกครอง" />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* SchoolTransferAddress */}
                        <Form.Item
                            label="ที่อยู่"
                            validateStatus={errors.school_transfer_address ? 'error' : ''}
                            help={errors.school_transfer_address?.message}>
                            <Controller name="school_transfer_address" control={control} rules={{ required: 'กรุณากรอกที่อยู่' }}
                                render={({ field }) => <Input.TextArea {...field} rows={4} variant="filled" placeholder="กรอกที่อยู่" />}
                            />
                        </Form.Item>

                        {/* SchoolTransferPhonenumber */}
                        <Form.Item
                            label="เบอร์โทรศัพท์"
                            validateStatus={errors.school_transfer_phonenumber ? 'error' : ''}
                            help={errors.school_transfer_phonenumber?.message}
                        >
                            <Controller
                                name="school_transfer_phonenumber"
                                control={control}
                                rules={{
                                    required: 'กรุณากรอกเบอร์โทรศัพท์',
                                    pattern: {
                                        value: /^[0-9]+$/, // Regex to allow only digits
                                        message: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                                    },
                                    minLength: {
                                        value: 9, // Minimum length for phone numbers in Thailand (e.g., 081234567)
                                        message: 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก',
                                    },
                                    maxLength: {
                                        value: 10, // Max length for phone numbers in Thailand (e.g., 0812345678)
                                        message: 'เบอร์โทรศัพท์ต้องไม่เกิน 10 หลัก',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        variant="filled"
                                        placeholder="กรอกเบอร์โทรศัพท์"
                                        type="tel" // Use type="tel" for phone numbers, it brings up a numeric keypad on mobile
                                        inputMode="numeric" // Helps ensure numeric keypad on mobile
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Row gutter={[16, 16]}> {/* Add gutter for spacing between columns */}
                            {/* คำนำหน้านักเรียน */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="คำนำหน้านักเรียน"
                                    validateStatus={errors.school_transfer_student_pname ? 'error' : ''}
                                    help={errors.school_transfer_student_pname?.message}
                                >
                                    <Controller
                                        name="school_transfer_student_pname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกคำนำหน้านักเรียน' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกคำนำหน้านักเรียน" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* ชื่อนักเรียน */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="ชื่อนักเรียน"
                                    validateStatus={errors.school_transfer_student_fname ? 'error' : ''}
                                    help={errors.school_transfer_student_fname?.message}
                                >
                                    <Controller
                                        name="school_transfer_student_fname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกชื่อนักเรียน' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกชื่อนักเรียน" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* นามสกุลนักเรียน */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="นามสกุลนักเรียน"
                                    validateStatus={errors.school_transfer_student_lname ? 'error' : ''}
                                    help={errors.school_transfer_student_lname?.message}
                                >
                                    <Controller
                                        name="school_transfer_student_lname"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกนามสกุลนักเรียน' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกนามสกุลนักเรียน" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* ชั้นเรียน */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="ชั้นเรียน"
                                    validateStatus={errors.school_transfer_student_class ? 'error' : ''}
                                    help={errors.school_transfer_student_class?.message}
                                >
                                    <Controller
                                        name="school_transfer_student_class"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกชั้นเรียน' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกชั้นเรียน" />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* RelationshipToSchoolType */}
                        <Form.Item
                            label="ประเภทเรื่องร้องเรียน"
                            validateStatus={errors.relationship_to_school_type ? 'error' : ''}
                            help={errors.relationship_to_school_type?.message}
                        >
                            <Controller name="relationship_to_school_type" control={control} rules={{ required: 'กรุณาเลือกประเภทเรื่องร้องเรียน' }}
                                render={({ field }) => (
                                    <Radio.Group {...field} style={style}
                                        options={[
                                            { value: 'บิดา', label: 'บิดา' },
                                            { value: 'มารดา', label: 'มารดา' },
                                            { value: 'other', label: 'อื่นๆ (โปรดระบุ)' },
                                        ]}
                                    />
                                )}
                            />
                        </Form.Item>
                        {watchedRelationshipToSchoolType === 'other' && (
                            <Form.Item
                                label="ระบุรายละเอียดเพิ่มเติม"
                                validateStatus={errors.relationship_to_school_other_details ? 'error' : ''}
                                help={errors.relationship_to_school_other_details?.message}
                            >
                                <Controller
                                    name="relationship_to_school_other_details"
                                    control={control}
                                    rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                    render={({ field }) => <Input {...field} variant="filled" placeholder="โปรดระบุ" />}
                                />
                            </Form.Item>
                        )}

                        <hr className='hr my-5' />

                        <p className="text-base text-center md:text-left md:text-lg mb-5">
                            มีความประสงค์จะขอย้ายนักเรียนเข้าเรียนที่โรงเรียนอื่น โปรดกรอกรายละเอียดดังนี้
                        </p>

                        <Row gutter={[16, 16]}> {/* Add gutter for spacing between columns */}
                            {/* ชื่อโรงเรียน */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="ชื่อโรงเรียน"
                                    validateStatus={errors.school_transfer_to ? 'error' : ''}
                                    help={errors.school_transfer_to?.message}
                                >
                                    <Controller
                                        name="school_transfer_to"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกชื่อโรงเรียน' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกชื่อโรงเรียน" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* ตำบล */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="ตำบล"
                                    validateStatus={errors.school_transfer_sub_district ? 'error' : ''}
                                    help={errors.school_transfer_sub_district?.message}
                                >
                                    <Controller
                                        name="school_transfer_sub_district"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกตำบล' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกตำบล" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* อำเภอ */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="อำเภอ"
                                    validateStatus={errors.school_transfer_district ? 'error' : ''}
                                    help={errors.school_transfer_district?.message}
                                >
                                    <Controller
                                        name="school_transfer_district"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกอำเภอ' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกอำเภอ" />}
                                    />
                                </Form.Item>
                            </Col>

                            {/* จังหวัด */}
                            <Col xs={24} sm={6}> {/* Full width on extra small, 1/4 width on small and up */}
                                <Form.Item
                                    label="จังหวัด"
                                    validateStatus={errors.school_transfer_province ? 'error' : ''}
                                    help={errors.school_transfer_province?.message}
                                >
                                    <Controller
                                        name="school_transfer_province"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกจังหวัด' }}
                                        render={({ field }) => <Input {...field} variant="filled" placeholder="กรอกจังหวัด" />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Postal Code and School Phone Number - 2 fields per row on larger screens */}
                        <Row gutter={[16, 16]}> {/* Use a new Row for the next set of fields */}
                            {/* รหัสไปรษณีย์ */}
                            <Col xs={24} sm={12}> {/* Full width on extra small, 1/2 width on small and up */}
                                <Form.Item
                                    label="รหัสไปรษณีย์"
                                    validateStatus={errors.school_transfer_postalnumber ? 'error' : ''}
                                    help={errors.school_transfer_postalnumber?.message}
                                >
                                    <Controller
                                        name="school_transfer_postalnumber"
                                        control={control}
                                        rules={{
                                            required: 'กรุณากรอกรหัสไปรษณีย์',
                                            pattern: {
                                                value: /^[0-9]{5}$/, // Assuming 5-digit postal code for Thailand
                                                message: 'กรุณากรอกรหัสไปรษณีย์ 5 หลักที่เป็นตัวเลข',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                variant="filled"
                                                placeholder="กรอกรหัสไปรษณีย์"
                                                type="text" // Postal codes can start with 0, so keep as text
                                                inputMode="numeric" // Still helpful for numeric keypad on mobile
                                                maxLength={5} // Limit input to 5 characters
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                                    field.onChange(value);
                                                }}
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            {/* เบอร์โทรศัพท์โรงเรียน */}
                            <Col xs={24} sm={12}> {/* Full width on extra small, 1/2 width on small and up */}
                                <Form.Item
                                    label="เบอร์โทรศัพท์โรงเรียน"
                                    validateStatus={errors.school_transfer_schoolphonenumber ? 'error' : ''}
                                    help={errors.school_transfer_schoolphonenumber?.message}
                                >
                                    <Controller
                                        name="school_transfer_schoolphonenumber"
                                        control={control}
                                        rules={{
                                            required: 'กรุณากรอกเบอร์โทรศัพท์โรงเรียน',
                                            pattern: {
                                                value: /^[0-9]+$/, // Allow only digits
                                                message: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                                            },
                                            minLength: {
                                                value: 9, // Adjust as needed for school phone numbers
                                                message: 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก',
                                            },
                                            maxLength: {
                                                value: 10, // Adjust as needed
                                                message: 'เบอร์โทรศัพท์ต้องไม่เกิน 10 หลัก',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                variant="filled"
                                                placeholder="กรอกเบอร์โทรศัพท์โรงเรียน"
                                                type="tel"
                                                inputMode="numeric"
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                                    field.onChange(value);
                                                }}
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <hr className='hr my-5' />

                        {/* RelationshipToSchoolType */}
                        <Form.Item
                            label="เหตุผลที่ย้ายสถานศึกษา"
                            validateStatus={errors.description ? 'error' : ''}
                            help={errors.description?.message}
                        >
                            <Controller name="description" control={control} rules={{ required: 'กรุณาเลือกเหตุผลที่ย้ายสถานศึกษา"' }}
                                render={({ field }) => (
                                    <Radio.Group {...field} style={style}
                                        options={[
                                            { value: 'ติดตามผู้ปกครอง', label: 'ติดตามผู้ปกครอง' },
                                            { value: 'other', label: 'อื่นๆ (โปรดระบุ)' },
                                        ]}
                                    />
                                )}
                            />
                        </Form.Item>
                        {watchedDescription === 'other' && (
                            <Form.Item
                                label="ระบุรายละเอียดเพิ่มเติม"
                                validateStatus={errors.description_details ? 'error' : ''}
                                help={errors.description_details?.message}
                            >
                                <Controller
                                    name="description_details"
                                    control={control}
                                    rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                    render={({ field }) => <Input {...field} variant="filled" placeholder="โปรดระบุ" />}
                                />
                            </Form.Item>
                        )}

                        <hr className='hr my-5' />

                        <div className='my-5'>
                            <div className="flex gap-3">
                                <span className='text-red-700'>******</span>
                                <h2>หมายเหตุ: เตรียมเอกสาร/หลักฐาน ดังนี้</h2>
                                <span className='text-red-700'>******</span>
                            </div>
                            <ul className='ms-20'>
                                <li className='list-decimal'>สำเนาทะเบียนบ้านของ นักเรียน  บิดา  มารดา  อย่างละ  1  แผ่น</li>
                                <li className='list-decimal'>รูปถ่ายชุดนักเรียนขนาด  1.5  นิ้ว   จำนวน  3  รูป</li>
                                <li className='list-decimal'>หนังสือยืนยันการรับนักเรียนจากโรงเรียนที่จะย้ายไป</li>
                                <li className='list-decimal'>สำเนาบัตรประจำตัวประชาชน ผู้มาติดต่อ  จำนวน  1  ฉบับ</li>
                            </ul>
                        </div>

                        {/* Submit Button Row - Using Ant Design Grid for responsiveness */}
                        <Form.Item style={{ marginBottom: 0 }}> {/* Remove default bottom margin if not needed */}
                            <Row gutter={[16, 16]} justify="space-between" wrap={true}> {/* wrap={true} เพื่อให้ขึ้นบรรทัดใหม่เมื่อไม่พอ */}
                                <Col xs={24} sm={12}> {/* Full width on extra small, half on small and up */}
                                    <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting} style={{ width: '100%' }}> {/* ทำให้ปุ่มมีขนาด 100% */}
                                        {isSubmitting ? <LoadingOutlined /> : 'ส่งเรื่องของย้ายสถานศึกษา'}
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}> {/* Full width on extra small, half on small and up */}
                                    <Link href="/" style={{ width: '100%', display: 'block' }}> {/* ทำให้ Link มีขนาด 100% */}
                                        <Button type="primary" danger size="large" style={{ width: '100%' }}> {/* ทำให้ปุ่มมีขนาด 100% */}
                                            กลับสู่หน้าหลัก
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default FormSchoolTransfer