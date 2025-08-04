# Script para instalar Prisma Postgres via Netlify CLI
# Execute este script se a interface web não funcionar

echo "🔧 Instalando Prisma Postgres via Netlify CLI..."
echo "================================================="

# Verificar se Netlify CLI está instalado
if (!(Get-Command "netlify" -ErrorAction SilentlyContinue)) {
    echo "📦 Instalando Netlify CLI..."
    npm install -g netlify-cli
}

# Login no Netlify
echo "🔑 Fazendo login no Netlify..."
netlify login

# Listar sites para verificar qual usar
echo "📋 Seus sites no Netlify:"
netlify sites:list

# Prompt para o site ID
$siteId = Read-Host "📝 Digite o Site ID do seu projeto (da lista acima)"

# Conectar ao site
echo "🔗 Conectando ao site..."
netlify link --id $siteId

# Tentar instalar extensão Prisma Postgres
echo "🐘 Instalando Prisma Postgres..."
try {
    netlify addons:create prisma-postgres
    echo "✅ Prisma Postgres instalado com sucesso!"
    
    # Listar addons para confirmar
    echo "📋 Extensões instaladas:"
    netlify addons:list
    
    echo ""
    echo "🎉 Sucesso! Agora configure as variáveis:"
    echo "1. Vá no Dashboard do Netlify"
    echo "2. Site Settings → Environment Variables"
    echo "3. A DATABASE_URL deve estar disponível automaticamente"
    echo "4. Adicione NEXTAUTH_SECRET e NEXTAUTH_URL"
    
} catch {
    echo "❌ Erro ao instalar Prisma Postgres via CLI"
    echo "💡 Tente as soluções alternativas:"
    echo "1. Verificar permissões de admin"
    echo "2. Tentar em modo incógnito"
    echo "3. Usar Prisma Accelerate como alternativa"
}

echo ""
echo "📚 Documentação disponível:"
echo "- PRISMA-POSTGRES-TROUBLESHOOTING.md"
echo "- CONFIGURACAO-NEON.md (alternativa)"
echo "- DEPLOY.md (guia completo)"
