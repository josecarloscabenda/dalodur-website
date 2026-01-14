'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Redirecionando...</p>
      </div>
    </div>
  )
}
