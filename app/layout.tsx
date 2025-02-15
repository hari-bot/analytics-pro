import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adrigo",
  description: "Social Media Management & Analytics Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-[#1c1f26]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

