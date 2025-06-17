'use client'
import { Card, Button, Form, Input, Radio } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL_GOOGLE_SHEET = 'https://script.google.com/macros/s/AKfycbwJtinSr8M-Cmq6dtCAmlv4iHXe5sDDRMmEkCAAu6bRJYtXoIYoMBxQ3JUnHN9n_WEe/exec'

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

interface IFormInput {
    complaint_type: number | string
    complaint_other_details: string
    description: string
    incident_location: string | number
    fullname: string
    phone_number: number
    email: string
    relationship_to_school_type: number | string
    relationship_to_school_other_details: number | string
}

const FormComplaint = () => {
    const { handleSubmit, control, watch, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            complaint_type: 1,
            complaint_other_details: '',
            relationship_to_school_type: 1,
            relationship_to_school_other_details: ''
        }
    });

    const onSubmit = async (data: IFormInput) => {
        try {
            const res = await axios.post(API_URL_GOOGLE_SHEET, data);

            // Check the response from your Apps Script
            if (res.data.status === 'success') {
                toast.success("ส่งเรื่องร้องเรียนสำเร็จแล้ว!");
                reset(); // Reset the form fields
            } else {
                // Handle errors reported by your script
                toast.error(res.data.message || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์');
            }
        } catch (error) {
            // Handle network errors (like the CORS error)
            console.error("Submission failed:", error);
            toast.error("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ");
        }
    };

    const watchedComplaintType = watch('complaint_type');
    const watchedRelationshipToSchoolType = watch('relationship_to_school_type');

    return (
        <div className="container mx-auto my-12 px-6 md:my-20">
            <Card className='shadow-2xl'>
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-center md:text-3xl">
                        แจ้งเรื่องร้องเรียนการทุจริต / ประพฤติมิชอบในโรงเรียน
                    </h1>
                </div>

                <div className="mt-8 w-full max-w-3xl mx-auto">
                    <p className="text-base text-center md:text-left md:text-lg">
                        แบบฟอร์มนี้จัดทำขึ้นเพื่อให้นักเรียน บุคลากร หรือผู้ปกครองสามารถแจ้งข้อมูลการกระทำที่ไม่เหมาะสม เช่น การทุจริต การใช้อำนาจในทางที่ผิด หรือพฤติกรรมที่ละเมิดจริยธรรม เพื่อให้โรงเรียนสามารถตรวจสอบและดำเนินการได้อย่างโปร่งใสและเป็นธรรม{' '}
                        <span className="font-bold">
                            *ข้อมูลของคุณจะถูกเก็บเป็นความลับอย่างเคร่งครัด*
                        </span>
                    </p>
                    <div className='flex flex-col gap-3'>
                        <p className="text-base text-center md:text-left md:text-lg mt-5">
                            โปรดอ่านก่อนกรอกแบบฟอร์ม
                        </p>
                        <ul className='ms-10 flex flex-col gap-3'>
                            <li className='list-disc'>ใช้ข้อมูลจริงเท่านั้น</li>
                            <li className='list-disc'>ห้ามใช้ถ่อยคำหยาบคาย หรือกล่าวหาผู้อื่นโดยไม่มีหลักฐาน</li>
                            <li className='list-disc'>การใส่ชื่อ/ข้อมูลของผู้ถูกร้องเรียน ควรเป็นไปด้วยความรับผิดชอบ</li>
                            <li className='list-disc'>ข้อมูลของผู้ร้องเรียนจะไม่ถูกเปิดเผยต่อสาธารณะ</li>
                            <li className='list-disc'>แบบฟอร์มนี้มีไว้เพื่อสร้างความโปร่งใส ไม่ใช่เพื่อการกลั่นแกล้ง</li>
                        </ul>
                    </div>
                    <hr className='hr my-5' />
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        layout="vertical"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label="ประเภทเรื่องร้องเรียน"
                            validateStatus={errors.complaint_type ? 'error' : ''}
                            help={errors.complaint_type?.message}
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="complaint_type"
                                    control={control}
                                    rules={{ required: 'กรุณาเลือกประเภทเรื่องร้องเรียน' }}
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            style={style}
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
                            </div>
                        </Form.Item>
                        {watchedComplaintType === 'complaintTypeOther' && (
                            <Form.Item
                                label="ระบุรายละเอียดเพิ่มเติม"
                                validateStatus={errors.complaint_other_details ? 'error' : ''}
                                help={errors.complaint_other_details?.message}
                            >
                                <div className='ms-10'>
                                    <Controller
                                        name="complaint_other_details"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                variant="filled"
                                                placeholder="โปรดระบุ"
                                            />
                                        )}
                                    />
                                </div>
                            </Form.Item>
                        )}

                        <Form.Item
                            label="โปรดอธิบายรายละเอียดของเหตุการณ์"
                            validateStatus={errors.description ? 'error' : ''}
                            help={errors.description?.message}
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: 'กรุณากรอกคำอธิบายรายละเอียดของเหตุการณ์' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="filled"
                                            placeholder="กรอกคำอธิบายรายละเอียดของเหตุการณ์"
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="สถานที่เกิดเหตุการณ์"
                            validateStatus={errors.incident_location ? 'error' : ''}
                            help={errors.incident_location?.message}
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="incident_location"
                                    control={control}
                                    rules={{ required: 'กรุณากรอกสถานที่เกิดเหตุการณ์' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="filled"
                                            placeholder="กรอกสถานที่เกิดเหตุการณ์"
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="ชื่อ-นามสกุล(ผู้ร้องเรียน)"
                            validateStatus={errors.fullname ? 'error' : ''}
                            help={errors.fullname?.message}
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="fullname"
                                    control={control}
                                    rules={{ required: 'กรุณากรอกชื่อ-นามสกุล(ผู้ร้องเรียน)' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="filled"
                                            placeholder="กรอกชื่อ-นามสกุล(ผู้ร้องเรียน)"
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="เบอร์โทรศัพท์"
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="filled"
                                            placeholder="กรอกเบอร์โทรศัพท์"
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="filled"
                                            placeholder="กรอกEmail"
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="ความสัมพันธ์กับโรงเรียน"
                            validateStatus={errors.relationship_to_school_type ? 'error' : ''}
                            help={errors.relationship_to_school_type?.message}
                        >
                            <div className='ms-10'>
                                <Controller
                                    name="relationship_to_school_type"
                                    control={control}
                                    rules={{ required: 'กรุณาเลือกความสัมพันธ์กับโรงเรียน' }}
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            style={style}
                                            options={[
                                                { value: 'นักเรียน', label: 'นักเรียน' },
                                                { value: 'ผู้ปกครอง', label: 'ผู้ปกครอง' },
                                                { value: 'ครู/บุคลากร', label: 'ครู/บุคลากร' },
                                                { value: 'relationOther', label: 'อื่นๆ (โปรดระบุ)' },
                                            ]}
                                        />
                                    )}
                                />
                            </div>
                        </Form.Item>
                        {watchedRelationshipToSchoolType === 'relationOther' && (
                            <Form.Item
                                label="ระบุรายละเอียดเพิ่มเติม"
                                validateStatus={errors.relationship_to_school_other_details ? 'error' : ''}
                                help={errors.relationship_to_school_other_details?.message}
                            >
                                <div className='ms-10'>
                                    <Controller
                                        name="relationship_to_school_other_details"
                                        control={control}
                                        rules={{ required: 'กรุณากรอกรายละเอียด' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                variant="filled"
                                                placeholder="โปรดระบุ"
                                            />
                                        )}
                                    />
                                </div>
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                ส่งเรื่องร้องเรียน
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default FormComplaint;