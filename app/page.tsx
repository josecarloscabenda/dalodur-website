'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, TrendingUp, Users, Target, Globe, CheckCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<any[]>([])

  useEffect(() => {
    loadSlides()
  }, [])

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/admin/slides')
      if (response.ok) {
        const data = await response.json()
        const activeSlides = data.slides.filter((s: any) => s.active)
        setSlides(activeSlides)
      }
    } catch (error) {
      console.error('Erro ao carregar slides:', error)
      // Fallback slides
      setSlides([
        {
          id: '1',
          title: 'Desenvolvimento de Novos Negócios',
          description: 'Identificamos oportunidades de crescimento para a sua empresa em Angola e no exterior',
          image: '/slides/slide1.jpg',
          active: true
        }
      ])
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const services = [
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: 'Desenvolvimento de Novos Negócios',
      description: 'Identificação de oportunidades e desenvolvimento de estratégias para crescimento sustentável.'
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Parcerias Estratégicas',
      description: 'Networking qualificado e conexões com parceiros estratégicos locais e internacionais.'
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: 'Consultoria de Negócios',
      description: 'Assessoria especializada para tomada de decisões estratégicas e otimização de resultados.'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-primary" />,
      title: 'Análise e Estudos de Viabilidade',
      description: 'Avaliação detalhada de projetos e oportunidades de investimento.'
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: 'Expansão para Mercados Estrangeiros',
      description: 'Apoio na internacionalização e entrada em novos mercados.'
    }
  ]

  const benefits = [
    'Conhecimento profundo do mercado angolano',
    'Rede de contatos qualificada',
    'Experiência em diversos sectores',
    'Abordagem personalizada',
    'Resultados mensuráveis',
    'Suporte contínuo'
  ]

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden bg-gray-900">
        {slides.length === 0 ? (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
            <div className="container-custom text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Bem-vindo à Dalodur Solutions</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">Consultoria Empresarial de Excelência</p>
              <Link href="/contato" className="btn-primary inline-block">
                Fale Connosco
              </Link>
            </div>
          </div>
        ) : (
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image ou Gradiente */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: slide.image && slide.image !== '/slides/slide1.jpg' && slide.image !== '/slides/slide2.jpg' && slide.image !== '/slides/slide3.jpg'
                    ? `url(${slide.image})`
                    : 'none'
                }}
              />
              {/* Overlay sempre presente */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/80" />
              
              <div className="relative h-full container-custom flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">{slide.description}</p>
                  <Link href="/contato" className="btn-primary inline-block">
                    Fale Connosco
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Slider controls - só mostra se houver mais de 1 slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slider indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre a Dalodur Solutions</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                A Dalodur Solutions Ltd é uma empresa de consultoria focada no desenvolvimento e expansão 
                de negócios B2B no mercado angolano e internacional.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Atuamos como parceiro estratégico, fornecendo informação relevante e suporte especializado 
                para a tomada de decisões estratégicas. Com uma forte atuação na identificação de oportunidades 
                de novos negócios, apoiamos empresas através de networking qualificado, conhecimento do mercado 
                local e parcerias estratégicas.
              </p>
              <Link href="/sobre" className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                Saiba Mais <ArrowRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <CheckCircle className="text-primary mb-2" size={24} />
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Áreas de Atuação</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas para impulsionar o crescimento do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/servicos" className="btn-primary">
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Expandir o Seu Negócio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Entre em contacto connosco e descubra como podemos ajudar a sua empresa a alcançar novos patamares
          </p>
          <Link href="/contato" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition inline-block">
            Solicitar Consulta
          </Link>
        </div>
      </section>
    </div>
  )
}
