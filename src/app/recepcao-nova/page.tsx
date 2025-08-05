"use client";

import { useState, useEffect } from "react";
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
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Timer,
  CheckSquare,
  AlertOctagon,
  Headphones,
  Monitor,
  Wifi,
  Database,
  Star,
  Target,
  Award,
  Bookmark
} from "lucide-react";

// Interfaces
interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate: string;
  cpf: string;
  rg?: string;
  address: string;
  neighborhood: string;
  city: string;
  cep: string;
  emergencyContact: string;
  emergencyPhone: string;
  lastVisit?: string;
  status: "ATIVO" | "INATIVO" | "BLOQUEADO";
  notes?: string;
  createdAt: string;
  plan?: string;
  planNumber?: string;
  priority: "NORMAL" | "PRIORITARIO" | "VIP";
  avatar?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  isAvailable: boolean;
  nextSlot?: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  consultationPrice: number;
  avatar?: string;
  rating: number;
  totalConsultations: number;
  room: string;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  status: "AGENDADO" | "CONFIRMADO" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | "FALTOU";
  type: "CONSULTA" | "RETORNO" | "EMERGENCIA" | "EXAME";
  notes?: string;
  price?: number;
  createdAt: string;
  priority: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
  paymentStatus?: "PENDENTE" | "PAGO" | "CANCELADO";
  room?: string;
  checkedIn?: boolean;
  checkedInTime?: string;
}

interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentTime: string;
  arrivalTime: string;
  status: "AGUARDANDO" | "CHAMADO" | "EM_CONSULTA" | "FINALIZADO";
  priority: "NORMAL" | "PRIORITARIO" | "URGENTE";
  estimatedWaitTime: number;
}

interface DashboardStats {
  todayAppointments: number;
  confirmedAppointments: number;
  inProgressAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  availableDoctors: number;
  waitingPatients: number;
  averageWaitTime: number;
  revenue: number;
}

export default function RecepcaoNovaPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);

  // Mock Data Expandido
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
      notes: "Paciente hipertensa, acompanhamento regular",
      priority: "NORMAL",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
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
      notes: "Diabético tipo 2",
      priority: "PRIORITARIO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
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
      plan: "PARTICULAR",
      priority: "VIP",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ]);

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
      consultationPrice: 150.00,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150",
      rating: 4.8,
      totalConsultations: 1250,
      room: "CONSULTÓRIO 01"
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
      consultationPrice: 180.00,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      rating: 4.9,
      totalConsultations: 980,
      room: "CONSULTÓRIO 02"
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
      consultationPrice: 200.00,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150",
      rating: 4.7,
      totalConsultations: 750,
      room: "CONSULTÓRIO 03"
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
      consultationPrice: 190.00,
      avatar: "https://images.unsplash.com/photo-1594824475317-8b7b0c8b8b8b?w=150",
      rating: 4.9,
      totalConsultations: 1100,
      room: "CONSULTÓRIO 04"
    }
  ]);

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
      paymentStatus: "PENDENTE",
      room: "CONSULTÓRIO 01",
      checkedIn: true,
      checkedInTime: "13:45"
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
      paymentStatus: "PAGO",
      room: "CONSULTÓRIO 02"
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
      paymentStatus: "PAGO",
      room: "CONSULTÓRIO 04"
    }
  ]);

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
      priority: "NORMAL",
      estimatedWaitTime: 0
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
      priority: "NORMAL",
      estimatedWaitTime: 15
    }
  ]);

  // Dashboard Stats
  const [dashboardStats] = useState<DashboardStats>({
    todayAppointments: 12,
    confirmedAppointments: 8,
    inProgressAppointments: 2,
    completedAppointments: 3,
    cancelledAppointments: 1,
    noShowAppointments: 0,
    availableDoctors: 3,
    waitingPatients: 4,
    averageWaitTime: 12,
    revenue: 1850.00
  });

  // Auto-refresh time and notifications
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simular notificações
  useEffect(() => {
    const notificationTimer = setInterval(() => {
      const newNotifications = [
        "Paciente Maria Silva chegou para consulta das 14:00",
        "Dr. João Santos está disponível no consultório 01",
        "Lembrete: Consulta de João Costa em 30 minutos"
      ];
      setNotifications(prev => [...prev, ...newNotifications].slice(-5));
    }, 30000);
    return () => clearInterval(notificationTimer);
  }, []);

  // Filter functions
  const filteredPatients = patients.filter(patient => 
    !searchTerm || 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  );

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGENDADO": return "bg-blue-50 text-blue-800 border border-blue-200";
      case "CONFIRMADO": return "bg-green-50 text-green-800 border border-green-200";
      case "EM_ANDAMENTO": return "bg-yellow-50 text-yellow-800 border border-yellow-200";
      case "CONCLUIDO": return "bg-gray-50 text-gray-800 border border-gray-200";
      case "CANCELADO": return "bg-red-50 text-red-800 border border-red-200";
      case "FALTOU": return "bg-orange-50 text-orange-800 border border-orange-200";
      default: return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENTE": return "bg-red-100 text-red-800";
      case "ALTA": return "bg-orange-100 text-orange-800";
      case "MEDIA": return "bg-yellow-100 text-yellow-800";
      case "BAIXA": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case "CLÍNICA GERAL": return <Stethoscope className="h-4 w-4 text-blue-600" />;
      case "PEDIATRIA": return <Baby className="h-4 w-4 text-green-600" />;
      case "DERMATOLOGIA": return <User className="h-4 w-4 text-purple-600" />;
      case "GINECOLOGIA": return <Heart className="h-4 w-4 text-pink-600" />;
      default: return <UserCog className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Superior */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Recepção Inteligente
                  </h1>
                  <p className="text-sm text-gray-600">
                    Sistema Avançado de Gestão • {formatTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Status do Sistema */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Sistema Online</span>
              </div>

              {/* Notificações */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Busca Rápida */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Busca rápida..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Ações Rápidas */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowNewPatientModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Novo Paciente</span>
                </button>
                <button
                  onClick={() => setShowNewAppointmentModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CalendarPlus className="h-4 w-4" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="bg-white border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "agenda", label: "Agenda", icon: Calendar },
              { id: "pacientes", label: "Pacientes", icon: Users },
              { id: "fila", label: "Fila de Atendimento", icon: Timer },
              { id: "relatorios", label: "Relatórios", icon: PieChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-5 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Consultas Hoje</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats.todayAppointments}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs ontem
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confirmados</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats.confirmedAppointments}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Taxa: 89%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Em Atendimento</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats.inProgressAppointments}</p>
                    <p className="text-sm text-yellow-600 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Tempo médio: 25min
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Médicos Ativos</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardStats.availableDoctors}</p>
                    <p className="text-sm text-purple-600 flex items-center mt-1">
                      <Stethoscope className="h-3 w-3 mr-1" />
                      4 especialidades
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Hoje</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardStats.revenue)}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% vs ontem
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção Principal do Dashboard */}
            <div className="grid grid-cols-3 gap-6">
              {/* Agenda do Dia */}
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Agenda de Hoje
                    </h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{appointment.time}</div>
                            <div className="text-xs text-gray-500">{appointment.duration}min</div>
                          </div>
                          <div className="w-px h-12 bg-gray-200"></div>
                          <div>
                            <div className="font-medium text-gray-900">{appointment.patientName}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {appointment.patientPhone}
                            </div>
                          </div>
                          <div className="w-px h-12 bg-gray-200"></div>
                          <div>
                            <div className="font-medium text-gray-900">{appointment.doctorName}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              {getSpecialtyIcon(appointment.specialty)}
                              <span className="ml-1">{appointment.specialty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedAppointment(appointment)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver Detalhes"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-6">
                {/* Fila de Atendimento */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Timer className="h-5 w-5 mr-2 text-orange-600" />
                      Fila de Atendimento
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {queue.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{item.patientName}</div>
                            <div className="text-sm text-gray-500">
                              {item.doctorName} • {item.appointmentTime}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                              item.status === "EM_CONSULTA" ? "bg-yellow-100 text-yellow-800" :
                              item.status === "AGUARDANDO" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {item.status}
                            </div>
                            {item.estimatedWaitTime > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                ~{item.estimatedWaitTime}min
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Médicos Disponíveis */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2 text-purple-600" />
                      Médicos Disponíveis
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {doctors.filter(doc => doc.isAvailable).map((doctor) => (
                        <div
                          key={doctor.id}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              {getSpecialtyIcon(doctor.specialty)}
                              <span className="ml-1">{doctor.specialty}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">
                              {doctor.nextSlot}
                            </div>
                            <div className="text-xs text-gray-500">
                              {doctor.room}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notificações Recentes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-yellow-600" />
                      Notificações
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {notifications.slice(-3).map((notification, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div className="text-sm text-gray-700">{notification}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Agenda Avançada - Em Desenvolvimento
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Funcionalidades avançadas de agenda serão implementadas aqui.
              </p>
            </div>
          </div>
        )}

        {activeTab === "pacientes" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Gestão Inteligente de Pacientes - Em Desenvolvimento
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Sistema avançado de gestão de pacientes será implementado aqui.
              </p>
            </div>
          </div>
        )}

        {activeTab === "fila" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Fila de Atendimento Inteligente - Em Desenvolvimento
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Sistema inteligente de fila de atendimento será implementado aqui.
              </p>
            </div>
          </div>
        )}

        {activeTab === "relatorios" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Relatórios Gerenciais - Em Desenvolvimento
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Relatórios avançados e analytics serão implementados aqui.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modais */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Novo Paciente</h2>
              <button
                onClick={() => setShowNewPatientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-600">Modal de cadastro de paciente será implementado aqui.</p>
            </div>
          </div>
        </div>
      )}

      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Novo Agendamento</h2>
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-600">Modal de agendamento será implementado aqui.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer com informações do sistema */}
      <div className="bg-white border-t mt-8">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sistema Operacional</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Banco de Dados: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4" />
                <span>Conexão: Estável</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Uniclínica v2.0 - Recepção Inteligente</span>
              <span>© 2025 - Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
