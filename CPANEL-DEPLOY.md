# 🚀 Deploy no cPanel com Node.js

## Pré-requisitos

- Acesso ao cPanel
- Funcionalidade "Setup Node.js App" habilitada
- Acesso SSH (opcional, mas recomendado)
- Domínio configurado

## 📋 Passo a Passo

### 1. Preparar o Projeto Localmente

```bash
# 1. Fazer build do projeto
cd dalodur-website
npm run build

# 2. Verificar se o build foi bem-sucedido
# Deve criar a pasta .next/
```

### 2. Fazer Upload dos Arquivos

**Via File Manager do cPanel:**

1. Acesse cPanel → File Manager
2. Navegue até a pasta do domínio (geralmente `public_html` ou `domains/seudominio.com`)
3. Crie uma pasta chamada `dalodur-website` (ou outro nome de sua escolha)
4. Faça upload de TODOS os arquivos do projeto:
   - ✅ `.next/` (pasta de build)
   - ✅ `public/`
   - ✅ `data/`
   - ✅ `node_modules/` (ou reinstalar no servidor)
   - ✅ `package.json`
   - ✅ `next.config.js`
   - ✅ Todos os outros arquivos

**Via FTP/SFTP (Recomendado):**

Use FileZilla ou WinSCP para fazer upload mais rápido.

### 3. Configurar Node.js App no cPanel

1. **Acesse:** cPanel → "Setup Node.js App"

2. **Clique em:** "Create Application"

3. **Preencha os campos:**
   - **Node.js version:** 18.x ou superior (escolha a mais recente disponível)
   - **Application mode:** Production
   - **Application root:** `/home/seuusuario/dalodur-website` (caminho completo)
   - **Application URL:** seudominio.com (ou subdomínio)
   - **Application startup file:** `node_modules/next/dist/bin/next`
   - **Arguments:** `start`
   - **Environment variables:** (deixe vazio por enquanto)

4. **Clique em:** "Create"

### 4. Instalar Dependências

**Opção A: Via interface cPanel**

1. Na lista de aplicações Node.js, clique em "Edit" na sua aplicação
2. Role até "Detected configuration files"
3. Clique em "Run NPM Install"
4. Aguarde a instalação completar

**Opção B: Via SSH (Mais rápido)**

```bash
# Conectar via SSH
ssh usuario@seudominio.com

# Navegar até a pasta do projeto
cd dalodur-website

# Instalar dependências
npm install --production

# Fazer build (se não fez localmente)
npm run build
```

### 5. Configurar Variáveis de Ambiente (Opcional)

Se precisar configurar variáveis de ambiente:

1. Na edição da aplicação Node.js
2. Em "Environment variables", adicione:
   ```
   NODE_ENV=production
   PORT=3000
   ```

### 6. Iniciar a Aplicação

1. Na lista de aplicações, clique no ícone de "Start" (▶️)
2. Aguarde alguns segundos
3. Verifique se o status mudou para "Running"

### 7. Configurar Domínio/Subdomínio

**Para domínio principal:**

1. A aplicação já deve estar acessível em `seudominio.com`

**Para subdomínio:**

1. cPanel → Subdomains
2. Crie subdomínio (ex: `app.seudominio.com`)
3. Document Root: aponte para a mesma pasta
4. Volte ao Setup Node.js App
5. Edite a aplicação e altere "Application URL" para o subdomínio

### 8. Configurar .htaccess (se necessário)

Se o domínio não estiver direcionando corretamente, crie/edite `.htaccess`:

```apache
# .htaccess na raiz do domínio

RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule .* ws://127.0.0.1:3000%{REQUEST_URI} [P]

RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

### 9. Configurar SSL (HTTPS)

1. cPanel → SSL/TLS Status
2. Selecione seu domínio
3. Clique em "Run AutoSSL"
4. Aguarde a instalação do certificado

OU

Use Let's Encrypt:
1. cPanel → SSL/TLS
2. Manage SSL Sites
3. AutoSSL ou Let's Encrypt

### 10. Verificar Funcionamento

1. Acesse: `https://seudominio.com`
2. Teste todas as páginas
3. Teste o formulário de contato
4. Acesse `/admin/login` e faça login

## 🔧 Gerenciamento da Aplicação

### Reiniciar Aplicação

1. cPanel → Setup Node.js App
2. Clique no ícone de "Restart" (🔄)

### Parar Aplicação

1. Clique no ícone de "Stop" (⏹️)

### Ver Logs

1. Clique em "Edit" na aplicação
2. Role até "Logs"
3. Visualize os logs de erro e saída

### Atualizar Aplicação

```bash
# Via SSH
cd dalodur-website

# Fazer backup
cp -r data/ data_backup/

# Atualizar código (git pull ou upload de arquivos)
git pull origin main

# Instalar novas dependências
npm install

# Rebuild
npm run build

# Reiniciar via cPanel ou:
touch tmp/restart.txt
```

## 📁 Estrutura de Arquivos no Servidor

```
/home/usuario/
├── public_html/              # ou domains/seudominio.com/
│   └── dalodur-website/      # Pasta da aplicação
│       ├── .next/            # Build do Next.js
│       ├── app/              # Código fonte
│       ├── components/
│       ├── data/             # IMPORTANTE: Fazer backup!
│       ├── public/
│       ├── node_modules/
│       ├── package.json
│       ├── next.config.js
│       └── ...outros arquivos
```

## ⚠️ Problemas Comuns

### 1. "Application failed to start"

**Soluções:**
- Verifique se executou `npm install`
- Verifique se fez `npm run build`
- Verifique os logs da aplicação
- Verifique permissões dos arquivos (755 para pastas, 644 para arquivos)

### 2. "502 Bad Gateway"

**Soluções:**
- A aplicação não está rodando - reinicie via cPanel
- Porta incorreta - verifique configurações
- Verifique logs de erro

### 3. Mudanças não aparecem

**Soluções:**
```bash
# Limpar cache do Next.js
rm -rf .next/
npm run build
# Reiniciar aplicação no cPanel
```

### 4. Erro de permissões

```bash
# Via SSH, ajustar permissões
chmod -R 755 dalodur-website/
chmod -R 644 dalodur-website/data/*.json
```

### 5. Node.js version muito antiga

- Peça ao suporte do hosting para atualizar
- Ou migre para outro servidor

## 💾 Backup Automático

Crie um script de backup via cron:

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/usuario/backups"
APP_DIR="/home/usuario/dalodur-website"

mkdir -p $BACKUP_DIR

# Backup dos dados
tar -czf $BACKUP_DIR/dalodur_data_$DATE.tar.gz $APP_DIR/data/

# Manter apenas últimos 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs rm -f
```

Configure no cPanel → Cron Jobs:
```
0 2 * * * /home/usuario/backup.sh
```

## 🔒 Segurança

1. **Altere senha admin** antes do deploy
2. **Configure firewall** do servidor
3. **Use HTTPS** sempre
4. **Mantenha Node.js atualizado**
5. **Faça backups regulares** da pasta `data/`
6. **Monitore logs** regularmente

## 📊 Monitoramento

Configure notificações:
- Uptime monitoring (UptimeRobot, etc.)
- Error tracking (Sentry, opcional)
- Analytics (Google Analytics, opcional)

## 🆘 Suporte

Se tiver problemas:

1. Verifique logs: cPanel → Setup Node.js App → Logs
2. Verifique error logs: cPanel → Errors
3. Contate suporte do hosting se necessário
4. Entre em contato: geral@dalodursolutions.com

## 📝 Checklist de Deploy

- [ ] Build local bem-sucedido (`npm run build`)
- [ ] Upload de todos os arquivos
- [ ] Node.js App criado no cPanel
- [ ] Dependências instaladas (`npm install`)
- [ ] Variáveis de ambiente configuradas
- [ ] Aplicação iniciada
- [ ] Domínio/subdomínio configurado
- [ ] SSL configurado
- [ ] Senha admin alterada
- [ ] Teste completo do site
- [ ] Formulário de contato testado
- [ ] Admin testado
- [ ] Backup automático configurado

---

**Pronto! Seu site está no ar! 🎉**
