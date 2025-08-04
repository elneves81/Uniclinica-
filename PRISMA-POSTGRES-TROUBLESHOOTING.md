# 🔧 Troubleshooting Prisma Postgres no Netlify

## 🚨 Erro "Failed to save team configuration"

### ✅ Verificações Obrigatórias

#### 1. Permissões no Netlify
- [ ] Você é **Owner** ou **Admin** do projeto?
- [ ] Não é apenas **Collaborator**?
- [ ] O projeto não está em um **Team Plan** restrito?

**Como verificar:**
1. Netlify Dashboard → Seu projeto
2. Settings → General → **Owner**
3. Se não for você, peça ao owner para:
   - Te promover a Admin
   - Ou instalar a extensão para você

#### 2. Problemas de Browser
- [ ] Tente **modo incógnito/privado**
- [ ] Desabilite **extensões do browser** temporariamente
- [ ] Limpe **cache e cookies** do Netlify
- [ ] Tente outro **navegador** (Chrome, Firefox, Edge)

#### 3. Problemas de Rede
- [ ] Desabilite **VPN** se estiver usando
- [ ] Verifique **firewall/antivírus**
- [ ] Tente **conexão móvel** (hotspot do celular)

### 🔄 Soluções Alternativas

#### Solução 1: Reinstalar Extensão
1. Vá em **Extensions** → **Prisma Postgres**
2. Se estiver instalada, clique **"Remove"**
3. Aguarde 30 segundos
4. Clique **"Add extension"** novamente
5. Reconfigure tudo

#### Solução 2: Usar API do Netlify
Se você tem acesso ao CLI do Netlify:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Listar sites
netlify sites:list

# Configurar extensão via CLI
netlify addons:create prisma-postgres
```

#### Solução 3: Conta/Projeto Novo
Como último recurso:
1. Crie novo **site no Netlify** com mesmo repositório
2. Use nome diferente: `uniclinica-v2`
3. Tente instalar extensão no projeto novo
4. Delete o projeto antigo depois

### 🎯 Configuração Correta

Quando conseguir salvar, use estas configurações:

**Project Name:** `uniclinicamed` (ou crie novo como `uniclinica-prod`)
**Production Environment:** `Production` (não Development)
**Preview Environment:** `Development`

### 📞 Suporte Oficial

Se nada funcionar:
1. **Netlify Support**: https://answers.netlify.com
2. **Discord da Netlify**: Comunidade ativa
3. **GitHub Issues**: https://github.com/netlify/netlify-cms/issues

---

## 🚀 Alternativa: Prisma Accelerate ⭐

**✅ CONFIGURADO COM SUCESSO!**

Se o Prisma Postgres continuar falhando, você pode usar **Prisma Accelerate** que oferece funcionalidades superiores:

### 📋 Sua Configuração Atual:
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19LRmUxUGVKWFlrVWo1U0FuNko5T0QiLCJhcGlfa2V5IjoiMDFLMVYwME1ENjNaOUFQTlpUNk5ZMEZCN1ciLCJ0ZW5hbnRfaWQiOiIwN2Q2ZmY0MTU1OWM2MGNiNWI2MTQzZTY1MjUyNTc0MDUxNzBjNTE2ZWU1OWQzODQ0MTE2NDg2NzUyZTRhYzIyIiwiaW50ZXJuYWxfc2VjcmV0IjoiYmFlZGYyYTUtZmIzNi00ZDc0LWJiYjMtNTA1NTI3NDYyY2JlIn0.IikwMaG8p8IZfRQzwcFOjP1s2PQzNatYEN1F7CdS3aw
```

### 🔧 Configuração no Netlify:
1. **Site Settings** → **Environment Variables**
2. Adicione exatamente esta URL como `DATABASE_URL`

**Vantagens do Accelerate:**
- ✅ Cache global automático (muito mais rápido)
- ✅ Connection pooling inteligente
- ✅ Analytics e monitoring integrados
- ✅ Escalabilidade automática
- ✅ Compatível com qualquer PostgreSQL
- ✅ Reduz latência em até 1000x
