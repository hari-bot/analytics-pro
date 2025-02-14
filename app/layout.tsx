import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import Footer from '@/components/footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Analytics Pro",
  description: "Explore analytics across different platforms",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

