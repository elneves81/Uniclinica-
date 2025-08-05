"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// ========================================
// TIPOS DE DADOS
// ========================================

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  birthDate: string;
  gender: 'M' | 'F' | 'O';
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  insurance?: {
    provider: string;
    number: string;
  };
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string; // Nome do paciente para exibição rápida
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  type: 'consultation' | 'return' | 'exam';
  priority: 'normal' | 'urgent';
  notes?: string;
}

export interface QueueEntry {
  id: string;
  patientId: string;
  appointmentId: string;
  position: number;
  status: 'waiting' | 'called' | 'in-progress' | 'completed';
  calledAt?: string;
  startedAt?: string;
  completedAt?: string;
}

// ========================================
// ESTADO GLOBAL
// ========================================

export interface ClinicState {
  // Dados principais
  patients: Patient[];
  appointments: Appointment[];
  queue: QueueEntry[];
  
  // Estado atual
  currentPatient: Patient | null;
  currentAppointment: Appointment | null;
  currentStep: 'reception' | 'waiting' | 'consultation' | 'payment' | 'completed';
  
  // Configurações
  isLoading: boolean;
  error: string | null;
}

// ========================================
// AÇÕES
// ========================================

type ClinicAction =
  // Pacientes
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'SET_CURRENT_PATIENT'; payload: Patient | null }
  
  // Agendamentos
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_CURRENT_APPOINTMENT'; payload: Appointment | null }
  
  // Fila
  | { type: 'ADD_TO_QUEUE'; payload: { patientId: string; appointmentId: string } }
  | { type: 'UPDATE_QUEUE_STATUS'; payload: { id: string; status: QueueEntry['status'] } }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string }
  
  // Navegação
  | { type: 'SET_STEP'; payload: ClinicState['currentStep'] }
  
  // Sistema
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_DATA'; payload: { patients: Patient[]; appointments: Appointment[] } };

// ========================================
// ESTADO INICIAL
// ========================================

const initialState: ClinicState = {
  patients: [],
  appointments: [],
  queue: [],
  currentPatient: null,
  currentAppointment: null,
  currentStep: 'reception',
  isLoading: false,
  error: null,
};

// ========================================
// REDUCER
// ========================================

function clinicReducer(state: ClinicState, action: ClinicAction): ClinicState {
  switch (action.type) {
    // Pacientes
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: [...state.patients.filter(p => p.id !== action.payload.id), action.payload]
      };
    
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => p.id === action.payload.id ? action.payload : p)
      };
    
    case 'SET_CURRENT_PATIENT':
      return { ...state, currentPatient: action.payload };
    
    // Agendamentos
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments.filter(a => a.id !== action.payload.id), action.payload]
      };
    
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(a => a.id === action.payload.id ? action.payload : a)
      };
    
    case 'SET_CURRENT_APPOINTMENT':
      return { ...state, currentAppointment: action.payload };
    
    // Fila
    case 'ADD_TO_QUEUE':
      const newEntry: QueueEntry = {
        id: `queue_${Date.now()}`,
        patientId: action.payload.patientId,
        appointmentId: action.payload.appointmentId,
        position: state.queue.length + 1,
        status: 'waiting'
      };
      return {
        ...state,
        queue: [...state.queue, newEntry]
      };
    
    case 'UPDATE_QUEUE_STATUS':
      return {
        ...state,
        queue: state.queue.map(entry => 
          entry.id === action.payload.id 
            ? { 
                ...entry, 
                status: action.payload.status,
                calledAt: action.payload.status === 'called' ? new Date().toISOString() : entry.calledAt,
                startedAt: action.payload.status === 'in-progress' ? new Date().toISOString() : entry.startedAt,
                completedAt: action.payload.status === 'completed' ? new Date().toISOString() : entry.completedAt
              }
            : entry
        )
      };
    
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter(entry => entry.id !== action.payload)
      };
    
    // Navegação
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    // Sistema
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'LOAD_DATA':
      return {
        ...state,
        patients: action.payload.patients,
        appointments: action.payload.appointments
      };
    
    default:
      return state;
  }
}

// ========================================
// CONTEXTO
// ========================================

const ClinicContext = createContext<{
  state: ClinicState;
  dispatch: React.Dispatch<ClinicAction>;
} | null>(null);

// ========================================
// PROVIDER
// ========================================

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(clinicReducer, initialState);

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    try {
      const savedPatients = localStorage.getItem('clinic_patients');
      const savedAppointments = localStorage.getItem('clinic_appointments');
      
      if (savedPatients || savedAppointments) {
        dispatch({
          type: 'LOAD_DATA',
          payload: {
            patients: savedPatients ? JSON.parse(savedPatients) : [],
            appointments: savedAppointments ? JSON.parse(savedAppointments) : []
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }, []);

  // Salvar dados quando houver mudanças
  useEffect(() => {
    if (state.patients.length > 0) {
      localStorage.setItem('clinic_patients', JSON.stringify(state.patients));
    }
  }, [state.patients]);

  useEffect(() => {
    if (state.appointments.length > 0) {
      localStorage.setItem('clinic_appointments', JSON.stringify(state.appointments));
    }
  }, [state.appointments]);

  return (
    <ClinicContext.Provider value={{ state, dispatch }}>
      {children}
    </ClinicContext.Provider>
  );
}

// ========================================
// HOOK PRINCIPAL
// ========================================

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic deve ser usado dentro de ClinicProvider');
  }
  return context;
}

// ========================================
// HOOKS DE AÇÕES
// ========================================

export function useClinicActions() {
  const { dispatch } = useClinic();

  return {
    // Pacientes
    addPatient: (patient: Patient) => {
      dispatch({ type: 'ADD_PATIENT', payload: patient });
    },
    
    updatePatient: (patient: Patient) => {
      dispatch({ type: 'UPDATE_PATIENT', payload: patient });
    },
    
    setCurrentPatient: (patient: Patient | null) => {
      dispatch({ type: 'SET_CURRENT_PATIENT', payload: patient });
    },

    // Agendamentos
    addAppointment: (appointment: Appointment) => {
      dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
    },
    
    updateAppointment: (appointment: Appointment) => {
      dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointment });
    },
    
    setCurrentAppointment: (appointment: Appointment | null) => {
      dispatch({ type: 'SET_CURRENT_APPOINTMENT', payload: appointment });
    },

    // Fila
    addToQueue: (patientId: string, appointmentId: string) => {
      dispatch({ type: 'ADD_TO_QUEUE', payload: { patientId, appointmentId } });
    },
    
    updateQueueStatus: (id: string, status: QueueEntry['status']) => {
      dispatch({ type: 'UPDATE_QUEUE_STATUS', payload: { id, status } });
    },
    
    removeFromQueue: (id: string) => {
      dispatch({ type: 'REMOVE_FROM_QUEUE', payload: id });
    },

    // Navegação
    setStep: (step: ClinicState['currentStep']) => {
      dispatch({ type: 'SET_STEP', payload: step });
    },

    // Sistema
    setLoading: (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    
    setError: (error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };
}

// ========================================
// HOOKS UTILITÁRIOS
// ========================================

export function usePatientQueue() {
  const { state } = useClinic();
  
  return {
    queue: state.queue.map(entry => {
      const patient = state.patients.find(p => p.id === entry.patientId);
      const appointment = state.appointments.find(a => a.id === entry.appointmentId);
      return { ...entry, patient, appointment };
    }).filter(entry => entry.patient && entry.appointment),
    
    waitingCount: state.queue.filter(entry => entry.status === 'waiting').length,
    inProgressCount: state.queue.filter(entry => entry.status === 'in-progress').length
  };
}

export function useTodayAppointments() {
  const { state } = useClinic();
  const today = new Date().toISOString().split('T')[0];
  
  return state.appointments.filter(appointment => appointment.date === today);
}
