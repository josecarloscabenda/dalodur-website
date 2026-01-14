'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Image, Settings, Mail, LogOut, FileText } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    slides: 0,
    messages: 0,
    unreadMessages: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Carregar estatísticas
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const handleLogout = () => {
    // Limpar sessão
    document.cookie = 'admin_session=; Max-Age=0'
    router.push('/admin/login')
  }

  const menuItems = [
    {
      icon: <Image size={24} />,
      title: 'Gerenciar Slides',
      description: 'Adicionar, editar ou remover slides da página inicial',
      href: '/admin/slides',
      color: 'bg-blue-500'
    },
    {
      icon: <Mail size={24} />,
      title: 'Mensagens',
      description: `${stats.unreadMessages} mensagens não lidas`,
      href: '/admin/messages',
      color: 'bg-green-500'
    },
    {
      icon: <Settings size={24} />,
      title: 'Configurações',
      description: 'Configurar envio de emails e outras opções',
      href: '/admin/settings',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 flex items-center justify-center">
                <img 
              src="/logo-full.svg" 
              alt="Dalodur Solutions" 
              className="h-20 w-auto"
            />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">Dalodur Solutions Ltd</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo ao Painel Administrativo</h2>
          <p className="text-white/90">Gerencie o conteúdo do website da Dalodur Solutions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Image className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total de Slides</p>
                <p className="text-2xl font-bold text-gray-900">{stats.slides}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Mensagens</p>
                <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <FileText className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Não Lidas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition group"
            >
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Links Rápidos</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/" className="text-primary hover:underline">
              Ver Website →
            </Link>
            <Link href="/admin/settings" className="text-primary hover:underline">
              Configurações de Email →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
