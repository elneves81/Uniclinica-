"use client";

import { useState, useEffect } from "react";
import { BarChart3, Download, Filter, Calendar, Users, TrendingUp } from "lucide-react";
import { useDataPersistence, SavedAppointmentData } from "@/hooks/useDataPersistence";

export default function AppointmentReports() {
  const { getAllAppointments, getStatistics } = useDataPersistence();
  const [appointments, setAppointments] = useState<SavedAppointmentData[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const allAppointments = getAllAppointments();
    setAppointments(allAppointments);
    
    const stats = getStatistics();
    setStatistics(stats);
  };

  const generateReport = () => {
    const reportData = {
      geradoEm: new Date().toLocaleString('pt-BR'),
      estatisticas: statistics,
      agendamentos: appointments.map(apt => ({
        id: apt.id,
        paciente: apt.patient.name,
        telefone: apt.patient.phone,
        medico: apt.appointment.doctorName,
        especialidade: apt.appointment.specialty,
        data: apt.appointment.date,
        horario: apt.appointment.time,
        status: apt.status,
        tipo: apt.appointment.type,
        prioridade: apt.appointment.priority,
        criadoEm: apt.createdAt,
        observacoes: apt.appointment.notes
      }))
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_agendamentos_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const getAppointmentsBySpecialty = () => {
    const specialtyCount: { [key: string]: number } = {};
    appointments.forEach(apt => {
      const specialty = apt.appointment.specialty;
      specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });
    return Object.entries(specialtyCount).sort((a, b) => b[1] - a[1]);
  };

  const getAppointmentsByStatus = () => {
    const statusCount: { [key: string]: number } = {};
    appointments.forEach(apt => {
      const status = apt.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return Object.entries(statusCount);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Ver Relatórios"
      >
        <BarChart3 className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Relatório de Agendamentos
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {statistics && (
          <div className="p-6">
            {/* Estatísticas Gerais */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Estatísticas Gerais
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{statistics.totalAppointments}</div>
                  <div className="text-sm text-blue-800">Total de Agendamentos</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{statistics.activeAppointments}</div>
                  <div className="text-sm text-green-800">Ativos</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{statistics.completedAppointments}</div>
                  <div className="text-sm text-purple-800">Finalizados</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-600">{statistics.totalPatients}</div>
                  <div className="text-sm text-gray-800">Total de Pacientes</div>
                </div>
              </div>
            </div>

            {/* Agendamentos por Especialidade */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Agendamentos por Especialidade</h3>
              <div className="space-y-3">
                {getAppointmentsBySpecialty().map(([specialty, count]) => (
                  <div key={specialty} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{specialty}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / statistics.totalAppointments) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agendamentos por Status */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Agendamentos por Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getAppointmentsByStatus().map(([status, count]) => {
                  const statusLabels: { [key: string]: { label: string, color: string } } = {
                    'active': { label: 'Ativos', color: 'green' },
                    'completed': { label: 'Finalizados', color: 'blue' },
                    'cancelled': { label: 'Cancelados', color: 'red' }
                  };
                  
                  const statusInfo = statusLabels[status] || { label: status, color: 'gray' };
                  
                  return (
                    <div key={status} className={`bg-${statusInfo.color}-50 p-4 rounded-lg border border-${statusInfo.color}-200`}>
                      <div className={`text-2xl font-bold text-${statusInfo.color}-600`}>{count}</div>
                      <div className={`text-sm text-${statusInfo.color}-800`}>{statusInfo.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Últimos Agendamentos */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Últimos Agendamentos (5 mais recentes)</h3>
              <div className="space-y-2">
                {appointments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map(apt => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{apt.patient.name}</div>
                        <div className="text-sm text-gray-600">
                          {apt.appointment.specialty} - {apt.appointment.date} às {apt.appointment.time}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'active' ? 'bg-green-100 text-green-800' :
                        apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {apt.status === 'active' ? 'Ativo' : 
                         apt.status === 'completed' ? 'Finalizado' : 'Cancelado'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={generateReport}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar Relatório JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
