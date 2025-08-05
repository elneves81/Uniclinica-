"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter,
  Stethoscope,
  User,
  Building,
  Users,
  Settings,
  Shield,
  Key,
  UserCheck,
  UserX,
  Clock,
  Activity,
  Lock,
  Unlock,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Badge,
  FileText,
  Download,
  Upload,
  MoreVertical,
  UserPlus,
  Save,
  X,
  GraduationCap,
  Heart,
  Briefcase,
  Clipboard,
  UserCog
} from "lucide-react"

interface Professional {
  id: string
  login: string
  name: string
  email: string
  phone: string
  cpf: string
  rg: string
  birthDate: string
  gender: "MASCULINO" | "FEMININO" | "OUTRO"
  // Registros profissionais brasileiros
  crm?: string      // Conselho Regional de Medicina
  coren?: string    // Conselho Regional de Enfermagem
  crf?: string      // Conselho Regional de Farmácia
  cro?: string      // Conselho Regional de Odontologia
  cfp?: string      // Conselho Federal de Psicologia
  crefito?: string  // Conselho Regional de Fisioterapia e Terapia Ocupacional
  crbm?: string     // Conselho Regional de Biomedicina
  crmv?: string     // Conselho Regional de Medicina Veterinária
  cfn?: string      // Conselho Federal de Nutricionistas
  crefono?: string  // Conselho Regional de Fonoaudiologia
  // Endereço completo
  cep: string
  address: string
  addressNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  // Contato de emergência
  emergencyContact: string
  emergencyPhone: string
  // Dados profissionais
  establishment: string
  role: string
  department: string
  specialty?: string
  graduationDate?: string
  institution?: string
  specializations: string[]
  certifications: string[]
  // Sistema
  status: "ATIVO" | "INATIVO" | "BLOQUEADO" | "SUSPENSO"
  lastAccess: string
  createdAt: string
  permissions: string[]
  workSchedule: {
    days: string[]
    startTime: string
    endTime: string
  }
  avatar?: string
  isOnline: boolean
  observations?: string
}

export default function AcessoProfissionalPage() {
  const [selectedEstablishment, setSelectedEstablishment] = useState("TODOS")
  const [selectedRole, setSelectedRole] = useState("TODOS")
  const [selectedStatus, setSelectedStatus] = useState("TODOS")
  const [searchTerm, setSearchTerm] = useState("")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showNewProfessionalModal, setShowNewProfessionalModal] = useState(false)
  
  const [professionals] = useState<Professional[]>([
    {
      id: "1",
      login: "dr.joao.santos",
      name: "DR. JOÃO SANTOS SILVA",
      email: "joao.santos@uniclinica.com",
      phone: "(42) 99999-1234",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      birthDate: "15/03/1975",
      gender: "MASCULINO",
      crm: "12345-PR",
      cep: "85070-100",
      address: "Rua das Flores",
      addressNumber: "123",
      complement: "Apt 101",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "Maria Santos Silva",
      emergencyPhone: "(42) 99999-5678",
      establishment: "HOSPITAL MUNICIPAL",
      role: "MÉDICO",
      department: "CLÍNICA MÉDICA",
      specialty: "CLÍNICA GERAL",
      graduationDate: "12/1999",
      institution: "UNICENTRO",
      specializations: ["Clínica Médica", "Medicina de Família"],
      certifications: ["CFM", "Título de Especialista em Clínica Médica"],
      status: "ATIVO",
      lastAccess: "04/08/2025 14:30",
      createdAt: "15/01/2024",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "AGENDA", "EXAMES"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        startTime: "08:00",
        endTime: "18:00"
      },
      isOnline: true,
      observations: "Médico responsável técnico"
    },
    {
      id: "2", 
      login: "dra.ana.costa",
      name: "DRA. ANA PAULA COSTA",
      email: "ana.costa@uniclinica.com",
      phone: "(42) 99999-5678",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      birthDate: "22/08/1980",
      gender: "FEMININO",
      crm: "23456-PR",
      cep: "85070-200",
      address: "Avenida Brasil",
      addressNumber: "456",
      neighborhood: "Vila Nova",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "Paulo Costa",
      emergencyPhone: "(42) 99999-9012",
      establishment: "UBS CENTRO",
      role: "MÉDICO",
      department: "PEDIATRIA",
      specialty: "PEDIATRIA",
      graduationDate: "06/2004",
      institution: "UFPR",
      specializations: ["Pediatria", "Neonatologia"],
      certifications: ["CFM", "Título de Especialista em Pediatria", "Reanimação Neonatal"],
      status: "ATIVO",
      lastAccess: "04/08/2025 13:45",
      createdAt: "20/02/2024",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "AGENDA", "VACINAS", "CRESCIMENTO"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quinta", "Sexta"],
        startTime: "07:30",
        endTime: "17:30"
      },
      isOnline: true
    },
    {
      id: "3",
      login: "enf.maria.silva",
      name: "MARIA SILVA SANTOS",
      email: "maria.silva@uniclinica.com",
      phone: "(42) 99999-9012",
      cpf: "456.789.123-00",
      rg: "45.678.912-3",
      birthDate: "10/12/1985",
      gender: "FEMININO",
      coren: "123456-PR",
      cep: "85070-300",
      address: "Rua Marechal Deodoro",
      addressNumber: "789",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "João Silva Santos",
      emergencyPhone: "(42) 99999-3456",
      establishment: "UBS CENTRO", 
      role: "ENFERMEIRO(A)",
      department: "ENFERMAGEM",
      graduationDate: "12/2008",
      institution: "UNICENTRO",
      specializations: ["Enfermagem em Saúde Pública", "Enfermagem em UTI"],
      certifications: ["COREN", "ACLS", "BLS", "Controle de Infecção"],
      status: "ATIVO",
      lastAccess: "04/08/2025 15:20",
      createdAt: "10/03/2024",
      permissions: ["CURATIVOS", "MEDICAÇÃO", "TRIAGEM", "PRONTUÁRIOS", "VACINAS"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        startTime: "06:00",
        endTime: "14:00"
      },
      isOnline: false
    },
    {
      id: "4",
      login: "rec.carlos.lima",
      name: "CARLOS EDUARDO LIMA",
      email: "carlos.lima@uniclinica.com",
      phone: "(42) 99999-3456",
      cpf: "789.123.456-00",
      rg: "78.912.345-6",
      birthDate: "05/05/1990",
      gender: "MASCULINO",
      cep: "85070-400",
      address: "Rua XV de Novembro",
      addressNumber: "321",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "Ana Lima",
      emergencyPhone: "(42) 99999-7890",
      establishment: "HOSPITAL MUNICIPAL",
      role: "RECEPCIONISTA",
      department: "RECEPÇÃO",
      graduationDate: "06/2012",
      institution: "FATEC GUARAPUAVA",
      specializations: ["Administração Hospitalar"],
      certifications: ["Atendimento ao Cliente", "Informática Básica"],
      status: "ATIVO",
      lastAccess: "04/08/2025 08:00",
      createdAt: "05/01/2024",
      permissions: ["AGENDA", "CADASTROS", "RELATÓRIOS", "FILA_ATENDIMENTO"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        startTime: "07:00",
        endTime: "15:00"
      },
      isOnline: true
    },
    {
      id: "5",
      login: "dr.pedro.oliveira",
      name: "DR. PEDRO OLIVEIRA COSTA",
      email: "pedro.oliveira@uniclinica.com",
      phone: "(42) 99999-7890",
      cpf: "321.654.987-00",
      rg: "32.165.498-7",
      birthDate: "18/07/1978",
      gender: "MASCULINO",
      crm: "34567-PR",
      cep: "85070-500",
      address: "Rua Coronel Lustosa",
      addressNumber: "654",
      complement: "Sala 201",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "Carla Oliveira",
      emergencyPhone: "(42) 99999-1234",
      establishment: "CLÍNICA DERMATOLÓGICA",
      role: "MÉDICO",
      department: "DERMATOLOGIA",
      specialty: "DERMATOLOGIA",
      graduationDate: "12/2002",
      institution: "PUC-PR",
      specializations: ["Dermatologia", "Dermatoscopia", "Cirurgia Dermatológica"],
      certifications: ["CFM", "Título de Especialista em Dermatologia", "Dermatoscopia"],
      status: "SUSPENSO",
      lastAccess: "02/08/2025 17:30",
      createdAt: "08/06/2024",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "DERMATOSCOPIA"],
      workSchedule: {
        days: ["Terça", "Quinta"],
        startTime: "14:00",
        endTime: "18:00"
      },
      isOnline: false,
      observations: "Suspenso por falta de documentação atualizada"
    },
    {
      id: "6",
      login: "tec.fernanda.santos",
      name: "FERNANDA SANTOS LIMA",
      email: "fernanda.santos@uniclinica.com",
      phone: "(42) 99999-2468",
      cpf: "654.987.321-00",
      rg: "65.498.732-1",
      birthDate: "30/11/1992",
      gender: "FEMININO",
      cep: "85070-600",
      address: "Rua Saldanha Marinho",
      addressNumber: "987",
      neighborhood: "Vila Bela",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "Roberto Santos",
      emergencyPhone: "(42) 99999-5555",
      establishment: "LABORATÓRIO CENTRAL",
      role: "TÉCNICO(A)",
      department: "LABORATÓRIO",
      graduationDate: "12/2014",
      institution: "CEEP GUARAPUAVA",
      specializations: ["Análises Clínicas", "Hematologia"],
      certifications: ["Técnico em Análises Clínicas", "Coleta de Sangue", "Biossegurança"],
      status: "ATIVO",
      lastAccess: "04/08/2025 10:15",
      createdAt: "12/04/2024",
      permissions: ["COLETAS", "EXAMES", "RESULTADOS", "RELATÓRIOS"],
      workSchedule: {
        days: ["Segunda", "Quarta", "Sexta"],
        startTime: "06:30",
        endTime: "14:30"
      },
      isOnline: true
    },
    {
      id: "7",
      login: "adm.lucia.costa",
      name: "LUCIA MARIA COSTA",
      email: "lucia.costa@uniclinica.com",
      phone: "(42) 99999-1357",
      cpf: "147.258.369-00",
      rg: "14.725.836-9",
      birthDate: "12/09/1970",
      gender: "FEMININO",
      cep: "85070-700",
      address: "Avenida Manoel Ribas",
      addressNumber: "1234",
      complement: "Bloco A",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      emergencyContact: "José Costa",
      emergencyPhone: "(42) 99999-9999",
      establishment: "SECRETARIA MUNICIPAL DE SAÚDE",
      role: "ADMINISTRADOR",
      department: "ADMINISTRAÇÃO",
      graduationDate: "06/1995",
      institution: "UNICENTRO",
      specializations: ["Administração Pública", "Gestão em Saúde"],
      certifications: ["MBA em Gestão Pública", "Gestão em Saúde", "Auditoria"],
      status: "ATIVO",
      lastAccess: "04/08/2025 16:45",
      createdAt: "01/01/2024",
      permissions: ["ADMIN_COMPLETO", "USUÁRIOS", "RELATÓRIOS", "BACKUP", "CONFIGURAÇÕES"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        startTime: "08:00",
        endTime: "17:00"
      },
      isOnline: true,
      observations: "Administradora geral do sistema"
    }
  ])

  const establishments = [
    "TODOS",
    "SECRETARIA MUNICIPAL DE SAÚDE",
    "HOSPITAL MUNICIPAL",
    "UBS CENTRO",
    "UBS VILA NOVA", 
    "ESF SÃO CRISTOVÃO",
    "CLÍNICA DERMATOLÓGICA",
    "LABORATÓRIO CENTRAL"
  ]

  const roles = [
    "TODOS",
    "MÉDICO",
    "ENFERMEIRO(A)",
    "TÉCNICO(A) EM ENFERMAGEM",
    "FARMACÊUTICO",
    "DENTISTA",
    "PSICÓLOGO",
    "FISIOTERAPEUTA",
    "NUTRICIONISTA",
    "FONOAUDIÓLOGO",
    "BIOMÉDICO",
    "VETERINÁRIO",
    "TÉCNICO(A) EM ANÁLISES CLÍNICAS",
    "TÉCNICO(A) EM RADIOLOGIA",
    "RECEPCIONISTA",
    "ADMINISTRADOR"
  ]

  const statuses = [
    "TODOS",
    "ATIVO",
    "INATIVO", 
    "BLOQUEADO",
    "SUSPENSO"
  ]

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ATIVO": return "bg-green-50 text-green-800 border border-green-200"
      case "INATIVO": return "bg-gray-50 text-gray-800 border border-gray-200"
      case "BLOQUEADO": return "bg-red-50 text-red-800 border border-red-200"
      case "SUSPENSO": return "bg-orange-50 text-orange-800 border border-orange-200"
      default: return "bg-gray-50 text-gray-800 border border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "MÉDICO": return <Stethoscope className="h-5 w-5 text-blue-600" />
      case "ENFERMEIRO(A)": return <UserCheck className="h-5 w-5 text-green-600" />
      case "TÉCNICO(A) EM ENFERMAGEM": return <Heart className="h-5 w-5 text-green-500" />
      case "FARMACÊUTICO": return <Clipboard className="h-5 w-5 text-purple-600" />
      case "DENTISTA": return <User className="h-5 w-5 text-cyan-600" />
      case "PSICÓLOGO": return <UserCog className="h-5 w-5 text-indigo-600" />
      case "FISIOTERAPEUTA": return <Activity className="h-5 w-5 text-orange-600" />
      case "NUTRICIONISTA": return <GraduationCap className="h-5 w-5 text-lime-600" />
      case "FONOAUDIÓLOGO": return <User className="h-5 w-5 text-pink-600" />
      case "BIOMÉDICO": return <Settings className="h-5 w-5 text-emerald-600" />
      case "VETERINÁRIO": return <Heart className="h-5 w-5 text-amber-600" />
      case "TÉCNICO(A) EM ANÁLISES CLÍNICAS": return <FileText className="h-5 w-5 text-purple-500" />
      case "TÉCNICO(A) EM RADIOLOGIA": return <Settings className="h-5 w-5 text-gray-600" />
      case "TÉCNICO(A)": return <Settings className="h-5 w-5 text-purple-600" />
      case "RECEPCIONISTA": return <Users className="h-5 w-5 text-orange-600" />
      case "ADMINISTRADOR": return <Shield className="h-5 w-5 text-red-600" />
      default: return <User className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredProfessionals = professionals.filter(prof => {
    const matchesEstablishment = selectedEstablishment === "TODOS" || prof.establishment === selectedEstablishment
    const matchesRole = selectedRole === "TODOS" || prof.role === selectedRole
    const matchesStatus = selectedStatus === "TODOS" || prof.status === selectedStatus
    const matchesSearch = !searchTerm || 
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.cpf.includes(searchTerm)
    
    return matchesEstablishment && matchesRole && matchesStatus && matchesSearch
  })

  const handleViewDetails = (professional: Professional) => {
    setSelectedProfessional(professional)
    setShowModal(true)
  }

  const handleStatusChange = (professionalId: string, newStatus: string) => {
    // Lógica para alterar status
    console.log(`Alterando status do profissional ${professionalId} para ${newStatus}`)
  }

  const resetPassword = (professionalId: string) => {
    // Lógica para resetar senha
    console.log(`Resetando senha do profissional ${professionalId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Moderno */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">UNICLÍNICA</h1>
                  <p className="text-sm text-gray-600">Gestão de Acesso Profissional</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Última atualização: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              
              <button
                onClick={() => setLastUpdate(new Date())}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Atualizar</span>
              </button>

              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">ELBER LUIZ NEVES</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">ADMIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Controles e Filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Gestão de Profissionais</span>
            </h2>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowNewProfessionalModal(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Novo Profissional</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estabelecimento
              </label>
              <select
                value={selectedEstablishment}
                onChange={(e) => setSelectedEstablishment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {establishments.map(establishment => (
                  <option key={establishment} value={establishment}>
                    {establishment}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Função
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome, login, email ou CPF..."
                />
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-lg font-bold text-blue-800">{filteredProfessionals.length}</div>
                  <div className="text-xs text-blue-600">Total</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-lg font-bold text-green-800">
                    {filteredProfessionals.filter(p => p.status === "ATIVO").length}
                  </div>
                  <div className="text-xs text-green-600">Ativos</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-lg font-bold text-yellow-800">
                    {filteredProfessionals.filter(p => p.isOnline).length}
                  </div>
                  <div className="text-xs text-yellow-600">Online</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-lg font-bold text-orange-800">
                    {filteredProfessionals.filter(p => p.status === "SUSPENSO").length}
                  </div>
                  <div className="text-xs text-orange-600">Suspensos</div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-lg font-bold text-red-800">
                    {filteredProfessionals.filter(p => p.status === "BLOQUEADO").length}
                  </div>
                  <div className="text-xs text-red-600">Bloqueados</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Profissionais */}
        <div className="space-y-4">
          {filteredProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {getRoleIcon(professional.role)}
                    </div>
                    {professional.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(professional.status)}`}>
                        {professional.status}
                      </span>
                      {professional.crm && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          CRM: {professional.crm}
                        </span>
                      )}
                      {professional.coren && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          COREN: {professional.coren}
                        </span>
                      )}
                      {professional.crf && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                          CRF: {professional.crf}
                        </span>
                      )}
                      {professional.cro && (
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">
                          CRO: {professional.cro}
                        </span>
                      )}
                      {professional.cfp && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                          CFP: {professional.cfp}
                        </span>
                      )}
                      {professional.crefito && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                          CREFITO: {professional.crefito}
                        </span>
                      )}
                      {professional.cfn && (
                        <span className="px-2 py-1 bg-lime-100 text-lime-800 rounded text-xs">
                          CFN: {professional.cfn}
                        </span>
                      )}
                      {professional.crefono && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                          CREFONO: {professional.crefono}
                        </span>
                      )}
                      {professional.crbm && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">
                          CRBM: {professional.crbm}
                        </span>
                      )}
                      {professional.crmv && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                          CRMV: {professional.crmv}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span><strong>Login:</strong> {professional.login}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span><strong>Email:</strong> {professional.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span><strong>Telefone:</strong> {professional.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="h-4 w-4 text-gray-400" />
                          <span><strong>CPF:</strong> {professional.cpf}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span><strong>Estabelecimento:</strong> {professional.establishment}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-gray-400" />
                          <span><strong>Função:</strong> {professional.role}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span><strong>Departamento:</strong> {professional.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span><strong>Último acesso:</strong> {professional.lastAccess}</span>
                        </div>
                      </div>
                    </div>

                    {/* Horário de trabalho */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Horário:</span>
                        </div>
                        <div>
                          <span>{professional.workSchedule.days.join(", ")}</span>
                          <span className="mx-2">•</span>
                          <span>{professional.workSchedule.startTime} às {professional.workSchedule.endTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Permissões */}
                    <div className="mt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Permissões:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {professional.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewDetails(professional)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Ver detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  <button
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => resetPassword(professional.id)}
                    className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                    title="Resetar senha"
                  >
                    <Key className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange(professional.id, professional.status === "ATIVO" ? "BLOQUEADO" : "ATIVO")}
                    className={`p-2 rounded-lg transition-colors ${
                      professional.status === "ATIVO"
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                    title={professional.status === "ATIVO" ? "Bloquear" : "Ativar"}
                  >
                    {professional.status === "ATIVO" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </button>

                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum profissional encontrado</h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca ou adicionar um novo profissional.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {showModal && selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Detalhes do Profissional</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Nome:</span>
                    <p className="text-gray-900">{selectedProfessional.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Login:</span>
                    <p className="text-gray-900">{selectedProfessional.login}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{selectedProfessional.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Telefone:</span>
                    <p className="text-gray-900">{selectedProfessional.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">CPF:</span>
                    <p className="text-gray-900">{selectedProfessional.cpf}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cadastrado em:</span>
                    <p className="text-gray-900">{selectedProfessional.createdAt}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Permissões completas:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProfessional.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro de Novo Profissional */}
      {showNewProfessionalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <UserPlus className="h-6 w-6 text-green-600" />
                  <span>Cadastro de Novo Profissional</span>
                </h3>
                <button
                  onClick={() => setShowNewProfessionalModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Dados Pessoais</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome completo do profissional"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        RG *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00.000.000-0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gênero *
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>Endereço</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00000-000"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Rua, Avenida..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Apt, Sala..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Centro, Vila..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Guarapuava"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado *
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SP">São Paulo</option>
                        {/* Adicionar outros estados */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dados Profissionais */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <span>Dados Profissionais</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Função *
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione a função...</option>
                        <option value="MÉDICO">Médico</option>
                        <option value="ENFERMEIRO(A)">Enfermeiro(a)</option>
                        <option value="TÉCNICO(A) EM ENFERMAGEM">Técnico(a) em Enfermagem</option>
                        <option value="FARMACÊUTICO">Farmacêutico</option>
                        <option value="DENTISTA">Dentista</option>
                        <option value="PSICÓLOGO">Psicólogo</option>
                        <option value="FISIOTERAPEUTA">Fisioterapeuta</option>
                        <option value="NUTRICIONISTA">Nutricionista</option>
                        <option value="FONOAUDIÓLOGO">Fonoaudiólogo</option>
                        <option value="BIOMÉDICO">Biomédico</option>
                        <option value="VETERINÁRIO">Veterinário</option>
                        <option value="TÉCNICO(A) EM ANÁLISES CLÍNICAS">Técnico(a) em Análises Clínicas</option>
                        <option value="TÉCNICO(A) EM RADIOLOGIA">Técnico(a) em Radiologia</option>
                        <option value="RECEPCIONISTA">Recepcionista</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estabelecimento *
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        <option value="SECRETARIA MUNICIPAL DE SAÚDE">Secretaria Municipal de Saúde</option>
                        <option value="HOSPITAL MUNICIPAL">Hospital Municipal</option>
                        <option value="UBS CENTRO">UBS Centro</option>
                        <option value="UBS VILA NOVA">UBS Vila Nova</option>
                        <option value="ESF SÃO CRISTOVÃO">ESF São Cristovão</option>
                        <option value="CLÍNICA DERMATOLÓGICA">Clínica Dermatológica</option>
                        <option value="LABORATÓRIO CENTRAL">Laboratório Central</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departamento *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Clínica Médica, Enfermagem..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CRM (se médico)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00000-UF"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        COREN (se enfermeiro)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="000000-UF"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CRF (se farmacêutico)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00000-UF"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CRO (se dentista)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00000-UF"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CFP (se psicólogo)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00/000000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CREFITO (se fisioterapeuta)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="000000-F"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Formação
                      </label>
                      <input
                        type="month"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instituição de Ensino
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="UNICENTRO, UFPR..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especialidade
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Pediatria, Cardiologia..."
                      />
                    </div>
                  </div>
                </div>

                {/* Contato de Emergência */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span>Contato de Emergência</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Contato *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone de Emergência *
                      </label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sistema de Acesso */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Key className="h-5 w-5 text-yellow-600" />
                    <span>Sistema de Acesso</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Login do Sistema *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="usuario.nome"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Senha Temporária *
                      </label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="********"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span>Observações</span>
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações Gerais
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Informações adicionais sobre o profissional..."
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowNewProfessionalModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Cadastrar Profissional</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-white border-t py-4 px-6 text-center">
        <p className="text-sm text-gray-500">
          UNICLÍNICA - Sistema de Gestão Médica | Versão 2.0 | © 2025
        </p>
      </div>
    </div>
  )
}
