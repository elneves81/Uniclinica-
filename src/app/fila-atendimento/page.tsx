"use client";

import { useState } from "react";
import { 
  Users, 
  Clock, 
  Play,
  Bell,
  UserCheck,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { useClinic, useClinicActions, usePatientQueue } from "@/contexts/ClinicContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

function FilaAtendimentoContent() {
  const { state } = useClinic();
  const actions = useClinicActions();
  const { queue, waitingCount, inProgressCount } = usePatientQueue();
  const router = useRouter();

  // Chamar paciente
  const handleCallPatient = (queueEntry: any) => {
    actions.updateQueueStatus(queueEntry.id, 'called');
    toast.success(`${queueEntry.patient.name} foi chamado!`);
  };

  // Iniciar consulta
  const handleStartConsultation = (queueEntry: any) => {
    // Atualizar status na fila
    actions.updateQueueStatus(queueEntry.id, 'in-progress');
    
    // Definir paciente e agendamento atuais
    actions.setCurrentPatient(queueEntry.patient);
    actions.setCurrentAppointment(queueEntry.appointment);
    actions.setStep('consultation');

    // Navegar para a especialidade
    const specialtyRoutes: { [key: string]: string } = {
      'CLÍNICA GERAL': '/especialidades/clinica-geral',
      'PEDIATRIA': '/especialidades/pediatria',
      'DERMATOLOGIA': '/especialidades/dermatologia',
      'GINECOLOGIA': '/especialidades/ginecologia',
      'ORTOPEDIA': '/especialidades/ortopedia'
    };

    const route = specialtyRoutes[queueEntry.appointment.specialty.toUpperCase()];
    if (route) {
      router.push(route);
      toast.success(`Iniciando consulta de ${queueEntry.appointment.specialty}`);
    } else {
      toast.error('Especialidade não encontrada');
    }
  };

  // Finalizar consulta
  const handleCompleteConsultation = (queueEntry: any) => {
    actions.updateQueueStatus(queueEntry.id, 'completed');
    actions.setStep('payment');
    toast.success(`Consulta de ${queueEntry.patient.name} finalizada!`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-gray-100 text-gray-800';
      case 'called':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Aguardando';
      case 'called':
        return 'Chamado';
      case 'in-progress':
        return 'Em Atendimento';
      case 'completed':
        return 'Finalizado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-7 w-7 mr-3 text-blue-600" />
                Fila de Atendimento
              </h1>
              <p className="text-gray-600 mt-1">Gerenciamento da fila de pacientes</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{waitingCount}</div>
                <div className="text-sm text-gray-600">Aguardando</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{inProgressCount}</div>
                <div className="text-sm text-gray-600">Em Atendimento</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-600">{queue.length}</div>
                <div className="text-sm text-gray-600">Total na Fila</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fila de Pacientes */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Pacientes na Fila</h3>
          </div>
          
          <div className="divide-y">
            {queue.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum paciente na fila no momento</p>
              </div>
            ) : (
              queue
                .filter(queueEntry => queueEntry.patient && queueEntry.appointment) // Filtrar entradas válidas
                .map((queueEntry, index) => (
                <div key={queueEntry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    
                    {/* Informações do Paciente */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      
                      {/* Posição e Paciente */}
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {queueEntry.position}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{queueEntry.patient!.name}</div>
                            <div className="text-sm text-gray-600">{queueEntry.patient!.phone}</div>
                          </div>
                        </div>
                      </div>

                      {/* Consulta */}
                      <div>
                        <div className="font-medium text-gray-900">{queueEntry.appointment!.doctorName}</div>
                        <div className="text-sm text-gray-600">{queueEntry.appointment!.specialty}</div>
                        <div className="text-sm text-gray-600">{queueEntry.appointment!.time}</div>
                      </div>

                      {/* Prioridade e Tipo */}
                      <div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(queueEntry.appointment!.priority)}`}>
                          {queueEntry.appointment!.priority === 'urgent' ? 'Urgente' : 'Normal'}
                        </span>
                        <div className="text-sm text-gray-600 mt-1">
                          {queueEntry.appointment!.type === 'consultation' ? 'Consulta' : 
                           queueEntry.appointment!.type === 'return' ? 'Retorno' : 'Exame'}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(queueEntry.status)}`}>
                          {getStatusLabel(queueEntry.status)}
                        </span>
                        {queueEntry.calledAt && (
                          <div className="text-xs text-gray-500 mt-1">
                            Chamado: {new Date(queueEntry.calledAt).toLocaleTimeString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2 ml-4">
                      
                      {queueEntry.status === 'waiting' && (
                        <button
                          onClick={() => handleCallPatient(queueEntry)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chamar Paciente"
                        >
                          <Bell className="h-5 w-5" />
                        </button>
                      )}

                      {queueEntry.status === 'called' && (
                        <button
                          onClick={() => handleStartConsultation(queueEntry)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Iniciar Consulta"
                        >
                          <Play className="h-5 w-5" />
                        </button>
                      )}

                      {queueEntry.status === 'in-progress' && (
                        <button
                          onClick={() => handleCompleteConsultation(queueEntry)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Finalizar Consulta"
                        >
                          <UserCheck className="h-5 w-5" />
                        </button>
                      )}

                      {queueEntry.status === 'in-progress' && (
                        <button
                          onClick={() => handleStartConsultation(queueEntry)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                          title="Ir para Consulta"
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Atender
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function FilaAtendimentoPage() {
  return (
    <LayoutIntegrado>
      <FilaAtendimentoContent />
    </LayoutIntegrado>
  );
}
