import { Target, Users, TrendingUp, Award } from 'lucide-react'

export default function SobrePage() {
  const values = [
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: 'Missão',
      description: 'Promover o crescimento sustentável das empresas através de consultoria estratégica e identificação de oportunidades de negócio.'
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: 'Visão',
      description: 'Ser a consultoria de referência em Angola para empresas que buscam expandir e consolidar suas operações no mercado B2B.'
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Valores',
      description: 'Integridade, excelência, compromisso com resultados, transparência e parceria de longo prazo com nossos clientes.'
    }
  ]

  const differentials = [
    'Conhecimento profundo do mercado angolano',
    'Experiência comprovada em diversos sectores',
    'Rede de contatos estratégicos',
    'Abordagem personalizada para cada cliente',
    'Foco em resultados mensuráveis',
    'Acompanhamento contínuo'
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-6">Sobre a Dalodur Solutions</h1>
          <p className="text-xl max-w-3xl text-white/90">
            Seu parceiro estratégico para crescimento e expansão de negócios em Angola e no exterior
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                A <strong>Dalodur Solutions Ltd</strong> é uma empresa de consultoria empresarial especializada 
                em desenvolvimento e expansão de negócios B2B no mercado angolano e internacional.
              </p>
              <p>
                Atuamos como parceiro estratégico, fornecendo informação relevante e suporte especializado 
                para a tomada de decisões estratégicas. Nossa experiência abrange diversos sectores da 
                economia, permitindo-nos oferecer soluções customizadas e eficazes para cada cliente.
              </p>
              <p>
                Com uma forte atuação na identificação de oportunidades de novos negócios, a Dalodur tem 
                desenvolvido o seu percurso através de networking qualificado, conhecimento profundo do 
                mercado local e estabelecimento de parcerias estratégicas.
              </p>
              <p>
                Funcionamos como um parceiro local de confiança, apoiando empresas a desenvolver novas 
                áreas de negócio, aumentar receitas e explorar oportunidades com elevado potencial, tanto 
                em Angola como no exterior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Missão, Visão e Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossos Diferenciais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {differentials.map((differential, index) => (
                <div key={index} className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg">
                  <TrendingUp className="text-primary flex-shrink-0 mt-1" size={24} />
                  <p className="text-gray-700 font-medium">{differential}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
