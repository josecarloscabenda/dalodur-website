# Dalodur Solutions Ltd - Website

Website profissional em Next.js para a Dalodur Solutions Ltd, empresa de consultoria empresarial focada no desenvolvimento de negócios B2B.

## 🆕 Versão 2.0 - LANÇAMENTO FINAL! 🎉

**Novidades desta versão:**
- ✅ 🖼️ **Upload de imagens** direto pelo admin (sem FTP!)
- ✅ 🗺️ **Mapa Google** configurável na página de contatos
- ✅ 🚫 **Layout admin separado** (sem menu do site público)
- ✅ 🎨 **Logo aumentado** (h-20) usando logo-full.svg
- ✅ 🖼️ **Slider corrigido** e funcionando perfeitamente
- ✅ 🧹 **Estrutura limpa** e organizada

**Veja:** `CHANGELOG.md` para detalhes completos das mudanças.

## 🎨 Design

- **Cores Principais:**
  - Verde: `#0097b2` (Primary)
  - Azul: `#004aad` (Secondary)
  - Fundo: Branco
  - Texto: Tons de cinza

- **Estilo:**
  - Design moderno e profissional
  - Ícones flat
  - Responsivo (mobile-first)
  - Animações suaves

## 📋 Funcionalidades

### Frontend (Público)
- ✅ Página Inicial com slider dinâmico
- ✅ Página Sobre
- ✅ Página Serviços
- ✅ Página Contato com formulário funcional
- ✅ Design totalmente responsivo
- ✅ Header com informações de contato
- ✅ Footer completo com redes sociais

### Admin (Área Administrativa)
- ✅ Sistema de login simples
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de slides (CRUD completo)
- ✅ Configuração de envio de emails
- ✅ Visualização de mensagens recebidas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Instalar dependências:**
   ```bash
   cd dalodur-website
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar o website:**
   - Frontend: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login

### Build para Produção

```bash
npm run build
npm start
```

### 🚀 Deploy no cPanel

**Para deploy via cPanel com Node.js:**

1. Consulte o guia completo: **`CPANEL-DEPLOY.md`**
2. Principais passos:
   - Fazer build: `npm run build`
   - Upload dos arquivos via FTP/File Manager
   - Configurar "Setup Node.js App" no cPanel
   - Instalar dependências no servidor
   - Iniciar aplicação

**Requisitos do cPanel:**
- Node.js 18+ habilitado
- Setup Node.js App disponível
- Acesso SSH (recomendado)

Veja documentação detalhada em `CPANEL-DEPLOY.md`

## 🔐 Acesso Admin

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `admin123`

⚠️ **IMPORTANTE:** Altere a senha em produção!

## 🎨 Configuração do Logo

Seus logos SVG já estão integrados no projeto:
- **Logo principal:** `/public/logo.svg`
- **Logo completo:** `/public/logo-full.svg`

**Onde os logos aparecem:**
- Header (topo do site)
- Footer (rodapé)
- Pode ser usado no admin

**Para personalizar ou alterar:**
Consulte o guia completo em **`LOGO-CONFIG.md`**

## 📁 Estrutura do Projeto

```
dalodur-website/
├── app/
│   ├── admin/           # Área administrativa
│   │   ├── login/       # Página de login
│   │   ├── dashboard/   # Dashboard principal
│   │   ├── slides/      # Gerenciar slides
│   │   └── settings/    # Configurações
│   ├── api/             # API Routes
│   │   ├── contact/     # API de contato
│   │   └── admin/       # APIs administrativas
│   ├── contato/         # Página de contato
│   ├── servicos/        # Página de serviços
│   ├── sobre/           # Página sobre
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página inicial
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx
│   └── Footer.tsx
├── data/                # Dados em JSON
│   ├── slides.json      # Slides da home
│   ├── users.json       # Usuários admin
│   ├── email-config.json # Config de email
│   └── messages.json    # Mensagens recebidas
├── public/              # Arquivos públicos
│   ├── logo.svg
│   └── slides/          # Imagens dos slides
└── README.md
```

## 📧 Configuração de Email

1. Acesse: `/admin/settings`
2. Configure o servidor SMTP:
   - Gmail: smtp.gmail.com (porta 587)
   - SendGrid: smtp.sendgrid.net (porta 587)
   - Outros serviços SMTP
3. Ative o envio automático de emails

**Nota:** Mensagens são sempre salvas em `data/messages.json`, mesmo sem configuração de email.

## 🎯 Gerenciamento de Slides

1. Acesse: `/admin/slides`
2. Clique em "Novo Slide"
3. Preencha:
   - Título
   - Descrição
   - URL da imagem (coloque a imagem em `public/slides/`)
   - Status (ativo/inativo)

**Exemplo de caminho de imagem:** `/slides/slide1.jpg`

## 🔧 Customização

### Alterar Cores
Edite `tailwind.config.ts`:
```typescript
colors: {
  primary: '#0097b2',  // Verde principal
  secondary: '#004aad', // Azul secundário
}
```

### Alterar Informações de Contato
Edite os componentes:
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/contato/page.tsx`

### Adicionar Novos Serviços
Edite `app/servicos/page.tsx` e adicione itens ao array `services`.

## 📱 Páginas do Website

### Públicas
- `/` - Página inicial com slider
- `/sobre` - Sobre a empresa
- `/servicos` - Serviços oferecidos
- `/contato` - Formulário de contato

### Administrativas
- `/admin/login` - Login
- `/admin/dashboard` - Dashboard
- `/admin/slides` - Gerenciar slides
- `/admin/settings` - Configurações

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS
- **Ícones:** Lucide React
- **Armazenamento:** Arquivos JSON (sem banco de dados)

## 📝 Próximos Passos Recomendados

1. **Segurança:**
   - Implementar autenticação JWT adequada
   - Adicionar bcrypt para senhas
   - Configurar CORS apropriadamente

2. **Funcionalidades:**
   - Sistema de upload de imagens
   - Dashboard com gráficos
   - Múltiplos usuários admin
   - Sistema de backup automático

3. **Performance:**
   - Otimização de imagens
   - Cache de dados
   - CDN para assets

4. **SEO:**
   - Sitemap
   - robots.txt
   - Meta tags personalizadas por página

## 📞 Informações de Contato

- **Email:** geral@dalodursolutions.com
- **Telefone:** +244 939 166 871
- **Website:** www.dalodursolutions.com

## 📄 Licença

Projeto desenvolvido para Dalodur Solutions Ltd.
