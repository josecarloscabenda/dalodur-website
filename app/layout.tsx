'use client'

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <html lang="pt-AO">
      <body>
        {!isAdminRoute && <Header />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  )
}