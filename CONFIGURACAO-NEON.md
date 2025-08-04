# 🔗 Configuração Completa Neon.tech → Netlify

## 📋 Checklist de Configuração

### ✅ 1. Connection String do Neon
Sua URL deve ter este formato:
```
postgresql://username:password@ep-xyz-123.us-east-1.aws.neon.tech/database?sslmode=require
```

**Onde encontrar:**
- Dashboard do Neon → seu projeto → "Connection Details"
- Ou na página inicial após criar o projeto

### ✅ 2. Variáveis no Netlify
Vá em: **Netlify Dashboard → Site Settings → Environment Variables**

Adicione exatamente estas 3 variáveis:

```bash
DATABASE_URL="postgresql://seu-user:sua-senha@ep-xyz.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="https://medclin.netlify.app"
```

### ✅ 3. Gerar NEXTAUTH_SECRET
1. Acesse: https://generate-secret.vercel.app/32
2. Copie a chave gerada
3. Use como valor da variável `NEXTAUTH_SECRET`

### ✅ 4. Configurar NEXTAUTH_URL
Use exatamente: `https://medclin.netlify.app`
(substitua por sua URL do Netlify se diferente)

## 🚀 Teste Local (Opcional)

Se quiser testar localmente antes do deploy:

```powershell
# Configure a URL do Neon localmente
$env:DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/db?sslmode=require"

# Execute o setup do banco
npm run db:setup

# Inicie o servidor local
npm run dev
```

## 🔍 Verificação

### Após configurar no Netlify:
1. **Aguarde rebuild** (3-5 minutos)
2. **Acesse**: https://medclin.netlify.app/status
3. **Verifique**: Todas as variáveis devem estar ✅
4. **Teste**: https://medclin.netlify.app

### Se tudo estiver OK:
- ✅ Site carrega sem erro 500
- ✅ Página de status mostra tudo verde
- ✅ Você pode fazer login
- ✅ Dashboard funciona

## 🆘 Problemas Comuns

### Erro de SSL
Se der erro de conexão SSL, certifique-se que sua URL termina com:
```
?sslmode=require
```

### Erro de Formato
A URL deve começar com `postgresql://` (não `postgres://`)

### Erro de Aspas
No Netlify, não use aspas extras. Cole apenas:
```
postgresql://user:pass@host/db?sslmode=require
```

---

**🎯 Próximo passo: Configure as 3 variáveis no Netlify!**
