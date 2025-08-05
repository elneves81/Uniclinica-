"use client";

import React, { useState } from "react";
import { 
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Calendar,
  User,
  Stethoscope,
  Download,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import LayoutIntegrado from "@/components/layout/LayoutIntegrado";

interface Prontuario {
  id: string;
  patientName: string;
  patientCpf: string;
  lastVisit: string;
  doctor: string;
  specialty: string;
  status: 'active' | 'inactive' | 'emergency';
  priority: 'low' | 'medium' | 'high';
  totalVisits: number;
  lastDiagnosis: string;
  age: number;
  phone: string;
}

function ProntuariosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProntuario, setSelectedProntuario] = useState<Prontuario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const prontuarios: Prontuario[] = [
    {
      id: "PRN001",
      patientName: "Maria Silva Santos",
      patientCpf: "123.456.789-01",
      lastVisit: "2024-01-15",
      doctor: "Dr. João Carlos",
      specialty: "Cardiologia",
      status: "active",
      priority: "high",
      totalVisits: 12,
      lastDiagnosis: "Hipertensão arterial",
      age: 58,
      phone: "(11) 99999-9999"
    },
    {
      id: "PRN002",
      patientName: "José Oliveira",
      patientCpf: "234.567.890-12",
      lastVisit: "2024-01-14",
      doctor: "Dra. Ana Paula",
      specialty: "Clínica Geral",
      status: "active",
      priority: "medium",
      totalVisits: 5,
      lastDiagnosis: "Diabetes tipo 2",
      age: 45,
      phone: "(11) 88888-8888"
    },
    {
      id: "PRN003",
      patientName: "Ana Costa Lima",
      patientCpf: "345.678.901-23",
      lastVisit: "2024-01-13",
      doctor: "Dr. Pedro Santos",
      specialty: "Dermatologia",
      status: "inactive",
      priority: "low",
      totalVisits: 3,
      lastDiagnosis: "Dermatite atópica",
      age: 32,
      phone: "(11) 77777-7777"
    },
    {
      id: "PRN004",
      patientName: "Carlos Roberto",
      patientCpf: "456.789.012-34",
      lastVisit: "2024-01-15",
      doctor: "Dra. Fernanda Luz",
      specialty: "Ortopedia",
      status: "emergency",
      priority: "high",
      totalVisits: 1,
      lastDiagnosis: "Fratura de punho",
      age: 28,
      phone: "(11) 66666-6666"
    }
  ];

  const specialties = ["all", "Cardiologia", "Clínica Geral", "Dermatologia", "Ortopedia", "Pediatria"];
  const statuses = ["all", "active", "inactive", "emergency"];

  const filteredProntuarios = prontuarios.filter(prontuario => {
    const matchesSearch = prontuario.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prontuario.patientCpf.includes(searchTerm) ||
                         prontuario.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || prontuario.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === "all" || prontuario.status === selectedStatus;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProntuarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProntuarios = filteredProntuarios.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const openModal = (prontuario: Prontuario) => {
    setSelectedProntuario(prontuario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProntuario(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prontuários Médicos</h1>
              <p className="text-gray-600">Gestão completa de prontuários e histórico médico</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Prontuário
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total de Prontuários</p>
              <p className="text-2xl font-bold text-gray-900">{prontuarios.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {prontuarios.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Emergência</p>
              <p className="text-2xl font-bold text-gray-900">
                {prontuarios.filter(p => p.status === 'emergency').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Alta Prioridade</p>
              <p className="text-2xl font-bold text-gray-900">
                {prontuarios.filter(p => p.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Nome, CPF ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === "all" ? "Todas as especialidades" : specialty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "Todos os status" : 
                   status === "active" ? "Ativo" :
                   status === "inactive" ? "Inativo" : "Emergência"}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Médico/Especialidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProntuarios.map((prontuario) => (
                <tr key={prontuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{prontuario.patientName}</div>
                      <div className="text-sm text-gray-500">
                        {prontuario.patientCpf} • {prontuario.age} anos
                      </div>
                      <div className="text-sm text-gray-500">ID: {prontuario.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prontuario.lastVisit}</div>
                    <div className="text-sm text-gray-500">{prontuario.totalVisits} consultas</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prontuario.doctor}</div>
                    <div className="text-sm text-gray-500">{prontuario.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(prontuario.status)}`}>
                      {prontuario.status === 'active' ? 'Ativo' :
                       prontuario.status === 'inactive' ? 'Inativo' : 'Emergência'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getPriorityColor(prontuario.priority)}`}>
                      {getPriorityIcon(prontuario.priority)}
                      <span className="ml-1 text-sm font-medium">
                        {prontuario.priority === 'high' ? 'Alta' :
                         prontuario.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openModal(prontuario)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredProntuarios.length)}
                </span>{' '}
                de <span className="font-medium">{filteredProntuarios.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Próximo
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProntuario && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Detalhes do Prontuário - {selectedProntuario.patientName}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Fechar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID do Prontuário</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.patientCpf}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Idade</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.age} anos</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Última Consulta</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.lastVisit}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total de Consultas</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.totalVisits}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Médico Responsável</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.doctor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Especialidade</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProntuario.specialty}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Último Diagnóstico</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedProntuario.lastDiagnosis}</p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Fechar
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Ver Prontuário Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProntuariosPage() {
  return (
    <LayoutIntegrado>
      <ProntuariosContent />
    </LayoutIntegrado>
  );
}
