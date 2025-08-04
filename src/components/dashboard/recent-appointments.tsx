"use client";

import { Clock, User, Calendar, MoreVertical } from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: "completed" | "scheduled" | "cancelled" | "in-progress";
  specialty: string;
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  "in-progress": "bg-yellow-100 text-yellow-800"
};

const statusLabels = {
  completed: "Concluída",
  scheduled: "Agendada",
  cancelled: "Cancelada",
  "in-progress": "Em andamento"
};

export function RecentAppointments() {
  const appointments: Appointment[] = [
    {
      id: "1",
      patient: "Maria Silva",
      doctor: "Dr. João Santos",
      time: "09:00",
      status: "completed",
      specialty: "Clínica Geral"
    },
    {
      id: "2",
      patient: "Pedro Oliveira",
      doctor: "Dra. Ana Costa",
      time: "10:30",
      status: "in-progress",
      specialty: "Pediatria"
    },
    {
      id: "3",
      patient: "Lucia Fernandes",
      doctor: "Dr. Carlos Lima",
      time: "11:00",
      status: "scheduled",
      specialty: "Dermatologia"
    },
    {
      id: "4",
      patient: "Roberto Souza",
      doctor: "Dra. Maria Helena",
      time: "14:00",
      status: "scheduled",
      specialty: "Ginecologia"
    },
    {
      id: "5",
      patient: "Ana Beatriz",
      doctor: "Dr. João Santos",
      time: "15:30",
      status: "cancelled",
      specialty: "Clínica Geral"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Consultas Recentes
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Ver todas
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {appointment.doctor}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {appointment.time}
                  </span>
                  <span>{appointment.specialty}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[appointment.status]}`}>
                {statusLabels[appointment.status]}
              </span>
              
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma consulta encontrada</p>
        </div>
      )}
    </div>
  );
}
