"use client";

import { useState } from "react";
import { X, Calendar, Clock, User, Stethoscope, MapPin, Phone, FileText } from "lucide-react";
import { usePatientFlowActions } from "@/contexts/PatientFlowContext";
import { useDataPersistence } from "@/hooks/useDataPersistence";
import { toast } from "react-hot-toast";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedDate: Date;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  room: string;
}

const doctors: Doctor[] = [
  { id: "1", name: "DR. JOÃO SANTOS", specialty: "CLÍNICA GERAL", room: "CONSULTÓRIO 01" },
  { id: "2", name: "DRA. ANA COSTA", specialty: "PEDIATRIA", room: "CONSULTÓRIO 02" },
  { id: "3", name: "DR. CARLOS LIMA", specialty: "DERMATOLOGIA", room: "CONSULTÓRIO 03" },
  { id: "4", name: "DRA. MARIANA SILVA", specialty: "GINECOLOGIA", room: "CONSULTÓRIO 04" },
  { id: "5", name: "DR. PEDRO OLIVEIRA", specialty: "ORTOPEDIA", room: "CONSULTÓRIO 05" }
];

export default function AppointmentModal({ isOpen, onClose, selectedTime, selectedDate }: AppointmentModalProps) {
  const { 
    addPatient, 
    addAppointment, 
    addToWaitingQueue, 
    addNotification,
    setCurrentPatient,
    setCurrentAppointment 
  } = usePatientFlowActions();
  
  const { saveAppointmentData } = useDataPersistence();
  const [step, setStep] = useState<'patient' | 'appointment'>('patient');
  
  // Dados do paciente
  const [patientData, setPatientData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F' | 'O'
  });

  // Dados do agendamento
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    type: 'consultation' as 'consultation' | 'return' | 'exam' | 'procedure',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!patientData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }
    
    if (!patientData.phone.trim()) {
      toast.error('Telefone é obrigatório');
      return;
    }

    setStep('appointment');
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!appointmentData.doctorId) {
        toast.error('Selecione um médico');
        return;
      }

      const selectedDoctor = doctors.find(d => d.id === appointmentData.doctorId);
      if (!selectedDoctor) {
        toast.error('Médico não encontrado');
        return;
      }

      // Criar o paciente
      const patientId = Date.now().toString();
      const patient = {
        ...patientData,
        id: patientId,
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
        }
      };

      // Criar o agendamento
      const appointmentId = `apt_${Date.now()}`;
      const appointment = {
        id: appointmentId,
        patientId: patientId,
        doctorId: appointmentData.doctorId,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'scheduled' as const,
        type: appointmentData.type,
        priority: appointmentData.priority,
        notes: appointmentData.notes
      };

      // Adicionar ao contexto
      addPatient(patient);
      addAppointment(appointment);
      
      // 💾 SALVAR DADOS PERMANENTEMENTE
      const savedData = saveAppointmentData(patient, appointment);
      console.log('📝 Dados salvos:', savedData);
      
      // Adicionar à fila de atendimento automaticamente
      addToWaitingQueue(patientId);
      
      // Definir como paciente/agendamento atual
      setCurrentPatient(patient);
      setCurrentAppointment(appointment);

      // Adicionar notificação
      addNotification({
        type: 'success',
        message: `${patientData.name} agendado para ${selectedTime} com ${selectedDoctor.name} e salvo no sistema!`
      });

      toast.success(`✅ ${patientData.name} agendado e salvo com sucesso!`, {
        duration: 4000,
        icon: '📅'
      });
      
      // Reset form
      setPatientData({
        name: '',
        cpf: '',
        phone: '',
        email: '',
        birthDate: '',
        gender: 'M'
      });
      setAppointmentData({
        doctorId: '',
        type: 'consultation',
        priority: 'normal',
        notes: ''
      });
      setStep('patient');
      onClose();

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast.error('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  const selectedDoctor = doctors.find(d => d.id === appointmentData.doctorId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-bold">Novo Agendamento</h2>
            <p className="text-blue-100">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} às {selectedTime}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step === 'patient' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'patient' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Dados do Paciente</span>
            </div>
            <div className={`w-16 h-0.5 ${step === 'appointment' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step === 'appointment' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'appointment' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Dados da Consulta</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'patient' && (
            <form onSubmit={handlePatientSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={patientData.name}
                    onChange={(e) => setPatientData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Telefone *
                  </label>
                  <input
                    type="text"
                    value={patientData.phone}
                    onChange={(e) => setPatientData(prev => ({ 
                      ...prev, 
                      phone: formatPhone(e.target.value) 
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(42) 99999-9999"
                    maxLength={15}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                  <input
                    type="text"
                    value={patientData.cpf}
                    onChange={(e) => setPatientData(prev => ({ 
                      ...prev, 
                      cpf: formatCPF(e.target.value) 
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={patientData.email}
                    onChange={(e) => setPatientData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    value={patientData.birthDate}
                    onChange={(e) => setPatientData(prev => ({ ...prev, birthDate: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                  <select
                    value={patientData.gender}
                    onChange={(e) => setPatientData(prev => ({ 
                      ...prev, 
                      gender: e.target.value as 'M' | 'F' | 'O' 
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>
              </div>

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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Próximo
                </button>
              </div>
            </form>
          )}

          {step === 'appointment' && (
            <form onSubmit={handleAppointmentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Stethoscope className="h-4 w-4 inline mr-1" />
                    Médico e Especialidade *
                  </label>
                  <select
                    value={appointmentData.doctorId}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, doctorId: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um médico</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty} ({doctor.room})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Consulta</label>
                  <select
                    value={appointmentData.type}
                    onChange={(e) => setAppointmentData(prev => ({ 
                      ...prev, 
                      type: e.target.value as 'consultation' | 'return' | 'exam' | 'procedure' 
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="consultation">Consulta</option>
                    <option value="return">Retorno</option>
                    <option value="exam">Exame</option>
                    <option value="procedure">Procedimento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
                  <select
                    value={appointmentData.priority}
                    onChange={(e) => setAppointmentData(prev => ({ 
                      ...prev, 
                      priority: e.target.value as 'low' | 'normal' | 'high' | 'urgent' 
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Observações
                  </label>
                  <textarea
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Observações sobre a consulta..."
                  />
                </div>
              </div>

              {/* Resumo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Resumo do Agendamento</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Paciente:</strong> {patientData.name}</p>
                  <p><strong>Data:</strong> {selectedDate.toLocaleDateString('pt-BR')}</p>
                  <p><strong>Horário:</strong> {selectedTime}</p>
                  {selectedDoctor && (
                    <>
                      <p><strong>Médico:</strong> {selectedDoctor.name}</p>
                      <p><strong>Especialidade:</strong> {selectedDoctor.specialty}</p>
                      <p><strong>Local:</strong> {selectedDoctor.room}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setStep('patient')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <div className="space-x-3">
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
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Agendando...' : 'Agendar e Adicionar à Fila'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
