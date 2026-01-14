# 🔧 COMO VER AS MUDANÇAS - Troubleshooting

## ✅ As mudanças ESTÃO no código!

Verifiquei e confirmei que **TODAS as mudanças da v2.0 estão implementadas** no ZIP.

---

## 🚨 IMPORTANTE - Siga EXATAMENTE estes passos:

### 1️⃣ Limpar Completamente o Projeto Antigo

```bash
# APAGAR TUDO do projeto anterior (exceto suas imagens se tiver)
rm -rf dalodur-website

# Se estiver no Windows:
# Deletar a pasta dalodur-website completamente
```

---

### 2️⃣ Descompactar o Novo ZIP

```bash
# Descompactar o ZIP NOVO
unzip dalodur-website-v2.0-FINAL.zip

# Entrar na pasta
cd dalodur-website
```

---

### 3️⃣ Limpar Cache e Reinstalar TUDO

```bash
# IMPORTANTE: Limpar completamente
rm -rf node_modules
rm -rf .next
rm -f package-lock.json

# Instalar dependências do ZERO
npm install
```

---

### 4️⃣ Iniciar Servidor

```bash
# Iniciar em modo desenvolvimento
npm run dev
```

---

### 5️⃣ Limpar Cache do Navegador

**MUITO IMPORTANTE!**

- **Chrome/Edge:** `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
- **Firefox:** `Ctrl + F5`
- Ou abra em aba anônima/privada

---

## ✅ Como Verificar Cada Mudança

### 1. Logo Grande (h-20)
**Onde ver:** http://localhost:3000

**O que esperar:**
- Logo GRANDE no topo (80px de altura)
- Usando `logo-full.svg`

**Como confirmar:**
- Inspecionar elemento (F12)
- Ver se tem `h-20` na classe
- Ver se src é `/logo-full.svg`

---

### 2. Admin Sem Menu
**Onde ver:** http://localhost:3000/admin/login

**O que esperar:**
- Login: admin / admin123
- Após login, NÃO deve ter menu "Home, Sobre, Serviços, Contato"
- NÃO deve ter footer

**Como confirmar:**
- Fazer login
- Olhar o topo da página
- Não deve ter o menu normal do site

---

### 3. Upload de Imagens
**Onde ver:** http://localhost:3000/admin/slides

**O que esperar:**
- Botão "Novo Slide"
- Ao clicar, ver campo "Escolher arquivo"
- Poder fazer upload de JPG/PNG/WEBP
- Ver preview da imagem

**Como confirmar:**
- Login no admin
- Ir em "Gerenciar Slides"
- Clicar "Novo Slide"
- Procurar campo de upload de arquivo

---

### 4. Mapa Google nas Settings
**Onde ver:** http://localhost:3000/admin/settings

**O que esperar:**
- Role para baixo
- Ver seção "Mapa Google - Página de Contatos"
- Campos para ativar mapa e colar URL

**Como confirmar:**
- Login no admin
- Ir em "Configurações"
- Rolar até o final
- Ver seção do mapa Google

---

### 5. Slider Corrigido
**Onde ver:** http://localhost:3000

**O que esperar:**
- Banner/slider com gradiente bonito
- Se não houver slides, mostra mensagem padrão
- Se tiver slides, mostra eles

**Como confirmar:**
- Abrir página inicial
- Ver o banner/slider no topo

---

## 🔍 Verificação Técnica

### Conferir Arquivos Específicos:

```bash
# 1. Verificar se API de upload existe
ls -la app/api/admin/upload/route.ts
# Deve mostrar o arquivo

# 2. Verificar se layout admin existe
ls -la app/admin/layout.tsx
# Deve mostrar o arquivo

# 3. Verificar logo no Header
grep "logo-full.svg" components/Header.tsx
# Deve mostrar linhas com logo-full.svg

# 4. Verificar mapa no contato
grep "mapConfig" app/contato/page.tsx
# Deve mostrar linhas com mapConfig

# 5. Verificar upload em slides
grep "handleImageUpload" app/admin/slides/page.tsx
# Deve mostrar a função de upload
```

---

## 🐛 Problemas Comuns

### "Não vejo o campo de upload"
**Solução:**
1. Limpar cache: `rm -rf .next node_modules`
2. Reinstalar: `npm install`
3. Reiniciar: `npm run dev`
4. Limpar cache do navegador (Ctrl+Shift+R)

### "Admin ainda tem menu do site"
**Solução:**
1. Verificar se arquivo existe: `ls app/admin/layout.tsx`
2. Se não existir, re-descompactar o ZIP
3. Limpar cache e reiniciar

### "Logo continua pequeno"
**Solução:**
1. Limpar cache do navegador (CTRL+SHIFT+R)
2. Inspecionar elemento (F12)
3. Ver se está carregando `/logo-full.svg`
4. Ver se tem classe `h-20`

### "Mapa não aparece nas settings"
**Solução:**
1. Verificar se está na última versão: `grep mapEnabled data/email-config.json`
2. Deve mostrar linha com mapEnabled
3. Se não, re-descompactar o ZIP

---

## 📋 Checklist de Verificação

Execute este checklist:

```bash
# 1. Limpar tudo
[ ] rm -rf node_modules .next package-lock.json

# 2. Reinstalar
[ ] npm install

# 3. Verificar arquivos
[ ] ls app/api/admin/upload/route.ts          # Deve existir
[ ] ls app/admin/layout.tsx                   # Deve existir
[ ] grep "logo-full.svg" components/Header.tsx # Deve aparecer
[ ] grep "mapConfig" app/contato/page.tsx     # Deve aparecer

# 4. Iniciar
[ ] npm run dev

# 5. Testar no navegador
[ ] Limpar cache (Ctrl+Shift+R)
[ ] Testar http://localhost:3000
[ ] Testar http://localhost:3000/admin/login
```

---

## 🎯 Teste Rápido de 2 Minutos

```bash
# 1. Limpar e reinstalar
rm -rf node_modules .next package-lock.json
npm install

# 2. Iniciar
npm run dev

# 3. Abrir em aba anônima
# Chrome: Ctrl+Shift+N
# Ver: http://localhost:3000/admin/slides

# 4. Procurar campo "Escolher arquivo"
# Se aparecer = FUNCIONOU! ✅
```

---

## 📞 Se AINDA Não Funcionar

Faça isso e me envie o resultado:

```bash
# Verificar versão dos arquivos
cd dalodur-website

# 1. Verificar API upload
cat app/api/admin/upload/route.ts | head -20

# 2. Verificar layout admin
cat app/admin/layout.tsx

# 3. Verificar Header
grep -n "logo-full" components/Header.tsx

# 4. Listar estrutura
ls -R app/api/admin/
```

Me envie a saída desses comandos para eu ajudar.

---

## ✅ Confirmação Final

Se você seguiu TODOS os passos acima e:

1. ✅ Deletou projeto antigo completamente
2. ✅ Descompactou novo ZIP
3. ✅ Fez `rm -rf node_modules .next package-lock.json`
4. ✅ Fez `npm install`
5. ✅ Fez `npm run dev`
6. ✅ Limpou cache do navegador (Ctrl+Shift+R)

**Então você VAI ver todas as mudanças!**

---

## 🔥 Método Garantido (Last Resort)

Se nada funcionar, faça isso:

```bash
# 1. Apagar TUDO
rm -rf dalodur-website

# 2. Criar pasta nova
mkdir dalodur-website-novo
cd dalodur-website-novo

# 3. Descompactar dentro
unzip ../dalodur-website-v2.0-FINAL.zip
cd dalodur-website

# 4. Verificar arquivo específico
cat app/api/admin/upload/route.ts | head -5
# Deve mostrar: import { NextRequest, NextResponse }

# 5. Se mostrar, está correto!
npm install
npm run dev

# 6. Abrir aba anônita
# http://localhost:3000/admin/slides
# DEVE ter campo de upload!
```

---

**Se seguir esses passos, GARANTO que vai funcionar! 🎯**
