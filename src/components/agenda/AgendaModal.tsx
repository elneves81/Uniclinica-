"use client";

import { useState } from "react";
import { X, User, Phone, Calendar, Clock, Stethoscope } from "lucide-react";
import { useClinic, useClinicActions } from "@/contexts/ClinicContext";
import { toast } from "react-hot-toast";

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime: string;
}

const doctors = [
  { id: "1", name: "DR. JOÃO SANTOS", specialty: "CLÍNICA GERAL" },
  { id: "2", name: "DRA. ANA COSTA", specialty: "PEDIATRIA" },
  { id: "3", name: "DR. CARLOS LIMA", specialty: "DERMATOLOGIA" },
  { id: "4", name: "DRA. MARIANA SILVA", specialty: "GINECOLOGIA" },
  { id: "5", name: "DR. PEDRO OLIVEIRA", specialty: "ORTOPEDIA" }
];

export default function AgendaModal({ isOpen, onClose, selectedDate, selectedTime }: AgendaModalProps) {
  const { state } = useClinic();
  const actions = useClinicActions();
  
  const [formData, setFormData] = useState({
    // Dados do paciente
    name: '',
    phone: '',
    cpf: '',
    // Dados da consulta
    doctorId: '',
    type: 'consultation' as 'consultation' | 'return' | 'exam',
    priority: 'normal' as 'normal' | 'urgent',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validações
      if (!formData.name.trim()) {
        toast.error('Nome é obrigatório');
        return;
      }
      
      if (!formData.phone.trim()) {
        toast.error('Telefone é obrigatório');
        return;
      }

      if (!formData.doctorId) {
        toast.error('Selecione um médico');
        return;
      }

      const doctor = doctors.find(d => d.id === formData.doctorId);
      if (!doctor) {
        toast.error('Médico não encontrado');
        return;
      }

      // Criar IDs únicos
      const patientId = `patient_${Date.now()}`;
      const appointmentId = `appointment_${Date.now()}`;

      // Criar paciente
      const patient = {
        id: patientId,
        name: formData.name.toUpperCase(),
        phone: formData.phone,
        cpf: formData.cpf,
        email: '',
        birthDate: '',
        gender: 'M' as const,
        address: {
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          zipCode: ''
        },
        emergencyContact: {
          name: '',
          phone: ''
        },
        notes: formData.notes
      };

      // Criar agendamento
      const appointment = {
        id: appointmentId,
        patientId: patientId,
        patientName: formData.name.toUpperCase(), // Incluir nome do paciente
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'scheduled' as const,
        type: formData.type,
        priority: formData.priority,
        notes: formData.notes
      };

      // Salvar no contexto
      actions.addPatient(patient);
      actions.addAppointment(appointment);
      
      // Adicionar à fila automaticamente
      actions.addToQueue(patientId, appointmentId);

      toast.success('Agendamento realizado com sucesso!');

      // Limpar formulário
      setFormData({
        name: '',
        phone: '',
        cpf: '',
        doctorId: '',
        type: 'consultation',
        priority: 'normal',
        notes: ''
      });

      onClose();

    } catch (error) {
      console.error('Erro ao agendar:', error);
      toast.error('Erro ao realizar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Novo Agendamento</h2>
            <p className="text-blue-100">
              {selectedDate.toLocaleDateString('pt-BR')} às {selectedTime}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Dados do Paciente */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Dados do Paciente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    phone: formatPhone(e.target.value) 
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(42) 99999-9999"
                  maxLength={15}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    cpf: formatCPF(e.target.value) 
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>
            </div>
          </div>

          {/* Dados da Consulta */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Dados da Consulta
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Médico e Especialidade *
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione um médico</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Consulta
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    type: e.target.value as 'consultation' | 'return' | 'exam' 
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consultation">Consulta</option>
                  <option value="return">Retorno</option>
                  <option value="exam">Exame</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    priority: e.target.value as 'normal' | 'urgent' 
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Observações sobre a consulta..."
                />
              </div>
            </div>
          </div>

          {/* Resumo */}
          {selectedDoctor && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Resumo do Agendamento</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Paciente:</strong> {formData.name}</p>
                <p><strong>Data:</strong> {selectedDate.toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
                <p><strong>Médico:</strong> {selectedDoctor.name}</p>
                <p><strong>Especialidade:</strong> {selectedDoctor.specialty}</p>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Agendando...' : 'Agendar Consulta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
