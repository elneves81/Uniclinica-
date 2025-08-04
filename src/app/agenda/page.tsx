"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Clock
} from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  patientPhone: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  status: "AGENDADO" | "CONFIRMADO" | "EM_ANDAMENTO" | "FINALIZADO" | "CANCELADO" | "FALTOU";
  notes?: string;
  room?: string;
}

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");

  const appointments: Appointment[] = [
    {
      id: "1",
      patient: "ELBER LUIZ NEVES",
      patientPhone: "(42) 99999-9999",
      doctor: "DR. JOÃO SANTOS",
      specialty: "CLÍNICA GERAL",
      date: "2025-01-15",
      time: "08:00",
      duration: 30,
      status: "AGENDADO",
      room: "CONSULTÓRIO 01",
      notes: "Paciente com histórico de hipertensão"
    },
    {
      id: "2",
      patient: "MARIA SILVA SANTOS",
      patientPhone: "(42) 98888-8888",
      doctor: "DRA. ANA COSTA",
      specialty: "PEDIATRIA",
      date: "2025-01-15",
      time: "08:30",
      duration: 45,
      status: "CONFIRMADO",
      room: "CONSULTÓRIO 02",
      notes: "Consulta de rotina - 2 anos"
    },
    {
      id: "3",
      patient: "JOÃO OLIVEIRA COSTA",
      patientPhone: "(42) 97777-7777",
      doctor: "DR. CARLOS LIMA",
      specialty: "DERMATOLOGIA",
      date: "2025-01-15",
      time: "09:00",
      duration: 30,
      status: "EM_ANDAMENTO",
      room: "CONSULTÓRIO 03",
      notes: "Acompanhamento de lesão"
    },
    {
      id: "4",
      patient: "LUCIA FERNANDES",
      patientPhone: "(42) 96666-6666",
      doctor: "DRA. MARIANA SILVA",
      specialty: "GINECOLOGIA",
      date: "2025-01-15",
      time: "09:30",
      duration: 30,
      status: "AGENDADO",
      room: "CONSULTÓRIO 04"
    },
    {
      id: "5",
      patient: "PEDRO SANTOS",
      patientPhone: "(42) 95555-5555",
      doctor: "DR. JOÃO SANTOS",
      specialty: "CLÍNICA GERAL",
      date: "2025-01-15",
      time: "10:00",
      duration: 30,
      status: "FINALIZADO",
      room: "CONSULTÓRIO 01",
      notes: "Consulta de retorno - resultados de exames"
    }
  ];

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
      case "FINALIZADO": return "bg-gray-100 text-gray-800 border-gray-300";
      case "CANCELADO": return "bg-red-100 text-red-800 border-red-300";
      case "FALTOU": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
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
    return appointments.filter(apt => apt.time === time && apt.date === "2025-01-15");
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

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agenda Médica</h1>
                <p className="text-gray-600">Gerenciamento de consultas e agendamentos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Controles e filtros */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Nova Consulta</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Search className="h-4 w-4" />
                <span>Buscar</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
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
          </div>

          {/* Resumo do dia */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === "AGENDADO").length}</div>
              <div className="text-sm text-blue-600 font-medium">Agendados</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{appointments.filter(a => a.status === "CONFIRMADO").length}</div>
              <div className="text-sm text-green-600 font-medium">Confirmados</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === "EM_ANDAMENTO").length}</div>
              <div className="text-sm text-yellow-600 font-medium">Em Andamento</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{appointments.filter(a => a.status === "FINALIZADO").length}</div>
              <div className="text-sm text-gray-600 font-medium">Finalizados</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{appointments.filter(a => a.status === "CANCELADO").length}</div>
              <div className="text-sm text-red-600 font-medium">Cancelados</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{appointments.filter(a => a.status === "FALTOU").length}</div>
              <div className="text-sm text-orange-600 font-medium">Faltas</div>
            </div>
          </div>
        </div>

        {/* Grade de horários */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Agenda do Dia
            </h3>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {timeSlots.map((time, index) => {
              const slotsAppointments = getAppointmentsForTimeSlot(time);
              
              return (
                <div key={time} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  {slotsAppointments.length > 0 ? (
                    slotsAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <div className="w-20 text-sm font-semibold text-blue-600">{time}</div>
                        <div className="flex-1 grid grid-cols-4 gap-4">
                          <div>
                            <div className="font-medium text-gray-900">{appointment.patient}</div>
                            <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                          </div>
                          <div>
                            <div className="text-gray-900">{appointment.doctor}</div>
                            <div className="text-sm text-gray-500">{appointment.specialty}</div>
                          </div>
                          <div className="text-gray-700">{appointment.room}</div>
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 p-1" title="Visualizar">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-800 p-1" title="Editar">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-orange-600 hover:text-orange-800 p-1" title="Confirmar">
                                <UserCheck className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 p-1" title="Cancelar">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center px-6 py-4 text-gray-400">
                      <div className="w-20 text-sm font-semibold">{time}</div>
                      <div className="flex-1 text-center italic">Horário disponível</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de detalhes do agendamento */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Detalhes da Consulta</h2>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.patient}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.patientPhone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{new Date(selectedAppointment.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.time}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Médico</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.specialty}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultório</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.room}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className={`inline-flex px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </div>
                  </div>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedAppointment.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Confirmar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
