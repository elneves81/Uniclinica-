"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Plus,
  Search,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  CalendarDays,
  UserCheck,
  PhoneCall,
  MessageSquare,
  Activity,
  Filter,
  RefreshCw,
  Stethoscope,
  Heart,
  Baby,
  UserCog,
  Building,
  MapPin,
  AlertTriangle,
  FileText,
  CreditCard,
  PrinterIcon,
  Send,
  Bell,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Save,
  X,
  UserPlus,
  CalendarPlus,
  Shield,
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Zap
} from "lucide-react"

// Interfaces
interface Patient {
  id: string
  name: string
  phone: string
  email?: string
  birthDate: string
  cpf: string
  rg?: string
  address: string
  neighborhood: string
  city: string
  cep: string
  emergencyContact: string
  emergencyPhone: string
  lastVisit?: string
  status: "ATIVO" | "INATIVO" | "BLOQUEADO"
  notes?: string
  createdAt: string
  plan?: string
  planNumber?: string
}

interface Doctor {
  id: string
  name: string
  specialty: string
  crm: string
  isAvailable: boolean
  nextSlot?: string
  workingHours: {
    start: string
    end: string
    days: string[]
  }
  consultationPrice: number
  avatar?: string
}

interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  duration: number
  status: "AGENDADO" | "CONFIRMADO" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | "FALTOU"
  type: "CONSULTA" | "RETORNO" | "EMERGENCIA" | "EXAME"
  notes?: string
  price?: number
  createdAt: string
  priority: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE"
  paymentStatus?: "PENDENTE" | "PAGO" | "CANCELADO"
}

interface QueueItem {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  appointmentTime: string
  arrivalTime: string
  status: "AGUARDANDO" | "CHAMADO" | "EM_CONSULTA" | "FINALIZADO"
  priority: "NORMAL" | "PRIORITARIO" | "URGENTE"
}

export default function RecepcaoPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock Data
  const [patients] = useState<Patient[]>([
    {
      id: "PAT001",
      name: "MARIA SILVA SANTOS",
      phone: "(42) 99999-1234",
      email: "maria.silva@email.com",
      birthDate: "1985-03-15",
      cpf: "123.456.789-01",
      rg: "12.345.678-9",
      address: "Rua das Flores, 123",
      neighborhood: "Centro",
      city: "Guarapuava",
      cep: "85070-100",
      emergencyContact: "João Silva",
      emergencyPhone: "(42) 99999-5678",
      lastVisit: "2025-01-03",
      status: "ATIVO",
      createdAt: "2024-01-15",
      plan: "SUS",
      notes: "Paciente hipertensa, acompanhamento regular"
    },
    {
      id: "PAT002",
      name: "JOÃO OLIVEIRA COSTA",
      phone: "(42) 99999-5678",
      email: "joao.costa@email.com",
      birthDate: "1978-07-22",
      cpf: "987.654.321-02",
      rg: "98.765.432-1",
      address: "Avenida Brasil, 456",
      neighborhood: "Vila Nova",
      city: "Guarapuava",
      cep: "85070-200",
      emergencyContact: "Ana Costa",
      emergencyPhone: "(42) 99999-9012",
      lastVisit: "2025-01-01",
      status: "ATIVO",
      createdAt: "2024-02-10",
      plan: "UNIMED",
      planNumber: "123456789",
      notes: "Diabético tipo 2"
    },
    {
      id: "PAT003",
      name: "ANA PAULA FERNANDES",
      phone: "(42) 99999-9012",
      email: "ana.fernandes@email.com",
      birthDate: "1992-11-08",
      cpf: "456.789.123-03",
      rg: "45.678.912-3",
      address: "Rua XV de Novembro, 789",
      neighborhood: "Centro",
      city: "Guarapuava",
      cep: "85070-300",
      emergencyContact: "Pedro Fernandes",
      emergencyPhone: "(42) 99999-3456",
      lastVisit: "2024-12-30",
      status: "ATIVO",
      createdAt: "2024-03-05",
      plan: "PARTICULAR"
    }
  ])

  const [doctors] = useState<Doctor[]>([
    {
      id: "DOC001",
      name: "DR. JOÃO SANTOS SILVA",
      specialty: "CLÍNICA GERAL",
      crm: "12345-PR",
      isAvailable: true,
      nextSlot: "14:30",
      workingHours: {
        start: "08:00",
        end: "18:00",
        days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
      },
      consultationPrice: 150.00
    },
    {
      id: "DOC002",
      name: "DRA. ANA PAULA COSTA",
      specialty: "PEDIATRIA",
      crm: "23456-PR",
      isAvailable: true,
      nextSlot: "15:00",
      workingHours: {
        start: "07:30",
        end: "17:30",
        days: ["Segunda", "Terça", "Quinta", "Sexta"]
      },
      consultationPrice: 180.00
    },
    {
      id: "DOC003",
      name: "DR. PEDRO OLIVEIRA",
      specialty: "DERMATOLOGIA",
      crm: "34567-PR",
      isAvailable: false,
      nextSlot: "16:00",
      workingHours: {
        start: "14:00",
        end: "18:00",
        days: ["Terça", "Quinta"]
      },
      consultationPrice: 200.00
    },
    {
      id: "DOC004",
      name: "DRA. PATRICIA LIMA",
      specialty: "GINECOLOGIA",
      crm: "45678-PR",
      isAvailable: true,
      nextSlot: "14:00",
      workingHours: {
        start: "08:00",
        end: "16:00",
        days: ["Segunda", "Quarta", "Sexta"]
      },
      consultationPrice: 190.00
    }
  ])

  const [appointments] = useState<Appointment[]>([
    {
      id: "APT001",
      patientId: "PAT001",
      patientName: "MARIA SILVA SANTOS",
      patientPhone: "(42) 99999-1234",
      doctorId: "DOC001",
      doctorName: "DR. JOÃO SANTOS SILVA",
      specialty: "CLÍNICA GERAL",
      date: "2025-01-05",
      time: "14:00",
      duration: 30,
      status: "CONFIRMADO",
      type: "CONSULTA",
      notes: "Consulta de rotina - acompanhamento hipertensão",
      price: 150.00,
      createdAt: "2025-01-04T10:30:00Z",
      priority: "MEDIA",
      paymentStatus: "PENDENTE"
    },
    {
      id: "APT002",
      patientId: "PAT002",
      patientName: "JOÃO OLIVEIRA COSTA",
      patientPhone: "(42) 99999-5678",
      doctorId: "DOC002",
      doctorName: "DRA. ANA PAULA COSTA",
      specialty: "PEDIATRIA",
      date: "2025-01-05",
      time: "15:00",
      duration: 30,
      status: "AGENDADO",
      type: "RETORNO",
      notes: "Retorno acompanhamento diabetes",
      price: 180.00,
      createdAt: "2025-01-04T14:15:00Z",
      priority: "ALTA",
      paymentStatus: "PAGO"
    },
    {
      id: "APT003",
      patientId: "PAT003",
      patientName: "ANA PAULA FERNANDES",
      patientPhone: "(42) 99999-9012",
      doctorId: "DOC004",
      doctorName: "DRA. PATRICIA LIMA",
      specialty: "GINECOLOGIA",
      date: "2025-01-05",
      time: "10:00",
      duration: 45,
      status: "EM_ANDAMENTO",
      type: "CONSULTA",
      notes: "Consulta preventiva",
      price: 190.00,
      createdAt: "2025-01-03T16:20:00Z",
      priority: "MEDIA",
      paymentStatus: "PAGO"
    }
  ])

  const [queue] = useState<QueueItem[]>([
    {
      id: "Q001",
      patientId: "PAT003",
      patientName: "ANA PAULA FERNANDES",
      doctorId: "DOC004",
      doctorName: "DRA. PATRICIA LIMA",
      appointmentTime: "10:00",
      arrivalTime: "09:45",
      status: "EM_CONSULTA",
      priority: "NORMAL"
    },
    {
      id: "Q002",
      patientId: "PAT001",
      patientName: "MARIA SILVA SANTOS",
      doctorId: "DOC001",
      doctorName: "DR. JOÃO SANTOS SILVA",
      appointmentTime: "14:00",
      arrivalTime: "13:45",
      status: "AGUARDANDO",
      priority: "NORMAL"
    }
  ])

  // Auto-refresh time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Filter functions
  const filteredPatients = patients.filter(patient => 
    !searchTerm || 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  )

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGENDADO": return "bg-blue-50 text-blue-800 border border-blue-200"
      case "CONFIRMADO": return "bg-green-50 text-green-800 border border-green-200"
      case "EM_ANDAMENTO": return "bg-yellow-50 text-yellow-800 border border-yellow-200"
      case "CONCLUIDO": return "bg-gray-50 text-gray-800 border border-gray-200"
      case "CANCELADO": return "bg-red-50 text-red-800 border border-red-200"
      case "FALTOU": return "bg-orange-50 text-orange-800 border border-orange-200"
      default: return "bg-gray-50 text-gray-800 border border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENTE": return "bg-red-100 text-red-800"
      case "ALTA": return "bg-orange-100 text-orange-800"
      case "MEDIA": return "bg-yellow-100 text-yellow-800"
      case "BAIXA": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case "CLÍNICA GERAL": return <Stethoscope className="h-4 w-4 text-blue-600" />
      case "PEDIATRIA": return <Baby className="h-4 w-4 text-green-600" />
      case "DERMATOLOGIA": return <User className="h-4 w-4 text-purple-600" />
      case "GINECOLOGIA": return <Heart className="h-4 w-4 text-pink-600" />
      default: return <UserCog className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recepção - Sistema Avançado</h1>
                <p className="text-gray-600">Gestão completa de pacientes e agendamentos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString('pt-BR')}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "agenda", label: "Agenda", icon: Calendar },
              { id: "pacientes", label: "Pacientes", icon: Users },
              { id: "fila", label: "Fila de Atendimento", icon: Clock },
              { id: "relatorios", label: "Relatórios", icon: PieChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pacientes Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs ontem
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">R$ 2.340</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% vs ontem
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa Ocupação</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                    <p className="text-xs text-yellow-600 flex items-center mt-1">
                      <Target className="h-3 w-3 mr-1" />
                      Meta: 90%
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Satisfação</p>
                    <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Excelente
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos Agendamentos */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  Próximos Agendamentos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todayAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg">
                          {getSpecialtyIcon(appointment.specialty)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-600">{appointment.doctorName} - {appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agenda Tab */}
        {activeTab === "agenda" && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Agenda do Dia</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setShowNewAppointmentModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600">{appointment.time}</div>
                        <div className="text-xs text-gray-500">{appointment.duration}min</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                        <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                        {appointment.priority}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pacientes Tab */}
        {activeTab === "pacientes" && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Gestão de Pacientes</h3>
                <button
                  onClick={() => setShowNewPatientModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Paciente
                </button>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar paciente por nome, CPF ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 rounded-lg">
                          <User className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.phone} • {patient.cpf}</p>
                          <p className="text-sm text-gray-500">{patient.plan} • Última visita: {patient.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          patient.status === "ATIVO" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {patient.status}
                        </span>
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fila de Atendimento Tab */}
        {activeTab === "fila" && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Fila de Atendimento</h3>
            <div className="space-y-4">
              {queue.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        item.status === "EM_CONSULTA" ? "bg-yellow-100" : 
                        item.status === "AGUARDANDO" ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                        <Clock className={`h-6 w-6 ${
                          item.status === "EM_CONSULTA" ? "text-yellow-600" : 
                          item.status === "AGUARDANDO" ? "text-blue-600" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.patientName}</h4>
                        <p className="text-sm text-gray-600">{item.doctorName}</p>
                        <p className="text-sm text-gray-500">Agendado: {item.appointmentTime} • Chegou: {item.arrivalTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "EM_CONSULTA" ? "bg-yellow-100 text-yellow-800" :
                        item.status === "AGUARDANDO" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {item.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <PhoneCall className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relatórios Tab */}
        {activeTab === "relatorios" && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Relatórios Gerenciais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Relatório Diário</h4>
                    <p className="text-sm text-gray-600">Resumo das atividades do dia</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Relatório Financeiro</h4>
                    <p className="text-sm text-gray-600">Receitas e faturamento</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Relatório de Pacientes</h4>
                    <p className="text-sm text-gray-600">Estatísticas de atendimento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Aviso sobre Sistema Avançado */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
            <div className="text-sm text-indigo-800">
              <strong>Sistema de Recepção Avançado:</strong> Interface moderna com dashboard em tempo real, 
              gestão inteligente de pacientes, agenda interativa, fila de atendimento otimizada e relatórios 
              gerenciais completos. Desenvolvido para maximizar a eficiência da recepção médica.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
