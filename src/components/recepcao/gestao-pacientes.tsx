"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Eye,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Shield,
  Filter,
  UserCheck,
  Clock,
  CreditCard,
  AlertTriangle,
  Heart,
  Activity
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  age: number;
  gender: "M" | "F" | "O";
  phone: string;
  email: string;
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
    relationship: string;
    phone: string;
  };
  insurance?: {
    provider: string;
    number: string;
    validity: string;
  };
  lastVisit?: string;
  status: "ATIVO" | "INATIVO" | "BLOQUEADO";
  priority: "NORMAL" | "PRIORITARIO" | "URGENTE";
  createdAt: string;
  updatedAt: string;
  notes?: string;
  pendingPayments: number;
  totalVisits: number;
}

// Dados mock expandidos
const mockPatients: Patient[] = [
  {
    id: "PAT001",
    name: "MARIA SILVA SANTOS",
    cpf: "123.456.789-01",
    rg: "12.345.678-9",
    birthDate: "1985-03-15",
    age: 39,
    gender: "F",
    phone: "(42) 99999-1234",
    email: "maria.silva@email.com",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      zipCode: "85070-100"
    },
    emergencyContact: {
      name: "João Silva Santos",
      relationship: "Cônjuge",
      phone: "(42) 99999-5678"
    },
    insurance: {
      provider: "UNIMED",
      number: "123456789",
      validity: "2024-12-31"
    },
    lastVisit: "2025-01-10",
    status: "ATIVO",
    priority: "NORMAL",
    createdAt: "2023-01-15",
    updatedAt: "2025-01-10",
    notes: "Paciente hipertensa, acompanhamento regular necessário",
    pendingPayments: 0,
    totalVisits: 15
  },
  {
    id: "PAT002",
    name: "JOSÉ CARLOS OLIVEIRA",
    cpf: "987.654.321-02",
    rg: "98.765.432-1",
    birthDate: "1972-08-22",
    age: 52,
    gender: "M",
    phone: "(42) 99999-5678",
    email: "jose.carlos@email.com",
    address: {
      street: "Av. Brasil",
      number: "1000",
      neighborhood: "Vila Nova",
      city: "Guarapuava",
      state: "PR",
      zipCode: "85070-200"
    },
    emergencyContact: {
      name: "Ana Oliveira",
      relationship: "Filha",
      phone: "(42) 99999-9012"
    },
    insurance: {
      provider: "SUS",
      number: "CNS123456789",
      validity: "2025-12-31"
    },
    lastVisit: "2025-01-08",
    status: "ATIVO",
    priority: "PRIORITARIO",
    createdAt: "2023-05-20",
    updatedAt: "2025-01-08",
    notes: "Diabético tipo 2, necessita acompanhamento nutricional",
    pendingPayments: 150.00,
    totalVisits: 8
  },
  {
    id: "PAT003",
    name: "ANA PAULA FERNANDES",
    cpf: "456.789.123-03",
    rg: "45.678.912-3",
    birthDate: "1992-11-08",
    age: 32,
    gender: "F",
    phone: "(42) 99999-9012",
    email: "ana.fernandes@email.com",
    address: {
      street: "Rua XV de Novembro",
      number: "789",
      neighborhood: "Centro",
      city: "Guarapuava",
      state: "PR",
      zipCode: "85070-300"
    },
    emergencyContact: {
      name: "Pedro Fernandes",
      relationship: "Pai",
      phone: "(42) 99999-3456"
    },
    lastVisit: "2025-01-05",
    status: "ATIVO",
    priority: "NORMAL",
    createdAt: "2024-03-05",
    updatedAt: "2025-01-05",
    notes: "Paciente particular, sem convênio",
    pendingPayments: 0,
    totalVisits: 3
  },
  {
    id: "PAT004",
    name: "PEDRO SANTOS LIMA",
    cpf: "321.654.987-04",
    rg: "32.165.498-7",
    birthDate: "1965-12-03",
    age: 59,
    gender: "M",
    phone: "(42) 99999-3456",
    email: "pedro.lima@email.com",
    address: {
      street: "Rua São Paulo",
      number: "456",
      neighborhood: "Batel",
      city: "Guarapuava",
      state: "PR",
      zipCode: "85070-400"
    },
    emergencyContact: {
      name: "Lucia Santos Lima",
      relationship: "Esposa",
      phone: "(42) 99999-7890"
    },
    insurance: {
      provider: "BRADESCO SAÚDE",
      number: "987654321",
      validity: "2024-06-30"
    },
    lastVisit: "2024-12-20",
    status: "ATIVO",
    priority: "URGENTE",
    createdAt: "2022-08-10",
    updatedAt: "2024-12-20",
    notes: "Paciente cardíaco, requer cuidados especiais",
    pendingPayments: 300.00,
    totalVisits: 25
  }
];

export default function GestaoPacientes() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "ATIVO" | "INATIVO" | "BLOQUEADO">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "NORMAL" | "PRIORITARIO" | "URGENTE">("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.phone.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    const matchesPriority = filterPriority === "all" || patient.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setModalMode("create");
    setShowModal(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode("edit");
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      "ATIVO": { color: "bg-green-100 text-green-800 border-green-200", label: "Ativo" },
      "INATIVO": { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Inativo" },
      "BLOQUEADO": { color: "bg-red-100 text-red-800 border-red-200", label: "Bloqueado" }
    };
    const { color, label } = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
        {label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      "NORMAL": { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Normal", icon: UserCheck },
      "PRIORITARIO": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Prioritário", icon: Clock },
      "URGENTE": { color: "bg-red-100 text-red-800 border-red-200", label: "Urgente", icon: AlertTriangle }
    };
    const { color, label, icon: Icon } = priorityMap[priority as keyof typeof priorityMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="mr-3 h-7 w-7 text-blue-600" />
            Gestão de Pacientes
          </h2>
          <p className="mt-1 text-gray-600">
            Cadastro e acompanhamento completo de pacientes
          </p>
        </div>
        <button
          onClick={handleNewPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Paciente
        </button>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-xl font-bold text-gray-900">{patients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-xl font-bold text-gray-900">
                {patients.filter(p => p.status === "ATIVO").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Prioritários</p>
              <p className="text-xl font-bold text-gray-900">
                {patients.filter(p => p.priority === "PRIORITARIO" || p.priority === "URGENTE").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pendências</p>
              <p className="text-xl font-bold text-gray-900">
                {patients.filter(p => p.pendingPayments > 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF, telefone ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="ATIVO">Ativos</option>
              <option value="INATIVO">Inativos</option>
              <option value="BLOQUEADO">Bloqueados</option>
            </select>
          </div>

          <div className="relative">
            <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as prioridades</option>
              <option value="NORMAL">Normal</option>
              <option value="PRIORITARIO">Prioritário</option>
              <option value="URGENTE">Urgente</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center justify-center">
            <span className="font-medium">
              {filteredPatients.length} de {patients.length} pacientes
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.age} anos • {patient.gender === "M" ? "Masculino" : patient.gender === "F" ? "Feminino" : "Outro"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.cpf}</div>
                    <div className="text-sm text-gray-500">{patient.rg}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {patient.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {patient.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.lastVisit ? formatDate(patient.lastVisit) : "Nunca"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {patient.totalVisits} consultas
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(patient.status)}
                    {patient.pendingPayments > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        Pendente: {formatCurrency(patient.pendingPayments)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(patient.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-green-600 hover:text-green-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          const phone = patient.phone.replace(/\D/g, '');
                          window.open(`https://wa.me/55${phone}`, '_blank');
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="WhatsApp"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {modalMode === "create" ? "Novo Paciente" : 
                   modalMode === "edit" ? "Editar Paciente" : "Detalhes do Paciente"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {selectedPatient && modalMode === "view" && (
                <div className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Dados Pessoais
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                          <p className="text-sm text-gray-900">{selectedPatient.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">CPF</label>
                            <p className="text-sm text-gray-900">{selectedPatient.cpf}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">RG</label>
                            <p className="text-sm text-gray-900">{selectedPatient.rg}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                            <p className="text-sm text-gray-900">{formatDate(selectedPatient.birthDate)}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Idade</label>
                            <p className="text-sm text-gray-900">{selectedPatient.age} anos</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Gênero</label>
                          <p className="text-sm text-gray-900">
                            {selectedPatient.gender === "M" ? "Masculino" : 
                             selectedPatient.gender === "F" ? "Feminino" : "Outro"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Contato
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Telefone</label>
                          <p className="text-sm text-gray-900">{selectedPatient.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="text-sm text-gray-900">{selectedPatient.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Endereço</label>
                          <p className="text-sm text-gray-900">
                            {selectedPatient.address.street}, {selectedPatient.address.number}
                            {selectedPatient.address.complement && `, ${selectedPatient.address.complement}`}
                            <br />
                            {selectedPatient.address.neighborhood} - {selectedPatient.address.city}/{selectedPatient.address.state}
                            <br />
                            CEP: {selectedPatient.address.zipCode}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Contato de Emergência</label>
                          <p className="text-sm text-gray-900">
                            {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship})
                            <br />
                            {selectedPatient.emergencyContact.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Histórico Médico
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Última Consulta</label>
                          <p className="text-sm text-gray-900">
                            {selectedPatient.lastVisit ? formatDate(selectedPatient.lastVisit) : "Nunca"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Total de Consultas</label>
                          <p className="text-sm text-gray-900">{selectedPatient.totalVisits}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cadastrado em</label>
                          <p className="text-sm text-gray-900">{formatDate(selectedPatient.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Status e Prioridade
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <div className="mt-1">{getStatusBadge(selectedPatient.status)}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                          <div className="mt-1">{getPriorityBadge(selectedPatient.priority)}</div>
                        </div>
                        {selectedPatient.pendingPayments > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Pagamentos Pendentes</label>
                            <p className="text-sm text-red-600 font-medium">
                              {formatCurrency(selectedPatient.pendingPayments)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Convênio */}
                  {selectedPatient.insurance && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text
