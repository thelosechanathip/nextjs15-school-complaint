import { create } from 'zustand'

type UserState = {
    open: boolean
    title: string
    setTitle: (title: string) => void
    buttonTitle: string
    setButtonTitle: (title: string) => void
    showModal: () => Promise<void>
    handleCancel: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
    open: false,
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
}))