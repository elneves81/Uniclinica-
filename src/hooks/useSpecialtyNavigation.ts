"use client";

import { useRouter } from "next/navigation";
import { usePatientFlowActions } from "@/contexts/PatientFlowContext";
import { toast } from "react-hot-toast";

export interface SpecialtyNavigation {
  navigateToSpecialty: (specialty: string, patientData?: any, appointmentData?: any) => void;
  getSpecialtyRoute: (specialty: string) => string;
}

export function useSpecialtyNavigation(): SpecialtyNavigation {
  const router = useRouter();
  const { setCurrentStep, setCurrentPatient, setCurrentAppointment } = usePatientFlowActions();

  const specialtyRoutes: { [key: string]: string } = {
    "CLÍNICA GERAL": "/especialidades/clinica-geral",
    "PEDIATRIA": "/especialidades/pediatria",
    "DERMATOLOGIA": "/especialidades/dermatologia", 
    "GINECOLOGIA": "/especialidades/ginecologia",
    "ORTOPEDIA": "/especialidades/ortopedia"
  };

  const getSpecialtyRoute = (specialty: string): string => {
    return specialtyRoutes[specialty.toUpperCase()] || "/prontuario";
  };

  const navigateToSpecialty = (specialty: string, patientData?: any, appointmentData?: any) => {
    try {
      // Definir o paciente e agendamento atual no contexto
      if (patientData) {
        setCurrentPatient(patientData);
      }
      
      if (appointmentData) {
        setCurrentAppointment(appointmentData);
      }

      // Definir o passo atual como consulta
      setCurrentStep('consultation');

      // Navegar para a especialidade
      const route = getSpecialtyRoute(specialty);
      
      // Adicionar parâmetros de query se necessário
      const queryParams = new URLSearchParams();
      if (patientData?.id) {
        queryParams.set('patientId', patientData.id);
      }
      if (appointmentData?.id) {
        queryParams.set('appointmentId', appointmentData.id);
      }

      const finalRoute = queryParams.toString() 
        ? `${route}?${queryParams.toString()}`
        : route;

      router.push(finalRoute);
      
      toast.success(`Navegando para ${specialty}`);
    } catch (error) {
      console.error('Erro ao navegar para especialidade:', error);
      toast.error('Erro ao navegar para especialidade');
    }
  };

  return {
    navigateToSpecialty,
    getSpecialtyRoute
  };
}
