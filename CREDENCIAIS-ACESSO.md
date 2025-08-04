# 🏥 Sistema Uniclínica - Credenciais de Acesso

## 🌐 Acesso ao Sistema

**URL do Sistema:** https://seu-site.netlify.app (substitua pela sua URL do Netlify)

## 👤 Credenciais do Administrador

**Email:** admin@uniclinica.com
**Senha:** admin123

## 🔐 Primeiro Acesso

1. Acesse a URL do seu sistema no Netlify
2. Clique em "Login" ou vá para `/auth/signin`
3. Use as credenciais acima
4. **IMPORTANTE:** Altere a senha após o primeiro login!

## 📱 Páginas Disponíveis

### 🏠 **Área Principal**

- `/` - Dashboard principal com fila de pacientes
- `/auth/signin` - Página de login
- `/auth/register` - Registro de novos usuários

### 👥 **Gestão de Pacientes**

- `/busca-usuarios` - Busca e gerenciamento de usuários
- `/pacientes` - Cadastro de pacientes
- `/prontuario/[id]` - Sistema completo de prontuário médico

### 📅 **Agendamento e Atendimento**

- `/agenda` - Sistema de agendamento médico
- `/fila-atendimento` - Fila de atendimento
- `/recepcao` - Área da recepção

### 🩺 **Especialidades Médicas**

- `/clinica-geral` - Módulo de Clínica Geral
- `/especialidades/dermatologia` - Dermatologia
- `/especialidades/pediatria` - Pediatria  
- `/especialidades/ginecologia` - Ginecologia

### 💰 **Financeiro e Relatórios**

- `/financeiro` - Gestão financeira
- `/relatorios` - Relatórios do sistema
- `/prontuarios` - Histórico de prontuários

### ⚙️ **Sistema**

- `/status` - Status do sistema

## 🛠️ Próximos Passos

1. **Alterar senha do administrador**
2. **Criar outros usuários médicos**
3. **Configurar dados da clínica**
4. **Testar módulos implementados**

## ⚠️ Segurança

- Sempre use senhas fortes
- Não compartilhe as credenciais
- Monitore os logs de acesso
- Faça backup dos dados regularmente

---

**Sistema desenvolvido com:**

- Next.js 15 + TypeScript
- Prisma + PostgreSQL (Prisma Accelerate)
- NextAuth.js
- Tailwind CSS
- Netlify Deploy
