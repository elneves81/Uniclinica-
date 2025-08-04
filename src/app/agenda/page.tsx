"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Edit,
  Trash2,
  Eye,
  UserCheck
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
      {/* Header estilo FastMedic */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8" />
                <div>
                  <h1 className="text-xl font-bold">UNICLÍNICA</h1>
                  <p className="text-xs opacity-90">PREFEITURA MUNICIPAL DE GUARAPUAVA</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span>Bem vindo ELBER LUIZ NEVES - RECEPCIONISTA DE CONSULTÓRIO MÉDICO OU DENTÁRIO</span>
              <button className="bg-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-800">
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Menu de navegação */}
        <div className="bg-blue-700">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8 text-sm">
              <a href="#" className="py-3 px-2 hover:text-blue-200">Atendimento</a>
              <a href="#" className="py-3 px-2 border-b-2 border-blue-400 text-blue-200">Agenda</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Usuário</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Programas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ferramentas</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Segurança</a>
              <a href="#" className="py-3 px-2 hover:text-blue-200">Ajuda</a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Título da página */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold">Agenda Médica</h2>
        </div>

        {/* Controles da agenda */}
        <div className="bg-white border border-gray-300 rounded-b-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Novo Agendamento</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                <Search className="h-4 w-4" />
                <span>Buscar</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousDay}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-lg font-medium text-gray-900">
                {formatDate(currentDate)}
              </div>
              <button
                onClick={handleNextDay}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filtros médicos */}
          <div className="bg-blue-100 p-4 rounded mb-6">
            <h3 className="font-bold text-blue-800 mb-3">Filtro por Médico</h3>
            <div className="grid grid-cols-4 gap-4">
              {doctors.map((doctor, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">{doctor}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Agenda do dia */}
          <div className="border border-gray-300 rounded">
            <div className="bg-blue-100 px-4 py-2 border-b border-gray-300">
              <div className="grid grid-cols-6 gap-4 text-sm font-bold text-blue-800">
                <div>Horário</div>
                <div>Paciente</div>
                <div>Médico</div>
                <div>Especialidade</div>
                <div>Status</div>
                <div>Ações</div>
              </div>
            </div>

            <div className="bg-white max-h-96 overflow-y-auto">
              {timeSlots.map((time, index) => {
                const slotsAppointments = getAppointmentsForTimeSlot(time);
                
                return (
                  <div key={time} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    {slotsAppointments.length > 0 ? (
                      slotsAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="grid grid-cols-6 gap-4 px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="font-medium text-blue-700">{time}</div>
                          <div className="text-gray-900">
                            <div className="font-medium">{appointment.patient}</div>
                            <div className="text-xs text-gray-500">{appointment.patientPhone}</div>
                          </div>
                          <div className="text-gray-700">{appointment.doctor}</div>
                          <div className="text-gray-700">{appointment.specialty}</div>
                          <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800" title="Editar">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-800" title="Confirmar">
                              <UserCheck className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800" title="Cancelar">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="grid grid-cols-6 gap-4 px-4 py-3 text-sm text-gray-400">
                        <div className="font-medium">{time}</div>
                        <div className="col-span-5 text-center">--- Horário Livre ---</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumo do dia */}
          <div className="mt-6 grid grid-cols-6 gap-4 text-center">
            <div className="bg-blue-100 p-3 rounded">
              <div className="text-2xl font-bold text-blue-800">{appointments.filter(a => a.status === "AGENDADO").length}</div>
              <div className="text-sm text-blue-600">Agendados</div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="text-2xl font-bold text-green-800">{appointments.filter(a => a.status === "CONFIRMADO").length}</div>
              <div className="text-sm text-green-600">Confirmados</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded">
              <div className="text-2xl font-bold text-yellow-800">{appointments.filter(a => a.status === "EM_ANDAMENTO").length}</div>
              <div className="text-sm text-yellow-600">Em Andamento</div>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <div className="text-2xl font-bold text-gray-800">{appointments.filter(a => a.status === "FINALIZADO").length}</div>
              <div className="text-sm text-gray-600">Finalizados</div>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <div className="text-2xl font-bold text-red-800">{appointments.filter(a => a.status === "CANCELADO").length}</div>
              <div className="text-sm text-red-600">Cancelados</div>
            </div>
            <div className="bg-orange-100 p-3 rounded">
              <div className="text-2xl font-bold text-orange-800">{appointments.filter(a => a.status === "FALTOU").length}</div>
              <div className="text-sm text-orange-600">Faltas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do agendamento */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Detalhes do Agendamento</h2>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.patientPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{new Date(selectedAppointment.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.time}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Médico</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.doctor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.specialty}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultório</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.room}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </div>
                </div>
              </div>
            </div>

            {selectedAppointment.notes && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedAppointment.notes}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Confirmar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 py-2 px-4 text-xs text-gray-600 text-center">
        FastMedic Sistemas | © FastMedic | Versão 5.126.6.24402
      </div>
    </div>
  );
}
