import { create } from 'zustand'
import axiosInstance from '@/lib/axios'
import type { TRequestSchoolTransferSchema } from '@/lib/validator/schoolTransfer'

type TSchoolTransferState = {
    schoolTransfers: TRequestSchoolTransferSchema[]
    schoolTransferCount: string | number
    loading: boolean
    error: string | null
    getSchoolTransfers: () => Promise<void>
    getSchoolTransferCount: () => Promise<void>
}

export const useSchoolTransferStore = create<TSchoolTransferState>((set) => ({
    schoolTransfers: [],
    schoolTransferCount: '',
    loading: false,
    error: null,
    getSchoolTransferCount: async () => {
        set({ loading: true, error: null })
        try {
            const res = await axiosInstance.get('/schoolTransfer')
            set({ schoolTransferCount: res.data.schoolTransferCount, loading: false })
        } catch (error: unknown) {
            console.error('Error fetching school transfers:', error)
        }
    },
    getSchoolTransfers: async () => {
        set({ loading: true, error: null })
        try {
            const res = await axiosInstance.get('/schoolTransfer')
            set({ schoolTransfers: res.data.schoolTransfers, loading: false })
        } catch (error: unknown) {
            console.error('Error fetching school transfers:', error)
        }
    },
}))