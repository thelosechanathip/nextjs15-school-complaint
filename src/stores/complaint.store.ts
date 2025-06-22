import { create } from 'zustand'
import axiosInstance from '@/lib/axios'

interface complaintData {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

type ComplaintState = { // เปลี่ยนชื่อ type เป็น ComplaintState เพื่อความชัดเจน
    complaints: complaintData[]; // <--- แก้ไขตรงนี้: เป็น Array ของ complaintData โดยตรง
    loading: boolean;           // เพิ่มสถานะ loading
    error: string | null;       // เพิ่มสถานะ error
    getComplaints: () => Promise<void>; // <--- ควรคืนค่า Promise<void> เพื่อให้รู้ว่าจบแล้ว
}

export const useComplaintStore = create<ComplaintState>((set) => ({
    complaints: [], // ค่าเริ่มต้นเป็น Array ว่าง
    loading: false,  // ค่าเริ่มต้น loading เป็น false
    error: null,     // ค่าเริ่มต้น error เป็น null

    getComplaints: async () => {
        set({ loading: true, error: null }); // เริ่มโหลด: ตั้ง loading เป็น true, เคลียร์ error

        try {
            const response = await axiosInstance.get('/complaint');
            // console.log(response.data); // สามารถ log เพื่อดูข้อมูลได้

            // เมื่อสำเร็จ: ตั้ง loading เป็น false, กำหนดข้อมูลที่ได้
            set({ complaints: response.data, loading: false });
        } catch (error: unknown) {
            console.error('Error fetching complaints:', error);
        }
    }
}));