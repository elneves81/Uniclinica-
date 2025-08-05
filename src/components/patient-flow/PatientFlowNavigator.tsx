"use client";

import React from 'react';
import { usePatientFlow } from '@/contexts/PatientFlowContext';
import { 
  UserPlus, 
  Clock, 
  Stethoscope, 
  CreditCard, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    key: 'reception' as const,
    label: 'Recepção',
    icon: UserPlus,
    description: 'Cadastro e check-in do paciente'
  },
  {
    key: 'waiting' as const,
    label: 'Fila de Espera',
    icon: Clock,
    description: 'Aguardando atendimento médico'
  },
  {
    key: 'consultation' as const,
    label: 'Consulta',
    icon: Stethoscope,
    description: 'Atendimento médico'
  },
  {
    key: 'payment' as const,
    label: 'Pagamento',
    icon: CreditCard,
    description: 'Processamento financeiro'
  },
  {
    key: 'completed' as const,
    label: 'Concluído',
    icon: CheckCircle,
    description: 'Atendimento finalizado'
  }
];

interface PatientFlowNavigatorProps {
  className?: string;
  showDetails?: boolean;
}

export function PatientFlowNavigator({ className = '', showDetails = true }: PatientFlowNavigatorProps) {
  const { state } = usePatientFlow();
  const { currentStep, currentPatient } = state;

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Fluxo do Atendimento
        </h3>
        {currentPatient && (
          <div className="text-sm text-gray-600">
            Paciente: <span className="font-medium text-gray-900">{currentPatient.name}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' 
                      : isCompleted 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  {showDetails && (
                    <div className="text-xs text-gray-500 mt-1 max-w-24">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 px-4">
                  <div className={`h-0.5 transition-all ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  }`}>
                    <div className="flex items-center justify-center">
                      <ArrowRight className={`h-4 w-4 -mt-2 ${
                        isCompleted ? 'text-green-600' : 'text-gray-300'
                      }`} />
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {currentPatient && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">CPF</div>
              <div className="font-medium">{currentPatient.cpf}</div>
            </div>
            <div>
              <div className="text-gray-500">Telefone</div>
              <div className="font-medium">{currentPatient.phone}</div>
            </div>
            <div>
              <div className="text-gray-500">Idade</div>
              <div className="font-medium">
                {new Date().getFullYear() - new Date(currentPatient.birthDate).getFullYear()} anos
              </div>
            </div>
            <div>
              <div className="text-gray-500">Convênio</div>
              <div className="font-medium">
                {currentPatient.insurance?.provider || 'Particular'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente compacto para exibir em outras páginas
export function PatientFlowMini({ className = '' }: { className?: string }) {
  const { state } = usePatientFlow();
  const { currentStep, currentPatient } = state;

  const currentStepData = steps.find(step => step.key === currentStep);
  const Icon = currentStepData?.icon || UserPlus;

  if (!currentPatient) return null;

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-900">
            {currentStepData?.label}
          </div>
          <div className="text-xs text-blue-700">
            {currentPatient.name} • {currentPatient.cpf}
          </div>
        </div>
      </div>
    </div>
  );
}
