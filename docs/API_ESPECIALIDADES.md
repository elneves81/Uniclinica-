# API de Especialidades Médicas - UNICLINICA

Este documento descreve as APIs REST desenvolvidas para o sistema UNICLINICA, fornecendo endpoints especializados para cada área médica.

## Estrutura Geral das APIs

Todas as APIs seguem o padrão REST com métodos HTTP padrão:
- `GET` - Listar consultas com filtros e paginação
- `POST` - Criar nova consulta
- `PUT` - Atualizar consulta existente

## Endpoints Disponíveis

### 1. API Geral de Especialidades
**Endpoint:** `/api/specialties`

Gerencia consultas de todas as especialidades em um endpoint unificado.

#### Parâmetros de consulta (GET):
- `specialty` - Filtrar por especialidade (pediatria, dermatologia, ginecologia, ortopedia, clinica-geral)
- `patientId` - Filtrar por ID do paciente
- `doctorId` - Filtrar por ID do médico
- `status` - Filtrar por status (scheduled, in-progress, completed, cancelled)
- `dateFrom` - Data inicial para filtro
- `dateTo` - Data final para filtro
- `page` - Página para paginação (padrão: 1)
- `limit` - Limite de resultados por página (padrão: 10)

### 2. API de Pediatria
**Endpoint:** `/api/specialties/pediatria`

Especializada em consultas pediátricas com estruturas detalhadas para acompanhamento infantil.

#### Características específicas:
- História neonatal completa (APGAR, idade gestacional, tipo de parto)
- Marcos do desenvolvimento neuropsicomotor
- Calendário vacinal detalhado
- Antropometria com percentis
- Exame físico pediátrico especializado
- Orientações aos pais

#### Exemplo de payload (POST):
```json
{
  "patientId": "PAT001",
  "doctorId": "DOC001",
  "date": "2024-01-20",
  "time": "10:00",
  "chiefComplaint": "Consulta de rotina",
  "currentIllness": "Criança em acompanhamento de puericultura"
}
```

### 3. API de Dermatologia
**Endpoint:** `/api/specialties/dermatologia`

Focada em consultas dermatológicas com ênfase em análise de lesões cutâneas.

#### Características específicas:
- História dermatológica (tipo de pele, exposição solar)
- Exame detalhado de lesões (ABCDE)
- Dermatoscopia digital
- Mapeamento corporal de nevos
- Procedimentos (biópsias, excisões)
- Fotografias clínicas

#### Estatísticas retornadas:
- Total de lesões examinadas
- Lesões suspeitas identificadas
- Biópsias indicadas
- Dermatoscopias realizadas

### 4. API de Ginecologia
**Endpoint:** `/api/specialties/ginecologia`

Especializada em saúde da mulher com foco em cuidados ginecológicos.

#### Características específicas:
- História ginecológica completa (menarca, ciclo menstrual)
- História obstétrica detalhada
- Métodos contraceptivos
- Exame ginecológico especializado
- Rastreamentos (Papanicolaou, mamografia, HPV)
- Procedimentos (DIU, colposcopia, biópsias)

#### Estatísticas específicas:
- Distribuição de métodos contraceptivos
- Status de rastreamentos preventivos
- Procedimentos realizados
- Sintomas ginecológicos prevalentes

### 5. API de Ortopedia
**Endpoint:** `/api/specialties/ortopedia`

Focada em condições musculoesqueléticas e trauma ortopédico.

#### Características específicas:
- História ortopédica (lesões, cirurgias, esportes)
- Exame físico regional detalhado
- Testes especiais por segmento
- Avaliação funcional e força muscular
- Exames de imagem (RX, RM, TC)
- Protocolos de reabilitação

#### Dados específicos:
- Amplitude de movimento por articulação
- Testes de estabilidade
- Escalas funcionais
- Critérios de retorno ao esporte

### 6. API de Clínica Geral
**Endpoint:** `/api/specialties/clinica-geral`

Cuidados médicos primários com abordagem holística do paciente.

#### Características específicas:
- História médica abrangente
- Revisão de sistemas completa
- Exame físico geral
- Gerenciamento de doenças crônicas
- Medicina preventiva
- Educação do paciente

#### Estatísticas de saúde pública:
- Prevalência de doenças crônicas
- Fatores de risco cardiovascular
- Status de vacinação
- Adesão medicamentosa

## Respostas da API

### Estrutura de resposta padrão:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "stats": {...},
  "message": "Consultas listadas com sucesso"
}
```

### Códigos de Status HTTP:
- `200` - Sucesso (GET, PUT)
- `201` - Criado com sucesso (POST)
- `400` - Erro de validação
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## Validações

### Campos obrigatórios (todas as especialidades):
- `patientId` - ID do paciente
- `doctorId` - ID do médico
- `date` - Data da consulta
- `time` - Horário da consulta
- `chiefComplaint` - Queixa principal

### Validações específicas:
Cada especialidade possui validações adicionais baseadas em suas características clínicas específicas.

## Filtros Avançados

### Por especialidade:
```
GET /api/specialties?specialty=pediatria&status=completed
```

### Por período:
```
GET /api/specialties/dermatologia?dateFrom=2024-01-01&dateTo=2024-01-31
```

### Com paginação:
```
GET /api/specialties/ortopedia?page=2&limit=20
```

## Estatísticas e Métricas

Cada API retorna estatísticas específicas da especialidade:

- **Pediatria**: Marcos do desenvolvimento, status vacinal, crescimento
- **Dermatologia**: Análise de lesões, procedimentos, mapeamentos
- **Ginecologia**: Métodos contraceptivos, rastreamentos, sintomas
- **Ortopedia**: Condições por segmento, tipos de tratamento, imaging
- **Clínica Geral**: Doenças crônicas, fatores de risco, prevenção

## Segurança e Compliance

- Dados médicos protegidos conforme LGPD
- Auditoria completa de alterações
- Controle de acesso por especialidade
- Backup automático de consultas

## Exemplos de Uso

### Buscar consultas pediátricas do último mês:
```bash
curl -X GET "/api/specialties/pediatria?dateFrom=2024-01-01&dateTo=2024-01-31"
```

### Criar nova consulta dermatológica:
```bash
curl -X POST "/api/specialties/dermatologia" \
  -H "Content-Type: application/json" \
  -d '{"patientId":"PAT001","doctorId":"DOC002","date":"2024-01-20","time":"14:00","chiefComplaint":"Lesão suspeita"}'
```

### Atualizar consulta ginecológica:
```bash
curl -X PUT "/api/specialties/ginecologia?id=GYN001" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed","assessment":{...}}'
```

## Roadmap

### Próximas funcionalidades:
- [ ] Integração com sistema de prontuário eletrônico
- [ ] APIs para outras especialidades (cardiologia, neurologia)
- [ ] Notificações automáticas de follow-up
- [ ] Integração com sistemas de imagem (DICOM)
- [ ] Analytics avançados e dashboards
- [ ] Telemedicina integrada

---

**Versão:** 1.0
**Última atualização:** Janeiro 2024
**Contato:** desenvolvimento@uniclinica.com
