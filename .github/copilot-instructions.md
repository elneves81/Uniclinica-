# Instruções para o GitHub Copilot - Sistema Uniclínica

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexto do Projeto

Este é um sistema completo para clínica médica com as seguintes funcionalidades principais:

### Módulos Principais
- **Prontuário Eletrônico**: Sistema completo de registro médico digital
- **Agenda Médica**: Sistema de agendamento com calendário estilo Google
- **Sistema Financeiro**: Controle de valores de consultas e pagamentos
- **Relatórios**: Geração e impressão de relatórios médicos
- **Notificações**: Envio de emails automáticos para agenda

### Especialidades Médicas
- **Clínica Médica Geral**: Atendimento clínico geral, controle de sinais vitais, doenças crônicas, história familiar
- **Dermatologia**: Dermatoscopia, mapeamento corporal, lesões, tipos de pele, acompanhamento de lesões
- **Pediatria**: Curvas de crescimento, calendário vacinal, desenvolvimento, marcos de crescimento, APGAR
- **Ginecologia**: Exames específicos, acompanhamento gestacional, papanicolau, mamografia, ciclo menstrual

## Diretrizes de Desenvolvimento

### Tecnologias
- Next.js 15 com TypeScript
- Tailwind CSS para estilização
- Prisma para banco de dados
- NextAuth.js para autenticação
- React Hook Form para formulários
- Zod para validação

### Padrões de Código
- Use componentes funcionais com hooks
- Implemente TypeScript tipagem rigorosa
- Siga padrões de acessibilidade (WCAG)
- Use padrão de arquitetura limpa
- Implemente tratamento de erros robusto

### Estrutura de Dados
- Modele dados seguindo padrões médicos
- Implemente auditoria e logs de alterações
- Garanta LGPD/compliance de dados médicos
- Use relacionamentos apropriados entre entidades

### Funcionalidades Específicas
- Campos específicos para cada especialidade médica
- Validações baseadas em protocolos médicos
- Integração com APIs de laboratórios/exames
- Sistema de backup e recuperação
- Controle de acesso baseado em perfis

### Segurança
- Criptografia de dados sensíveis
- Logs de auditoria completos
- Controle de acesso granular
- Compliance com CFM e LGPD
