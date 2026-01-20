# 🌟 Dalodur Solutions Ltd - Website Completo

## ✨ O Que Foi Desenvolvido

Website profissional em Next.js 14 com TypeScript e Tailwind CSS para a Dalodur Solutions Ltd, incluindo:

### Frontend Público
- ✅ **Página Inicial** com slider dinâmico gerenciável
- ✅ **Página Sobre** com missão, visão e valores
- ✅ **Página Serviços** detalhando todas as áreas de atuação
- ✅ **Página Contato** com formulário funcional
- ✅ Design totalmente responsivo (mobile, tablet, desktop)
- ✅ Header com informações de contato
- ✅ Footer completo com links e redes sociais

### Painel Administrativo
- ✅ Sistema de login seguro
- ✅ Dashboard com estatísticas em tempo real
- ✅ **Gerenciador de Slides** (criar, editar, excluir, ativar/desativar)
- ✅ **Visualizador de Mensagens** do formulário de contato
- ✅ **Configurações de Email** para envio automático
- ✅ Interface moderna e intuitiva

### Características Técnicas
- ⚡ Next.js 14 com App Router
- 🎨 Tailwind CSS para estilização
- 📱 Design responsivo mobile-first
- 🔒 Autenticação simples e segura
- 💾 Armazenamento em JSON (sem banco de dados necessário)
- 🚀 Performance otimizada
- ♿ Acessível e SEO-friendly

## 🎨 Paleta de Cores

- **Verde Principal:** `#99b1bd`
- **Azul Secundário:** `#2e4b74`
- **Fundo:** Branco (#FFFFFF)
- **Texto:** Tons de cinza (#1F2937, #4B5563, #6B7280)

## 📁 Estrutura do Projeto

```
dalodur-website/
├── app/                      # Aplicação Next.js
│   ├── admin/               # Área administrativa
│   │   ├── login/          # Login admin
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── slides/         # Gerenciar slides
│   │   ├── messages/       # Ver mensagens
│   │   └── settings/       # Configurações
│   ├── api/                # API Routes
│   │   ├── contact/        # API de contato
│   │   └── admin/          # APIs administrativas
│   ├── contato/            # Página de contato
│   ├── servicos/           # Página de serviços
│   ├── sobre/              # Página sobre
│   ├── layout.tsx          # Layout principal
│   ├── globals.css         # Estilos globais
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── Header.tsx
│   └── Footer.tsx
├── data/                   # Dados em JSON
│   ├── slides.json         # Slides da home
│   ├── users.json          # Usuários admin
│   ├── email-config.json   # Configuração de email
│   └── messages.json       # Mensagens recebidas
├── public/                 # Arquivos públicos
│   ├── logo_completo_dalodur.svg
│   ├── simbolo.svg
│   └── slides/             # Imagens dos slides
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── README.md              # Documentação principal
├── DEPLOY.md              # Guia de deploy
├── setup.sh               # Script de instalação
└── .env.example           # Variáveis de ambiente exemplo
```

## 🚀 Como Usar

### Instalação Rápida

```bash
# 1. Entrar na pasta do projeto
cd dalodur-website

# 2. Executar script de setup
./setup.sh

# OU instalar manualmente
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Acessar o site
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin/login
```

### Credenciais Admin
- **Usuário:** admin
- **Senha:** admin123

⚠️ **Importante:** Altere essas credenciais antes de fazer deploy em produção!

## 📱 Páginas Disponíveis

### Públicas
| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com slider |
| `/sobre` | Informações sobre a empresa |
| `/servicos` | Serviços oferecidos |
| `/contato` | Formulário de contato |

### Administrativas
| Rota | Descrição |
|------|-----------|
| `/admin` | Redirect para login |
| `/admin/login` | Página de login |
| `/admin/dashboard` | Painel principal |
| `/admin/slides` | Gerenciar slides |
| `/admin/messages` | Ver mensagens |
| `/admin/settings` | Configurações |

## 🔧 Funcionalidades Principais

### 1. Gerenciamento de Slides
- Adicionar novos slides
- Editar slides existentes
- Ativar/desativar slides
- Excluir slides
- Visualização em tempo real

### 2. Sistema de Mensagens
- Receber mensagens do formulário
- Marcar como lida/não lida
- Filtrar mensagens
- Responder por email
- Excluir mensagens

### 3. Configurações de Email
- Configurar servidor SMTP
- Ativar/desativar envio automático
- Testar configurações
- Definir email destinatário

## 📧 Configuração de Email

1. Acesse `/admin/settings`
2. Preencha os dados SMTP:
   - Servidor (ex: smtp.gmail.com)
   - Porta (587 para TLS)
   - Usuário e senha
3. Ative o envio automático
4. Salve as configurações

**Serviços recomendados:**
- Gmail (smtp.gmail.com)
- SendGrid (smtp.sendgrid.net)
- Mailgun (smtp.mailgun.org)

## 🎯 Próximos Passos

### Para Uso Imediato
1. ✅ Executar `npm install`
2. ✅ Iniciar com `npm run dev`
3. ✅ Fazer login no admin
4. ✅ Adicionar/editar slides
5. ✅ Configurar email (opcional)

### Para Deploy em Produção
1. 📝 Alterar credenciais admin
2. 🔒 Configurar SSL/HTTPS
3. 🌐 Configurar domínio
4. 📧 Configurar SMTP
5. 🚀 Deploy (Vercel, Netlify, VPS)

Veja o arquivo `DEPLOY.md` para instruções detalhadas.

## 🛠️ Customização

### Alterar Cores
Edite `tailwind.config.ts`:
```typescript
colors: {
  primary: '#99b1bd',    // Verde
  secondary: '#2e4b74',  // Azul
}
```

### Alterar Conteúdo
- **Textos:** Edite os arquivos `.tsx` em `app/`
- **Serviços:** Edite `app/servicos/page.tsx`
- **Contatos:** Edite `components/Header.tsx` e `Footer.tsx`

### Adicionar Páginas
```bash
# Criar nova pasta em app/
mkdir app/nova-pagina
# Criar page.tsx
touch app/nova-pagina/page.tsx
```

## 📊 Tecnologias Utilizadas

- **Framework:** Next.js 14
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS
- **Ícones:** Lucide React
- **Armazenamento:** JSON (sem BD)

## 🔐 Segurança

### Implementado
- ✅ Autenticação de sessão
- ✅ Proteção de rotas admin
- ✅ Sanitização de dados
- ✅ Validação de formulários

### Recomendado para Produção
- 🔒 Implementar JWT
- 🔒 Usar bcrypt para senhas
- 🔒 Rate limiting
- 🔒 CORS apropriado
- 🔒 HTTPS obrigatório

## 📞 Informações de Contato

**Dalodur Solutions Ltd**
- Email: geral@dalodursolutions.com
- Telefone: +244 939 166 871
- Website: www.dalodursolutions.com
- Localização: Luanda, Angola

## 📄 Licença

Projeto desenvolvido exclusivamente para Dalodur Solutions Ltd.

---

**Desenvolvido com ❤️ para Dalodur Solutions Ltd**

Para suporte ou dúvidas, consulte:
- `README.md` - Documentação completa
- `DEPLOY.md` - Guia de deploy
