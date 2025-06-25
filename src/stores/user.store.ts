import { create } from 'zustand'
import type { TUserSchema } from '@/lib/validator/user'
import axiosInstance from '@/lib/axios'

type UserState = {
    open: boolean
    users: TUserSchema
    loading: boolean
    error: string | null
    title: string
    setTitle: (title: string) => void
    buttonTitle: string
    setButtonTitle: (title: string) => void
    showModal: () => Promise<void>
    handleCancel: () => Promise<void>
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
    open: false,
    users: [],
    loading: false,  // ค่าเริ่มต้น loading เป็น false
    error: null,     // ค่าเริ่มต้น error เป็น null
    title: '',
    setTitle: (title) => {
        set({ title: title })
    },
    buttonTitle: '',
    setButtonTitle: (buttonTitle) => {
        set({ buttonTitle: buttonTitle })
    },
    showModal: async () => {
        set({ open: true })
    },
    handleCancel: async () => {
        set({ open: false })
    },
    fetchUser: async () => {
        set({ loading: true, error: null })
        try {
            const res = await axiosInstance.get('/auth')
            set({ users: res.data, loading: false })
        } catch (error: unknown) {
            console.error('Error fetching users:', error)
        }
    }
}))