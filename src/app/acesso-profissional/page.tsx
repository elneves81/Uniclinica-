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
  MoreVertical
} from "lucide-react"

interface Professional {
  id: string
  login: string
  name: string
  email: string
  phone: string
  cpf: string
  crm?: string
  coren?: string
  establishment: string
  role: string
  department: string
  specialty?: string
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
}

export default function AcessoProfissionalPage() {
  const [selectedEstablishment, setSelectedEstablishment] = useState("TODOS")
  const [selectedRole, setSelectedRole] = useState("TODOS")
  const [selectedStatus, setSelectedStatus] = useState("TODOS")
  const [searchTerm, setSearchTerm] = useState("")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [showModal, setShowModal] = useState(false)
  
  const [professionals] = useState<Professional[]>([
    {
      id: "1",
      login: "dr.joao.santos",
      name: "DR. JOÃO SANTOS SILVA",
      email: "joao.santos@uniclinica.com",
      phone: "(42) 99999-1234",
      cpf: "123.456.789-00",
      crm: "12345-PR",
      establishment: "HOSPITAL MUNICIPAL",
      role: "MÉDICO",
      department: "CLÍNICA MÉDICA",
      specialty: "CLÍNICA GERAL",
      status: "ATIVO",
      lastAccess: "04/08/2025 14:30",
      createdAt: "15/01/2024",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "AGENDA", "EXAMES"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        startTime: "08:00",
        endTime: "18:00"
      },
      isOnline: true
    },
    {
      id: "2", 
      login: "dra.ana.costa",
      name: "DRA. ANA PAULA COSTA",
      email: "ana.costa@uniclinica.com",
      phone: "(42) 99999-5678",
      cpf: "987.654.321-00",
      crm: "23456-PR",
      establishment: "UBS CENTRO",
      role: "MÉDICO",
      department: "PEDIATRIA",
      specialty: "PEDIATRIA",
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
      coren: "123456-PR",
      establishment: "UBS CENTRO", 
      role: "ENFERMEIRO(A)",
      department: "ENFERMAGEM",
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
      establishment: "HOSPITAL MUNICIPAL",
      role: "RECEPCIONISTA",
      department: "RECEPÇÃO",
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
      crm: "34567-PR",
      establishment: "CLÍNICA DERMATOLÓGICA",
      role: "MÉDICO",
      department: "DERMATOLOGIA",
      specialty: "DERMATOLOGIA",
      status: "SUSPENSO",
      lastAccess: "02/08/2025 17:30",
      createdAt: "08/06/2024",
      permissions: ["CONSULTAS", "PRESCRIÇÕES", "PRONTUÁRIOS", "DERMATOSCOPIA"],
      workSchedule: {
        days: ["Terça", "Quinta"],
        startTime: "14:00",
        endTime: "18:00"
      },
      isOnline: false
    },
    {
      id: "6",
      login: "tec.fernanda.santos",
      name: "FERNANDA SANTOS LIMA",
      email: "fernanda.santos@uniclinica.com",
      phone: "(42) 99999-2468",
      cpf: "654.987.321-00",
      establishment: "LABORATÓRIO CENTRAL",
      role: "TÉCNICO(A)",
      department: "LABORATÓRIO",
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
      establishment: "SECRETARIA MUNICIPAL DE SAÚDE",
      role: "ADMINISTRADOR",
      department: "ADMINISTRAÇÃO",
      status: "ATIVO",
      lastAccess: "04/08/2025 16:45",
      createdAt: "01/01/2024",
      permissions: ["ADMIN_COMPLETO", "USUÁRIOS", "RELATÓRIOS", "BACKUP", "CONFIGURAÇÕES"],
      workSchedule: {
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        startTime: "08:00",
        endTime: "17:00"
      },
      isOnline: true
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
    "TÉCNICO(A)",
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
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4" />
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

      {/* Footer */}
      <div className="bg-white border-t py-4 px-6 text-center">
        <p className="text-sm text-gray-500">
          UNICLÍNICA - Sistema de Gestão Médica | Versão 2.0 | © 2025
        </p>
      </div>
    </div>
  )
}
