# Script PowerShell para configurar o banco Prisma Postgres no Netlify
# Execute após obter a DATABASE_URL do Netlify

Write-Host "🏥 Configurando Banco Uniclínica com Prisma Postgres" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Verificar se a DATABASE_URL está configurada
if (-not $env:DATABASE_URL) {
    Write-Host "❌ DATABASE_URL não encontrada!" -ForegroundColor Red
    Write-Host "📋 Passos para configurar:" -ForegroundColor Yellow
    Write-Host "1. Vá no Netlify Dashboard"
    Write-Host "2. Extensions → Prisma Postgres"
    Write-Host "3. Configure o projeto uniclinicamed"
    Write-Host "4. Copie a DATABASE_URL gerada"
    Write-Host "5. Execute: `$env:DATABASE_URL='sua-url-aqui'"
    exit 1
}

Write-Host "✅ DATABASE_URL encontrada" -ForegroundColor Green

# Gerar cliente Prisma
Write-Host "🔄 Gerando cliente Prisma..." -ForegroundColor Blue
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar cliente Prisma" -ForegroundColor Red
    exit 1
}

# Fazer push do schema para o banco
Write-Host "🗄️ Criando tabelas no banco..." -ForegroundColor Blue
npx prisma db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao criar tabelas" -ForegroundColor Red
    exit 1
}

# Verificar se funcionou
Write-Host "🔍 Verificando conexão..." -ForegroundColor Blue
npx prisma studio --browser none --port 5555 &
Start-Sleep 2
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Configuração concluída!" -ForegroundColor Green
Write-Host "🚀 Agora você pode fazer deploy no Netlify" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Configure a DATABASE_URL no Netlify (Site Settings → Environment Variables)"
Write-Host "2. Configure NEXTAUTH_SECRET e NEXTAUTH_URL"
Write-Host "3. Faça push do código para GitHub"
Write-Host "4. O deploy será feito automaticamente"
