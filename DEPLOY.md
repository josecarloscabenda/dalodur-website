# Guia de Deploy - Dalodur Solutions Website

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado)

A forma mais fácil de fazer deploy de um projeto Next.js.

1. **Criar conta na Vercel:**
   - Acesse https://vercel.com
   - Faça login com GitHub/GitLab/Bitbucket

2. **Importar projeto:**
   - Clique em "New Project"
   - Selecione o repositório do projeto
   - Clique em "Import"

3. **Configurar:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar

**URL:** Seu site estará disponível em `https://seu-projeto.vercel.app`

### 2. Netlify

1. **Criar conta na Netlify:**
   - Acesse https://netlify.com
   - Faça login

2. **Criar site:**
   - "Add new site" > "Import an existing project"
   - Conecte seu repositório Git

3. **Configurar:**
   - Build command: `npm run build`
   - Publish directory: `.next`

### 3. VPS (Ubuntu/Debian)

#### Requisitos:
- Ubuntu 20.04+ ou Debian 11+
- Node.js 18+
- Nginx
- PM2

#### Passos:

1. **Instalar Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Instalar PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clonar e configurar projeto:**
   ```bash
   cd /var/www
   git clone [seu-repositorio] dalodur-website
   cd dalodur-website
   npm install
   npm run build
   ```

4. **Iniciar com PM2:**
   ```bash
   pm2 start npm --name "dalodur-website" -- start
   pm2 save
   pm2 startup
   ```

5. **Configurar Nginx:**
   ```nginx
   server {
       listen 80;
       server_name dalodursolutions.com www.dalodursolutions.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL com Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d dalodursolutions.com -d www.dalodursolutions.com
   ```

### 4. Docker

1. **Criar Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build e run:**
   ```bash
   docker build -t dalodur-website .
   docker run -p 3000:3000 dalodur-website
   ```

## 📁 Arquivos de Dados

**IMPORTANTE:** Os arquivos em `/data` contêm informações importantes:
- `slides.json` - Slides da página inicial
- `messages.json` - Mensagens de contato
- `email-config.json` - Configurações de email
- `users.json` - Usuários admin

### Backup Regular

Configure backup automático desses arquivos:

```bash
# Script de backup (cron diário)
#!/bin/bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/
# Enviar para S3, Google Drive, etc.
```

## 🔒 Segurança

### Antes do Deploy em Produção:

1. **Alterar senha admin:**
   - Edite `data/users.json`
   - Use hash bcrypt para senha

2. **Variáveis de ambiente:**
   - Crie arquivo `.env.local`
   - Nunca commite senhas/secrets

3. **HTTPS:**
   - Use sempre SSL/TLS em produção
   - Configure certificados SSL

4. **Firewall:**
   - Configure firewall no servidor
   - Permita apenas portas necessárias (80, 443)

## 🔧 Configurações Pós-Deploy

1. **DNS:**
   - Configure registros A para seu servidor
   - Configure registros CNAME para www

2. **Email:**
   - Configure SMTP em `/admin/settings`
   - Teste envio de emails

3. **Analytics (Opcional):**
   - Google Analytics
   - Microsoft Clarity

4. **Monitoramento:**
   - Uptime monitoring (UptimeRobot, etc.)
   - Error tracking (Sentry, etc.)

## 📊 Performance

### Otimizações:

1. **Imagens:**
   - Use formatos modernos (WebP)
   - Otimize todas as imagens
   - Use Next.js Image component

2. **Cache:**
   - Configure CDN (Cloudflare, etc.)
   - Cache de assets estáticos

3. **Compression:**
   - Ative Gzip/Brotli no servidor

## 🆘 Troubleshooting

### Erro de Build:

```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

### Porta já em uso:

```bash
# Mudar porta
PORT=3001 npm start
```

### PM2 não inicia:

```bash
pm2 delete all
pm2 start npm --name "dalodur-website" -- start
```

## 📞 Suporte

Para questões sobre deploy:
- Email: geral@dalodursolutions.com
- Tel: +244 939 166 871
