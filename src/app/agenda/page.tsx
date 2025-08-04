"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Calendar, Clock, User, Plus, Search, Filter } from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  notes?: string;
}

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");

  const appointments: Appointment[] = [
    {
      id: "1",
      patient: "Maria Silva",
      doctor: "Dr. João Santos",
      specialty: "Clínica Geral",
      date: "2025-08-04",
      time: "09:00",
      duration: 30,
      status: "scheduled"
    },
    {
      id: "2",
      patient: "Pedro Oliveira",
      doctor: "Dra. Ana Costa",
      specialty: "Pediatria",
      date: "2025-08-04",
      time: "10:30",
      duration: 45,
      status: "in-progress"
    },
    {
      id: "3",
      patient: "Lucia Fernandes",
      doctor: "Dr. Carlos Lima",
      specialty: "Dermatologia",
      date: "2025-08-04",
      time: "11:00",
      duration: 30,
      status: "scheduled"
    },
    {
      id: "4",
      patient: "Roberto Souza",
      doctor: "Dra. Maria Helena",
      specialty: "Ginecologia",
      date: "2025-08-04",
      time: "14:00",
      duration: 60,
      status: "scheduled"
    }
  ];

  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const statusLabels = {
    scheduled: "Agendada",
    "in-progress": "Em andamento",
    completed: "Concluída",
    cancelled: "Cancelada"
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 7; // Começa às 7h
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getAppointmentsForTimeSlot = (time: string) => {
    return appointments.filter(apt => apt.time === time);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Agenda Médica
                </h1>
                <p className="text-gray-600">Gerencie consultas e horários</p>
              </div>
              
              <button
                onClick={() => console.log("Nova consulta")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Consulta
              </button>
            </div>

            {/* Controles da Agenda */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                {/* Navegação de Data */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setDate(newDate.getDate() - 1);
                      setCurrentDate(newDate);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    ←
                  </button>
                  
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h2>
                  
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setDate(newDate.getDate() + 1);
                      setCurrentDate(newDate);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    →
                  </button>
                  
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Hoje
                  </button>
                </div>

                {/* Filtros e Busca */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar paciente..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>

                  {/* Seletor de Visualização */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {(['day', 'week', 'month'] as const).map((viewType) => (
                      <button
                        key={viewType}
                        onClick={() => setView(viewType)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          view === viewType
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {viewType === 'day' ? 'Dia' : viewType === 'week' ? 'Semana' : 'Mês'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Visualização da Agenda */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {view === "day" && (
                <div className="p-6">
                  <div className="space-y-2">
                    {timeSlots.map((time) => {
                      const slotsAppointments = getAppointmentsForTimeSlot(time);
                      
                      return (
                        <div key={time} className="flex items-start border-b border-gray-100 pb-2">
                          <div className="w-16 text-sm text-gray-500 py-2">
                            {time}
                          </div>
                          
                          <div className="flex-1 min-h-[60px]">
                            {slotsAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                onClick={() => console.log("Appointment:", appointment.id)}
                                className={`p-3 mb-2 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${statusColors[appointment.status]}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">{appointment.patient}</h4>
                                    <p className="text-sm opacity-75">
                                      {appointment.doctor} • {appointment.specialty}
                                    </p>
                                    <p className="text-xs opacity-60 flex items-center mt-1">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {appointment.duration} min
                                    </p>
                                  </div>
                                  
                                  <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                                    {statusLabels[appointment.status]}
                                  </span>
                                </div>
                              </div>
                            ))}
                            
                            {slotsAppointments.length === 0 && (
                              <div className="h-[60px] flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors">
                                + Agendar consulta
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {view === "week" && (
                <div className="p-6">
                  <div className="text-center text-gray-500 py-8">
                    Visualização semanal em desenvolvimento...
                  </div>
                </div>
              )}

              {view === "month" && (
                <div className="p-6">
                  <div className="text-center text-gray-500 py-8">
                    Visualização mensal em desenvolvimento...
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas do Dia */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.filter(apt => apt.status === "in-progress").length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <User className="w-8 h-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Concluídas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.filter(apt => apt.status === "completed").length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Canceladas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.filter(apt => apt.status === "cancelled").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
