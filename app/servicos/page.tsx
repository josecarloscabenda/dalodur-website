import { TrendingUp, Users, Target, Globe, CheckCircle, BarChart } from 'lucide-react'
import Link from 'next/link'

export default function ServicosPage() {
  const services = [
    {
      icon: <TrendingUp className="w-16 h-16 text-primary" />,
      title: 'Desenvolvimento de Novos Negócios',
      description: 'Identificação e exploração de oportunidades de crescimento para a sua empresa.',
      features: [
        'Análise de mercado e identificação de oportunidades',
        'Desenvolvimento de estratégias de crescimento',
        'Prospecção de novos clientes e mercados',
        'Estruturação de modelos de negócio',
        'Acompanhamento de implementação'
      ]
    },
    {
      icon: <Users className="w-16 h-16 text-primary" />,
      title: 'Parcerias Estratégicas',
      description: 'Conexão com os parceiros certos para potencializar seus resultados.',
      features: [
        'Networking qualificado',
        'Identificação de parceiros estratégicos',
        'Facilitação de encontros de negócios',
        'Negociação e estruturação de parcerias',
        'Gestão de relacionamento com parceiros'
      ]
    },
    {
      icon: <Target className="w-16 h-16 text-primary" />,
      title: 'Consultoria de Negócios',
      description: 'Assessoria especializada para tomada de decisões estratégicas.',
      features: [
        'Análise estratégica do negócio',
        'Desenvolvimento de planos de ação',
        'Otimização de processos',
        'Consultoria em gestão empresarial',
        'Suporte na implementação de mudanças'
      ]
    },
    {
      icon: <BarChart className="w-16 h-16 text-primary" />,
      title: 'Análises e Estudos de Viabilidade',
      description: 'Avaliação detalhada de projetos e oportunidades de investimento.',
      features: [
        'Estudos de viabilidade económica',
        'Análise de risco e retorno',
        'Pesquisas de mercado',
        'Projeções financeiras',
        'Relatórios técnicos especializados'
      ]
    },
    {
      icon: <Globe className="w-16 h-16 text-primary" />,
      title: 'Expansão para Mercados Estrangeiros',
      description: 'Apoio completo na internacionalização da sua empresa.',
      features: [
        'Análise de mercados internacionais',
        'Estratégias de entrada em novos mercados',
        'Apoio na constituição de empresas',
        'Networking internacional',
        'Acompanhamento no processo de internacionalização'
      ]
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-6">Nossos Serviços</h1>
          <p className="text-xl max-w-3xl text-white/90">
            Soluções completas e personalizadas para impulsionar o crescimento do seu negócio
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pronto para Impulsionar o Seu Negócio?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contacto connosco para discutir como podemos ajudar a sua empresa a alcançar seus objetivos
          </p>
          <Link href="/contato" className="btn-primary">
            Solicitar Consulta
          </Link>
        </div>
      </section>
    </div>
  )
}
