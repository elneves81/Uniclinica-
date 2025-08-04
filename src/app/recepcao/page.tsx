"use client";

import { useState } from "react";
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
  RefreshCw
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate: string;
  cpf: string;
  lastVisit?: string;
  status: "active" | "inactive";
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  isAvailable: boolean;
  nextSlot?: string;
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
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
  type: "consultation" | "return" | "emergency" | "exam";
  notes?: string;
  price?: number;
  createdAt: string;
  priority: "low" | "medium" | "high" | "urgent";
}

interface TimeSlot {
  time: string;
  available: boolean;
  doctorId: string;
  appointmentId?: string;
}

// Dados mock
const mockPatients: Patient[] = [
  {
    id: "pat_001",
    name: "Maria Silva Santos",
    phone: "(11) 99999-9999",
    email: "maria.silva@email.com",
    birthDate: "1985-03-15",
    cpf: "123.456.789-01",
    lastVisit: "2024-01-10",
    status: "active"
  },
  {
    id: "pat_002",
    name: "João Oliveira Costa",
    phone: "(11) 88888-8888",
    email: "joao.costa@email.com",
    birthDate: "1978-07-22",
    cpf: "987.654.321-02",
    lastVisit: "2024-01-08",
    status: "active"
  }
];

const mockDoctors: Doctor[] = [
  {
    id: "doc_001",
    name: "Dr. Carlos Medeiros",
    specialty: "Clínica Geral",
    crm: "12345-SP",
    isAvailable: true,
    nextSlot: "14:30"
  },
  {
    id: "doc_002",
    name: "Dra. Ana Pediatra",
    specialty: "Pediatria",
    crm: "67890-SP",
    isAvailable: true,
    nextSlot: "15:00"
  },
  {
    id: "doc_003",
    name: "Dr. Roberto Dermatologista",
    specialty: "Dermatologia",
    crm: "11111-SP",
    isAvailable: false,
    nextSlot: "16:00"
  },
  {
    id: "doc_004",
    name: "Dra. Patricia Ginecologista",
    specialty: "Ginecologia",
    crm: "22222-SP",
    isAvailable: true,
    nextSlot: "14:00"
  }
];

const mockAppointments: Appointment[] = [
  {
    id: "apt_001",
    patientId: "pat_001",
    patientName: "Maria Silva Santos",
    patientPhone: "(11) 99999-9999",
    doctorId: "doc_001",
    doctorName: "Dr. Carlos Medeiros",
    specialty: "Clínica Geral",
    date: "2024-01-15",
    time: "14:00",
    duration: 30,
    status: "confirmed",
    type: "consultation",
    notes: "Consulta de rotina - hipertensão",
    price: 150.00,
    createdAt: "2024-01-14T10:30:00Z",
    priority: "medium"
  },
  {
    id: "apt_002",
    patientId: "pat_002",
    patientName: "João Oliveira Costa",
    patientPhone: "(11) 88888-8888",
    doctorId: "doc_002",
    doctorName: "Dra. Ana Pediatra",
    specialty: "Pediatria",
    date: "2024-01-15",
    time: "15:30",
    duration: 30,
    status: "scheduled",
    type: "return",
    notes: "Retorno vacinas",
    price: 120.00,
    createdAt: "2024-01-14T14:20:00Z",
    priority: "low"
  }
];

export default function RecepcaoPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [patients] = useState<Patient[]>(mockPatients);
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Estados para novo agendamento
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: selectedDate,
    time: "",
    type: "consultation" as const,
    notes: "",
    priority: "medium" as const
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      scheduled: { color: "bg-blue-100 text-blue-800", label: "Agendado", icon: Calendar },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmado", icon: CheckCircle },
      in_progress: { color: "bg-yellow-100 text-yellow-800", label: "Em Atendimento", icon: Activity },
      completed: { color: "bg-gray-100 text-gray-800", label: "Concluído", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelado", icon: XCircle },
      no_show: { color: "bg-orange-100 text-orange-800", label: "Faltou", icon: AlertCircle }
    };
    const { color, label, icon: Icon } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { color: "bg-gray-100 text-gray-800", label: "Baixa" },
      medium: { color: "bg-blue-100 text-blue-800", label: "Média" },
      high: { color: "bg-yellow-100 text-yellow-800", label: "Alta" },
      urgent: { color: "bg-red-100 text-red-800", label: "Urgente" }
    };
    const { color, label } = priorityMap[priority as keyof typeof priorityMap];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate;
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientPhone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    return matchesDate && matchesSearch && matchesStatus;
  });

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus as any } : apt
    ));
  };

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const hasAppointment = appointments.find(apt => 
          apt.date === selectedDate && apt.time === time
        );
        slots.push({
          time,
          available: !hasAppointment,
          doctorId: hasAppointment?.doctorId || "",
          appointmentId: hasAppointment?.id
        });
      }
    }
    return slots;
  };

  const handleCreateAppointment = () => {
    const patient = patients.find(p => p.id === newAppointment.patientId);
    const doctor = doctors.find(d => d.id === newAppointment.doctorId);
    
    if (!patient || !doctor) return;

    const appointment: Appointment = {
      id: `apt_${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: 30,
      status: "scheduled",
      type: newAppointment.type,
      notes: newAppointment.notes,
      price: 150.00,
      createdAt: new Date().toISOString(),
      priority: newAppointment.priority
    };

    setAppointments(prev => [...prev, appointment]);
    setShowNewAppointment(false);
    setNewAppointment({
      patientId: "",
      doctorId: "",
      date: selectedDate,
      time: "",
      type: "consultation",
      notes: "",
      priority: "medium"
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CalendarDays className="mr-3 h-8 w-8 text-indigo-600" />
              Recepção - Agendamentos
            </h1>
            <p className="mt-2 text-gray-600">
              Gerenciamento de agendamentos e atendimento aos pacientes
            </p>
          </div>
          <button 
            onClick={() => setShowNewAppointment(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.date === selectedDate).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmados</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.date === selectedDate && apt.status === "confirmed").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Em Atendimento</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === "in_progress").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Médicos Disponíveis</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(doc => doc.isAvailable).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar paciente, médico ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="scheduled">Agendado</option>
              <option value="confirmed">Confirmado</option>
              <option value="in_progress">Em Atendimento</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </button>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Agendamentos - {new Date(selectedDate).toLocaleDateString("pt-BR")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Médico/Especialidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {appointment.patientPhone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{appointment.doctorName}</div>
                      <div className="text-sm text-gray-500">{appointment.specialty}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(appointment.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowDetails(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Ver Detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 
                        appointment.status === "scheduled" ? "confirmed" : 
                        appointment.status === "confirmed" ? "in_progress" : 
                        "completed"
                      )}
                      className="text-green-600 hover:text-green-900"
                      title="Avançar Status"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        const phone = appointment.patientPhone.replace(/\D/g, '');
                        window.open(`https://wa.me/55${phone}`, '_blank');
                      }}
                      className="text-green-600 hover:text-green-900"
                      title="WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Agendamento */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Novo Agendamento</h2>
              <button
                onClick={() => setShowNewAppointment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <select
                    value={newAppointment.patientId}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, patientId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione um paciente</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.phone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Médico</label>
                  <select
                    value={newAppointment.doctorId}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, doctorId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione um médico</option>
                    {doctors.filter(doc => doc.isAvailable).map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione um horário</option>
                    {generateTimeSlots().filter(slot => slot.available).map(slot => (
                      <option key={slot.time} value={slot.time}>
                        {slot.time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
                  <select
                    value={newAppointment.priority}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Observações sobre o agendamento..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAppointment(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAppointment}
                disabled={!newAppointment.patientId || !newAppointment.doctorId || !newAppointment.time}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes do Agendamento */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Detalhes do Agendamento</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Dados do Paciente</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {selectedAppointment.patientName}</p>
                    <p><strong>Telefone:</strong> {selectedAppointment.patientPhone}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Dados do Atendimento</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Médico:</strong> {selectedAppointment.doctorName}</p>
                    <p><strong>Especialidade:</strong> {selectedAppointment.specialty}</p>
                    <p><strong>Data:</strong> {new Date(selectedAppointment.date).toLocaleDateString("pt-BR")}</p>
                    <p><strong>Horário:</strong> {selectedAppointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Status e Observações</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span>Status:</span>
                    {getStatusBadge(selectedAppointment.status)}
                    <span>Prioridade:</span>
                    {getPriorityBadge(selectedAppointment.priority)}
                  </div>
                  {selectedAppointment.notes && (
                    <div>
                      <p className="text-sm"><strong>Observações:</strong></p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {selectedAppointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  const phone = selectedAppointment.patientPhone.replace(/\D/g, '');
                  window.open(`https://wa.me/55${phone}`, '_blank');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                Contatar
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aviso sobre Recepção */}
      <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-start">
          <CalendarDays className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
          <div className="text-sm text-indigo-800">
            <strong>Sistema de Recepção:</strong> Este módulo permite o gerenciamento completo de agendamentos, 
            com funcionalidades de busca, filtros, mudança de status em tempo real e integração com WhatsApp 
            para comunicação direta com pacientes.
          </div>
        </div>
      </div>
    </div>
  );
}
