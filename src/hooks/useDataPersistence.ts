"use client";

import { useEffect } from "react";
import { Patient, Appointment } from "@/contexts/PatientFlowContext";

export interface SavedAppointmentData {
  id: string;
  patient: Patient;
  appointment: Appointment;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'cancelled';
}

export function useDataPersistence() {
  
  // Salvar paciente agendado
  const saveAppointmentData = (patient: Patient, appointment: Appointment): SavedAppointmentData => {
    try {
      const appointmentData: SavedAppointmentData = {
        id: appointment.id,
        patient,
        appointment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      };

      // Buscar agendamentos existentes
      const existingData = localStorage.getItem('uniclinica_appointments');
      const appointments: SavedAppointmentData[] = existingData ? JSON.parse(existingData) : [];
      
      // Verificar se já existe um agendamento com o mesmo ID
      const existingIndex = appointments.findIndex(apt => apt.id === appointment.id);
      
      if (existingIndex !== -1) {
        // Atualizar agendamento existente
        appointments[existingIndex] = {
          ...appointments[existingIndex],
          ...appointmentData,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Adicionar novo agendamento
        appointments.push(appointmentData);
      }

      // Salvar no localStorage
      localStorage.setItem('uniclinica_appointments', JSON.stringify(appointments));
      
      // Salvar pacientes separadamente para facilitar consultas
      savePatientData(patient);
      
      console.log('✅ Agendamento salvo com sucesso:', appointmentData);
      return appointmentData;
      
    } catch (error) {
      console.error('❌ Erro ao salvar agendamento:', error);
      throw new Error('Falha ao salvar dados do agendamento');
    }
  };

  // Salvar dados do paciente
  const savePatientData = (patient: Patient) => {
    try {
      const existingData = localStorage.getItem('uniclinica_patients');
      const patients: Patient[] = existingData ? JSON.parse(existingData) : [];
      
      const existingIndex = patients.findIndex(p => p.id === patient.id);
      
      if (existingIndex !== -1) {
        patients[existingIndex] = patient;
      } else {
        patients.push(patient);
      }
      
      localStorage.setItem('uniclinica_patients', JSON.stringify(patients));
      console.log('✅ Dados do paciente salvos:', patient.name);
      
    } catch (error) {
      console.error('❌ Erro ao salvar paciente:', error);
    }
  };

  // Buscar todos os agendamentos
  const getAllAppointments = (): SavedAppointmentData[] => {
    try {
      const data = localStorage.getItem('uniclinica_appointments');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('❌ Erro ao carregar agendamentos:', error);
      return [];
    }
  };

  // Buscar todos os pacientes
  const getAllPatients = (): Patient[] => {
    try {
      const data = localStorage.getItem('uniclinica_patients');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('❌ Erro ao carregar pacientes:', error);
      return [];
    }
  };

  // Buscar agendamentos por data
  const getAppointmentsByDate = (date: string): SavedAppointmentData[] => {
    const appointments = getAllAppointments();
    return appointments.filter(apt => apt.appointment.date === date && apt.status === 'active');
  };

  // Buscar agendamentos de hoje
  const getTodayAppointments = (): SavedAppointmentData[] => {
    const today = new Date().toISOString().split('T')[0];
    return getAppointmentsByDate(today);
  };

  // Buscar paciente por ID
  const getPatientById = (id: string): Patient | null => {
    const patients = getAllPatients();
    return patients.find(p => p.id === id) || null;
  };

  // Buscar agendamento por ID
  const getAppointmentById = (id: string): SavedAppointmentData | null => {
    const appointments = getAllAppointments();
    return appointments.find(apt => apt.id === id) || null;
  };

  // Atualizar status do agendamento
  const updateAppointmentStatus = (id: string, status: SavedAppointmentData['status']) => {
    try {
      const appointments = getAllAppointments();
      const index = appointments.findIndex(apt => apt.id === id);
      
      if (index !== -1) {
        appointments[index].status = status;
        appointments[index].updatedAt = new Date().toISOString();
        localStorage.setItem('uniclinica_appointments', JSON.stringify(appointments));
        console.log(`✅ Status do agendamento ${id} atualizado para ${status}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      return false;
    }
  };

  // Deletar agendamento
  const deleteAppointment = (id: string) => {
    try {
      const appointments = getAllAppointments();
      const filtered = appointments.filter(apt => apt.id !== id);
      localStorage.setItem('uniclinica_appointments', JSON.stringify(filtered));
      console.log(`✅ Agendamento ${id} deletado`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar agendamento:', error);
      return false;
    }
  };

  // Estatísticas
  const getStatistics = () => {
    const appointments = getAllAppointments();
    const today = new Date().toISOString().split('T')[0];
    
    return {
      totalAppointments: appointments.length,
      todayAppointments: appointments.filter(apt => apt.appointment.date === today).length,
      activeAppointments: appointments.filter(apt => apt.status === 'active').length,
      completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
      cancelledAppointments: appointments.filter(apt => apt.status === 'cancelled').length,
      totalPatients: getAllPatients().length
    };
  };

  // Limpar todos os dados (útil para desenvolvimento)
  const clearAllData = () => {
    localStorage.removeItem('uniclinica_appointments');
    localStorage.removeItem('uniclinica_patients');
    console.log('🗑️ Todos os dados foram limpos');
  };

  return {
    saveAppointmentData,
    savePatientData,
    getAllAppointments,
    getAllPatients,
    getAppointmentsByDate,
    getTodayAppointments,
    getPatientById,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment,
    getStatistics,
    clearAllData
  };
}
