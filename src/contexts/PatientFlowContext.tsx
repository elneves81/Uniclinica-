"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos para o estado do fluxo do paciente
export interface Patient {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  birthDate: string;
  gender: 'M' | 'F' | 'O';
  rg?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship?: string;
  };
  insurance?: {
    provider: string;
    number: string;
    validity?: string;
  };
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  type: 'consultation' | 'return' | 'exam' | 'procedure';
  notes?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  date: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  chiefComplaint: string;
  symptoms: string[];
  vitalSigns: {
    weight?: number;
    height?: number;
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
  physicalExam: string;
  diagnosis: string;
  treatment: string;
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  exams: {
    type: string;
    description: string;
    status: 'requested' | 'completed';
    results?: string;
    date?: string;
  }[];
  followUp?: {
    date: string;
    notes: string;
  };
}

export interface Payment {
  id: string;
  patientId: string;
  appointmentId: string;
  amount: number;
  method: 'cash' | 'card' | 'pix' | 'insurance' | 'installment';
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  date: string;
  description: string;
  insuranceCoverage?: number;
  patientPayment?: number;
  installments?: {
    total: number;
    paid: number;
    next: string;
  };
}

export interface PatientFlowState {
  currentStep: 'reception' | 'waiting' | 'consultation' | 'payment' | 'completed';
  patients: Patient[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  payments: Payment[];
  waitingQueue: string[]; // IDs dos pacientes na fila
  currentPatient: Patient | null;
  currentAppointment: Appointment | null;
  notifications: {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
    read: boolean;
  }[];
}

type PatientFlowAction =
  | { type: 'SET_CURRENT_STEP'; payload: PatientFlowState['currentStep'] }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'SET_CURRENT_PATIENT'; payload: Patient | null }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_CURRENT_APPOINTMENT'; payload: Appointment | null }
  | { type: 'ADD_TO_WAITING_QUEUE'; payload: string }
  | { type: 'REMOVE_FROM_WAITING_QUEUE'; payload: string }
  | { type: 'ADD_MEDICAL_RECORD'; payload: MedicalRecord }
  | { type: 'UPDATE_MEDICAL_RECORD'; payload: MedicalRecord }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'UPDATE_PAYMENT'; payload: Payment }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<PatientFlowState['notifications'][0], 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

const initialState: PatientFlowState = {
  currentStep: 'reception',
  patients: [],
  appointments: [],
  medicalRecords: [],
  payments: [],
  waitingQueue: [],
  currentPatient: null,
  currentAppointment: null,
  notifications: []
};

function patientFlowReducer(state: PatientFlowState, action: PatientFlowAction): PatientFlowState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };

    case 'ADD_PATIENT':
      return { 
        ...state, 
        patients: [...state.patients, action.payload] 
      };

    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };

    case 'SET_CURRENT_PATIENT':
      return { ...state, currentPatient: action.payload };

    case 'ADD_APPOINTMENT':
      return { 
        ...state, 
        appointments: [...state.appointments, action.payload] 
      };

    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(a => 
          a.id === action.payload.id ? action.payload : a
        )
      };

    case 'SET_CURRENT_APPOINTMENT':
      return { ...state, currentAppointment: action.payload };

    case 'ADD_TO_WAITING_QUEUE':
      return {
        ...state,
        waitingQueue: [...state.waitingQueue, action.payload]
      };

    case 'REMOVE_FROM_WAITING_QUEUE':
      return {
        ...state,
        waitingQueue: state.waitingQueue.filter(id => id !== action.payload)
      };

    case 'ADD_MEDICAL_RECORD':
      return {
        ...state,
        medicalRecords: [...state.medicalRecords, action.payload]
      };

    case 'UPDATE_MEDICAL_RECORD':
      return {
        ...state,
        medicalRecords: state.medicalRecords.map(r => 
          r.id === action.payload.id ? action.payload : r
        )
      };

    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload]
      };

    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };

    case 'ADD_NOTIFICATION':
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications]
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
}

const PatientFlowContext = createContext<{
  state: PatientFlowState;
  dispatch: React.Dispatch<PatientFlowAction>;
} | null>(null);

export function PatientFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(patientFlowReducer, initialState);

  return (
    <PatientFlowContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientFlowContext.Provider>
  );
}

export function usePatientFlow() {
  const context = useContext(PatientFlowContext);
  if (!context) {
    throw new Error('usePatientFlow must be used within a PatientFlowProvider');
  }
  return context;
}

// Hooks utilitários para ações específicas
export function usePatientFlowActions() {
  const { dispatch } = usePatientFlow();

  return {
    setCurrentStep: (step: PatientFlowState['currentStep']) =>
      dispatch({ type: 'SET_CURRENT_STEP', payload: step }),

    addPatient: (patient: Patient) =>
      dispatch({ type: 'ADD_PATIENT', payload: patient }),

    updatePatient: (patient: Patient) =>
      dispatch({ type: 'UPDATE_PATIENT', payload: patient }),

    setCurrentPatient: (patient: Patient | null) =>
      dispatch({ type: 'SET_CURRENT_PATIENT', payload: patient }),

    addAppointment: (appointment: Appointment) =>
      dispatch({ type: 'ADD_APPOINTMENT', payload: appointment }),

    updateAppointment: (appointment: Appointment) =>
      dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointment }),

    setCurrentAppointment: (appointment: Appointment | null) =>
      dispatch({ type: 'SET_CURRENT_APPOINTMENT', payload: appointment }),

    addToWaitingQueue: (patientId: string) =>
      dispatch({ type: 'ADD_TO_WAITING_QUEUE', payload: patientId }),

    removeFromWaitingQueue: (patientId: string) =>
      dispatch({ type: 'REMOVE_FROM_WAITING_QUEUE', payload: patientId }),

    addMedicalRecord: (record: MedicalRecord) =>
      dispatch({ type: 'ADD_MEDICAL_RECORD', payload: record }),

    updateMedicalRecord: (record: MedicalRecord) =>
      dispatch({ type: 'UPDATE_MEDICAL_RECORD', payload: record }),

    addPayment: (payment: Payment) =>
      dispatch({ type: 'ADD_PAYMENT', payload: payment }),

    updatePayment: (payment: Payment) =>
      dispatch({ type: 'UPDATE_PAYMENT', payload: payment }),

    addNotification: (notification: Omit<PatientFlowState['notifications'][0], 'id' | 'timestamp' | 'read'>) =>
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),

    markNotificationRead: (id: string) =>
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),

    clearNotifications: () =>
      dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  };
}
