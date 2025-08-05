"use client";

import React from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  User,
  AlertCircle 
} from "lucide-react";
import { useState } from "react";
import { useTodayAppointments } from "@/contexts/ClinicContext";
import AgendaModal from "@/components/agenda/AgendaModal";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

function AgendaContent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  
  const appointments = useTodayAppointments();

  // Horários disponíveis
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getAppointmentsByTime = (time: string) => {
    if (!isToday(selectedDate)) return [];
    return appointments.filter(apt => apt.time === time);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Calendar className="h-8 w-8 mr-3 text-blue-600" />
                Agenda Médica
              </h1>
              <p className="mt-1 text-gray-600">
                Gerencie os agendamentos da clínica
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total de agendamentos hoje: <span className="font-semibold text-blue-600">{appointments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação de Data */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {formatDate(selectedDate)}
            </h2>
            {isToday(selectedDate) && (
              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                HOJE
              </span>
            )}
          </div>
          
          <button
            onClick={() => changeDate(1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Grade de Horários */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeSlots.map((time) => {
            const appointmentsAtTime = getAppointmentsByTime(time);
            const hasAppointments = appointmentsAtTime.length > 0;
            
            return (
              <div key={time} className="bg-white rounded-lg border shadow-sm">
                
                {/* Cabeçalho do horário */}
                <div className={`px-4 py-3 border-b flex items-center justify-between ${
                  hasAppointments ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="font-medium text-gray-900">{time}</span>
                  </div>
                  
                  <button
                    onClick={() => handleTimeSlotClick(time)}
                    className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    title="Novo agendamento"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Conteúdo do horário */}
                <div className="p-4">
                  {hasAppointments ? (
                    <div className="space-y-3">
                      {appointmentsAtTime.map((appointment) => (
                        <div key={appointment.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <User className="h-4 w-4 mr-1 text-gray-400" />
                                {appointment.patientName || 'Paciente não identificado'}
                              </h4>
                              
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Médico:</strong> {appointment.doctorName}
                              </p>
                              
                              <p className="text-sm text-gray-600">
                                <strong>Especialidade:</strong> {appointment.specialty}
                              </p>
                              
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-2 italic">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                            
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                              appointment.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                              appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status === 'scheduled' ? 'Agendado' :
                               appointment.status === 'waiting' ? 'Aguardando' :
                               appointment.status === 'in-progress' ? 'Em Atendimento' :
                               appointment.status === 'completed' ? 'Concluído' :
                               appointment.status === 'cancelled' ? 'Cancelado' :
                               appointment.status}
                            </span>
                          </div>
                          
                          {appointment.priority === 'urgent' && (
                            <div className="mt-2 flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm font-medium">URGENTE</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-gray-400 mb-2">
                        <Clock className="h-8 w-8 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-500">Horário disponível</p>
                      <button
                        onClick={() => handleTimeSlotClick(time)}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Agendar consulta
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Agendamento */}
      <AgendaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
}

export default function AgendaPage() {
  return (
    <LayoutIntegrado>
      <AgendaContent />
    </LayoutIntegrado>
  );
}
