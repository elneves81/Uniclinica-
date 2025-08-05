"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePatientFlow, usePatientFlowActions } from '@/contexts/PatientFlowContext';
import { 
  UserPlus, 
  Users, 
  Calendar,
  Clock, 
  Stethoscope, 
  CreditCard, 
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface QuickActionProps {
  className?: string;
}

export function QuickActions({ className = '' }: QuickActionProps) {
  const router = useRouter();
  const { state } = usePatientFlow();
  const actions = usePatientFlowActions();
  const { currentPatient, currentAppointment, waitingQueue } = state;

  const handleNavigateToStep = (step: 'reception' | 'waiting' | 'consultation' | 'payment', url: string) => {
    actions.setCurrentStep(step);
    router.push(url);
  };

  const quickActions = [
    {
      id: 'new-patient',
      label: 'Novo Paciente',
      icon: UserPlus,
      color: 'blue',
      action: () => handleNavigateToStep('reception', '/pacientes'),
      description: 'Cadastrar novo paciente'
    },
    {
      id: 'schedule',
      label: 'Agendar Consulta',
      icon: Calendar,
      color: 'green',
      action: () => handleNavigateToStep('reception', '/recepcao'),
      description: 'Agendar nova consulta'
    },
    {
      id: 'waiting-queue',
      label: 'Fila de Espera',
      icon: Clock,
      color: 'yellow',
      action: () => handleNavigateToStep('waiting', '/fila-atendimento'),
      description: `${waitingQueue.length} pacientes aguardando`,
      badge: waitingQueue.length > 0 ? waitingQueue.length : undefined
    },
    {
      id: 'consultation',
      label: 'Consulta Médica',
      icon: Stethoscope,
      color: 'purple',
      action: () => {
        if (!currentPatient) {
          toast.error('Selecione um paciente primeiro');
          return;
        }
        handleNavigateToStep('consultation', '/prontuarios');
      },
      description: 'Iniciar atendimento médico',
      disabled: !currentPatient
    },
    {
      id: 'payment',
      label: 'Financeiro',
      icon: CreditCard,
      color: 'indigo',
      action: () => handleNavigateToStep('payment', '/financeiro'),
      description: 'Processar pagamentos'
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: FileText,
      color: 'gray',
      action: () => router.push('/relatorios'),
      description: 'Visualizar relatórios'
    }
  ];

  const getColorClasses = (color: string, disabled?: boolean) => {
    if (disabled) {
      return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
    }

    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
      purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      gray: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Ações Rápidas
        </h3>
        {currentPatient && (
          <Link 
            href="/recepcao"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            Voltar à Recepção
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              disabled={action.disabled}
              className={`
                relative p-4 border rounded-lg transition-all text-left
                ${getColorClasses(action.color, action.disabled)}
                ${!action.disabled && 'hover:shadow-md transform hover:scale-105'}
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <Icon className="h-6 w-6" />
                {action.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {action.badge}
                  </span>
                )}
              </div>
              <div className="font-medium text-sm mb-1">
                {action.label}
              </div>
              <div className="text-xs opacity-75">
                {action.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Status atual */}
      {currentPatient && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 mb-1">
                  Paciente Atual: {currentPatient.name}
                </div>
                <div className="text-sm text-blue-700">
                  {currentAppointment ? (
                    <>Consulta agendada para {currentAppointment.time} - {currentAppointment.specialty}</>
                  ) : (
                    'Paciente selecionado para atendimento'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para notificações do sistema
export function SystemNotifications() {
  const { state } = usePatientFlow();
  const actions = usePatientFlowActions();
  const { notifications } = state;

  const unreadCount = notifications.filter(n => !n.read).length;

  if (unreadCount === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications
        .filter(n => !n.read)
        .slice(0, 3)
        .map((notification) => (
          <div
            key={notification.id}
            className={`
              max-w-sm p-4 rounded-lg shadow-lg border
              ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">
                  {notification.message}
                </div>
                <div className="text-xs opacity-75">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => actions.markNotificationRead(notification.id)}
                className="text-current opacity-50 hover:opacity-75"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
