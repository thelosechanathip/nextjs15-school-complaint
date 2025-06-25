import { create } from 'zustand'
import axiosInstance from '@/lib/axios'
import type { TRequestSchoolTransferSchema } from '@/lib/validator/schoolTransfer'

type TSchoolTransferState = {
    schoolTransfers: TRequestSchoolTransferSchema[]
    loading: boolean
    error: string | null
    getSchoolTransfers: () => Promise<void>
}

export const useSchoolTransferStore = create<TSchoolTransferState>((set) => ({
    schoolTransfers: [],
    loading: false,
    error: null,
    getSchoolTransfers: async () => {
        set({ loading: true, error: null })
        try {
            const res = await axiosInstance.get('/schoolTransfer')
            set({ schoolTransfers: res.data, loading: false })
        } catch (error: unknown) {
            console.error('Error fetching school transfers:', error)
        }
    },
}))