'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Mail, MapPin } from 'lucide-react'

export default function AdminSettingsPage() {
  const [config, setConfig] = useState({
    enabled: false,
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    recipientEmail: 'geral@dalodursolutions.com',
    fromName: 'Dalodur Solutions - Website',
    // Configurações do mapa
    mapEnabled: false,
    mapEmbedUrl: '',
    mapHeight: 450
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' })
      } else {
        setMessage({ type: 'error', text: 'Erro ao salvar configurações' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar configurações' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
              <p className="text-sm text-gray-600">Configurar envio de emails</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Configuração de Email</h2>
                <p className="text-sm text-gray-600">Configure o servidor SMTP para envio de emails</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Ativar envio de emails */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="enabled"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="enabled" className="font-medium text-gray-900">
                Ativar envio automático de emails
              </label>
            </div>

            {/* Email destinatário */}
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Destinatário *
              </label>
              <input
                type="email"
                id="recipientEmail"
                required
                value={config.recipientEmail}
                onChange={(e) => setConfig({ ...config, recipientEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="geral@dalodursolutions.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                Email que receberá as mensagens do formulário de contato
              </p>
            </div>

            {/* Nome do remetente */}
            <div>
              <label htmlFor="fromName" className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Remetente
              </label>
              <input
                type="text"
                id="fromName"
                value={config.fromName}
                onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Configurações SMTP</h3>
              
              <div className="space-y-4">
                {/* SMTP Host */}
                <div>
                  <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700 mb-2">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    id="smtpHost"
                    value={config.smtpHost}
                    onChange={(e) => setConfig({ ...config, smtpHost: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                {/* SMTP Port */}
                <div>
                  <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-2">
                    Porta SMTP
                  </label>
                  <input
                    type="number"
                    id="smtpPort"
                    value={config.smtpPort}
                    onChange={(e) => setConfig({ ...config, smtpPort: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* SMTP User */}
                <div>
                  <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700 mb-2">
                    Usuário SMTP
                  </label>
                  <input
                    type="text"
                    id="smtpUser"
                    value={config.smtpUser}
                    onChange={(e) => setConfig({ ...config, smtpUser: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="seu-email@gmail.com"
                  />
                </div>

                {/* SMTP Password */}
                <div>
                  <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha SMTP
                  </label>
                  <input
                    type="password"
                    id="smtpPassword"
                    value={config.smtpPassword}
                    onChange={(e) => setConfig({ ...config, smtpPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Mensagens */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Botão salvar */}
            <button
              type="submit"
              disabled={saving}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </form>
        </div>

        {/* Configuração do Mapa Google */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mapa Google - Página de Contatos</h2>
                <p className="text-sm text-gray-600">Configure o mapa para a página de contatos</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Ativar mapa */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="mapEnabled"
                checked={config.mapEnabled}
                onChange={(e) => setConfig({ ...config, mapEnabled: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="mapEnabled" className="font-medium text-gray-900">
                Mostrar mapa na página de contatos
              </label>
            </div>

            {/* URL do embed */}
            <div>
              <label htmlFor="mapEmbedUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL do Google Maps Embed
              </label>
              <textarea
                id="mapEmbedUrl"
                rows={3}
                value={config.mapEmbedUrl}
                onChange={(e) => setConfig({ ...config, mapEmbedUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Cole aqui o URL do Google Maps Embed (começa com https://www.google.com/maps/embed?pb=...)"
              />
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p className="font-medium">Como obter o URL:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Abra o Google Maps</li>
                  <li>Busque o endereço da empresa</li>
                  <li>Clique em "Compartilhar"</li>
                  <li>Clique em "Incorporar mapa"</li>
                  <li>Copie apenas o URL que está dentro de src="..." no código</li>
                </ol>
              </div>
            </div>

            {/* Altura do mapa */}
            <div>
              <label htmlFor="mapHeight" className="block text-sm font-medium text-gray-700 mb-2">
                Altura do Mapa (pixels)
              </label>
              <input
                type="number"
                id="mapHeight"
                value={config.mapHeight}
                onChange={(e) => setConfig({ ...config, mapHeight: parseInt(e.target.value) || 450 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                min="300"
                max="800"
              />
              <p className="text-sm text-gray-500 mt-1">
                Recomendado: 450px
              </p>
            </div>

            {/* Informação adicional */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Informação</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Configure um servidor SMTP válido para enviar emails automaticamente</li>
                <li>• Recomendamos usar serviços como Gmail, SendGrid ou Mailgun</li>
                <li>• As mensagens são sempre salvas, mesmo sem configuração de email</li>
              </ul>
            </div>

            {/* Botão salvar */}
            <button
              type="submit"
              disabled={saving}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
