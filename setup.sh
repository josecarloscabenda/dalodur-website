#!/bin/bash

echo "🚀 Instalando Dalodur Solutions Website..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "  1. Execute: npm run dev"
echo "  2. Acesse: http://localhost:3000"
echo "  3. Admin: http://localhost:3000/admin/login"
echo ""
echo "🔐 Credenciais admin:"
echo "  Usuário: admin"
echo "  Senha: admin123"
echo ""
echo "Pronto para começar! 🎉"
