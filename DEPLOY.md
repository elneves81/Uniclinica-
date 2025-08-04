# 🚀 Deploy Uniclínica no Netlify

Este guia explica como fazer o deploy do sistema Uniclínica no Netlify com integração do Prisma.

## 📋 Pré-requisitos

1. **Conta no Netlify**: https://netlify.com
2. **Banco PostgreSQL**: Use o Prisma Accelerate (já configurado)
3. **Repositório GitHub**: Código já está no GitHub

## 🔧 Configuração no Netlify

### 1. Conectar Repositório
1. Acesse o **Netlify Dashboard**
2. Clique em **"New site from Git"**
3. Conecte com **GitHub**
4. Selecione o repositório: `elneves81/Uniclinica-`

### 2. Configurações de Build
```
Build command: npm run build
Publish directory: .next
```

### 3. Variáveis de Ambiente
No **Netlify Dashboard**, vá em **Site settings > Environment variables** e adicione:

```bash
# Database (obrigatório)
DATABASE_URL="sua-prisma-accelerate-url"

# NextAuth (obrigatório)
NEXTAUTH_SECRET="gere-uma-chave-secreta-forte"
NEXTAUTH_URL="https://seu-site.netlify.app"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Email (opcional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="seu-email@gmail.com"
EMAIL_SERVER_PASSWORD="sua-senha-do-app"
EMAIL_FROM="seu-email@gmail.com"
```

### 4. Plugin do Next.js
O arquivo `netlify.toml` já está configurado com:
- Plugin oficial do Netlify para Next.js
- Configurações de build otimizadas
- Headers de segurança

## 🗃️ Configuração do Banco de Dados

### Opção 1: Prisma Postgres no Netlify (Recomendado) ⭐
1. **Instale a extensão**: Vá em Extensions → Prisma Postgres
2. **Configure o projeto**: Selecione `uniclinicamed`
3. **Environments**: Use `Development` para ambos
4. **Clique em Save**: O banco será criado automaticamente
5. **Copie a DATABASE_URL**: Será gerada automaticamente

⚠️ **Se der erro "Failed to save team configuration"**:
- Verifique permissões de admin no projeto
- Tente modo incógnito do navegador
- Use a alternativa Neon.tech abaixo

### Opção 2: Neon.tech (Alternativa Fácil) 🚀
**Se o Prisma Postgres der erro, use esta opção:**

1. **Acesse**: https://neon.tech
2. **Crie conta gratuita** (500MB grátis)
3. **Crie novo projeto**: `uniclinica-db`
4. **Copie a Connection String** que aparece
5. **Use no Netlify** como `DATABASE_URL`

### Opção 3: Supabase (Alternativa Robusta) 💪
1. **Acesse**: https://supabase.com
2. **Crie projeto**: `uniclinica`
3. **Vá em Settings** → **Database**
4. **Copie Connection String** (modo URI)
5. **Configure no Netlify**

## 🚀 Processo de Deploy

### 1. Deploy Automático
1. Faça push para o repositório GitHub
2. Netlify detecta automaticamente as mudanças
3. Build é executado automaticamente
4. Site é atualizado

### 2. Comandos de Build Executados
```bash
npm install                 # Instala dependências
prisma generate            # Gera cliente Prisma
next build                 # Build do Next.js
```

### 3. Verificação de Deploy
- ✅ Build concluído sem erros
- ✅ Site acessível
- ✅ Banco de dados conectado
- ✅ Autenticação funcionando

## 🔧 Troubleshooting

### Erro de Build
```bash
# Se houver erro no Prisma
npx prisma generate

# Se houver erro de dependências
npm ci
```

### Erro 500 (Internal Server Error)
Se você ver:
```
GET https://seu-site.netlify.app/ 500 (Internal Server Error)
Server Components render error
```

**Causa**: Variáveis de ambiente não configuradas ou banco inacessível
**Solução**:
1. ✅ Acesse `https://seu-site.netlify.app/status` para diagnóstico
2. ✅ Configure todas as variáveis obrigatórias no Netlify
3. ✅ Verifique se o Prisma Accelerate está ativo
4. ✅ Use `https://generate-secret.vercel.app/32` para NEXTAUTH_SECRET

**Diagnóstico rápido**: Visite `/status` no seu site para ver o que está faltando.

### Erro 404 de JavaScript/CSS (MIME type 'text/html')
Se você ver erros como:
```
Failed to load resource: the server responded with a status of 404
Refused to execute script because its MIME type ('text/html') is not executable
```

**Causa**: Configuração incorreta de redirects no Netlify
**Solução**: 
1. ✅ Use apenas o plugin oficial `@netlify/plugin-nextjs`
2. ✅ Remova redirects manuais no `netlify.toml`
3. ✅ Não use `output: 'standalone'` no `next.config.ts`
4. ✅ Evite arquivos `_redirects` no diretório `public`

### Erro de Banco de Dados
1. Verifique a `DATABASE_URL` nas variáveis de ambiente
2. Confirme se o Prisma Accelerate está ativo
3. Execute `npx prisma db push` localmente se necessário

### Erro de Autenticação
1. Configure `NEXTAUTH_URL` com a URL do Netlify
2. Gere nova `NEXTAUTH_SECRET`: https://generate-secret.vercel.app/32
3. Configure callbacks de OAuth se necessário

## 🔒 Segurança em Produção

### Headers Configurados
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin

### Variáveis Sensíveis
- ✅ Todas as secrets em variáveis de ambiente
- ✅ `.env` no `.gitignore`
- ✅ Banco de dados com SSL

## 📊 Monitoramento

### Netlify Analytics
- Tráfego do site
- Performance
- Logs de build
- Funções serverless

### Prisma Insights
- Queries de banco
- Performance
- Cache hits
- Conexões ativas

## 🔄 Atualizações

### Deploy Contínuo
1. Faça mudanças no código
2. Push para GitHub
3. Deploy automático no Netlify
4. Zero downtime

### Rollback
1. Acesse Netlify Dashboard
2. Vá em "Deploys"
3. Clique em "Publish deploy" na versão anterior

---

**✨ Seu sistema Uniclínica está pronto para produção no Netlify!** 🏥🚀
