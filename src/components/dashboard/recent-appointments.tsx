"use client";

import { Clock, User, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTodayAppointments } from "@/contexts/ClinicContext";

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  waiting: "bg-yellow-100 text-yellow-800", 
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels = {
  scheduled: "Agendada",
  waiting: "Aguardando",
  "in-progress": "Em Atendimento",
  completed: "Concluída",
  cancelled: "Cancelada"
};

export function RecentAppointments() {
  const appointments = useTodayAppointments();

  // Pegar os próximos 6 agendamentos ordenados por horário
  const sortedAppointments = appointments
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 6);

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Agendamentos de Hoje
            </h3>
            <Link
              href="/agenda"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              Ver agenda completa
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum agendamento hoje
          </h4>
          <p className="text-gray-600 mb-4">
            Não há consultas agendadas para hoje.
          </p>
          <Link
            href="/agenda"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Consulta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Agendamentos de Hoje
          </h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Total: {appointments.length}
            </span>
            <Link
              href="/agenda"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              Ver agenda completa
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {sortedAppointments.map((appointment) => (
          <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Horário */}
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-medium">{appointment.time}</span>
                </div>

                {/* Informações do Paciente */}
                <div className="flex-1">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {appointment.patientName || 'Paciente não identificado'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {appointment.doctorName} • {appointment.specialty}
                  </div>
                </div>

                {/* Prioridade */}
                {appointment.priority === 'urgent' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">URGENTE</span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  statusColors[appointment.status] || 'bg-gray-100 text-gray-800'
                }`}>
                  {statusLabels[appointment.status] || appointment.status}
                </span>
                
                {/* Tipo de consulta */}
                <span className="text-xs text-gray-500 uppercase">
                  {appointment.type === 'consultation' ? 'Consulta' :
                   appointment.type === 'return' ? 'Retorno' :
                   appointment.type === 'exam' ? 'Exame' : appointment.type}
                </span>
              </div>
            </div>

            {/* Observações */}
            {appointment.notes && (
              <div className="mt-2 text-sm text-gray-600 italic">
                "{appointment.notes}"
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ver mais */}
      {appointments.length > 6 && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <Link
            href="/agenda"
            className="text-center block text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Ver todos os {appointments.length} agendamentos de hoje
          </Link>
        </div>
      )}
    </div>
  );
}
