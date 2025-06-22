'use client'

import Footer from "@/components/home/Footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}