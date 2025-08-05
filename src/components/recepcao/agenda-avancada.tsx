"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Stethoscope,
  Baby,
  Heart,
  UserCog
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  status: "AGENDADO" | "CONFIRMADO" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | "FALTOU";
  type: "CONSULTA" | "RETORNO" | "EMERGENCIA" | "EXAME";
  notes?: string;
  room?: string;
}

interface AgendaAvancadaProps {
  appointments: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
  onNewAppointment?: () => void;
}

export function AgendaAvancada({ 
  appointments, 
  onAppointmentClick, 
  onNewAppointment 
}: AgendaAvancadaProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const timeSlots = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const doctors = [
    "DR. JOÃO SANTOS - CLÍNICA GERAL",
    "DRA. ANA COSTA - PEDIATRIA", 
    "DR. CARLOS LIMA - DERMATOLOGIA",
    "DRA. MARIANA SILVA - GINECOLOGIA"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGENDADO": return "bg-blue-100 text-blue-800 border-blue-300";
      case "CONFIRMADO": return "bg-green-100 text-green-800 border-green-300";
      case "EM_ANDAMENTO": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "CONCLUIDO": return "bg-gray-100 text-gray-800 border-gray-300";
      case "CANCELADO": return "bg-red-100 text-red-800 border-red-300";
      case "FALTOU": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAppointmentsForTimeSlot = (time: string) => {
    const dateStr = currentDate.toISOString().split('T')[0];
    return appointments.filter(apt => apt.time === time && apt.date === dateStr);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = selectedDoctor === "all" || apt.doctorName.includes(selectedDoctor);
    return matchesSearch && matchesDoctor;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header da Agenda */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Agenda Avançada</h2>
              <p className="text-gray-600">Gerenciamento inteligente de consultas</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Controles de Navegação */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousDay}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
                {formatDate(currentDate)}
              </div>
              <button
                onClick={handleNextDay}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Botão Nova Consulta */}
            <button
              onClick={onNewAppointment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Consulta</span>
            </button>
          </div>
        </div>

        {/* Filtros e Controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Modos de Visualização */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {["day", "week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {mode === "day" ? "Dia" : mode === "week" ? "Semana" : "Mês"}
                </button>
              ))}
            </div>

            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar paciente ou médico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Médico */}
            <select 
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Médicos</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === "AGENDADO").length}
              </div>
              <div className="text-xs text-blue-600 font-medium">Agendados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === "CONFIRMADO").length}
              </div>
              <div className="text-xs text-green-600 font-medium">Confirmados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {appointments.filter(a => a.status === "EM_ANDAMENTO").length}
              </div>
              <div className="text-xs text-yellow-600 font-medium">Em Andamento</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade de Horários */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Clock className="h-5 w-5 mr-2" />
            Agenda do Dia - {currentDate.toLocaleDateString('pt-BR')}
          </h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {timeSlots.map((time, index) => {
              const slotsAppointments = getAppointmentsForTimeSlot(time);
              
              return (
                <div 
                  key={time} 
                  className={`flex items-center p-3 rounded-lg border transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50`}
                >
                  <div className="w-20 text-sm font-semibold text-blue-600 flex-shrink-0">
                    {time}
                  </div>
                  
                  <div className="flex-1 ml-4">
                    {slotsAppointments.length > 0 ? (
                      <div className="space-y-2">
                        {slotsAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            onClick={() => onAppointmentClick?.(appointment)}
                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-all"
                          >
                            <div className="flex items-center space-x-4">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {appointment.patientName}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {appointment.patientPhone}
                                </div>
                              </div>
                              <div className="w-px h-8 bg-gray-200"></div>
                              <div>
                                <div className="text-gray-900">{appointment.doctorName}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  {getSpecialtyIcon(appointment.specialty)}
                                  <span className="ml-1">{appointment.specialty}</span>
                                </div>
                              </div>
                              <div className="text-gray-700">{appointment.room}</div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                              <div className="flex items-center space-x-1">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 p-1" 
                                  title="Visualizar"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAppointmentClick?.(appointment);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-green-600 hover:text-green-800 p-1" 
                                  title="Editar"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-orange-600 hover:text-orange-800 p-1" 
                                  title="Confirmar"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-800 p-1" 
                                  title="Cancelar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 italic text-center py-2">
                        Horário disponível
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legenda de Status */}
        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Agendado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Confirmado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Em Andamento</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Concluído</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Cancelado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
