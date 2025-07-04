import type { Metadata } from "next"
import './globals.css'
import { Inter } from "next/font/google"
import AntdRegistry from "./AntdRegistry"
import { ToastContainer } from 'react-toastify'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" })

export const metadata: Metadata = {
  title: "E-Services",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextTopLoader
            color="#2299DD"          // สีของ progress bar
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}                // ความสูงของ bar (px)
            crawl={true}
            showSpinner={false}       // ซ่อนวงกลมหมุนๆ
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD" // เพิ่มเงาเรืองแสง
          />
          <ToastContainer />
          <div id="root-layout-container">
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}
