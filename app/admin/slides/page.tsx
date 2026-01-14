'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon, Upload } from 'lucide-react'

interface Slide {
  id: string
  title: string
  description: string
  image: string
  active: boolean
  order: number
}

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    active: true
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [availableImages, setAvailableImages] = useState<any[]>([])

  useEffect(() => {
    loadSlides()
    loadAvailableImages()
  }, [])

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/admin/slides')
      if (response.ok) {
        const data = await response.json()
        setSlides(data.slides)
      }
    } catch (error) {
      console.error('Erro ao carregar slides:', error)
    }
  }

  const loadAvailableImages = async () => {
    try {
      const response = await fetch('/api/admin/upload')
      if (response.ok) {
        const data = await response.json()
        setAvailableImages(data.images)
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({ ...formData, image: data.path })
        setImagePreview(data.path)
        loadAvailableImages() // Atualizar lista
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao fazer upload')
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/slides', {
        method: editingSlide ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingSlide?.id
        })
      })

      if (response.ok) {
        loadSlides()
        setShowForm(false)
        setEditingSlide(null)
        setFormData({ title: '', description: '', image: '', active: true })
        setImagePreview(null)
      }
    } catch (error) {
      console.error('Erro ao salvar slide:', error)
    }
  }

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image,
      active: slide.active
    })
    setImagePreview(slide.image)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este slide?')) return

    try {
      const response = await fetch(`/api/admin/slides?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadSlides()
      }
    } catch (error) {
      console.error('Erro ao excluir slide:', error)
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Slides</h1>
                <p className="text-sm text-gray-600">Página Inicial</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(true)
                setEditingSlide(null)
                setFormData({ title: '', description: '', image: '', active: true })
                setImagePreview(null)
              }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Novo Slide
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingSlide ? 'Editar Slide' : 'Novo Slide'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagem do Slide
                    </label>
                    
                    {/* Upload de nova imagem */}
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-white
                          hover:file:bg-primary/90
                          file:cursor-pointer cursor-pointer
                          disabled:opacity-50"
                      />
                      {uploadingImage && (
                        <p className="text-sm text-gray-500 mt-2">Fazendo upload...</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG ou WEBP. Máximo 5MB. Tamanho recomendado: 1920x1080px
                      </p>
                    </div>

                    {/* Preview da imagem */}
                    {imagePreview && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* OU usar URL direta */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-2">
                        Ou insira URL da imagem:
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value })
                          setImagePreview(e.target.value)
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="/slides/imagem.jpg ou URL completa"
                      />
                    </div>

                    {/* Galeria de imagens já enviadas */}
                    {availableImages.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Ou escolha uma imagem já enviada:
                        </p>
                        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
                          {availableImages.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, image: img.path })
                                setImagePreview(img.path)
                              }}
                              className={`relative aspect-video rounded overflow-hidden border-2 transition ${
                                formData.image === img.path
                                  ? 'border-primary ring-2 ring-primary'
                                  : 'border-gray-200 hover:border-primary'
                              }`}
                            >
                              <img
                                src={img.path}
                                alt={img.name}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-gray-700">
                      Slide ativo
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary flex-1">
                      {editingSlide ? 'Salvar Alterações' : 'Adicionar Slide'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingSlide(null)
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Slides List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {slide.image ? (
                  <div className="w-full h-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white">
                    <ImageIcon size={48} />
                  </div>
                ) : (
                  <ImageIcon size={48} className="text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-2">{slide.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      slide.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {slide.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{slide.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm"
                  >
                    <Edit size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {slides.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Nenhum slide cadastrado</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Adicionar Primeiro Slide
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
