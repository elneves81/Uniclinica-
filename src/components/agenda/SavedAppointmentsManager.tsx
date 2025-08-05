"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Stethoscope, Trash2, Edit, Eye, RefreshCw } from "lucide-react";
import { useDataPersistence, SavedAppointmentData } from "@/hooks/useDataPersistence";
import { toast } from "react-hot-toast";

interface SavedAppointmentsManagerProps {
  selectedDate: Date;
  onRefresh?: () => void;
}

export default function SavedAppointmentsManager({ selectedDate, onRefresh }: SavedAppointmentsManagerProps) {
  const { 
    getAppointmentsByDate, 
    updateAppointmentStatus, 
    deleteAppointment,
    getStatistics 
  } = useDataPersistence();
  
  const [appointments, setAppointments] = useState<SavedAppointmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = () => {
    setLoading(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const dayAppointments = getAppointmentsByDate(dateString);
      setAppointments(dayAppointments);
      
      const stats = getStatistics();
      setStatistics(stats);
      
      console.log(`📅 Carregados ${dayAppointments.length} agendamentos salvos para ${dateString}`);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      toast.error('Erro ao carregar agendamentos salvos');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: SavedAppointmentData['status']) => {
    try {
      const success = updateAppointmentStatus(id, newStatus);
      if (success) {
        loadAppointments();
        onRefresh?.();
        toast.success(`Status atualizado para ${newStatus}`);
      } else {
        toast.error('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDelete = async (id: string, patientName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o agendamento de ${patientName}?`)) {
      try {
        const success = deleteAppointment(id);
        if (success) {
          loadAppointments();
          onRefresh?.();
          toast.success('Agendamento excluído com sucesso');
        } else {
          toast.error('Erro ao excluir agendamento');
        }
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        toast.error('Erro ao excluir agendamento');
      }
    }
  };

  const getStatusBadge = (status: SavedAppointmentData['status']) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    
    const labels = {
      active: "Ativo",
      completed: "Finalizado", 
      cancelled: "Cancelado"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento salvo</h3>
          <p className="text-gray-500">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? "Não há agendamentos salvos para hoje"
              : `Não há agendamentos salvos para ${formatDate(selectedDate.toISOString().split('T')[0])}`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Agendamentos Salvos ({appointments.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadAppointments}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Atualizar"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments.map((savedAppointment) => (
          <div key={savedAppointment.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Informações do Paciente */}
                <div>
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{savedAppointment.patient.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {savedAppointment.patient.phone}
                  </div>
                  {savedAppointment.patient.cpf && (
                    <div className="text-sm text-gray-600 mt-1">
                      CPF: {savedAppointment.patient.cpf}
                    </div>
                  )}
                </div>

                {/* Informações da Consulta */}
                <div>
                  <div className="flex items-center mb-2">
                    <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{savedAppointment.appointment.doctorName}</span>
                  </div>
                  <div className="text-sm text-gray-600">{savedAppointment.appointment.specialty}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Tipo: {savedAppointment.appointment.type === 'consultation' ? 'Consulta' : 
                           savedAppointment.appointment.type === 'return' ? 'Retorno' : 
                           savedAppointment.appointment.type === 'exam' ? 'Exame' : 'Procedimento'}
                  </div>
                </div>

                {/* Data e Hora */}
                <div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{formatTime(savedAppointment.appointment.time)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(savedAppointment.appointment.date)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Prioridade: {savedAppointment.appointment.priority === 'urgent' ? 'Urgente' :
                                savedAppointment.appointment.priority === 'high' ? 'Alta' :
                                savedAppointment.appointment.priority === 'low' ? 'Baixa' : 'Normal'}
                  </div>
                </div>

                {/* Status e Observações */}
                <div>
                  <div className="mb-2">
                    {getStatusBadge(savedAppointment.status)}
                  </div>
                  {savedAppointment.appointment.notes && (
                    <div className="text-sm text-gray-600">
                      <strong>Obs:</strong> {savedAppointment.appointment.notes}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    Criado: {new Date(savedAppointment.createdAt).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => {}}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Visualizar"
                >
                  <Eye className="h-4 w-4" />
                </button>
                
                {savedAppointment.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(savedAppointment.id, 'completed')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Marcar como Finalizado"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(savedAppointment.id, 'cancelled')}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Cancelar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(savedAppointment.id, savedAppointment.patient.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
