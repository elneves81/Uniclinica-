"use client";

import { useRouter } from "next/navigation";
import { 
  Users, 
  Calendar, 
  Clock, 
  Stethoscope, 
  TrendingUp, 
  UserCheck,
  AlertCircle
} from "lucide-react";
import { useClinic, useTodayAppointments, usePatientQueue } from "@/contexts/ClinicContext";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick?: () => void;
}

function DashboardCard({ title, value, icon: Icon, color, onClick }: DashboardCardProps) {
  return (
    <div 
      className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DashboardCards() {
  const router = useRouter();
  const { state } = useClinic();
  const todayAppointments = useTodayAppointments();
  const queueData = usePatientQueue();

  // Calcular estatísticas
  const totalPatients = state.patients.length;
  const appointmentsToday = todayAppointments.length;
  const patientsInQueue = queueData.queue.filter(entry => entry.status === 'waiting').length;
  const patientsInProgress = queueData.queue.filter(entry => entry.status === 'in-progress').length;
  const urgentAppointments = todayAppointments.filter(apt => apt.priority === 'urgent').length;

  const cards = [
    {
      title: "Total de Pacientes",
      value: totalPatients,
      icon: Users,
      color: "bg-blue-500",
      onClick: () => router.push("/pacientes")
    },
    {
      title: "Agendamentos Hoje",
      value: appointmentsToday,
      icon: Calendar,
      color: "bg-green-500",
      onClick: () => router.push("/agenda")
    },
    {
      title: "Fila de Espera",
      value: patientsInQueue,
      icon: Clock,
      color: "bg-yellow-500",
      onClick: () => router.push("/fila-atendimento")
    },
    {
      title: "Em Atendimento",
      value: patientsInProgress,
      icon: Stethoscope,
      color: "bg-purple-500",
      onClick: () => router.push("/fila-atendimento")
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Alertas e Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Consultas Urgentes */}
        {urgentAppointments > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-sm font-medium text-red-800">
                Consultas Urgentes Hoje
              </h3>
            </div>
            <p className="mt-1 text-sm text-red-700">
              {urgentAppointments} consulta{urgentAppointments > 1 ? 's' : ''} marcada{urgentAppointments > 1 ? 's' : ''} como urgente
            </p>
            <button 
              onClick={() => router.push("/agenda")}
              className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Ver agenda →
            </button>
          </div>
        )}

        {/* Status Geral */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <UserCheck className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-800">
              Status do Atendimento
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-blue-700">
              • {patientsInQueue} paciente{patientsInQueue !== 1 ? 's' : ''} aguardando
            </p>
            <p className="text-sm text-blue-700">
              • {patientsInProgress} paciente{patientsInProgress !== 1 ? 's' : ''} em atendimento
            </p>
          </div>
          <button 
            onClick={() => router.push("/fila-atendimento")}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Gerenciar fila →
          </button>
        </div>
      </div>
    </div>
  );
}
