'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, MailOpen, Trash2, Phone, Building2, Calendar } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  date: string
  read: boolean
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true })
      })

      if (response.ok) {
        loadMessages()
      }
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta mensagem?')) return

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadMessages()
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      }
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error)
    }
  }

  const filteredMessages = messages.filter(m => 
    filter === 'all' ? true : !m.read
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
                <p className="text-sm text-gray-600">
                  {messages.filter(m => !m.read).length} não lidas de {messages.length} total
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Filter */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      filter === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      filter === 'unread'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Não Lidas
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Mail size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Nenhuma mensagem</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message)
                        if (!message.read) markAsRead(message.id)
                      }}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                        selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {message.read ? (
                            <MailOpen size={16} className="text-gray-400" />
                          ) : (
                            <Mail size={16} className="text-primary" />
                          )}
                          <span className={`font-semibold text-sm ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {message.name}
                          </span>
                        </div>
                        {!message.read && (
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.message}</p>
                      <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="md:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedMessage.name}
                      </h2>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(selectedMessage.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary">
                        {selectedMessage.email}
                      </a>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-gray-400" />
                        <a href={`tel:${selectedMessage.phone}`} className="hover:text-primary">
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                    {selectedMessage.company && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Building2 size={16} className="text-gray-400" />
                        {selectedMessage.company}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Mensagem</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Contato via Website`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Mail size={18} />
                    Responder por Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Mail size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Selecione uma mensagem para visualizar</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
