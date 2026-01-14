import Link from 'next/link'
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img 
                src="/logo-full.svg" 
                alt="Dalodur Solutions" 
                className="h-16 w-auto mb-4"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Promovemos o aumento do volume de negócio B2B no mercado angolano e no exterior, 
              fornecendo informação relevante para tomada de decisões estratégicas.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition">Início</Link></li>
              <li><Link href="/sobre" className="text-gray-400 hover:text-primary transition">Sobre</Link></li>
              <li><Link href="/servicos" className="text-gray-400 hover:text-primary transition">Serviços</Link></li>
              <li><Link href="/contato" className="text-gray-400 hover:text-primary transition">Contato</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+244939166871" className="hover:text-primary transition">+244 939 166 871</a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:geral@dalodursolutions.com" className="hover:text-primary transition break-all">
                  geral@dalodursolutions.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Luanda, Angola</span>
              </li>
            </ul>

            {/* Social media */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Dalodur Solutions Ltd. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
