# 🚀 Configuração Rápida com Neon.tech

**Use este guia se o Prisma Postgres no Netlify der erro "Failed to save team configuration"**

## Por que Neon.tech?

- ✅ **Gratuito**: 500MB de dados
- ✅ **PostgreSQL completo**: 100% compatível
- ✅ **Sem configuração**: Pronto em 2 minutos
- ✅ **Serverless**: Escala automaticamente
- ✅ **Backup automático**: Incluído

## 📋 Passo a Passo

### 1. Criar Conta no Neon
1. Acesse: https://neon.tech
2. Clique em **"Sign up"**
3. Use sua conta do **GitHub** (mais rápido)
4. Confirme o email se necessário

### 2. Criar Projeto
1. Clique em **"Create Project"**
2. Nome: `uniclinica-db`
3. Region: `US East (Ohio)` (mais próximo do Netlify)
4. PostgreSQL version: `16` (mais recente)
5. Clique em **"Create Project"**

### 3. Obter Connection String
Após criar, você verá uma tela com:
```
Database URL (Connection String):
postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/dbname?sslmode=require
```

**📋 COPIE esta URL completa!**

### 4. Configurar no Netlify
1. Vá no **Netlify Dashboard**
2. **Site Settings** → **Environment Variables**
3. Adicione:
   ```
   DATABASE_URL = "cola-a-url-do-neon-aqui"
   NEXTAUTH_SECRET = "gere-em-generate-secret.vercel.app/32"
   NEXTAUTH_URL = "https://medclin.netlify.app"
   ```

### 5. Testar Localmente (Opcional)
```bash
# Configure a URL no seu ambiente local
$env:DATABASE_URL="sua-url-do-neon"

# Execute o setup
npm run db:setup

# Verifique se funcionou
npm run db:studio
```

## 🔍 Verificação

### No Neon Dashboard
- ✅ Projeto criado
- ✅ Database rodando
- ✅ Connection string copiada

### No Netlify
- ✅ DATABASE_URL configurada
- ✅ NEXTAUTH_SECRET configurada
- ✅ NEXTAUTH_URL configurada

### No Site
- ✅ Acesse: https://medclin.netlify.app/status
- ✅ Todas as variáveis devem aparecer ✅
- ✅ Conexão com banco deve estar OK

## 🎯 Próximos Passos

1. **Aguarde o rebuild** do Netlify (automático)
2. **Teste o site** em alguns minutos
3. **Faça login** no sistema
4. **Explore os módulos** médicos

## 🆘 Troubleshooting

### Erro de SSL
Se der erro de SSL, adicione `?sslmode=require` no final da URL

### Erro de Timeout
O Neon hiberna após inatividade. Primeiro acesso pode demorar ~5 segundos

### Erro de Permissões
Verifique se copiou a URL completa com username:password

---

**✨ Em 5 minutos você terá um banco PostgreSQL profissional funcionando!** 🏥🚀
