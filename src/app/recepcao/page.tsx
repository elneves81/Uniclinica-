"use client";

import { useState } from "react";
import { 
  UserPlus, 
  Calendar, 
  Clock,
  Users,
  Search,
  Plus,
  UserCheck,
  CalendarDays,
  Activity,
  Eye
} from "lucide-react";
import { useClinic, useClinicActions, useTodayAppointments, usePatientQueue } from "@/contexts/ClinicContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

function RecepcaoContent() {
  const router = useRouter();
  const { state } = useClinic();
  const actions = useClinicActions();
  const appointments = useTodayAppointments();
  const queueData = usePatientQueue();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar pacientes para busca rápida
  const filteredPatients = state.patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  ).slice(0, 5); // Limitar a 5 resultados

  // Estatísticas rápidas
  const stats = {
    totalPatients: state.patients.length,
    appointmentsToday: appointments.length,
    patientsWaiting: queueData.queue.filter(entry => entry.status === 'waiting').length,
    patientsInProgress: queueData.queue.filter(entry => entry.status === 'in-progress').length
  };

  // Próximos agendamentos (próximas 3 horas)
  const nextAppointments = appointments
    .filter(apt => {
      const now = new Date();
      const currentTime = now.getHours() * 100 + now.getMinutes();
      const [hours, minutes] = apt.time.split(':').map(Number);
      const appointmentTime = hours * 100 + minutes;
      return appointmentTime >= currentTime && appointmentTime <= currentTime + 300; // próximas 3 horas
    })
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 4);

  const handleQuickCheckIn = (patientId: string) => {
    const appointment = appointments.find(apt => apt.patientId === patientId);
    if (appointment) {
      actions.addToQueue(patientId, appointment.id);
      toast.success('Paciente adicionado à fila de atendimento!');
    } else {
      toast.error('Agendamento não encontrado');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <UserCheck className="h-8 w-8 mr-3 text-blue-600" />
                Recepção
              </h1>
              <p className="mt-1 text-gray-600">
                Central de atendimento e agendamentos
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/pacientes/novo')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Paciente
              </button>
              
              <button
                onClick={() => router.push('/agenda')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{stats.appointmentsToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Na Fila</p>
                <p className="text-2xl font-bold text-gray-900">{stats.patientsWaiting}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Em Atendimento</p>
                <p className="text-2xl font-bold text-gray-900">{stats.patientsInProgress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Busca Rápida de Pacientes */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Busca Rápida</h3>
            </div>
            
            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar paciente por nome ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {searchTerm && (
                <div className="space-y-2">
                  {filteredPatients.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhum paciente encontrado
                    </p>
                  ) : (
                    filteredPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => router.push(`/prontuario/${patient.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver prontuário"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleQuickCheckIn(patient.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Check-in
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Próximos Agendamentos */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Próximos Agendamentos</h3>
                <button
                  onClick={() => router.push('/agenda')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todos
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {nextAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Nenhum agendamento nas próximas horas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {nextAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{appointment.time}</div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {appointment.patientName || 'Paciente não identificado'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {appointment.doctorName} • {appointment.specialty}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status === 'scheduled' ? 'Agendado' :
                           appointment.status === 'waiting' ? 'Aguardando' : appointment.status}
                        </span>
                        
                        <button
                          onClick={() => handleQuickCheckIn(appointment.patientId)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Check-in
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/fila-atendimento')}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center mb-3">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Gerenciar Fila</h3>
            </div>
            <p className="text-sm text-gray-600">
              Visualizar e organizar a fila de atendimento
            </p>
          </button>

          <button
            onClick={() => router.push('/agenda')}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center mb-3">
              <Calendar className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Agenda Completa</h3>
            </div>
            <p className="text-sm text-gray-600">
              Ver todos os agendamentos e horários disponíveis
            </p>
          </button>

          <button
            onClick={() => router.push('/pacientes')}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center mb-3">
              <UserPlus className="h-6 w-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Cadastrar Paciente</h3>
            </div>
            <p className="text-sm text-gray-600">
              Adicionar novo paciente ao sistema
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecepcaoPage() {
  return (
    <LayoutIntegrado>
      <RecepcaoContent />
    </LayoutIntegrado>
  );
}
