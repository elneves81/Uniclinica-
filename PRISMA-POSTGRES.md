# 🐘 Configuração Prisma Postgres no Netlify

Este guia explica como configurar o banco PostgreSQL usando a extensão oficial Prisma Postgres do Netlify.

## 🚀 Vantagens do Prisma Postgres

- ✅ **Totalmente gerenciado** pelo Netlify
- ✅ **Zero configuração** de infraestrutura
- ✅ **Backup automático** incluído
- ✅ **Escala automaticamente** conforme uso
- ✅ **Integração nativa** com Netlify
- ✅ **SSL por padrão** (seguro)

## 📋 Passo a Passo

### 1. Configurar a Extensão
1. Acesse o **Netlify Dashboard**
2. Vá em **Extensions** → **Prisma Postgres**
3. Clique em **Add extension**
4. Configure:
   - **Project**: `uniclinicamed`
   - **Production environment**: `Development`
   - **Preview environment**: `Development`
5. Clique em **Save**

### 2. Obter a DATABASE_URL
Após salvar, você receberá uma URL similar a:
```
postgresql://username:password@host:5432/database
```

### 3. Configurar no Netlify
1. Vá em **Site settings** → **Environment variables**
2. Adicione a variável:
   ```
   DATABASE_URL = "sua-url-do-prisma-postgres"
   ```

### 4. Configurar Localmente (Opcional)
Se quiser testar localmente com o mesmo banco:
```bash
# Windows (PowerShell)
$env:DATABASE_URL="sua-url-do-prisma-postgres"
npm run db:setup

# Linux/Mac
export DATABASE_URL="sua-url-do-prisma-postgres"
npm run db:setup
```

## 🔧 Scripts Disponíveis

```bash
# Configurar banco do zero
npm run db:setup

# Aplicar mudanças no schema
npm run db:push

# Abrir interface visual do banco
npm run db:studio

# Configuração completa (Windows)
npm run netlify:setup
```

## 🗄️ Schema do Banco

O sistema Uniclínica usa um schema completo com:

- **Usuários e Autenticação**
- **Médicos e Pacientes**
- **Agenda e Consultas**
- **Prontuários Eletrônicos**
- **Módulos de Especialidades**:
  - Clínica Geral
  - Pediatria
  - Dermatologia
  - Ginecologia

## 🔍 Verificação

Após configurar, acesse:
- **Site principal**: https://seu-site.netlify.app
- **Status do sistema**: https://seu-site.netlify.app/status
- **Prisma Studio**: `npm run db:studio`

## 🚨 Troubleshooting

### Erro de Conexão
```
Error: P1001: Can't reach database server
```
**Solução**: Verifique se a `DATABASE_URL` está correta

### Erro de Schema
```
Error: P3009: Prisma schema validation failed
```
**Solução**: Execute `npm run db:push` para sincronizar

### Erro de Permissões
```
Error: P3014: The database could not be created
```
**Solução**: Verifique se o usuário tem permissões adequadas

## 📊 Monitoramento

O Prisma Postgres inclui:
- **Métricas de performance**
- **Logs de queries**
- **Alertas automáticos**
- **Backup diário**

---

**✨ Seu banco PostgreSQL está pronto para produção!** 🏥🐘
