import { create } from 'zustand'
import axiosInstance from '@/lib/axios'

type AuthState = {
    user: object | null
    verifyToken: () => Promise<void>
    logout: () => Promise<object | null>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    verifyToken: async () => {
        const res = await axiosInstance.post('/auth/verify')
        set({ user: res })
    },
    logout: async () => {
        const res = await axiosInstance.post('/auth/logout')
        set({ user: null })
        return res
    }
}))