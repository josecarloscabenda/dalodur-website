# 🎨 Configuração do Logotipo

## 📁 Arquivos de Logo Atuais

O projeto já inclui seus logos SVG:

1. **`/public/logo_completo_dalodur.svg`** - Logo principal (versão curta)
2. **`/public/simbolo.svg`** - Logo completo (versão longa)

## 🔧 Onde o Logo é Usado

### 1. Header (Topo do Site)
**Arquivo:** `components/Header.tsx`

```tsx
// Linha ~38
<img 
  src="/logo_completo_dalodur.svg" 
  alt="Dalodur Solutions" 
  className="h-12 w-auto"
/>
```

**Para alterar:**
- Tamanho: Mude `h-12` (altura) conforme necessário
- Logo: Troque `"/logo_completo_dalodur.svg"` por outro arquivo se desejar

### 2. Footer (Rodapé)
**Arquivo:** `components/Footer.tsx`

```tsx
// Linha ~11
<img 
  src="/logo_completo_dalodur.svg" 
  alt="Dalodur Solutions" 
  className="h-12 w-auto"
/>
```

### 3. Página de Login Admin
**Arquivo:** `app/admin/login/page.tsx`

```tsx
// Linha ~32 - Atualmente usa ícone "D"
// Para usar o logo:
<img 
  src="/logo_completo_dalodur.svg" 
  alt="Dalodur Solutions" 
  className="h-16 w-auto mx-auto mb-4"
/>
```

### 4. Dashboard Admin
**Arquivo:** `app/admin/dashboard/page.tsx`

```tsx
// Linha ~68 - Atualmente usa ícone "D"
// Para usar o logo:
<img 
  src="/logo_completo_dalodur.svg" 
  alt="Dalodur Solutions" 
  className="h-10 w-auto"
/>
```

## 📝 Como Substituir o Logo

### Opção 1: Substituir o arquivo existente

Se você tem um novo logo:

1. **Prepare seu logo:**
   - Formato: SVG, PNG, ou WEBP
   - Tamanho recomendado: altura 200-300px
   - Fundo: Transparente (para melhor resultado)

2. **Substitua o arquivo:**
   ```bash
   # Coloque seu novo logo em:
   public/logo_completo_dalodur.svg
   
   # Ou se for PNG:
   public/logo.png
   ```

3. **Atualize as referências (se mudou extensão):**
   ```tsx
   // De:
   src="/logo_completo_dalodur.svg"
   
   // Para:
   src="/logo.png"
   ```

### Opção 2: Adicionar novo logo mantendo o antigo

1. Coloque seu logo com nome diferente:
   ```
   public/logo-novo.svg
   ```

2. Atualize as referências:
   ```tsx
   src="/logo-novo.svg"
   ```

## 🎨 Ajustar Tamanho do Logo

Use classes Tailwind CSS:

```tsx
{/* Pequeno - 32px */}
<img src="/logo_completo_dalodur.svg" className="h-8 w-auto" />

{/* Médio - 48px (padrão) */}
<img src="/logo_completo_dalodur.svg" className="h-12 w-auto" />

{/* Grande - 64px */}
<img src="/logo_completo_dalodur.svg" className="h-16 w-auto" />

{/* Extra Grande - 80px */}
<img src="/logo_completo_dalodur.svg" className="h-20 w-auto" />

{/* Responsivo */}
<img src="/logo_completo_dalodur.svg" className="h-8 md:h-12 lg:h-16 w-auto" />
```

## 🖼️ Favicon (Ícone do Navegador)

O favicon usa a letra "D" estilizada. Para usar seu logo:

1. **Criar favicon a partir do logo:**
   - Use ferramentas online como https://realfavicongenerator.net/
   - Upload seu logo
   - Baixe os arquivos gerados

2. **Substituir arquivos:**
   ```
   public/favicon.ico
   public/apple-touch-icon.png
   public/android-chrome-192x192.png
   public/android-chrome-512x512.png
   ```

3. **OU manter simples (apenas SVG):**
   ```bash
   # Coloque versão 32x32 do seu logo em:
   public/favicon.svg
   ```

## 🔄 Atualização Completa do Logo

Para atualizar tudo de uma vez:

```bash
# 1. Coloque seu logo em public/
cp seu-logo_completo_dalodur.svg public/logo_completo_dalodur.svg

# 2. (Opcional) Crie favicon
cp seu-logo-32x32.png public/favicon.ico

# 3. Reinicie o servidor
npm run dev

# 4. Limpe cache do navegador (Ctrl+Shift+R)
```

## 📱 Logo no Admin

Se quiser usar o logo completo no admin em vez do ícone "D":

### Admin Login:
```tsx
// app/admin/login/page.tsx
// Substitua linhas 31-35:

<img 
  src="/simbolo.svg" 
  alt="Dalodur Solutions" 
  className="h-20 w-auto mx-auto mb-4"
/>
<h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
```

### Admin Dashboard:
```tsx
// app/admin/dashboard/page.tsx
// Substitua linhas 67-76:

<img 
  src="/logo_completo_dalodur.svg" 
  alt="Dalodur Solutions" 
  className="h-10 w-auto"
/>
<div>
  <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
  <p className="text-sm text-gray-600">Dalodur Solutions Ltd</p>
</div>
```

## 🎯 Recomendações

### Para melhor resultado:

1. **Logo SVG:**
   - Vetorial, escala perfeitamente
   - Tamanho de arquivo pequeno
   - Melhor qualidade

2. **Logo PNG:**
   - Use resolução alta (2x ou 3x)
   - Fundo transparente
   - Otimize com TinyPNG

3. **Cores:**
   - Use cores da marca (#99b1bd, #2e4b74)
   - Versões: colorida e branca (para fundos escuros)

## 📊 Tamanhos Recomendados

| Uso | Tamanho Recomendado |
|-----|---------------------|
| Header/Footer | 200-300px altura |
| Favicon | 32x32px, 64x64px |
| Apple Touch Icon | 180x180px |
| Android Chrome | 192x192px, 512x512px |
| Logo Admin | 200-400px altura |

## ✅ Checklist de Logo

- [ ] Logo principal em `/public/logo_completo_dalodur.svg`
- [ ] Logo completo em `/public/simbolo.svg`
- [ ] Favicon configurado
- [ ] Header atualizado
- [ ] Footer atualizado
- [ ] Admin (login) atualizado
- [ ] Admin (dashboard) atualizado
- [ ] Testado em todos os tamanhos
- [ ] Cache do navegador limpo
- [ ] Verificado em mobile

## 🆘 Problemas Comuns

### Logo não aparece
- Verifique se o arquivo existe em `/public/`
- Verifique o caminho: `/logo_completo_dalodur.svg` (com barra inicial)
- Limpe cache do navegador (Ctrl+Shift+R)
- Verifique console do navegador (F12) para erros

### Logo muito grande/pequeno
- Ajuste classe `h-X` (h-8, h-12, h-16, etc.)
- Use `w-auto` para manter proporção

### Logo com fundo branco
- Use versão com fundo transparente
- Ou adicione `bg-primary` ao container

---

**Qualquer dúvida, consulte a documentação ou entre em contato!**
