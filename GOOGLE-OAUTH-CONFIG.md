# 🔧 Configuração Google OAuth - Netlify

## 📋 Variáveis de Ambiente para Configurar no Netlify

Vá para o painel do Netlify → Site Settings → Environment Variables e adicione:

### 🔑 Google OAuth
```
GOOGLE_CLIENT_ID=62181412028-et0676ie196v5qm9nsmkgomrrqf31kpv.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### 🌐 NextAuth URL (Atualize com sua URL do Netlify)
```
NEXTAUTH_URL=https://SEU-SITE.netlify.app
```

## ⚙️ Configuração no Google Console

### 1. URLs Autorizadas (já deve estar configurado)
- **JavaScript origins:** `https://SEU-SITE.netlify.app`
- **Redirect URIs:** `https://SEU-SITE.netlify.app/api/auth/callback/google`

### 2. Verificar Configuração
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá para APIs & Services → Credentials
3. Clique no seu OAuth 2.0 Client ID
4. Verifique se as URLs estão corretas

## 🚀 Após Configurar

1. **Redeploy** o site no Netlify (ou aguarde o deploy automático)
2. **Teste o login** com Google
3. **Teste o login** com credenciais (admin@uniclinica.com / admin123)

## 📝 Opções de Login Disponíveis

### 👤 Login com Credenciais
- Email: admin@uniclinica.com
- Senha: admin123

### 🔍 Login com Google
- Qualquer conta Google autorizada
- Criará automaticamente um usuário no sistema

## ⚠️ Importante

- Mantenha as credenciais do Google OAuth seguras
- Não compartilhe o GOOGLE_CLIENT_SECRET
- Altere a senha do admin após primeiro acesso
- Configure as URLs de produção corretamente no Google Console
