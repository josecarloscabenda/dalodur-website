'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [mapConfig, setMapConfig] = useState({
    enabled: false,
    embedUrl: '',
    height: 450
  })

  useEffect(() => {
    loadMapConfig()
  }, [])

  const loadMapConfig = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setMapConfig({
          enabled: data.mapEnabled || false,
          embedUrl: data.mapEmbedUrl || '',
          height: data.mapHeight || 450
        })
      }
    } catch (error) {
      console.error('Erro ao carregar configurações do mapa:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-6">Entre em Contacto</h1>
          <p className="text-xl max-w-3xl text-white/90">
            Estamos prontos para ajudar a sua empresa a crescer. Fale connosco hoje mesmo!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informações de Contacto</h2>
              <p className="text-lg text-gray-700 mb-8">
                Nossa equipa está disponível para esclarecer suas dúvidas e apresentar soluções 
                personalizadas para o seu negócio.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                    <a href="tel:+244939166871" className="text-gray-600 hover:text-primary transition">
                      +244 939 166 871
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:geral@dalodursolutions.com" className="text-gray-600 hover:text-primary transition break-all">
                      geral@dalodursolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Localização</h3>
                    <p className="text-gray-600">Luanda, Angola</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Horário de Atendimento</h3>
                <p className="text-gray-600">Segunda a Sexta: 08:00 - 18:00</p>
                <p className="text-gray-600">Sábado: 08:00 - 13:00</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie-nos uma Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Enviando...'
                  ) : (
                    <>
                      Enviar Mensagem <Send size={18} />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Erro ao enviar mensagem. Por favor, tente novamente ou contacte-nos diretamente.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      {mapConfig.enabled && mapConfig.embedUrl && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossa Localização</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={mapConfig.embedUrl}
                width="100%"
                height={mapConfig.height}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Dalodur Solutions"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
