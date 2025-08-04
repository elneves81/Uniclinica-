"use client";

import { useState } from "react";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  UserCheck,
  Clock,
  ChevronRight
} from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface PatientForConsultation {
  id: string;
  name: string;
  time: string;
  specialty: string;
  doctor: string;
  status: "AGUARDANDO" | "EM_ATENDIMENTO";
  phone: string;
}

function DashboardCard({ title, value, change, icon: Icon, color }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {change.trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {change.value}% em relação ao mês anterior
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DashboardCards() {
  const [selectedPatient, setSelectedPatient] = useState<PatientForConsultation | null>(null);
  
  // Dados mock para pacientes aguardando atendimento
  const patientsForConsultation: PatientForConsultation[] = [
    {
      id: "1",
      name: "ELBER LUIZ NEVES",
      time: "08:00",
      specialty: "CLÍNICA GERAL",
      doctor: "DR. JOÃO SANTOS",
      status: "AGUARDANDO",
      phone: "(42) 99999-9999"
    },
    {
      id: "2",
      name: "MARIA SILVA SANTOS",
      time: "08:30",
      specialty: "PEDIATRIA",
      doctor: "DRA. ANA COSTA",
      status: "AGUARDANDO",
      phone: "(42) 98888-8888"
    },
    {
      id: "3",
      name: "JOÃO OLIVEIRA COSTA",
      time: "09:00",
      specialty: "DERMATOLOGIA",
      doctor: "DR. CARLOS LIMA",
      status: "EM_ATENDIMENTO",
      phone: "(42) 97777-7777"
    }
  ];

  const handleStartConsultation = (patientId: string) => {
    // Redirecionar para o prontuário do paciente
    window.location.href = `/prontuario/${patientId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AGUARDANDO": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "EM_ATENDIMENTO": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const cards = [
    {
      title: "Pacientes Ativos",
      value: "1,234",
      change: { value: 8, trend: "up" as const },
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Consultas Hoje",
      value: "24",
      change: { value: 12, trend: "up" as const },
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.280",
      change: { value: 15, trend: "up" as const },
      icon: DollarSign,
      color: "bg-yellow-500"
    },
    {
      title: "Prontuários",
      value: "856",
      change: { value: 3, trend: "down" as const },
      icon: FileText,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Pacientes para Atendimento */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
              Pacientes para Atendimento
            </h3>
            <span className="text-sm text-gray-500">
              {patientsForConsultation.filter(p => p.status === "AGUARDANDO").length} aguardando
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {patientsForConsultation.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {patient.time} - {patient.specialty}
                      </p>
                      <p className="text-xs text-gray-500">
                        {patient.doctor}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                  {patient.status === "AGUARDANDO" && (
                    <button
                      onClick={() => handleStartConsultation(patient.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Atender
                    </button>
                  )}
                  {patient.status === "EM_ATENDIMENTO" && (
                    <button
                      onClick={() => handleStartConsultation(patient.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      Continuar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {patientsForConsultation.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum paciente aguardando atendimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
      color: "bg-blue-500"
    },
    {
      title: "Consultas Hoje",
      value: "24",
      change: { value: 12, trend: "up" as const },
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.280",
      change: { value: 15, trend: "up" as const },
      icon: DollarSign,
      color: "bg-yellow-500"
    },
    {
      title: "Prontuários",
      value: "856",
      change: { value: 3, trend: "down" as const },
      icon: FileText,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <DashboardCard key={index} {...card} />
      ))}
    </div>
  );
}
