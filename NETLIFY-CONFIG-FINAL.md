# 🌐 Configuração Final - Netlify

## 📋 Variáveis de Ambiente no Netlify

Acesse: **Site Settings → Environment Variables** e configure:

### 🔑 Variáveis Obrigatórias
```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19lem9NMmFITS1IWUdrNGJ6dHJLSkYiLCJhcGlfa2V5IjoiMDFLMVRSR0gyUDY0RUZaVkFCREQ4M1NFV1IiLCJ0ZW5hbnRfaWQiOiIwN2Q2ZmY0MTU1OWM2MGNiNWI2MTQzZTY1MjUyNTc0MDUxNzBjNTE2ZWU1OWQzODQ0MTE2NDg2NzUyZTRhYzIyIiwiaW50ZXJuYWxfc2VjcmV0IjoiYmFlZGYyYTUtZmIzNi00ZDc0LWJiYjMtNTA1NTI3NDYyY2JlIn0.9sSmSt-bbCqUjGxbc6xe9_72H5UcgVNfAP2hBLsOl7M

NEXTAUTH_SECRET=your-secret-key-here

NEXTAUTH_URL=https://medclin.netlify.app

GOOGLE_CLIENT_ID=62181412028-et0676ie196v5qm9nsmkgomrrqf31kpv.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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
```

## 🔄 Comportamento Esperado

### ✅ Acesso à URL Raiz
- **URL:** `https://medclin.netlify.app`
- **Comportamento:** Redireciona automaticamente para `/auth/signin`

### ✅ Login Funcionando
- **URL:** `https://medclin.netlify.app/auth/signin`
- **Opções:** Login com credenciais OU Google OAuth

### ✅ Dashboard Protegido
- **URL:** `https://medclin.netlify.app/`
- **Comportamento:** Só acessa se estiver logado

## 🔑 Credenciais de Teste

### Login com Email/Senha
- **Email:** admin@uniclinica.com
- **Senha:** admin123

### Login com Google
- Qualquer conta Google funciona

## 🚀 Deploy

Após configurar as variáveis:
1. As mudanças serão deployadas automaticamente
2. Teste o acesso à URL raiz
3. Confirme o redirecionamento para login

## 🛠️ Diagnóstico

Se ainda redirecionar para `/status`:
- Verifique se todas as variáveis estão configuradas
- Aguarde alguns minutos após salvar as variáveis
- Force um novo deploy no Netlify
