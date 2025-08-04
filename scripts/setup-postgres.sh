#!/bin/bash

# Script para configurar o banco Prisma Postgres no Netlify
# Execute este script após obter a DATABASE_URL do Netlify

echo "🏥 Configurando Banco Uniclínica com Prisma Postgres"
echo "=================================================="

# Verificar se a DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL não encontrada!"
    echo "📋 Passos para configurar:"
    echo "1. Vá no Netlify Dashboard"
    echo "2. Extensions → Prisma Postgres"
    echo "3. Configure o projeto uniclinicamed"
    echo "4. Copie a DATABASE_URL gerada"
    echo "5. Execute: export DATABASE_URL='sua-url-aqui'"
    exit 1
fi

echo "✅ DATABASE_URL encontrada"

# Gerar cliente Prisma
echo "🔄 Gerando cliente Prisma..."
npx prisma generate

# Fazer push do schema para o banco
echo "🗄️ Criando tabelas no banco..."
npx prisma db push

# Verificar se funcionou
echo "🔍 Verificando conexão..."
npx prisma db pull --print

echo "✅ Configuração concluída!"
echo "🚀 Agora você pode fazer deploy no Netlify"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure a DATABASE_URL no Netlify (Site Settings → Environment Variables)"
echo "2. Configure NEXTAUTH_SECRET e NEXTAUTH_URL"
echo "3. Faça push do código para GitHub"
echo "4. O deploy será feito automaticamente"
