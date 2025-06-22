import { create } from 'zustand';
// ไม่ต้อง import { theme } from 'antd' มาใช้ตรงนี้แล้ว
// เพราะ useToken() เป็น Hook ต้องใช้ใน Component เท่านั้น

interface Token {
    colorBgContainer: string | number; // ประเภทควรเป็น string
    borderRadiusLG: string | number;   // ประเภทควรเป็น number
}

type ProtectedState = {
    // กำหนด token เป็นค่าเริ่มต้น null หรือ undefined ไปก่อน
    // และค่อยไป set ค่าจริงเมื่อ component โหลด
    token: Token | null;
    setThemeTokens: (colorBgContainer: string, borderRadiusLG: number) => void;
};

export const useProtectedStore = create<ProtectedState>((set) => ({
    token: null, // ค่าเริ่มต้นเป็น null
    setThemeTokens: (colorBgContainer, borderRadiusLG) => set({
        token: { colorBgContainer, borderRadiusLG }
    }),
}));