# 🏥 Uniclínica - Sistema de Gestão Médica

Sistema completo e robusto para gestão de clínicas médicas com prontuário eletrônico, agenda, sistema financeiro e módulos especializados para diferentes especialidades médicas.

## ✨ Funcionalidades Principais

### 📊 Dashboard Completo
- Visão geral das atividades da clínica
- Estatísticas em tempo real
- Calendário integrado
- Consultas recentes e próximas

### 📋 Prontuário Eletrônico
- Prontuário digital completo
- Histórico médico detalhado
- Anexos e documentos
- Prescrições eletrônicas
- Laudos e relatórios

### 📅 Sistema de Agenda
- Calendário estilo Google
- Agendamento de consultas
- Gestão de horários médicos
- Notificações automáticas
- Envio de emails para pacientes

### 💰 Módulo Financeiro
- Controle de valores das consultas
- Gestão de pagamentos
- Relatórios financeiros
- Múltiplas formas de pagamento
- Controle de inadimplência

### 🏥 Especialidades Médicas

#### 🩺 **Clínica Médica Geral**
- Sinais vitais (pressão arterial, frequência cardíaca, temperatura)
- Controle de peso e IMC
- Histórico de doenças crônicas
- História familiar e social
- Resultados de exames laboratoriais

#### 👶 **Pediatria**
- Curvas de crescimento (peso/altura/IMC)
- Calendário vacinal completo
- Marcos do desenvolvimento
- Dados de nascimento (peso, altura, APGAR)
- Histórico alimentar
- Acompanhamento gestacional

#### 🔬 **Dermatologia**
- Dermatoscopia digital
- Mapeamento corporal completo
- Acompanhamento de lesões
- Classificação de tipos de pele (I-VI)
- Histórico familiar e pessoal
- Registro fotográfico

#### 🤱 **Ginecologia**
- Histórico menstrual completo
- Acompanhamento gestacional
- Exames ginecológicos
- Papanicolau e mamografias
- Métodos contraceptivos
- Registros obstétricos (G/P/A)

### 📊 Sistema de Relatórios
- Relatórios médicos personalizados
- Estatísticas da clínica
- Exportação em PDF
- Gráficos e dashboards
- Relatórios financeiros

### 📧 Notificações e Emails
- Confirmação de consultas
- Lembretes automáticos
- Cancelamentos e remarques
- Resultados de exames
- Comunicação com pacientes

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React para aplicações web
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Backend
- **Next.js API Routes** - API backend integrada
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **NextAuth.js** - Autenticação completa

### Infraestrutura
- **Prisma Accelerate** - Cache e aceleração de queries
- **Vercel** - Deploy e hospedagem
- **Nodemailer** - Envio de emails

### Recursos Adicionais
- **jsPDF** - Geração de relatórios PDF
- **Chart.js** - Gráficos e estatísticas
- **React Big Calendar** - Calendário avançado
- **bcryptjs** - Criptografia de senhas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Banco PostgreSQL

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/uniclinica.git
cd uniclinica
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DATABASE_URL="sua-url-do-banco"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"

# Email
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="seu-email@gmail.com"
EMAIL_SERVER_PASSWORD="sua-senha-do-app"
EMAIL_FROM="seu-email@gmail.com"
```

4. **Configure o banco de dados**
```bash
npx prisma db push
npx prisma generate
```

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## 📱 Funcionalidades por Módulo

### 👥 Gestão de Usuários
- Cadastro de médicos, recepcionistas e administradores
- Controle de acesso por perfil
- Autenticação segura
- Logs de auditoria

### 🏥 Gestão de Pacientes
- Cadastro completo de pacientes
- Histórico médico detalhado
- Documentos e anexos
- Controle de alergias e medicações

### 📋 Prontuários por Especialidade
- Templates específicos para cada especialidade
- Campos obrigatórios por protocolo médico
- Validações automáticas
- Integração com exames

### 💼 Controle Financeiro
- Valores por especialidade
- Controle de convênios
- Relatórios de faturamento
- Gestão de inadimplência

## 🔒 Segurança e Compliance

### Segurança de Dados
- Criptografia de dados sensíveis
- Backup automático
- Logs de auditoria completos
- Controle de acesso granular

### Compliance Médico
- Conformidade com CFM (Conselho Federal de Medicina)
- Adequação à LGPD
- Padrões de prontuário eletrônico
- Assinatura digital

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] Integração com laboratórios
- [ ] Telemedicina
- [ ] App mobile
- [ ] API para terceiros
- [ ] BI avançado
- [ ] Inteligência artificial para diagnósticos

### Melhorias Planejadas
- [ ] Performance otimizada
- [ ] Modo offline
- [ ] Sincronização multi-dispositivo
- [ ] Backup em nuvem
- [ ] Relatórios avançados

## 📞 Suporte

Para suporte técnico ou dúvidas:
- 📧 Email: suporte@uniclinica.com.br
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Site: www.uniclinica.com.br

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

---

**Uniclínica** - Transformando a gestão médica com tecnologia de ponta! 🏥✨
